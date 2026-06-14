import os
from pathlib import Path
from PIL import Image

# Directory containing all image assets (including subfolders)
assets_dir = Path(r"g:/Kiruba's Work/src/assets")

# Ensure placeholder.webp exists (1x1 transparent PNG saved as WebP)
placeholder_path = assets_dir / 'placeholder.webp'
if not placeholder_path.exists():
    img = Image.new('RGBA', (1, 1), (0, 0, 0, 0))
    img.save(placeholder_path, 'WEBP')
    print('Created placeholder.webp')

# Helper to normalize filename
def normalize_name(p: Path) -> Path:
    new_name = p.name.lower().replace(' ', '-')
    return p.with_name(new_name)

# Process all image files (png, jpg, jpeg)
for img_path in assets_dir.rglob('*.*'):
    if img_path.suffix.lower() not in ['.png', '.jpg', '.jpeg']:
        continue
    # Rename if needed
    normalized = normalize_name(img_path)
    if img_path != normalized:
        if not normalized.exists():
            img_path.rename(normalized)
            print(f"Renamed {img_path.name} → {normalized.name}")
        else:
            print(f"Target name {normalized.name} already exists; skipping rename.")
            normalized = img_path  # keep original for conversion
    # Generate WebP if missing
    webp_path = normalized.with_suffix('.webp')
    if not webp_path.exists():
        try:
            img = Image.open(normalized)
            img.save(webp_path, 'WEBP', quality=90)
            print(f"Converted {normalized.name} → {webp_path.name}")
        except Exception as e:
            print(f"Failed to convert {normalized.name}: {e}")
