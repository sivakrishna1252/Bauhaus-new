import os
import glob

PROJECT_ROOT = r"c:\Users\ShivakrishnaDuddukur\OneDrive - Apparatus Solutions\Desktop\Bauhaus\Bahuas"
SRC_DIR = os.path.join(PROJECT_ROOT, "src")
ASSETS_DIR = os.path.join(SRC_DIR, "assets")

# Extensions to look for in assets
IMAGE_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif', '.ico'}

# Extensions to search IN for references
CODE_EXTENSIONS = {'.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.html', '.json'}

def get_all_assets(directory):
    assets = []
    for root, _, files in os.walk(directory):
        for file in files:
            if os.path.splitext(file)[1].lower() in IMAGE_EXTENSIONS:
                assets.append(os.path.join(root, file))
    return assets

def get_all_code_content(directory):
    content = ""
    for root, _, files in os.walk(directory):
        for file in files:
            if os.path.splitext(file)[1].lower() in CODE_EXTENSIONS:
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                        content += f.read() + "\n"
                except Exception as e:
                    print(f"Error reading {path}: {e}")
    return content

def main():
    print("Scanning for assets...")
    assets = get_all_assets(ASSETS_DIR)
    print(f"Found {len(assets)} assets.")

    print("Reading code content...")
    code_content = get_all_code_content(SRC_DIR)
    
    unused_assets = []
    for asset in assets:
        filename = os.path.basename(asset)
        # Check if basename exists in code content
        # This is a simple heuristic; strictly speaking, one could have 'image.png' referenced as 'image' but usually extensions are present in imports
        # or at least the filename part.
        if filename not in code_content:
            unused_assets.append(asset)

    print(f"Found {len(unused_assets)} unused assets.")
    
    if len(unused_assets) > 0:
        print("Unused assets:")
        for asset in unused_assets:
            print(f"DELETE: {asset}")
            try:
                os.remove(asset)
                print(f"Deleted {asset}")
            except Exception as e:
                print(f"Failed to delete {asset}: {e}")

if __name__ == "__main__":
    main()
