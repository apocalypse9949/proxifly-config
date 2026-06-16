# Download the free proxy lists using PowerShell (equivalent to curl)
Write-Host "Downloading proxy lists..."

# Create a folder for the lists
$ProxyDir = "$PSScriptRoot\proxy_lists"
if (-not (Test-Path -Path $ProxyDir)) {
    New-Item -ItemType Directory -Path $ProxyDir | Out-Null
}

# All proxies
Write-Host "Downloading all proxies..."
Invoke-WebRequest -Uri "https://cdn.jsdelivr.net/gh/proxifly/free-proxy-list@main/proxies/all/data.txt" -OutFile "$ProxyDir\all.txt"

# HTTP proxies
Write-Host "Downloading HTTP proxies..."
Invoke-WebRequest -Uri "https://cdn.jsdelivr.net/gh/proxifly/free-proxy-list@main/proxies/protocols/http/data.txt" -OutFile "$ProxyDir\http.txt"

# SOCKS5 proxies
Write-Host "Downloading SOCKS5 proxies..."
Invoke-WebRequest -Uri "https://cdn.jsdelivr.net/gh/proxifly/free-proxy-list@main/proxies/protocols/socks5/data.txt" -OutFile "$ProxyDir\socks5.txt"

Write-Host "Proxy lists downloaded to $ProxyDir"
