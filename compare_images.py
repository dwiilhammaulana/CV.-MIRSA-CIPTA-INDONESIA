import os
import re

html_dir = '.'
css_dir = './assets/css'
img_dir = './assets/images'

# 1. Get actual images
actual_images = set(os.listdir(img_dir))

# 2. Extract referenced images
referenced_images = set()

# Regex to find anything that looks like an image path
img_pattern = re.compile(r'assets/images/([^\"\'\)]+)')

def scan_files(directory, ext):
    if not os.path.exists(directory): return
    for f in os.listdir(directory):
        if f.endswith(ext):
            with open(os.path.join(directory, f), 'r', encoding='utf-8', errors='ignore') as file:
                content = file.read()
                matches = img_pattern.findall(content)
                for m in matches:
                    referenced_images.add(m.strip())

scan_files(html_dir, '.html')
scan_files(css_dir, '.css')

# 3. Compare
print("--- ACTUAL FILES IN FOLDER ---")
for img in sorted(actual_images):
    print(img)

print("\n--- REFERENCED IN HTML/CSS ---")
for img in sorted(referenced_images):
    print(img)

print("\n--- BROKEN REFERENCES (in HTML but NOT in folder) ---")
broken = []
for ref in sorted(referenced_images):
    if ref not in actual_images:
        broken.append(ref)
        print(f"❌ {ref}")

print("\n--- UNUSED IMAGES (in folder but NOT in HTML/CSS) ---")
for img in sorted(actual_images):
    if img not in referenced_images:
        print(f"⚠️ {img}")
