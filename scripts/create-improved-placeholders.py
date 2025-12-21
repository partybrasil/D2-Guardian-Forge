#!/usr/bin/env python3
"""
Create improved placeholder PNG icons for D2-Guardian-Forge
Creates visually appealing icons without showing hash numbers
"""

import json
import os
from PIL import Image, ImageDraw, ImageFont

# Paths
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
ICONS_DIR = os.path.join(PROJECT_ROOT, 'public', 'icons')
ICONS_JSON = os.path.join(PROJECT_ROOT, 'src', 'data', 'icons.json')

# Icon settings
ICON_SIZE = 96
BACKGROUND_COLOR = '#0a0e27'  # Destiny dark blue

# Category colors and symbols
ICON_DESIGNS = {
    'classes': {
        'color': '#f7931e',
        'symbol': '◆',  # Diamond for guardian classes
        'shape': 'diamond'
    },
    'subclasses': {
        'color': '#7d4fff',
        'symbol': '◇',
        'shape': 'hexagon'
    },
    'aspects': {
        'color': '#33c4ff',
        'symbol': '◈',
        'shape': 'diamond'
    },
    'fragments': {
        'color': '#00ff88',
        'symbol': '◊',
        'shape': 'triangle'
    },
    'grenades': {
        'color': '#ff6600',
        'symbol': '●',
        'shape': 'circle'
    },
    'melees': {
        'color': '#33ccff',
        'symbol': '▲',
        'shape': 'triangle'
    },
    'classAbilities': {
        'color': '#d4af37',
        'symbol': '★',
        'shape': 'star'
    },
    'supers': {
        'color': '#f7931e',
        'symbol': '◆',
        'shape': 'star'
    },
    'exotics': {
        'color': '#ceae33',
        'symbol': '◆',
        'shape': 'hexagon'
    },
    'weapons': {
        'color': '#9d9d9d',
        'symbol': '▬',
        'shape': 'rectangle'
    },
    'mods': {
        'color': '#66bb6a',
        'symbol': '■',
        'shape': 'square'
    },
    'default': {
        'color': '#888888',
        'symbol': '?',
        'shape': 'circle'
    }
}

def hex_to_rgb(hex_color):
    """Convert hex color to RGB tuple"""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def create_gradient_background(size, color1, color2):
    """Create a radial gradient background"""
    img = Image.new('RGB', size, hex_to_rgb(BACKGROUND_COLOR))
    draw = ImageDraw.Draw(img)
    
    center = size[0] // 2
    max_radius = center
    
    # Draw gradient circles from outside to inside
    for r in range(max_radius, 0, -2):
        factor = r / max_radius
        # Interpolate between background and primary color
        grad_color = tuple(int(hex_to_rgb(color1)[i] * factor + hex_to_rgb(BACKGROUND_COLOR)[i] * (1 - factor)) for i in range(3))
        draw.ellipse([center - r, center - r, center + r, center + r], fill=grad_color)
    
    return img

def draw_destiny_symbol(draw, size, design):
    """Draw a Destiny-style symbol"""
    center = size // 2
    color = hex_to_rgb(design['color'])
    shape = design['shape']
    
    if shape == 'diamond':
        # Diamond shape
        padding = 20
        points = [
            (center, padding),
            (size - padding, center),
            (center, size - padding),
            (padding, center)
        ]
        draw.polygon(points, fill=color)
        # Inner smaller diamond for depth
        inner_padding = 30
        inner_points = [
            (center, inner_padding),
            (size - inner_padding, center),
            (center, size - inner_padding),
            (inner_padding, center)
        ]
        draw.polygon(inner_points, fill=hex_to_rgb(BACKGROUND_COLOR))
        
    elif shape == 'hexagon':
        # Hexagon shape
        import math
        radius = 35
        points = []
        for i in range(6):
            angle = math.pi / 3 * i - math.pi / 6
            x = center + radius * math.cos(angle)
            y = center + radius * math.sin(angle)
            points.append((x, y))
        draw.polygon(points, fill=color, outline=color, width=3)
        
        # Inner hexagon
        inner_radius = 25
        inner_points = []
        for i in range(6):
            angle = math.pi / 3 * i - math.pi / 6
            x = center + inner_radius * math.cos(angle)
            y = center + inner_radius * math.sin(angle)
            inner_points.append((x, y))
        draw.polygon(inner_points, fill=hex_to_rgb(BACKGROUND_COLOR))
        
    elif shape == 'circle':
        # Circle with ring
        outer_radius = 35
        inner_radius = 25
        draw.ellipse([center - outer_radius, center - outer_radius, 
                     center + outer_radius, center + outer_radius], 
                    fill=color)
        draw.ellipse([center - inner_radius, center - inner_radius, 
                     center + inner_radius, center + inner_radius], 
                    fill=hex_to_rgb(BACKGROUND_COLOR))
        
    elif shape == 'triangle':
        # Triangle pointing up
        padding = 20
        points = [
            (center, padding),
            (size - padding, size - padding),
            (padding, size - padding)
        ]
        draw.polygon(points, fill=color)
        # Inner triangle
        inner_padding = 32
        inner_points = [
            (center, inner_padding),
            (size - inner_padding, size - inner_padding),
            (inner_padding, size - inner_padding)
        ]
        draw.polygon(inner_points, fill=hex_to_rgb(BACKGROUND_COLOR))
        
    elif shape == 'star':
        # 5-pointed star
        import math
        outer_radius = 35
        inner_radius = 15
        points = []
        for i in range(10):
            angle = math.pi / 5 * i - math.pi / 2
            radius = outer_radius if i % 2 == 0 else inner_radius
            x = center + radius * math.cos(angle)
            y = center + radius * math.sin(angle)
            points.append((x, y))
        draw.polygon(points, fill=color)
        
    elif shape == 'square':
        # Rotated square
        padding = 22
        points = [
            (center, padding),
            (size - padding, center),
            (center, size - padding),
            (padding, center)
        ]
        draw.polygon(points, fill=color)
        inner_padding = 32
        inner_points = [
            (center, inner_padding),
            (size - inner_padding, center),
            (center, size - inner_padding),
            (inner_padding, center)
        ]
        draw.polygon(inner_points, fill=hex_to_rgb(BACKGROUND_COLOR))
        
    else:  # rectangle
        padding = 20
        draw.rectangle([padding, center - 10, size - padding, center + 10], 
                      fill=color)

def create_improved_placeholder(icon_hash, category='default'):
    """Create an improved placeholder icon without hash numbers"""
    design = ICON_DESIGNS.get(category, ICON_DESIGNS['default'])
    
    # Create image with dark background
    img = Image.new('RGB', (ICON_SIZE, ICON_SIZE), hex_to_rgb(BACKGROUND_COLOR))
    draw = ImageDraw.Draw(img)
    
    # Add subtle vignette effect
    for i in range(ICON_SIZE):
        for j in range(ICON_SIZE):
            distance = ((i - ICON_SIZE/2)**2 + (j - ICON_SIZE/2)**2) ** 0.5
            max_distance = (ICON_SIZE * 0.7)
            if distance > max_distance:
                factor = (distance - max_distance) / max_distance
                factor = min(factor * 0.3, 0.5)
                current_color = img.getpixel((j, i))
                new_color = tuple(int(c * (1 - factor)) for c in current_color)
                img.putpixel((j, i), new_color)
    
    draw = ImageDraw.Draw(img)
    
    # Draw the symbol
    draw_destiny_symbol(draw, ICON_SIZE, design)
    
    return img

def load_icons_manifest():
    """Load icons.json manifest"""
    with open(ICONS_JSON, 'r', encoding='utf-8') as f:
        return json.load(f)

def main():
    print("🎨 Creating improved placeholder icons for D2-Guardian-Forge...")
    print(f"📁 Icons directory: {ICONS_DIR}")
    
    # Ensure icons directory exists
    os.makedirs(ICONS_DIR, exist_ok=True)
    
    # Load manifest
    print("📋 Loading icons manifest...")
    manifest = load_icons_manifest()
    
    # Track statistics
    total = 0
    created = 0
    
    # Create icons for each category
    for category, items in manifest.items():
        if category == 'default':
            # Handle default icon
            default_hash = items
            print(f"Creating default icon: {default_hash}")
            img = create_improved_placeholder(default_hash, 'default')
            icon_path = os.path.join(ICONS_DIR, f"{default_hash}.png")
            img.save(icon_path, 'PNG')
            
            # Also save as default.png
            default_path = os.path.join(ICONS_DIR, "default.png")
            img.save(default_path, 'PNG')
            created += 1
            continue
        
        if not isinstance(items, dict):
            continue
        
        print(f"\n📦 Processing {category}... ({len(items)} icons)")
        
        for name, icon_hash in items.items():
            if not isinstance(icon_hash, int):
                continue
            
            total += 1
            icon_path = os.path.join(ICONS_DIR, f"{icon_hash}.png")
            
            # Create the icon
            img = create_improved_placeholder(icon_hash, category)
            img.save(icon_path, 'PNG')
            created += 1
            
            if created % 50 == 0:
                print(f"  ✓ Created {created}/{total} icons...")
    
    print(f"\n✨ Complete!")
    print(f"📊 Statistics:")
    print(f"   Total icons created: {created}")
    print(f"   Icons directory: {ICONS_DIR}")
    print(f"\n✅ All placeholder icons have been updated!")
    print(f"   Icons now display category-appropriate symbols instead of hash numbers")

if __name__ == "__main__":
    main()
