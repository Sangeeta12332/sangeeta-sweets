Add-Type -AssemblyName System.Drawing

$filePath = 'C:\Users\DELL\.gemini\antigravity-ide\brain\886dfb7e-922b-4f7d-8d08-eb55b77a64e1\.user_uploaded\media_1793015495581.png'
$img = [System.Drawing.Bitmap]::FromFile($filePath)
Write-Output ("Dimensions: " + $img.Width + "x" + $img.Height)

# Look for dark input box with text around y = 0.65 to 0.75 * Height
$targetY = [int]($img.Height * 0.72)
Write-Output ("Testing line around Y=" + $targetY)

# Let's crop around the password box:
# Username box has "pp5797477_db_user" and Password box is right below it
# Width is around 1366 or 1920
# Let's crop x: [int]($img.Width * 0.25) to [int]($img.Width * 0.5)
$cropX = [int]($img.Width * 0.25)
$cropY = [int]($img.Height * 0.68)
$cropW = [int]($img.Width * 0.25)
$cropH = [int]($img.Height * 0.08)

$crop = New-Object System.Drawing.Bitmap $cropW, $cropH
$g = [System.Drawing.Graphics]::FromImage($crop)
$srcRect = New-Object System.Drawing.Rectangle $cropX, $cropY, $cropW, $cropH
$dstRect = New-Object System.Drawing.Rectangle 0, 0, $cropW, $cropH
$g.DrawImage($img, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

$outPath = 'C:\Users\DELL\.gemini\antigravity-ide\brain\886dfb7e-922b-4f7d-8d08-eb55b77a64e1\scratch\crop.png'
$crop.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Output ("Saved crop to " + $outPath)
