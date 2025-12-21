#!/usr/bin/env python3
"""
Create placeholder PNG icons for D2-Guardian-Forge
Replaces HTML files with actual PNG images
"""

import json
import os
from PIL import Image, ImageDraw, ImageFont
import hashlib

# Paths
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
ICONS_DIR = os.path.join(PROJECT_ROOT, 'public', 'icons')
ICONS_JSON = os.path.join(PROJECT_ROOT, 'src', 'data', 'icons.json')

# Icon settings
ICON_SIZE = 96
BACKGROUND_COLOR = '#0a0e27'  # Destiny dark blue
ICON_COLORS = {
    'classes': '#f7931e',      # Primary orange
    'subclasses': '#7d4fff',   # Void purple
    'aspects': '#33c4ff',      # Arc blue
    'fragments': '#00ff88',    # Strand green
    'grenades': '#ff6600',     # Solar orange
    'melees': '#33ccff',       # Stasis cyan
    'classAbilities': '#d4af37',  # Prismatic gold
    'supers': '#f7931e',       # Primary
    'exotics': '#ceae33',      # Exotic yellow
    'weapons': '#9d9d9d',      # Gray
    'mods': '#66bb6a',         # Green
    'default': '#888888'       # Gray
}

def hex_to_rgb(hex_color):
    """Convert hex color to RGB tuple"""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def create_placeholder_icon(icon_hash, category='default', label=''):
    """Create a placeholder icon PNG"""
    # Create image
    img = Image.new('RGB', (ICON_SIZE, ICON_SIZE), hex_to_rgb(BACKGROUND_COLOR))
    draw = ImageDraw.Draw(img)
    
    # Get color for category
    color = ICON_COLORS.get(category, ICON_COLORS['default'])
    rgb_color = hex_to_rgb(color)
    
    # Draw a simple shape based on category
    padding = 16
    if category == 'classes':
        # Draw circle
        draw.ellipse([padding, padding, ICON_SIZE-padding, ICON_SIZE-padding], 
                     fill=rgb_color, outline=rgb_color)
    elif category in ['aspects', 'fragments']:
        # Draw diamond
        mid = ICON_SIZE // 2
        points = [(mid, padding), (ICON_SIZE-padding, mid), (mid, ICON_SIZE-padding), (padding, mid)]
        draw.polygon(points, fill=rgb_color, outline=rgb_color)
    elif category in ['grenades', 'melees']:
        # Draw hexagon
        mid = ICON_SIZE // 2
        r = ICON_SIZE // 2 - padding
        points = []
        for i in range(6):
            angle = i * 60
            x = mid + r * 0.866 * (1 if i % 3 == 1 else -1 if i % 3 == 2 else 0.5 if i > 2 else -0.5)
            y = mid + r * (1 if i in [4, 5] else -1 if i in [1, 2] else 0.5 if i == 3 else -0.5)
            points.append((x, y))
        draw.polygon(points, fill=rgb_color, outline=rgb_color)
    else:
        # Draw square
        draw.rectangle([padding, padding, ICON_SIZE-padding, ICON_SIZE-padding], 
                       fill=rgb_color, outline=rgb_color)
    
    # Draw hash text (last 4 digits) in center
    hash_text = str(icon_hash)[-4:]
    try:
        # Try to use a basic font
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 16)
    except:
        font = ImageFont.load_default()
    
    # Get text bounding box
    bbox = draw.textbbox((0, 0), hash_text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    # Draw text in center
    text_x = (ICON_SIZE - text_width) // 2
    text_y = (ICON_SIZE - text_height) // 2
    draw.text((text_x, text_y), hash_text, fill=hex_to_rgb(BACKGROUND_COLOR), font=font)
    
    return img

def main():
    print("🎨 Creating placeholder icons for D2-Guardian-Forge...")
    
    # Load icons manifest
    if not os.path.exists(ICONS_JSON):
        print(f"❌ Icons manifest not found: {ICONS_JSON}")
        return 1
    
    with open(ICONS_JSON, 'r') as f:
        icons_data = json.load(f)
    
    # Ensure icons directory exists
    os.makedirs(ICONS_DIR, exist_ok=True)
    
    # Collect all icon hashes
    icon_hashes = {}
    for category, items in icons_data.items():
        if category == 'default':
            icon_hashes[items] = ('default', 'Default')
            continue
        
        if isinstance(items, dict):
            for name, hash_value in items.items():
                if isinstance(hash_value, int):
                    icon_hashes[hash_value] = (category, name)
    
    print(f"📦 Found {len(icon_hashes)} unique icon hashes")
    
    # Create placeholder icons
    created = 0
    skipped = 0
    
    for icon_hash, (category, name) in icon_hashes.items():
        icon_path = os.path.join(ICONS_DIR, f"{icon_hash}.png")
        
        # Check if file exists and is already a valid PNG
        if os.path.exists(icon_path):
            try:
                with open(icon_path, 'rb') as f:
                    # Check if it's actually a PNG (starts with PNG magic bytes)
                    header = f.read(8)
                    if header[:8] == b'\x89PNG\r\n\x1a\n':
                        skipped += 1
                        continue
            except:
                pass
        
        # Create placeholder icon
        img = create_placeholder_icon(icon_hash, category, name)
        img.save(icon_path, 'PNG')
        created += 1
        
        if created % 50 == 0:
            print(f"  ✓ Created {created} icons...")
    
    print(f"\n✅ Placeholder icon creation complete!")
    print(f"   - Created: {created} new icons")
    print(f"   - Skipped: {skipped} existing valid PNGs")
    print(f"   - Total: {len(icon_hashes)} icons")
    
    # Create default fallback icon
    default_hash = icons_data.get('default', 0)
    if default_hash:
        default_path = os.path.join(ICONS_DIR, 'default.png')
        img = create_placeholder_icon(default_hash, 'default', 'Default')
        img.save(default_path, 'PNG')
        print(f"   - Created default fallback icon")
    
    return 0

if __name__ == '__main__':
    exit(main())
