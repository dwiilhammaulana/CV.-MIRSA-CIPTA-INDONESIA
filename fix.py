import os

dir_path = '.'
html_files = [f for f in os.listdir(dir_path) if f.endswith('.html')]

replacements = {
    'AREA WORK SHOP.PNG': 'AREA  WORK SHOP.png',
    'AREA PRODUKSI.PNG': 'AREA PRODUKSI.png',
    'MESIN BUBUT 600 x 2000.PNG': 'MESIN BUBUT 600 x 2000.png',
    'CNC.PNG': 'CNC.png',
    'MESIN INJECTION 550 T.PNG': 'MESIN INJECTION  550 T.png',
    'MESIN INJECTION 150 T.PNG': 'MESIN INJECTION  150 T.png',
    'MESIN MILLING dengan DRO.PNG': 'MESIN MILLING dengan DRO.png',
    'PLUNGER.TIP.PNG': 'PLUNGER.TIP.png',
    'produk yang dihasilkan 4 (Sprocket).PNG': 'produk yang dihasilkan 4 (Sprocket).png',
    'UNIT DELIVERY.PNG': 'UNIT DELIVERY.png',
    'MESIN PRES HYDRAULIC.PNG': 'MESIN PRES HYDRAULIC.png',
    'MESIN HONING.png': 'MESIN HONING.png',
    'MESIN HONING.PNG': 'MESIN HONING.png',
    'MESIN BUBUT 600 x 1500 over bed.PNG': 'MESIN BUBUT 600 x 1500 over bed.png',
    'MICROMETER.PNG': 'MICROMETER.png',
    'logo.PNG': 'logo.png'
}

for file in html_files:
    try:
        with open(file, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        for wrong, right in replacements.items():
            content = content.replace(wrong, right)
            
        if file == 'tentang.html':
            content = content.replace('assets/images/AREA  WORK SHOP.png" alt="CV Mirsa Cipta Indonesia"', 'https://images.unsplash.com/photo-1565158673322-6e212b32524a?auto=format&fit=crop&q=80&w=800" alt="CV Mirsa Cipta Indonesia"')
            content = content.replace('assets/images/AREA  WORK SHOP.png" alt="Workshop"', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600" alt="Workshop"')

        if 'Injection Molding' in content:
            content = content.replace('assets/images/MESIN INJECTION  150 T.png" alt="Injection Molding"', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800" alt="Injection Molding"')

        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
            
        print(f"Fixed {file}")
    except Exception as e:
        print(f"Failed to process {file}: {e}")

print("All done!")
