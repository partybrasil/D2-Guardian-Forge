#!/usr/bin/env python3
"""
D2-Guardian-Forge Icon Manifest Updater
Downloads and updates icon assets from data.destinysets.com CDN
Maintains 100% offline-first architecture with local caching
"""

import os
import sys
import json
import time
import hashlib
from pathlib import Path
from urllib.request import urlretrieve, Request, urlopen
from urllib.error import HTTPError, URLError

# Configuration
BASE_URL = "https://data.destinysets.com/assets/400/{}.png"
SCRIPT_DIR = Path(__file__).parent.absolute()
PROJECT_ROOT = SCRIPT_DIR.parent
ICONS_DIR = PROJECT_ROOT / "public" / "icons"
MANIFEST_PATH = PROJECT_ROOT / "src" / "data" / "icons.json"
DOWNLOAD_LOG = ICONS_DIR / ".download_log.json"

# Colors for terminal output
class Colors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'

def print_header(msg):
    print(f"{Colors.HEADER}{Colors.BOLD}{'='*60}{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}{msg.center(60)}{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}{'='*60}{Colors.ENDC}")

def print_success(msg):
    print(f"{Colors.OKGREEN}✅ {msg}{Colors.ENDC}")

def print_info(msg):
    print(f"{Colors.OKCYAN}ℹ️  {msg}{Colors.ENDC}")

def print_warning(msg):
    print(f"{Colors.WARNING}⚠️  {msg}{Colors.ENDC}")

def print_error(msg):
    print(f"{Colors.FAIL}❌ {msg}{Colors.ENDC}")

def load_manifest():
    """Load the icons manifest from JSON"""
    try:
        with open(MANIFEST_PATH, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print_error(f"Manifest not found at {MANIFEST_PATH}")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print_error(f"Invalid JSON in manifest: {e}")
        sys.exit(1)

def load_download_log():
    """Load the download log to track previously downloaded icons"""
    if DOWNLOAD_LOG.exists():
        try:
            with open(DOWNLOAD_LOG, 'r', encoding='utf-8') as f:
                return json.load(f)
        except:
            return {}
    return {}

def save_download_log(log):
    """Save the download log"""
    with open(DOWNLOAD_LOG, 'w', encoding='utf-8') as f:
        json.dump(log, f, indent=2)

def get_file_hash(filepath):
    """Calculate MD5 hash of a file"""
    if not filepath.exists():
        return None
    md5 = hashlib.md5()
    with open(filepath, 'rb') as f:
        for chunk in iter(lambda: f.read(4096), b''):
            md5.update(chunk)
    return md5.hexdigest()

def download_icon(icon_hash, filepath, retry=3):
    """Download a single icon with retry logic"""
    url = BASE_URL.format(icon_hash)
    
    for attempt in range(retry):
        try:
            # Add user agent to avoid potential blocking
            req = Request(url, headers={'User-Agent': 'D2-Guardian-Forge/1.0'})
            response = urlopen(req, timeout=10)
            
            # Read and save the image
            with open(filepath, 'wb') as f:
                f.write(response.read())
            
            return True
            
        except HTTPError as e:
            if e.code == 404:
                print_warning(f"Icon {icon_hash} not found (404) - skipping")
                return False
            elif attempt < retry - 1:
                print_warning(f"HTTP error {e.code} for {icon_hash}, retrying...")
                time.sleep(1)
            else:
                print_error(f"Failed to download {icon_hash} after {retry} attempts: {e}")
                return False
                
        except URLError as e:
            if attempt < retry - 1:
                print_warning(f"Network error for {icon_hash}, retrying...")
                time.sleep(1)
            else:
                print_error(f"Network error for {icon_hash}: {e}")
                return False
                
        except Exception as e:
            print_error(f"Unexpected error downloading {icon_hash}: {e}")
            return False
    
    return False

def collect_all_hashes(manifest):
    """Collect all unique hashes from the manifest"""
    hashes = set()
    
    for category, items in manifest.items():
        if isinstance(items, dict):
            for name, hash_value in items.items():
                if isinstance(hash_value, int):
                    hashes.add(hash_value)
    
    return sorted(hashes)

def main():
    """Main execution function"""
    print_header("D2-Guardian-Forge Icon Manifest Updater")
    
    # Ensure icons directory exists
    ICONS_DIR.mkdir(parents=True, exist_ok=True)
    print_info(f"Icons directory: {ICONS_DIR}")
    
    # Load manifest
    print_info("Loading icon manifest...")
    manifest = load_manifest()
    
    # Collect all hashes
    all_hashes = collect_all_hashes(manifest)
    print_success(f"Found {len(all_hashes)} unique icon hashes in manifest")
    
    # Load download log
    download_log = load_download_log()
    
    # Track statistics
    stats = {
        'total': len(all_hashes),
        'downloaded': 0,
        'skipped': 0,
        'failed': 0,
        'updated': 0
    }
    
    print_info("Starting icon download process...")
    print()
    
    # Download icons
    for idx, icon_hash in enumerate(all_hashes, 1):
        filepath = ICONS_DIR / f"{icon_hash}.png"
        
        # Check if file exists and hasn't changed
        if filepath.exists():
            file_hash = get_file_hash(filepath)
            if str(icon_hash) in download_log and download_log[str(icon_hash)] == file_hash:
                stats['skipped'] += 1
                if idx % 10 == 0 or idx == 1:
                    print(f"[{idx}/{stats['total']}] Skipping {icon_hash} (already downloaded)")
                continue
        
        # Download the icon
        print(f"[{idx}/{stats['total']}] Downloading {icon_hash}...", end=' ')
        
        if download_icon(icon_hash, filepath):
            file_hash = get_file_hash(filepath)
            download_log[str(icon_hash)] = file_hash
            
            if filepath.exists():
                stats['downloaded'] += 1
                if str(icon_hash) in download_log:
                    stats['updated'] += 1
                print_success("Done")
            else:
                stats['failed'] += 1
                print_error("Failed")
        else:
            stats['failed'] += 1
        
        # Small delay to be respectful to the server
        if idx < stats['total']:
            time.sleep(0.1)
    
    # Save download log
    save_download_log(download_log)
    
    # Download default fallback icon
    default_hash = manifest.get('default', 1458010785)
    default_path = ICONS_DIR / "default.png"
    if not default_path.exists():
        print_info("Downloading default fallback icon...")
        download_icon(default_hash, default_path)
    
    # Print summary
    print()
    print_header("Download Summary")
    print(f"Total icons in manifest: {stats['total']}")
    print_success(f"Successfully downloaded: {stats['downloaded']}")
    print_info(f"Skipped (unchanged): {stats['skipped']}")
    if stats['failed'] > 0:
        print_warning(f"Failed downloads: {stats['failed']}")
    else:
        print_success("No failures!")
    
    print()
    print_success("Icon manifest update complete! 🚀")
    print_info(f"Icons stored in: {ICONS_DIR}")
    
    # Exit with error code if there were failures
    if stats['failed'] > stats['total'] * 0.1:  # More than 10% failed
        print_warning("Warning: More than 10% of downloads failed")
        sys.exit(1)
    
    sys.exit(0)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print()
        print_warning("Download interrupted by user")
        sys.exit(1)
    except Exception as e:
        print_error(f"Unexpected error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
