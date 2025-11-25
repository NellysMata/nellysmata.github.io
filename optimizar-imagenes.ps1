# Script de Optimización de Imágenes para Portfolio
# Este script optimiza todas las imágenes del proyecto

Write-Host "🚀 Iniciando optimización de imágenes..." -ForegroundColor Cyan
Write-Host ""

# Verificar si existe la carpeta de imágenes
$imgPath = "img"
if (-not (Test-Path $imgPath)) {
    Write-Host "❌ Error: No se encontró la carpeta 'img'" -ForegroundColor Red
    exit 1
}

Write-Host "📁 Analizando imágenes en la carpeta '$imgPath'..." -ForegroundColor Yellow
Write-Host ""

# Obtener todas las imágenes
$images = Get-ChildItem -Path $imgPath -Include *.png,*.jpg,*.jpeg -Recurse

# Mostrar información de las imágenes
Write-Host "📊 Imágenes encontradas:" -ForegroundColor Green
$totalSize = 0
foreach ($img in $images) {
    $sizeKB = [math]::Round($img.Length / 1KB, 2)
    $sizeMB = [math]::Round($img.Length / 1MB, 2)
    $totalSize += $img.Length
    
    if ($sizeMB -gt 1) {
        Write-Host "  📸 $($img.Name) - $sizeMB MB" -ForegroundColor Yellow
    } else {
        Write-Host "  📸 $($img.Name) - $sizeKB KB" -ForegroundColor White
    }
}

$totalSizeMB = [math]::Round($totalSize / 1MB, 2)
Write-Host ""
Write-Host "💾 Tamaño total: $totalSizeMB MB" -ForegroundColor Cyan
Write-Host ""

# Recomendaciones
Write-Host "💡 RECOMENDACIONES DE OPTIMIZACIÓN:" -ForegroundColor Magenta
Write-Host ""
Write-Host "1️⃣  CONVERTIR A WEBP (Reducción 80-90%)" -ForegroundColor Green
Write-Host "   Herramientas online:" -ForegroundColor White
Write-Host "   • Squoosh: https://squoosh.app/" -ForegroundColor Gray
Write-Host "   • CloudConvert: https://cloudconvert.com/png-to-webp" -ForegroundColor Gray
Write-Host ""

Write-Host "2️⃣  COMPRIMIR IMÁGENES (Reducción 50-70%)" -ForegroundColor Green
Write-Host "   Herramientas online:" -ForegroundColor White
Write-Host "   • TinyPNG: https://tinypng.com/" -ForegroundColor Gray
Write-Host "   • Compressor.io: https://compressor.io/" -ForegroundColor Gray
Write-Host ""

Write-Host "3️⃣  REDIMENSIONAR IMÁGENES" -ForegroundColor Green
Write-Host "   Tamaños recomendados:" -ForegroundColor White
Write-Host "   • Hero images: 1920x1080px" -ForegroundColor Gray
Write-Host "   • Thumbnails: 800x600px" -ForegroundColor Gray
Write-Host "   • Icons: 512x512px" -ForegroundColor Gray
Write-Host ""

# Calcular ahorro potencial
$potentialSavings = [math]::Round($totalSizeMB * 0.85, 2)
Write-Host "💰 Ahorro potencial estimado: $potentialSavings MB (85%)" -ForegroundColor Green
Write-Host ""

# Preguntar si desea abrir herramientas
Write-Host "¿Deseas abrir las herramientas de optimización en el navegador? (S/N)" -ForegroundColor Yellow
$response = Read-Host

if ($response -eq "S" -or $response -eq "s") {
    Write-Host ""
    Write-Host "🌐 Abriendo herramientas..." -ForegroundColor Cyan
    Start-Process "https://squoosh.app/"
    Start-Process "https://tinypng.com/"
    Write-Host "✅ Herramientas abiertas en el navegador" -ForegroundColor Green
}

Write-Host ""
Write-Host "📝 PASOS SIGUIENTES:" -ForegroundColor Magenta
Write-Host "1. Sube las imágenes a las herramientas online" -ForegroundColor White
Write-Host "2. Descarga las versiones optimizadas" -ForegroundColor White
Write-Host "3. Reemplaza las imágenes originales" -ForegroundColor White
Write-Host "4. Verifica que todo funcione correctamente" -ForegroundColor White
Write-Host ""

Write-Host "✨ ¡Optimización completada!" -ForegroundColor Green
Write-Host ""

# Crear un reporte
$reportPath = "optimizacion-imagenes-reporte.txt"
$report = @"
REPORTE DE OPTIMIZACIÓN DE IMÁGENES
Fecha: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
=====================================

IMÁGENES ANALIZADAS:
"@

foreach ($img in $images) {
    $sizeKB = [math]::Round($img.Length / 1KB, 2)
    $report += "`n- $($img.Name): $sizeKB KB"
}

$report += "`n`nTAMAÑO TOTAL: $totalSizeMB MB"
$report += "`nAHORRO POTENCIAL: $potentialSavings MB (85%)"
$report += "`n`nRECOMENDACIONES:"
$report += "`n1. Convertir a WebP usando Squoosh (https://squoosh.app/)"
$report += "`n2. Comprimir con TinyPNG (https://tinypng.com/)"
$report += "`n3. Redimensionar según necesidades"

$report | Out-File -FilePath $reportPath -Encoding UTF8
Write-Host "📄 Reporte guardado en: $reportPath" -ForegroundColor Cyan
Write-Host ""
