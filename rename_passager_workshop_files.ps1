$root = 'c:\Users\xox\Desktop\Bookdrive2.0\src\passager_workshop'
Get-ChildItem -Path $root -Recurse -Filter '*.ts' | ForEach-Object {
    $name = $_.BaseName
    $ext = $_.Extension
    $newName = $name -replace '([a-z0-9])([A-Z])', '$1_$2' -replace '([A-Z]+)([A-Z][a-z])', '$1_$2'
    $newName = $newName.ToLower()
    $target = Join-Path $_.DirectoryName ($newName + $ext)
    if ($newName -ne $name -and -not (Test-Path $target)) {
        Rename-Item $_.FullName $target
        Write-Output ("{0} -> {1}" -f $_.Name, [System.IO.Path]::GetFileName($target))
    }
}
