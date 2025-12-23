#!/usr/bin/env python3
"""
Create Destiny 2-style icons for classes and subclasses
Uses SVG paths to create recognizable Destiny 2 symbols
"""

import json
import os
from PIL import Image, ImageDraw
import math

# Paths
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
ICONS_DIR = os.path.join(PROJECT_ROOT, 'public', 'icons')
ICONS_JSON = os.path.join(PROJECT_ROOT, 'src', 'data', 'icons.json')

# Icon settings
ICON_SIZE = 96
BACKGROUND_COLOR = (10, 14, 39)  # #0a0e27 - Destiny dark blue

# Destiny 2 colors
COLORS = {
    'solar': (255, 102, 0),      # #ff6600 - Orange/Red
    'arc': (51, 196, 255),       # #33c4ff - Light Blue
    'void': (125, 79, 255),      # #7d4fff - Purple
    'stasis': (51, 204, 255),    # #33ccff - Cyan
    'strand': (0, 255, 136),     # #00ff88 - Green
    'prismatic': (212, 175, 55), # #d4af37 - Gold
    'class': (247, 147, 30),     # #f7931e - Orange
}

def draw_warlock_symbol(draw, center_x, center_y, size, color):
    """Draw Warlock class symbol (circle with vertical lines)"""
    radius = size // 2
    
    # Draw outer circle
    draw.ellipse([center_x - radius, center_y - radius, 
                  center_x + radius, center_y + radius], 
                 outline=color, width=4)
    
    # Draw vertical line in center
    draw.line([(center_x, center_y - radius + 10), 
               (center_x, center_y + radius - 10)], 
              fill=color, width=4)
    
    # Draw two smaller circles
    circle_r = radius // 4
    draw.ellipse([center_x - circle_r, center_y - radius // 2 - circle_r,
                  center_x + circle_r, center_y - radius // 2 + circle_r],
                 outline=color, width=3)
    draw.ellipse([center_x - circle_r, center_y + radius // 2 - circle_r,
                  center_x + circle_r, center_y + radius // 2 + circle_r],
                 outline=color, width=3)

def draw_titan_symbol(draw, center_x, center_y, size, color):
    """Draw Titan class symbol (shield/crest shape)"""
    radius = size // 2
    
    # Draw shield outline points
    points = [
        (center_x, center_y - radius),  # Top
        (center_x + radius - 10, center_y - radius // 2),  # Top right
        (center_x + radius - 10, center_y + radius // 2),  # Bottom right
        (center_x, center_y + radius),  # Bottom point
        (center_x - radius + 10, center_y + radius // 2),  # Bottom left
        (center_x - radius + 10, center_y - radius // 2),  # Top left
    ]
    draw.polygon(points, outline=color, width=4)
    
    # Draw horizontal bar
    bar_y = center_y - radius // 4
    draw.line([(center_x - radius + 15, bar_y), 
               (center_x + radius - 15, bar_y)], 
              fill=color, width=4)

def draw_hunter_symbol(draw, center_x, center_y, size, color):
    """Draw Hunter class symbol (snake/blade shape)"""
    radius = size // 2
    
    # Draw diamond/snake shape
    points = [
        (center_x, center_y - radius),  # Top
        (center_x + radius // 2, center_y),  # Right
        (center_x, center_y + radius),  # Bottom
        (center_x - radius // 2, center_y),  # Left
    ]
    draw.polygon(points, outline=color, width=4)
    
    # Draw inner diamond
    inner_size = radius // 2
    points_inner = [
        (center_x, center_y - inner_size),
        (center_x + inner_size // 2, center_y),
        (center_x, center_y + inner_size),
        (center_x - inner_size // 2, center_y),
    ]
    draw.polygon(points_inner, outline=color, width=3)
    
    # Draw top line accent
    draw.line([(center_x - radius // 3, center_y - radius // 2),
               (center_x + radius // 3, center_y - radius // 2)],
              fill=color, width=3)

def draw_element_symbol(draw, center_x, center_y, size, element_type, color):
    """Draw subclass element symbol"""
    radius = size // 2
    
    if element_type == 'solar':
        # Draw sun with rays
        # Center circle
        draw.ellipse([center_x - radius // 3, center_y - radius // 3,
                     center_x + radius // 3, center_y + radius // 3],
                    fill=color)
        # Rays
        for angle in range(0, 360, 45):
            rad = math.radians(angle)
            x1 = center_x + math.cos(rad) * (radius // 2)
            y1 = center_y + math.sin(rad) * (radius // 2)
            x2 = center_x + math.cos(rad) * radius
            y2 = center_y + math.sin(rad) * radius
            draw.line([(x1, y1), (x2, y2)], fill=color, width=4)
    
    elif element_type == 'arc':
        # Draw lightning bolt
        points = [
            (center_x + radius // 4, center_y - radius),
            (center_x - radius // 4, center_y - radius // 6),
            (center_x + radius // 6, center_y - radius // 6),
            (center_x - radius // 3, center_y + radius),
            (center_x + radius // 6, center_y + radius // 6),
            (center_x - radius // 6, center_y + radius // 6),
        ]
        draw.polygon(points, fill=color)
    
    elif element_type == 'void':
        # Draw crescent/void shape
        # Large circle
        draw.ellipse([center_x - radius, center_y - radius,
                     center_x + radius, center_y + radius],
                    outline=color, width=4)
        # Inner circles creating void effect
        for i in range(3):
            r = radius - (i + 1) * (radius // 4)
            draw.ellipse([center_x - r, center_y - r,
                         center_x + r, center_y + r],
                        outline=color, width=2)
    
    elif element_type == 'stasis':
        # Draw snowflake/crystal
        # Center
        draw.ellipse([center_x - 5, center_y - 5,
                     center_x + 5, center_y + 5],
                    fill=color)
        # Six arms
        for angle in range(0, 360, 60):
            rad = math.radians(angle)
            x = center_x + math.cos(rad) * radius
            y = center_y + math.sin(rad) * radius
            draw.line([(center_x, center_y), (x, y)], fill=color, width=4)
            # Side branches
            branch_len = radius // 3
            for branch_angle in [-30, 30]:
                brad = math.radians(angle + branch_angle)
                bx1 = center_x + math.cos(rad) * radius * 0.6
                by1 = center_y + math.sin(rad) * radius * 0.6
                bx2 = bx1 + math.cos(brad) * branch_len
                by2 = by1 + math.sin(brad) * branch_len
                draw.line([(bx1, by1), (bx2, by2)], fill=color, width=3)
    
    elif element_type == 'strand':
        # Draw thread/weave pattern
        # Vertical waves
        points = []
        for i in range(8):
            x = center_x - radius // 2 + i * (radius // 4)
            y_offset = (radius // 2) * math.sin(i * math.pi / 2)
            points.append((x, center_y + y_offset))
        for i in range(len(points) - 1):
            draw.line([points[i], points[i + 1]], fill=color, width=4)
        
        # Horizontal threads
        for y_pos in [-radius // 2, 0, radius // 2]:
            draw.line([(center_x - radius, center_y + y_pos),
                      (center_x + radius, center_y + y_pos)],
                     fill=color, width=2)
    
    elif element_type == 'prismatic':
        # Draw prism/diamond with rainbow effect
        # Outer diamond
        points = [
            (center_x, center_y - radius),
            (center_x + radius * 0.7, center_y),
            (center_x, center_y + radius),
            (center_x - radius * 0.7, center_y),
        ]
        draw.polygon(points, outline=color, width=4)
        
        # Inner geometric pattern
        inner_radius = radius // 2
        points_inner = [
            (center_x, center_y - inner_radius),
            (center_x + inner_radius * 0.7, center_y),
            (center_x, center_y + inner_radius),
            (center_x - inner_radius * 0.7, center_y),
        ]
        draw.polygon(points_inner, outline=color, width=3)
        
        # Center star
        star_size = 8
        for angle in range(0, 360, 90):
            rad = math.radians(angle)
            x = center_x + math.cos(rad) * star_size
            y = center_y + math.sin(rad) * star_size
            draw.line([(center_x, center_y), (x, y)], fill=color, width=3)

def create_class_icon(icon_hash, class_name):
    """Create a class icon"""
    img = Image.new('RGB', (ICON_SIZE, ICON_SIZE), BACKGROUND_COLOR)
    draw = ImageDraw.Draw(img)
    
    center_x = ICON_SIZE // 2
    center_y = ICON_SIZE // 2
    size = ICON_SIZE - 20
    color = COLORS['class']
    
    if class_name == 'Warlock':
        draw_warlock_symbol(draw, center_x, center_y, size, color)
    elif class_name == 'Titan':
        draw_titan_symbol(draw, center_x, center_y, size, color)
    elif class_name == 'Hunter':
        draw_hunter_symbol(draw, center_x, center_y, size, color)
    
    return img

def create_subclass_icon(icon_hash, subclass_key):
    """Create a subclass icon"""
    img = Image.new('RGB', (ICON_SIZE, ICON_SIZE), BACKGROUND_COLOR)
    draw = ImageDraw.Draw(img)
    
    center_x = ICON_SIZE // 2
    center_y = ICON_SIZE // 2
    size = ICON_SIZE - 20
    
    # Parse subclass key (e.g., "solar_warlock", "prismatic_titan")
    element = subclass_key.split('_')[0].lower()
    color = COLORS.get(element, COLORS['class'])
    
    draw_element_symbol(draw, center_x, center_y, size, element, color)
    
    return img

def main():
    print("🎨 Creating Destiny 2-style icons...")
    
    # Load icons manifest
    with open(ICONS_JSON, 'r') as f:
        icons_data = json.load(f)
    
    # Ensure icons directory exists
    os.makedirs(ICONS_DIR, exist_ok=True)
    
    created_count = 0
    
    # Create class icons
    print("\n📦 Creating class icons...")
    if 'classes' in icons_data:
        for class_name, icon_hash in icons_data['classes'].items():
            icon_path = os.path.join(ICONS_DIR, f"{icon_hash}.png")
            img = create_class_icon(icon_hash, class_name)
            img.save(icon_path, 'PNG')
            print(f"  ✓ Created {class_name} icon ({icon_hash})")
            created_count += 1
    
    # Create subclass icons
    print("\n🌟 Creating subclass icons...")
    if 'subclasses' in icons_data:
        for subclass_key, icon_hash in icons_data['subclasses'].items():
            icon_path = os.path.join(ICONS_DIR, f"{icon_hash}.png")
            img = create_subclass_icon(icon_hash, subclass_key)
            img.save(icon_path, 'PNG')
            element = subclass_key.split('_')[0]
            class_name = subclass_key.split('_')[1] if '_' in subclass_key else ''
            print(f"  ✓ Created {element} {class_name} icon ({icon_hash})")
            created_count += 1
    
    print(f"\n✅ Successfully created {created_count} Destiny 2-style icons!")
    print(f"   Icons saved to: {ICONS_DIR}")
    
    return 0

if __name__ == '__main__':
    exit(main())
