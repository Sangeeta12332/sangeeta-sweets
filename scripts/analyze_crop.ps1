Add-Type -AssemblyName System.Drawing

$cropPath = 'C:\Users\DELL\.gemini\antigravity-ide\brain\886dfb7e-922b-4f7d-8d08-eb55b77a64e1\scratch\crop.png'
$bmp = [System.Drawing.Bitmap]::FromFile($cropPath)

# Threshold pixels: text is bright white/cyan on dark navy background
# Let's find columns with bright pixels around the text baseline
$rowStart = 20
$rowEnd = 35

$colBrightness = @()
for ($x = 0; $x -lt $bmp.Width; $x++) {
    $sum = 0
    for ($y = $rowStart; $y -lt $rowEnd; $y++) {
        $p = $bmp.GetPixel($x, $y)
        if ($p.R -gt 150 -or $p.G -gt 180 -or $p.B -gt 180) {
            $sum++
        }
    }
    $colBrightness += $sum
}

# Print visual representation of column brightness
$line = ""
for ($x = 0; $x -lt 150; $x++) {
    $val = $colBrightness[$x]
    if ($val -gt 0) { $line += $val } else { $line += "." }
}
Write-Output $line

# Print 2D ASCII art of the characters:
for ($y = 16; $y -lt 36; $y++) {
    $rowStr = ""
    for ($x = 5; $x -lt 105; $x++) {
        $p = $bmp.GetPixel($x, $y)
        # Brightness
        $b = ($p.R + $p.G + $p.B) / 3
        if ($b -gt 180) {
            $rowStr += "#"
        } elseif ($b -gt 110) {
            $rowStr += "+"
        } elseif ($b -gt 60) {
            $rowStr += "."
        } else {
            $rowStr += " "
        }
    }
    Write-Output $rowStr
}
