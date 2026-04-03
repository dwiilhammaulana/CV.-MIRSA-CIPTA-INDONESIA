# Rename the file
Rename-Item -Path "assets\css\style.css" -NewName "style_v2.css"

# Update HTML files
$files = Get-ChildItem -Filter *.html
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    # Replace style.css with style_v2.css
    $content = $content -replace 'href="assets/css/style.css(\?v=\d+)?"', 'href="assets/css/style_v2.css"'
    $content | Set-Content -Path $file.FullName -NoNewline -Encoding UTF8
}
Write-Output "Style renamed to style_v2.css and HTML files updated!"
