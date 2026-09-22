# ============================================
# TANANIK
# GENERADOR AUTOMATICO DE PRODUCTOS
# ============================================

$base = Split-Path -Parent $MyInvocation.MyCommand.Path

$carpetas = @(
    "Muñecos",
    "Peluches",
    "Regalos"
)

$productos = @()

$id = 1

foreach ($categoria in $carpetas) {

    $ruta = Join-Path $base "images\$categoria"

    if (-not (Test-Path $ruta)) {
        Write-Host "No se encontró: $ruta" -ForegroundColor Red
        continue
    }

    $archivos = Get-ChildItem $ruta -File |
        Where-Object {
            $_.Extension -match '\.(jpg|jpeg|png|webp|gif)$'
        } |
        Sort-Object Name

    foreach ($archivo in $archivos) {

        # Nombre basado en el archivo
        $nombre = [System.IO.Path]::GetFileNameWithoutExtension(
            $archivo.Name
        )

        # Reemplazar guiones y guiones bajos
        $nombre = $nombre -replace '[-_]+', ' '

        # Capitalizar primera letra
        if ($nombre.Length -gt 0) {
            $nombre = $nombre.Substring(0,1).ToUpper() +
                      $nombre.Substring(1)
        }

        # Escapar caracteres especiales para JavaScript
        $nombreJS = $nombre.Replace('\','\\').Replace('"','\"')

        $categoriaJS = $categoria.Replace('\','\\').Replace('"','\"')

        $rutaRelativa = "images/$categoria/$($archivo.Name)"

        $rutaJS = $rutaRelativa.Replace('\','/')

        $rutaJS = $rutaJS.Replace('"','\"')

        $producto = @"
    {
        id: $id,
        nombre: "$nombreJS",
        categoria: "$categoriaJS",
        precio: 0,
        descripcion: "Producto tejido a crochet.",
        image: "$rutaJS"
    }
"@

        $productos += $producto

        $id++
    }
}

$contenido = @"
const productos = [

$($productos -join ",`n")

];
"@

$salida = Join-Path $base "productos.js"

Set-Content `
    -Path $salida `
    -Value $contenido `
    -Encoding UTF8

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host " TANANIK - CATALOGO GENERADO" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""

Write-Host "Productos encontrados: $($productos.Count)" -ForegroundColor Cyan

Write-Host ""
Write-Host "Archivo creado:" -ForegroundColor Yellow
Write-Host $salida

Write-Host ""
Write-Host "Muñecos: $(
    ($productos | Where-Object { $_ -match 'categoria: "Muñecos"' }).Count
)"

Write-Host "Peluches: $(
    ($productos | Where-Object { $_ -match 'categoria: "Peluches"' }).Count
)"

Write-Host "Regalos: $(
    ($productos | Where-Object { $_ -match 'categoria: "Regalos"' }).Count
)"

Write-Host ""
Write-Host "Listo." -ForegroundColor Green