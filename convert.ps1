[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$ErrorActionPreference = 'Stop'

function Convert-HtmlToMarkdown {
    param([string]$html)

    # Extract body content
    $bodyMatch = [regex]::Match($html, '<body[^>]*>(.*?)</body>', 'Singleline')
    if (-not $bodyMatch.Success) { return "" }
    $body = $bodyMatch.Groups[1].Value

    # Remove sidebar (navigation)
    $body = [regex]::Replace($body, '<aside[^>]*class="sidebar"[^>]*>.*?</aside>', '', 'Singleline')
    $body = [regex]::Replace($body, '<button[^>]*class="menu-toggle"[^>]*>.*?</button>', '', 'Singleline')
    $body = [regex]::Replace($body, '<div class="progress-section">.*?</div>', '', 'Singleline')
    $body = [regex]::Replace($body, '<script[^>]*>.*?</script>', '', 'Singleline')
    $body = [regex]::Replace($body, '<style[^>]*>.*?</style>', '', 'Singleline')

    # Handle special box divs - convert to blockquote style
    $body = [regex]::Replace($body, '<div class="info-box"\s+data-title="([^"]*)"[^>]*>(.*?)</div>', {
        param($m); "`n`n> **$($m.Groups[1].Value)**`n>`n> $($m.Groups[2].Value)`n`n"
    }, 'Singleline')
    $body = [regex]::Replace($body, '<div class="tip-box"\s+data-title="([^"]*)"[^>]*>(.*?)</div>', {
        param($m); "`n`n> **$($m.Groups[1].Value)**`n>`n> $($m.Groups[2].Value)`n`n"
    }, 'Singleline')
    $body = [regex]::Replace($body, '<div class="warning-box"\s+data-title="([^"]*)"[^>]*>(.*?)</div>', {
        param($m); "`n`n> **$($m.Groups[1].Value)**`n>`n> $($m.Groups[2].Value)`n`n"
    }, 'Singleline')
    $body = [regex]::Replace($body, '<div class="danger-box"\s+data-title="([^"]*)"[^>]*>(.*?)</div>', {
        param($m); "`n`n> **$($m.Groups[1].Value)**`n>`n> $($m.Groups[2].Value)`n`n"
    }, 'Singleline')

    # Handle tables - convert to markdown tables
    $body = [regex]::Replace($body, '<table[^>]*>(.*?)</table>', {
        param($m)
        $tableHtml = $m.Groups[1].Value
        $rows = [regex]::Matches($tableHtml, '<tr[^>]*>(.*?)</tr>', 'Singleline')
        $mdRows = @()
        $rowIdx = 0
        foreach ($row in $rows) {
            $rowHtml = $row.Groups[1].Value
            $cells = [regex]::Matches($rowHtml, '<(?:th|td)[^>]*>(.*?)</(?:th|td)>', 'Singleline')
            $cellTexts = @()
            foreach ($c in $cells) {
                $txt = $c.Groups[1].Value
                $txt = [regex]::Replace($txt, '<[^>]+>', ' ')
                $txt = [regex]::Replace($txt, '\s+', ' ').Trim()
                $cellTexts += $txt
            }
            if ($cellTexts.Count -gt 0) {
                $mdRows += "| " + ($cellTexts -join " | ") + " |"
                if ($rowIdx -eq 0) {
                    $sep = @()
                    foreach ($c in $cellTexts) { $sep += "---" }
                    $mdRows += "| " + ($sep -join " | ") + " |"
                }
                $rowIdx++
            }
        }
        "`n`n" + ($mdRows -join "`n") + "`n`n"
    }, 'Singleline')

    # Headings
    $body = [regex]::Replace($body, '<h1[^>]*>(.*?)</h1>', {
        param($m); "`n# " + ($m.Groups[1].Value) + "`n"
    }, 'Singleline')
    $body = [regex]::Replace($body, '<h2[^>]*>(.*?)</h2>', {
        param($m); "`n## " + ($m.Groups[1].Value) + "`n"
    }, 'Singleline')
    $body = [regex]::Replace($body, '<h3[^>]*>(.*?)</h3>', {
        param($m); "`n### " + ($m.Groups[1].Value) + "`n"
    }, 'Singleline')
    $body = [regex]::Replace($body, '<h4[^>]*>(.*?)</h4>', {
        param($m); "`n#### " + ($m.Groups[1].Value) + "`n"
    }, 'Singleline')
    $body = [regex]::Replace($body, '<h5[^>]*>(.*?)</h5>', {
        param($m); "`n##### " + ($m.Groups[1].Value) + "`n"
    }, 'Singleline')
    $body = [regex]::Replace($body, '<h6[^>]*>(.*?)</h6>', {
        param($m); "`n###### " + ($m.Groups[1].Value) + "`n"
    }, 'Singleline')

    # Lists - first convert li, then strip ul/ol wrappers
    $body = [regex]::Replace($body, '<li[^>]*>(.*?)</li>', {
        param($m); "`n- " + ($m.Groups[1].Value).Trim()
    }, 'Singleline')

    # Paragraphs
    $body = [regex]::Replace($body, '<p[^>]*>(.*?)</p>', {
        param($m); "`n`n" + ($m.Groups[1].Value).Trim() + "`n"
    }, 'Singleline')

    # Bold / strong / em
    $body = [regex]::Replace($body, '<(?:strong|b)[^>]*>(.*?)</(?:strong|b)>', '**$1**', 'Singleline,IgnoreCase')
    $body = [regex]::Replace($body, '<(?:em|i)[^>]*>(.*?)</(?:em|i)>', '*$1*', 'Singleline,IgnoreCase')

    # br
    $body = [regex]::Replace($body, '<br\s*/?>', "`n", 'IgnoreCase')

    # Code
    $body = [regex]::Replace($body, '<code[^>]*>(.*?)</code>', '`$1`', 'Singleline')
    $body = [regex]::Replace($body, '<pre[^>]*>(.*?)</pre>', {
        param($m); "`n``````n" + $m.Groups[1].Value + "`n``````n"
    }, 'Singleline')

    # Strip remaining tags
    $body = [regex]::Replace($body, '<[^>]+>', '')

    # Decode common HTML entities
    $body = $body -replace '&nbsp;', ' '
    $body = $body -replace '&amp;', '&'
    $body = $body -replace '&lt;', '<'
    $body = $body -replace '&gt;', '>'
    $body = $body -replace '&quot;', '"'
    $body = $body -replace '&#39;', "'"
    $body = $body -replace '&ldquo;', '"'
    $body = $body -replace '&rdquo;', '"'
    $body = $body -replace '&hellip;', '...'
    $body = $body -replace '&mdash;', '—'
    $body = $body -replace '&ndash;', '–'

    # Collapse excessive whitespace/blank lines
    $body = [regex]::Replace($body, '[ \t]+', ' ')
    $body = [regex]::Replace($body, '\r\n', "`n")
    $body = [regex]::Replace($body, '\n{3,}', "`n`n")
    $body = [regex]::Replace($body, '(?m)^\s+', '')

    return $body.Trim()
}

$files = @(
    @{ Html = "khoa-hoc-in-3d.html"; Md = "khoa-hoc-in-3d.md" },
    @{ Html = "khoa-hoc-game-design.html"; Md = "khoa-hoc-game-design.md" },
    @{ Html = "khoa-hoc-sale-dien-mat-troi.html"; Md = "khoa-hoc-sale-dien-mat-troi.md" },
    @{ Html = "content-engine-dien-mat-troi.html"; Md = "content-engine-dien-mat-troi.md" },
    @{ Html = "khoa-hoc-sang-tac-kich-ban-phim.html"; Md = "khoa-hoc-sang-tac-kich-ban-phim.md" },
    @{ Html = "khoa-hoc-tester-qa.html"; Md = "khoa-hoc-tester-qa.md" },
    @{ Html = "khoa-hoc-viet-cot-truyen-game.html"; Md = "khoa-hoc-viet-cot-truyen-game.md" }
)

$sourceLabel = [char]0x004E + [char]0x0067 + [char]0x0075 + [char]0x1ED3 + [char]0x006E

$base = "C:\MyProject\Studies"
foreach ($f in $files) {
    $htmlPath = Join-Path $base $f.Html
    $mdPath = Join-Path $base $f.Md
    Write-Output "Converting: $($f.Html) -> $($f.Md)"
    $htmlContent = [System.IO.File]::ReadAllText($htmlPath, [System.Text.Encoding]::UTF8)
    $titleMatch = [regex]::Match($htmlContent, '<title>(.*?)</title>', 'Singleline')
    $title = if ($titleMatch.Success) { $titleMatch.Groups[1].Value.Trim() } else { $f.Html }
    $md = Convert-HtmlToMarkdown $htmlContent
    $header = "# $title`n`n> $sourceLabel" + ": [$($f.Html)]($($f.Html))`n`n---`n`n"
    [System.IO.File]::WriteAllText($mdPath, $header + $md, [System.Text.UTF8Encoding]::new($false))
    $size = (Get-Item $mdPath).Length
    Write-Output "  -> $size bytes"
}

Write-Output "Done."
