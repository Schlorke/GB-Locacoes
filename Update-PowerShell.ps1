# 🚀 Script para Atualizar PowerShell e Configurar Cursor
# Autor: Assistente IA | Data: 28/01/2025

[CmdletBinding()]
param(
    [switch]$Preview = $true,
    [switch]$Stable = $false,
    [switch]$ConfigureCursor = $true,
    [switch]$TestInstallation = $true
)

Write-Host "🚀 PowerShell Updater & Cursor Configurator" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor Gray

# Função para verificar se é admin
function Test-IsAdmin {
    $currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object Security.Principal.WindowsPrincipal($currentUser)
    return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

# Função para atualizar PowerShell
function Update-PowerShellVersion {
    param([string]$Version)
    
    Write-Host "📦 Atualizando PowerShell $Version..." -ForegroundColor Yellow
    
    try {
        if ($Version -eq "Preview") {
            $result = winget upgrade Microsoft.PowerShell.Preview --accept-source-agreements --accept-package-agreements
        } else {
            $result = winget upgrade Microsoft.PowerShell --accept-source-agreements --accept-package-agreements
        }
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ PowerShell $Version atualizado com sucesso!" -ForegroundColor Green
        } else {
            Write-Host "ℹ️ Nenhuma atualização disponível para PowerShell $Version" -ForegroundColor Cyan
        }
    }
    catch {
        Write-Host "❌ Erro ao atualizar PowerShell $Version`: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Função para configurar PATH
function Update-PowerShellPath {
    param([string]$PreferredVersion)
    
    Write-Host "🔧 Configurando PATH para priorizar $PreferredVersion..." -ForegroundColor Yellow
    
    $newPath = if ($PreferredVersion -eq "Preview") {
        "C:\Program Files\PowerShell\7-preview"
    } else {
        "C:\Program Files\PowerShell\7"
    }
    
    # Remover caminhos antigos do PowerShell
    $currentPath = [Environment]::GetEnvironmentVariable("PATH", "User")
    $cleanPath = $currentPath -replace "C:\\Program Files\\PowerShell\\[^;]*;?", ""
    
    # Adicionar novo caminho no início
    $updatedPath = "$newPath;$cleanPath"
    
    [Environment]::SetEnvironmentVariable("PATH", $updatedPath, "User")
    $env:PATH = "$newPath;$env:PATH"
    
    Write-Host "✅ PATH atualizado para priorizar $PreferredVersion" -ForegroundColor Green
}

# Função para testar instalação
function Test-PowerShellInstallation {
    Write-Host "🧪 Testando instalações do PowerShell..." -ForegroundColor Yellow
    
    # Testar PowerShell Preview
    $previewPath = "C:\Program Files\PowerShell\7-preview\pwsh.exe"
    if (Test-Path $previewPath) {
        try {
            $previewVersion = & $previewPath -Command '$PSVersionTable.PSVersion.ToString()'
            Write-Host "✅ PowerShell Preview: $previewVersion" -ForegroundColor Green
        }
        catch {
            Write-Host "❌ PowerShell Preview instalado mas com problemas" -ForegroundColor Red
        }
    } else {
        Write-Host "⚠️ PowerShell Preview não encontrado" -ForegroundColor Yellow
    }
    
    # Testar PowerShell Stable
    $stablePath = "C:\Program Files\PowerShell\7\pwsh.exe"
    if (Test-Path $stablePath) {
        try {
            $stableVersion = & $stablePath -Command '$PSVersionTable.PSVersion.ToString()'
            Write-Host "✅ PowerShell Stable: $stableVersion" -ForegroundColor Green
        }
        catch {
            Write-Host "❌ PowerShell Stable instalado mas com problemas" -ForegroundColor Red
        }
    } else {
        Write-Host "⚠️ PowerShell Stable não encontrado" -ForegroundColor Yellow
    }
    
    # Testar qual versão está ativa
    Write-Host "🎯 Versão ativa no PATH:" -ForegroundColor Cyan
    $activePath = where.exe pwsh 2>$null
    if ($activePath) {
        $activeVersion = & pwsh -Command '$PSVersionTable.PSVersion.ToString()'
        Write-Host "   📍 $activePath" -ForegroundColor White
        Write-Host "   🏷️ Versão: $activeVersion" -ForegroundColor White
    } else {
        Write-Host "❌ Nenhum pwsh encontrado no PATH" -ForegroundColor Red
    }
}

# Função para mostrar configuração do Cursor
function Show-CursorConfiguration {
    Write-Host "⚙️ Configuração para Cursor:" -ForegroundColor Yellow
    
    $config = @{
        "terminal.integrated.defaultProfile.windows" = "PowerShell Preview"
        "terminal.integrated.profiles.windows" = @{
            "PowerShell Preview" = @{
                "source" = "PowerShell"
                "icon" = "terminal-powershell"
                "path" = "C:\\Program Files\\PowerShell\\7-preview\\pwsh.exe"
                "args" = @("-NoLogo")
            }
            "PowerShell Stable" = @{
                "source" = "PowerShell"
                "icon" = "terminal-powershell" 
                "path" = "C:\\Program Files\\PowerShell\\7\\pwsh.exe"
                "args" = @("-NoLogo")
            }
        }
        "terminal.integrated.shell.windows" = "C:\\Program Files\\PowerShell\\7-preview\\pwsh.exe"
        "terminal.integrated.shellArgs.windows" = @("-NoLogo")
    }
    
    Write-Host "📋 Adicione esta configuração no settings.json do Cursor:" -ForegroundColor Cyan
    $config | ConvertTo-Json -Depth 4 | Write-Host -ForegroundColor White
}

# EXECUÇÃO PRINCIPAL
Write-Host "🔍 Verificando ambiente..." -ForegroundColor Yellow

# Verificar se winget está disponível
if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
    Write-Host "❌ winget não encontrado. Instale o App Installer da Microsoft Store." -ForegroundColor Red
    exit 1
}

# Atualizar PowerShell
if ($Preview) {
    Update-PowerShellVersion -Version "Preview"
    Update-PowerShellPath -PreferredVersion "Preview"
}

if ($Stable) {
    Update-PowerShellVersion -Version "Stable"
    if (-not $Preview) {
        Update-PowerShellPath -PreferredVersion "Stable"
    }
}

# Testar instalação
if ($TestInstallation) {
    Test-PowerShellInstallation
}

# Mostrar configuração do Cursor
if ($ConfigureCursor) {
    Show-CursorConfiguration
}

Write-Host "`n🎉 Script concluído! Reinicie o Cursor para aplicar as configurações." -ForegroundColor Green
Write-Host "📚 Consulte INSTRUCOES-CURSOR-POWERSHELL.md para detalhes." -ForegroundColor Cyan
