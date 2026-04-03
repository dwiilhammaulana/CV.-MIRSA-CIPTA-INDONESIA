$files = Get-ChildItem -Filter *.html
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Replace the stylesheet links to append a version query string to bust browser cache
    $content = $content -replace 'href="assets/css/style.css\??[^"]*"', 'href="assets/css/style.css?v=2.1"'
    $content = $content -replace 'href="assets/css/pages.css\??[^"]*"', 'href="assets/css/pages.css?v=2.1"'

    $content | Set-Content -Path $file.FullName -NoNewline -Encoding UTF8
}
Write-Output "Cache busting applied!"
