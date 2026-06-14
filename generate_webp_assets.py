import os
from pathlib import Path
from PIL import Image

assets_dir = Path(r"g:/Kiruba's Work/src/assets")

def generate_webp(src_path: Path):
    webp_path = src_path.with_suffix('.webp')
    if webp_path.exists():
        return
    try:
        img = Image.open(src_path)
        img.save(webp_path, 'WEBP', quality=90)
    except Exception as e:
        # Silent fail to avoid encoding issues
        pass

# Process PNG, JPG, JPEG files
for ext in ['.png', '.jpg', '.jpeg']:
    for file_path in assets_dir.rglob(f'*{ext}'):
        generate_webp(file_path)

# Ensure placeholder.webp exists
placeholder = assets_dir / 'placeholder.webp'
if not placeholder.exists():
    img = Image.new('RGBA', (1, 1), (0, 0, 0, 0))
    img.save(placeholder, 'WEBP')
