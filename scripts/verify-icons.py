#!/usr/bin/env python3
"""
Icon System Verification Script
Tests that all icons in the manifest are properly downloaded and accessible
"""

import os
import json
from pathlib import Path

# Configuration
SCRIPT_DIR = Path(__file__).parent.absolute()
PROJECT_ROOT = SCRIPT_DIR.parent
ICONS_DIR = PROJECT_ROOT / "public" / "icons"
MANIFEST_PATH = PROJECT_ROOT / "src" / "data" / "icons.json"

def load_manifest():
    """Load the icons manifest"""
    with open(MANIFEST_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)

def verify_icons():
    """Verify all icons exist and are valid"""
    print("🔍 Verifying Icon System...")
    print(f"📁 Icons directory: {ICONS_DIR}")
    print(f"📄 Manifest: {MANIFEST_PATH}")
    print()
    
    # Load manifest
    manifest = load_manifest()
    
    # Collect all hashes
    all_hashes = set()
    for category, items in manifest.items():
        if category == 'default':
            all_hashes.add(items)
        elif isinstance(items, dict):
            for name, hash_value in items.items():
                if isinstance(hash_value, int):
                    all_hashes.add(hash_value)
    
    print(f"📊 Total unique hashes in manifest: {len(all_hashes)}")
    
    # Check which icons exist
    existing_icons = []
    missing_icons = []
    
    for icon_hash in sorted(all_hashes):
        icon_path = ICONS_DIR / f"{icon_hash}.png"
        if icon_path.exists():
            existing_icons.append(icon_hash)
        else:
            missing_icons.append(icon_hash)
    
    # Check for default icon
    default_hash = manifest.get('default', 1458010785)
    default_path = ICONS_DIR / "default.png"
    has_default = default_path.exists()
    
    # Print results
    print(f"✅ Existing icons: {len(existing_icons)}")
    print(f"❌ Missing icons: {len(missing_icons)}")
    print(f"{'✅' if has_default else '❌'} Default fallback icon: {default_hash}")
    print()
    
    # Calculate coverage
    coverage = (len(existing_icons) / len(all_hashes)) * 100 if all_hashes else 0
    print(f"📈 Coverage: {coverage:.1f}%")
    print()
    
    # Show missing icons if any
    if missing_icons:
        print("⚠️  Missing icons:")
        for hash_value in missing_icons[:10]:  # Show first 10
            print(f"   - {hash_value}.png")
        if len(missing_icons) > 10:
            print(f"   ... and {len(missing_icons) - 10} more")
        print()
        print("💡 Run 'python3 scripts/Manifest-Update-Run.py' to download missing icons")
    else:
        print("🎉 All icons are present!")
    
    # Check manifest categories
    print()
    print("📋 Manifest Categories:")
    for category in sorted(manifest.keys()):
        if category == 'default':
            print(f"   - {category}: {manifest[category]}")
        else:
            items = manifest[category]
            if isinstance(items, dict):
                print(f"   - {category}: {len(items)} items")
    
    # Size check
    total_size = 0
    for icon_file in ICONS_DIR.glob("*.png"):
        total_size += icon_file.stat().st_size
    
    size_mb = total_size / (1024 * 1024)
    print()
    print(f"💾 Total icon storage: {size_mb:.2f} MB")
    print()
    
    # Return status
    return len(missing_icons) == 0 and has_default

if __name__ == "__main__":
    try:
        success = verify_icons()
        if success:
            print("✅ Icon system verification passed!")
            exit(0)
        else:
            print("⚠️  Icon system has issues - see above")
            exit(1)
    except Exception as e:
        print(f"❌ Error during verification: {e}")
        import traceback
        traceback.print_exc()
        exit(1)
