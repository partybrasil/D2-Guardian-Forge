#!/usr/bin/env node
/**
 * Icon Update Script - D2-Guardian-Forge
 * 
 * This script processes icon updates from the web interface and creates a PR
 * Usage: node scripts/update-icons.js <changes-file>
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');

/**
 * Process icon changes and create a PR
 */
async function processIconChanges(changesFilePath) {
  console.log('📦 Processing icon changes...');
  
  // Read and validate changes file
  let changesData;
  try {
    changesData = JSON.parse(fs.readFileSync(changesFilePath, 'utf8'));
  } catch (error) {
    console.error('❌ Failed to read or parse changes file:', error.message);
    process.exit(1);
  }
  
  // Validate JSON structure
  if (!changesData || typeof changesData !== 'object') {
    console.error('❌ Invalid changes file: expected JSON object');
    process.exit(1);
  }
  
  const { changes, files } = changesData;
  
  if (!Array.isArray(changes) || !changes.length) {
    console.error('❌ No changes found in the changes file or invalid format');
    process.exit(1);
  }
  
  if (!files || typeof files !== 'object') {
    console.error('❌ No files found in the changes file or invalid format');
    process.exit(1);
  }
  
  // Validate each change has required fields
  for (const change of changes) {
    if (!change.category || !change.name || !change.fileName) {
      console.error('❌ Invalid change object: missing required fields (category, name, fileName)');
      process.exit(1);
    }
    
    // Validate category and fileName don't contain path traversal
    if (change.category.includes('..') || change.category.includes('/') || change.category.includes('\\')) {
      console.error(`❌ Invalid category: "${change.category}" - path traversal not allowed`);
      process.exit(1);
    }
    
    if (change.fileName.includes('..') || change.fileName.includes('/') || change.fileName.includes('\\')) {
      console.error(`❌ Invalid fileName: "${change.fileName}" - path traversal not allowed`);
      process.exit(1);
    }
    
    // Validate only alphanumeric, hyphens, underscores, and dots (no spaces)
    const safePattern = /^[a-zA-Z0-9\-_.]+$/;
    if (!safePattern.test(change.category)) {
      console.error(`❌ Invalid category: "${change.category}" - contains unsafe characters`);
      process.exit(1);
    }
    
    if (!safePattern.test(change.fileName)) {
      console.error(`❌ Invalid fileName: "${change.fileName}" - contains unsafe characters`);
      process.exit(1);
    }
  }
  
  console.log(`✅ Found ${changes.length} icon change(s)`);
  
  // Create a new branch
  const branchName = `icon-update-${Date.now()}`;
  console.log(`🌿 Creating branch: ${branchName}`);
  
  try {
    await execAsync(`git checkout -b ${branchName}`);
  } catch (error) {
    console.error('❌ Failed to create branch:', error.message);
    process.exit(1);
  }
  
  // Process each icon change
  const processedChanges = [];
  
  for (let i = 0; i < changes.length; i++) {
    const change = changes[i];
    const { category, name, fileName } = change;
    const fileKey = `file_${i}`;
    
    if (!files[fileKey]) {
      console.warn(`⚠️  File not found for ${name}, skipping`);
      continue;
    }
    
    const targetPath = path.join(ROOT_DIR, 'public', 'icons', category, fileName);
    let fileData;
    
    try {
      fileData = Buffer.from(files[fileKey], 'base64');
    } catch (error) {
      console.error(`❌ Failed to decode base64 for ${category}/${name}:`, error.message);
      continue;
    }
    
    console.log(`📝 Updating: ${category}/${name}`);
    
    // Backup old file and write new file with error handling
    const backupPath = `${targetPath}.backup`;
    try {
      if (fs.existsSync(targetPath)) {
        fs.copyFileSync(targetPath, backupPath);
      }

      // Write new file
      fs.writeFileSync(targetPath, fileData);

      processedChanges.push({
        category,
        name,
        path: `public/icons/${category}/${fileName}`,
        oldPath: backupPath
      });
    } catch (error) {
      console.error(`❌ Failed to update icon ${category}/${name}:`, error.message);

      // Attempt to roll back file changes for this icon
      try {
        if (fs.existsSync(backupPath)) {
          // Restore original file from backup and remove backup
          fs.copyFileSync(backupPath, targetPath);
          fs.unlinkSync(backupPath);
        } else if (fs.existsSync(targetPath)) {
          // No backup, but a new/partial file exists: remove it
          fs.unlinkSync(targetPath);
        }
      } catch (rollbackError) {
        console.error('⚠️  Failed to roll back file changes:', rollbackError.message);
      }

      console.error('🚫 Aborting icon update process due to file operation error.');
      process.exit(1);
    }
  }
  
  console.log(`✅ Processed ${processedChanges.length} icon(s)`);
  
  // Stage changes
  console.log('📦 Staging changes...');
  await execAsync('git add public/icons/');
  
  // Create commit with properly escaped message
  const commitSummary = `Update ${processedChanges.length} icon(s) via Icon Editor`;
  const commitDetails = processedChanges.map(c => `- ${c.category}/${c.name}`).join('\n');
  const commitMessage = `${commitSummary}\n\n${commitDetails}`;
  
  // Write commit message to a temporary file to avoid shell injection
  const tmpFile = path.join(ROOT_DIR, '.git', `COMMIT_EDITMSG_TEMP_${process.pid}_${Date.now()}`);
  fs.writeFileSync(tmpFile, commitMessage);
  
  console.log('💾 Creating commit...');
  try {
    await execAsync(`git commit -F "${tmpFile}"`);
    fs.unlinkSync(tmpFile);
  } catch (error) {
    if (fs.existsSync(tmpFile)) {
      fs.unlinkSync(tmpFile);
    }
    throw error;
  }
  
  // Push branch
  console.log('🚀 Pushing branch...');
  await execAsync(`git push origin ${branchName}`);
  
  // Generate PR body (without broken backup file references)
  const prBody = generatePRBody(processedChanges);
  
  console.log('\n✅ Icon changes committed and pushed!');
  console.log(`\n📋 Next steps:`);
  console.log(`1. Go to GitHub: https://github.com/partybrasil/D2-Guardian-Forge/compare/${branchName}`);
  console.log(`2. Create a Pull Request with the following body:\n`);
  console.log(prBody);
  
  // Clean up backup files
  processedChanges.forEach(change => {
    if (fs.existsSync(change.oldPath)) {
      fs.unlinkSync(change.oldPath);
    }
  });
}

/**
 * Generate PR body with icon change details
 */
function generatePRBody(changes) {
  let body = `# Icon Updates\n\n`;
  body += `This PR updates ${changes.length} icon(s) from the Icon Editor.\n\n`;
  body += `## Changed Icons\n\n`;
  
  changes.forEach(change => {
    body += `### ${change.name} (${change.category})\n\n`;
    body += `- **Path**: \`${change.path}\`\n`;
    body += `- **Category**: ${change.category}\n\n`;
  });
  
  body += `\n---\n\n`;
  body += `Generated by Icon Editor | [View Documentation](docs/ICON_UPDATE_WORKFLOW.md)`;
  
  return body;
}

// Main execution
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node scripts/update-icons.js <changes-file>');
  process.exit(1);
}

processIconChanges(args[0]).catch(error => {
  console.error('❌ Error processing icon changes:', error);
  process.exit(1);
});
