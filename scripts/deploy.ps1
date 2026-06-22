# Deploy sparta-hockey -> sparta.obliko.org (S3 + CloudFront wildcard hosting).
# Static export can't contain the POST /api/lead route handler, so we move
# app/api aside for the build (production /api/lead is served by the shared
# obliko lead-proxy Lambda on CloudFront), then restore it.
#
# Usage:  powershell -ExecutionPolicy Bypass -File scripts\deploy.ps1
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$api = Join-Path $root 'app\api'
$apiTmp = Join-Path $root 'app\_api_export_disabled'

try {
  if (Test-Path $api) { Move-Item $api $apiTmp -Force }
  Remove-Item -Recurse -Force (Join-Path $root '.next'), (Join-Path $root 'out') -ErrorAction SilentlyContinue
  Write-Host '== building static export ==' -ForegroundColor Cyan
  npm run build
  if ($LASTEXITCODE -ne 0) { throw "build failed ($LASTEXITCODE)" }
}
finally {
  if (Test-Path $apiTmp) { Move-Item $apiTmp $api -Force }
}

Write-Host '== uploading to S3 + invalidating ==' -ForegroundColor Cyan
$env:PYTHONIOENCODING = 'utf-8'
# AWS creds come from the environment (do NOT hardcode secrets in the repo).
# Set them before running, e.g.:
#   $env:AWS_ACCESS_KEY_ID='...'; $env:AWS_SECRET_ACCESS_KEY='...'
# The obliko static-hosting keys live in D:\obliko\infra (see aws.md / deploy-site.py).
if (-not $env:AWS_ACCESS_KEY_ID -or -not $env:AWS_SECRET_ACCESS_KEY) {
  throw 'Set AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY in the environment before deploying.'
}
python D:\obliko\infra\deploy-site.py sparta (Join-Path $root 'out')
