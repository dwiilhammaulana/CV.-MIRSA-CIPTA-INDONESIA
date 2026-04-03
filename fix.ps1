$files = Get-ChildItem -Filter *.html
foreach ($file in $files) {
    # Read raw content to avoid weird line ending issues
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    $content = $content -replace 'AREA WORK SHOP\.PNG', 'AREA  WORK SHOP.png'
    $content = $content -replace 'AREA PRODUKSI\.PNG', 'AREA PRODUKSI.png'
    $content = $content -replace 'MESIN BUBUT 600 x 2000\.PNG', 'MESIN BUBUT 600 x 2000.png'
    $content = $content -replace 'CNC\.PNG', 'CNC.png'
    $content = $content -replace 'MESIN INJECTION 550 T\.PNG', 'MESIN INJECTION  550 T.png'
    $content = $content -replace 'MESIN INJECTION 150 T\.PNG', 'MESIN INJECTION  150 T.png'
    $content = $content -replace 'MESIN MILLING dengan DRO\.PNG', 'MESIN MILLING dengan DRO.png'
    $content = $content -replace 'PLUNGER\.TIP\.PNG', 'PLUNGER.TIP.png'
    $content = $content -replace 'produk yang dihasilkan 4 \(Sprocket\)\.PNG', 'produk yang dihasilkan 4 (Sprocket).png'
    $content = $content -replace 'UNIT DELIVERY\.PNG', 'UNIT DELIVERY.png'
    $content = $content -replace 'MESIN PRES HYDRAULIC\.PNG', 'MESIN PRES HYDRAULIC.png'
    $content = $content -replace 'MESIN HONING\.PNG', 'MESIN HONING.png'
    $content = $content -replace 'MESIN BUBUT 600 x 1500 over bed\.PNG', 'MESIN BUBUT 600 x 1500 over bed.png'
    $content = $content -replace 'MICROMETER\.PNG', 'MICROMETER.png'
    $content = $content -replace 'logo\.PNG', 'logo.png'
    
    # Check specific replacements
    if ($file.Name -eq 'tentang.html') {
        $content = $content -replace 'assets/images/AREA  WORK SHOP\.png" alt="CV Mirsa Cipta Indonesia"', 'https://images.unsplash.com/photo-1565158673322-6e212b32524a?auto=format&fit=crop&q=80&w=800" alt="CV Mirsa Cipta Indonesia"'
        $content = $content -replace 'assets/images/AREA  WORK SHOP\.png" alt="Workshop"', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600" alt="Workshop"'
    }
    
    if ($content -match 'Injection Molding') {
        $content = $content -replace 'assets/images/MESIN INJECTION  150 T\.png" alt="Injection Molding"', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800" alt="Injection Molding"'
    }

    $content | Set-Content -Path $file.FullName -NoNewline -Encoding UTF8
}
Write-Output "Done replacing!"
