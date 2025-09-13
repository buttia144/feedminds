# PowerShell script to remove Tailwind CDN reference from all HTML files

$htmlFiles = Get-ChildItem -Path "$PSScriptRoot\.." -Filter "*.html" -Recurse

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    $updatedContent = $content -replace '<script src="https://cdn.tailwindcss.com"></script>', ''
    
    if ($content -ne $updatedContent) {
        Set-Content -Path $file.FullName -Value $updatedContent
        Write-Host "Removed Tailwind CDN reference from $($file.FullName)"
    }
}

Write-Host "Completed removing Tailwind CDN references from all HTML files."