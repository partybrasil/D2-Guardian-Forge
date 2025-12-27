/**
 * Icon Editor - D2-Guardian-Forge
 * 
 * Interface for uploading and replacing icon images
 */

import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import TokenModal from '../components/TokenModal';
import { ICONS, type IconCategory } from '../utils/iconUtils';
import type { IconChange } from '../utils/iconManager';

export default function IconEditor() {
  const [selectedCategory, setSelectedCategory] = useState<string>('classes');
  const [iconChanges, setIconChanges] = useState<IconChange[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasToken, setHasToken] = useState(false);
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  // Check for token on mount
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = () => {
    const token = localStorage.getItem('github_token');
    setHasToken(!!token);
  };

  // Validate GitHub token
  const validateToken = async (token: string): Promise<boolean> => {
    try {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });

      if (response.ok) {
        localStorage.setItem('github_token', token);
        checkToken();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  };

  const handleClearToken = () => {
    if (confirm('Are you sure you want to remove the GitHub token?')) {
      localStorage.removeItem('github_token');
      checkToken();
      setSuccessMessage('GitHub token removed successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  // Get all categories except 'default'
  const categories = Object.keys(ICONS).filter(cat => cat !== 'default');
  
  // Get items for selected category
  const categoryItems = selectedCategory && ICONS[selectedCategory as IconCategory]
    ? Object.entries(ICONS[selectedCategory as IconCategory] as Record<string, number>)
    : [];

  const handleFileSelect = (category: string, name: string, oldPath: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setErrorMessage('File size must be less than 2MB');
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);

    // Check if this icon already has a pending change
    const existingIndex = iconChanges.findIndex(
      change => change.category === category && change.name === name
    );

    if (existingIndex >= 0) {
      // Update existing change
      const newChanges = [...iconChanges];
      // Revoke old preview URL
      URL.revokeObjectURL(newChanges[existingIndex].previewUrl);
      newChanges[existingIndex] = { category, name, oldPath, newFile: file, previewUrl };
      setIconChanges(newChanges);
    } else {
      // Add new change
      setIconChanges([...iconChanges, { category, name, oldPath, newFile: file, previewUrl }]);
    }

    setErrorMessage(null);
  };

  const removeChange = (category: string, name: string) => {
    const change = iconChanges.find(c => c.category === category && c.name === name);
    if (change) {
      URL.revokeObjectURL(change.previewUrl);
    }
    setIconChanges(iconChanges.filter(c => !(c.category === category && c.name === name)));
  };

  const hasChange = (category: string, name: string) => {
    return iconChanges.some(c => c.category === category && c.name === name);
  };

  const getPreviewUrl = (category: string, name: string) => {
    const change = iconChanges.find(c => c.category === category && c.name === name);
    return change?.previewUrl;
  };

  const handleSaveChanges = async () => {
    if (iconChanges.length === 0) {
      setErrorMessage('No changes to save');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      // Prepare changes data
      const changesMetadata = iconChanges.map(change => ({
        category: change.category,
        name: change.name,
        fileName: `${change.name}.png`,
        path: `public/icons/${change.category}/${change.name}.png`,
        timestamp: Date.now()
      }));

      // Convert files to base64
      const filesData: { [key: string]: string } = {};
      for (let i = 0; i < iconChanges.length; i++) {
        const change = iconChanges[i];
        const arrayBuffer = await change.newFile.arrayBuffer();
        const base64 = btoa(
          new Uint8Array(arrayBuffer)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        filesData[`file_${i}`] = base64;
      }

      // Try to create PR directly using GitHub API
      const GITHUB_TOKEN = localStorage.getItem('github_token');
      let workflowDispatchError: string | null = null;
      
      if (GITHUB_TOKEN) {
        try {
          const owner = 'partybrasil';
          const repo = 'D2-Guardian-Forge';
          const baseBranch = 'main';
          const branchName = `icon-update-${Date.now()}`;
          
          const headers = {
            'Accept': 'application/vnd.github+json',
            'Authorization': `token ${GITHUB_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28',
            'Content-Type': 'application/json'
          };

          // Step 1: Get the base branch reference
          const baseBranchRes = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/git/ref/heads/${baseBranch}`,
            { headers }
          );
          
          if (!baseBranchRes.ok) {
            throw new Error(`Failed to get base branch: ${baseBranchRes.status}`);
          }
          
          const baseBranchData = await baseBranchRes.json();
          const baseSha = baseBranchData.object.sha;

          // Step 2: Create new branch
          const createBranchRes = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/git/refs`,
            {
              method: 'POST',
              headers,
              body: JSON.stringify({
                ref: `refs/heads/${branchName}`,
                sha: baseSha
              })
            }
          );

          if (!createBranchRes.ok) {
            throw new Error(`Failed to create branch: ${createBranchRes.status}`);
          }

          // Step 3: Upload each file to the new branch
          for (let i = 0; i < iconChanges.length; i++) {
            const change = iconChanges[i];
            const filePath = `public/icons/${change.category}/${change.name}.png`;
            const base64Content = filesData[`file_${i}`];

            // Check if file exists to get its SHA (for updates)
            let existingSha: string | undefined;
            try {
              const getFileRes = await fetch(
                `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branchName}`,
                { headers }
              );
              if (getFileRes.ok) {
                const fileData = await getFileRes.json();
                existingSha = fileData.sha;
              }
            } catch {
              // File doesn't exist, that's fine
            }

            // Create or update the file
            const updateFileRes = await fetch(
              `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
              {
                method: 'PUT',
                headers,
                body: JSON.stringify({
                  message: `Update icon: ${change.category}/${change.name}`,
                  content: base64Content,
                  branch: branchName,
                  ...(existingSha && { sha: existingSha })
                })
              }
            );

            if (!updateFileRes.ok) {
              const errorText = await updateFileRes.text();
              throw new Error(`Failed to upload ${filePath}: ${updateFileRes.status} - ${errorText}`);
            }
          }

          // Step 4: Create Pull Request
          const prBody = [
            '# Icon Updates',
            '',
            `This PR updates ${iconChanges.length} icon(s) from the Icon Editor.`,
            '',
            '## Changed Icons',
            '',
            ...iconChanges.map(change => `- **${change.category}/${change.name}**`),
            '',
            '---',
            '',
            `Generated by Icon Editor | Timestamp: ${new Date().toISOString()}`
          ].join('\n');

          const createPrRes = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/pulls`,
            {
              method: 'POST',
              headers,
              body: JSON.stringify({
                title: `Update ${iconChanges.length} icon(s) via Icon Editor`,
                body: prBody,
                head: branchName,
                base: baseBranch
              })
            }
          );

          if (!createPrRes.ok) {
            const errorText = await createPrRes.text();
            throw new Error(`Failed to create PR: ${createPrRes.status} - ${errorText}`);
          }

          const prData = await createPrRes.json();

          setSuccessMessage(
            `✅ Success! Pull Request created automatically.\n\n` +
            `${iconChanges.length} icon change(s) have been uploaded.\n\n` +
            `Pull Request: ${prData.html_url}\n\n` +
            `Review and merge your changes!`
          );
          
          // Clear changes after successful submission
          iconChanges.forEach(change => URL.revokeObjectURL(change.previewUrl));
          setIconChanges([]);
          return;

        } catch (apiError) {
          console.error('Failed to create PR:', apiError);
          const errorMsg = apiError instanceof Error ? apiError.message : String(apiError);
          
          // Provide helpful error message
          let friendlyError = 'Failed to create Pull Request automatically. ';
          if (errorMsg.includes('401')) {
            friendlyError += 'Your GitHub token may be invalid or expired. Please update your token.';
          } else if (errorMsg.includes('403')) {
            friendlyError += 'Your GitHub token does not have sufficient permissions. Ensure it has "repo" scope.';
          } else if (errorMsg.includes('404')) {
            friendlyError += 'Repository not found or token does not have access to it.';
          } else if (errorMsg.includes('422')) {
            friendlyError += 'Invalid request data. This usually means the payload is too large or malformed.';
          } else {
            friendlyError += errorMsg;
          }
          
          workflowDispatchError = friendlyError;
          console.error('Full error details:', errorMsg);
          // Fall through to JSON download fallback
        }
      }
      
      // Fallback: Download JSON file for manual processing
      const changeData = {
        changes: changesMetadata,
        files: filesData
      };
      
      const json = JSON.stringify(changeData, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `icon-changes-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      // Build message based on whether workflow dispatch failed
      const instructionMessage = workflowDispatchError
        ? [
            `⚠️ ${workflowDispatchError}`,
            ``,
            `📥 Downloaded icon changes file (${iconChanges.length} icon(s)) as fallback.`,
            ``,
            `📝 Manual processing options:`,
            `1. Fix the issue above and try "Save Changes" again, or`,
            `2. Run: node scripts/update-icons.js <downloaded-file>`,
            `   This will create a branch and commit your changes.`
          ].join('\n')
        : [
            `📥 Downloaded icon changes file (${iconChanges.length} icon(s)).`,
            ``,
            `⚠️ To enable automated PR creation:`,
            `1. Create a GitHub Personal Access Token with 'repo' scope`,
            `2. Go to: https://github.com/settings/tokens/new`,
            `3. Store it by running in browser console:`,
            `   localStorage.setItem('github_token', 'your-token-here')`,
            `4. Refresh page and try "Save Changes" again`,
            ``,
            `📝 Manual alternative:`,
            `Run: node scripts/update-icons.js <downloaded-file>`,
            `This will create a branch and commit your changes.`
          ].join('\n');
      
      // Use appropriate message type based on context
      if (workflowDispatchError) {
        setErrorMessage(instructionMessage);
      } else {
        setSuccessMessage(instructionMessage);
      }
      
    } catch (error) {
      console.error('Error saving icon changes:', error);
      setErrorMessage(
        'Unable to process changes. Please check console for details or try again.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Cleanup preview URLs when component unmounts
  // Note: Cleanup happens on unmount only; URLs are managed manually in state changes
  useEffect(() => {
    // Store current changes in a closure to clean up on unmount
    const currentChanges = [...iconChanges];
    return () => {
      currentChanges.forEach(change => {
        try {
          URL.revokeObjectURL(change.previewUrl);
        } catch {
          // URL may already be revoked, ignore error
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/settings"
          className="text-destiny-primary hover:text-destiny-primary/80 mb-4 inline-block"
        >
          ← Back to Settings
        </Link>
        <h1 className="text-3xl font-bold text-white mb-2">Icon Editor</h1>
        <p className="text-gray-400">
          Upload custom icons to replace placeholders. Changes will create a PR for review.
        </p>
      </div>

      {/* Token Status Section */}
      <div className="mb-6 bg-gray-800/50 border border-gray-700 rounded-lg p-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${hasToken ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-white font-medium">GitHub Token:</span>
              <span className={`font-semibold ${hasToken ? 'text-green-400' : 'text-red-400'}`}>
                {hasToken ? 'Present' : 'Not Present'}
              </span>
            </div>
            {hasToken && (
              <span className="text-xs text-gray-500">
                (Automated PR creation enabled)
              </span>
            )}
          </div>
          <div className="flex gap-2">
            {!hasToken ? (
              <button
                onClick={() => setIsTokenModalOpen(true)}
                className="px-4 py-2 bg-destiny-primary hover:bg-destiny-primary/80 text-black font-medium rounded-lg transition-colors"
              >
                Add Token
              </button>
            ) : (
              <>
                <button
                  onClick={() => setIsTokenModalOpen(true)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Update Token
                </button>
                <button
                  onClick={handleClearToken}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Clear Token
                </button>
              </>
            )}
          </div>
        </div>
        {!hasToken && (
          <p className="text-sm text-gray-400 mt-3">
            💡 Add a GitHub token to enable automated PR creation. Without it, changes will be downloaded as JSON for manual processing.
          </p>
        )}
      </div>

      {/* Messages */}
      {successMessage && (
        <div className="mb-6 bg-green-900/30 border border-green-700 rounded-lg p-4">
          <p className="text-green-400 whitespace-pre-line">{successMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 bg-red-900/30 border border-red-700 rounded-lg p-4">
          <p className="text-red-400">{errorMessage}</p>
        </div>
      )}

      {/* Pending Changes Summary */}
      {iconChanges.length > 0 && (
        <div className="mb-6 bg-destiny-primary/10 border border-destiny-primary rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">
                {iconChanges.length} Pending Change{iconChanges.length !== 1 ? 's' : ''}
              </h3>
              <p className="text-sm text-gray-400">
                Click "Save Changes" to create a PR with these icons
              </p>
            </div>
            <button
              onClick={() => {
                iconChanges.forEach(change => URL.revokeObjectURL(change.previewUrl));
                setIconChanges([]);
              }}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* Category Selector */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-4">Select Category</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-destiny-primary text-black'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {category}
              {iconChanges.filter(c => c.category === category).length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-white text-black rounded-full text-xs">
                  {iconChanges.filter(c => c.category === category).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Icon List */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">
          {selectedCategory} Icons ({categoryItems.length})
        </h2>
        
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {categoryItems.map(([name]) => {
            const iconPath = `icons/${selectedCategory}/${name}.png`;
            const hasChangeFlag = hasChange(selectedCategory, name);
            const previewUrl = getPreviewUrl(selectedCategory, name);

            return (
              <div
                key={`${selectedCategory}-${name}`}
                className={`flex items-center gap-4 p-4 bg-gray-900/50 rounded-lg ${
                  hasChangeFlag ? 'border-2 border-destiny-primary' : 'border border-gray-700'
                }`}
              >
                {/* Current Icon */}
                <div className="flex-shrink-0">
                  <div className="text-xs text-gray-400 mb-1">Current</div>
                  <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700">
                    <Icon category={selectedCategory} name={name} size={48} alt={name} />
                  </div>
                </div>

                {/* Arrow */}
                {hasChangeFlag && (
                  <>
                    <div className="flex-shrink-0 text-2xl text-destiny-primary">→</div>
                    
                    {/* New Icon Preview */}
                    <div className="flex-shrink-0">
                      <div className="text-xs text-gray-400 mb-1">New</div>
                      <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center border-2 border-destiny-primary">
                        <img
                          src={previewUrl}
                          alt={`New ${name}`}
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium mb-1 truncate">{name}</h3>
                  <p className="text-sm text-gray-400 truncate">
                    {iconPath}
                  </p>
                  {hasChangeFlag && (
                    <p className="text-xs text-destiny-primary mt-1">
                      Ready to upload
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex-shrink-0 flex gap-2">
                  <input
                    ref={el => {
                      fileInputRefs.current[`${selectedCategory}-${name}`] = el;
                    }}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(selectedCategory, name, iconPath, e)}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRefs.current[`${selectedCategory}-${name}`]?.click()}
                    className="px-4 py-2 bg-destiny-primary hover:bg-destiny-primary/80 text-black font-medium rounded-lg transition-colors"
                  >
                    {hasChangeFlag ? 'Change' : 'Upload'}
                  </button>
                  {hasChangeFlag && (
                    <button
                      onClick={() => removeChange(selectedCategory, name)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Save Button */}
      {iconChanges.length > 0 && (
        <div className="mt-8 flex items-center justify-center">
          <button
            onClick={handleSaveChanges}
            disabled={isProcessing}
            className="px-8 py-4 bg-destiny-primary hover:bg-destiny-primary/80 text-black font-bold text-lg rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Creating PR...' : `Save Changes (${iconChanges.length})`}
          </button>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-3">How to Update Icons</h3>
        <div className="text-gray-400 space-y-2 text-sm">
          <p><strong className="text-white">Step 1:</strong> Select a category from the buttons above</p>
          <p><strong className="text-white">Step 2:</strong> Click "Upload" next to any icon you want to replace</p>
          <p><strong className="text-white">Step 3:</strong> Select a new image file</p>
          <ul className="ml-6 list-disc space-y-1">
            <li><strong>Recommended dimensions:</strong> 96x96 pixels</li>
            <li><strong>Accepted formats:</strong> All common image formats (PNG recommended)</li>
            <li><strong>Maximum file size:</strong> 2MB</li>
          </ul>
          <p><strong className="text-white">Step 4:</strong> Review your changes (icons with pending changes are highlighted)</p>
          <p><strong className="text-white">Step 5:</strong> Click "Save Changes" to automatically create a PR</p>
          
          <div className="mt-4 p-4 bg-destiny-primary/10 border border-destiny-primary rounded-lg">
            <p className="text-destiny-primary font-semibold mb-2">✨ Automated Workflow (Recommended)</p>
            <ol className="list-decimal ml-5 space-y-1">
              <li>Click "Save Changes" - GitHub Actions will automatically process your icons</li>
              <li>A new branch will be created with your changes</li>
              <li>A Pull Request will be opened automatically</li>
              <li>Go to GitHub → Pull Requests → Review and merge!</li>
            </ol>
            <div className="mt-3 p-2 bg-gray-900/50 rounded text-xs">
              <p className="text-yellow-400 font-semibold mb-1">First time setup:</p>
              <p>1. Create a GitHub Personal Access Token: <a href="https://github.com/settings/tokens/new" target="_blank" rel="noopener" className="text-destiny-primary underline">Create Token</a></p>
              <p>2. Scope required: <code className="bg-gray-800 px-1 rounded">repo</code></p>
              <p>3. Store it in browser console:</p>
              <p className="mt-1"><code className="bg-gray-800 px-1 rounded">localStorage.setItem('github_token', 'your-token-here')</code></p>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-gray-900/50 border border-gray-600 rounded-lg">
            <p className="text-gray-300 font-semibold mb-2">📥 Fallback Method:</p>
            <p>If automated workflow is not configured, a JSON file will be downloaded.</p>
            <ol className="list-decimal ml-5 space-y-1 mt-2">
              <li>Run: <code className="bg-gray-900 px-2 py-0.5 rounded">node scripts/update-icons.js &lt;downloaded-file&gt;</code></li>
              <li>The script will create a new branch and commit your changes</li>
              <li>Create a Pull Request on GitHub manually</li>
            </ol>
          </div>
          
          <div className="mt-4 p-4 bg-gray-900/50 border border-gray-600 rounded-lg">
            <p className="text-gray-300 font-semibold mb-2">🛠️ Manual Alternative:</p>
            <p>Place your new icons directly in <code className="bg-gray-900 px-1 rounded">public/icons/{`{category}/{name}.png`}</code></p>
            <p className="text-xs text-gray-500 mt-1">This bypasses the workflow but requires direct repository access</p>
          </div>
        </div>
      </div>

      {/* Token Modal */}
      <TokenModal
        isOpen={isTokenModalOpen}
        onClose={() => setIsTokenModalOpen(false)}
        onSave={validateToken}
      />
    </div>
  );
}
