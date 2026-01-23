# PowerShell script to replace purple colors with red
$files = @(
    "app/page.tsx",
    "app/admin/login/page.tsx",
    "app/admin/dashboard/page.tsx",
    "app/admin/orders/page.tsx",
    "app/admin/keys/page.tsx",
    "app/admin/coupons/page.tsx",
    "app/admin/products/page.tsx",
    "app/admin/layout.tsx",
    "app/success/page.tsx",
    "app/status/page.tsx",
    "app/guides/page.tsx",
    "app/instructions/page.tsx",
    "app/reviews/page.tsx",
    "app/faq/page.tsx",
    "components/site-header.tsx",
    "components/checkout-modal.tsx"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Processing $file..."
        $content = Get-Content $file -Encoding UTF8 | Out-String
        
        # Replace purple with red
        $content = $content -replace 'purple-600','red-600'
        $content = $content -replace 'purple-500','red-500'
        $content = $content -replace 'purple-400','red-400'
        $content = $content -replace 'purple-300','red-300'
        $content = $content -replace 'purple-200','red-200'
        
        # Replace violet with red
        $content = $content -replace 'violet-600','red-700'
        $content = $content -replace 'violet-500','red-600'
        $content = $content -replace 'violet-400','red-500'
        
        # Save back
        $content | Set-Content $file -Encoding UTF8 -NoNewline
        Write-Host "✓ Updated $file"
    }
}

Write-Host "`nAll files updated successfully!"
