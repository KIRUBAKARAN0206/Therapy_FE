import os
from pathlib import Path
from PIL import Image

assets_dir = Path(r"g:/Therapy/Therapy_FE/src/assets")

def generate_webp(src_path: Path):
    webp_path = src_path.with_suffix('.webp')
    if webp_path.exists():
        print(f"Skipping {src_path.name}, webp already exists.")
        return
    try:
        print(f"Converting {src_path.name} to WebP...")
        img = Image.open(src_path)
        img.save(webp_path, 'WEBP', quality=85, method=6)
    except Exception as e:
        print(f"Failed to convert {src_path.name}: {e}")

if __name__ == "__main__":
    for ext in ['.png', '.jpg', '.jpeg']:
        for file_path in assets_dir.rglob(f'*{ext}'):
            generate_webp(file_path)

    placeholder = assets_dir / 'placeholder.webp'
    if not placeholder.exists():
        img = Image.new('RGBA', (1, 1), (0, 0, 0, 0))
        img.save(placeholder, 'WEBP')
    print("Done generating WebP assets.")
