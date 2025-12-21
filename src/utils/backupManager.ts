import localforage from 'localforage';
import type { Build } from '../types';

/**
 * Export all builds to a JSON file for backup
 */
export async function downloadBuildsBackup(): Promise<void> {
  try {
    const keys = await localforage.keys();
    const buildKeys = keys.filter(key => key.startsWith('build_'));
    const builds: Build[] = [];
    
    for (const key of buildKeys) {
      const build = await localforage.getItem<Build>(key);
      if (build) {
        builds.push(build);
      }
    }
    
    if (builds.length === 0) {
      alert('No builds found to backup.');
      return;
    }
    
    const backupData = {
      version: '1.0.0-EdgeOfFate',
      exportDate: new Date().toISOString(),
      buildsCount: builds.length,
      builds,
    };
    
    const json = JSON.stringify(backupData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `d2-builds-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    
    alert(`Successfully exported ${builds.length} build(s) to backup file.`);
  } catch (error) {
    console.error('Error creating backup:', error);
    alert('Error creating backup. Please try again.');
  }
}

/**
 * Import builds from a JSON backup file
 */
export async function restoreBuildsFromBackup(file: File): Promise<{ success: number; failed: number; skipped: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const json = e.target?.result as string;
        const backupData = JSON.parse(json);
        
        if (!backupData.builds || !Array.isArray(backupData.builds)) {
          alert('Invalid backup file format.');
          reject(new Error('Invalid backup file'));
          return;
        }
        
        let success = 0;
        let failed = 0;
        let skipped = 0;
        
        for (const build of backupData.builds) {
          try {
            // Check if build already exists
            const existingBuild = await localforage.getItem<Build>(`build_${build.id}`);
            
            if (existingBuild) {
              const shouldOverwrite = confirm(
                `Build "${build.name}" already exists. Overwrite it?\n\nClick OK to overwrite, Cancel to skip.`
              );
              
              if (!shouldOverwrite) {
                skipped++;
                continue;
              }
            }
            
            // Update timestamps
            const buildToSave = {
              ...build,
              timestamps: {
                created: build.timestamps?.created || new Date().toISOString(),
                updated: new Date().toISOString(),
              },
            };
            
            await localforage.setItem(`build_${build.id}`, buildToSave);
            success++;
          } catch (error) {
            console.error(`Error restoring build ${build.id}:`, error);
            failed++;
          }
        }
        
        resolve({ success, failed, skipped });
      } catch (error) {
        console.error('Error parsing backup file:', error);
        alert('Error reading backup file. Please ensure it is a valid D2 Guardian Forge backup.');
        reject(error);
      }
    };
    
    reader.onerror = () => {
      alert('Error reading file.');
      reject(new Error('File read error'));
    };
    
    reader.readAsText(file);
  });
}
