# PowerShell script to start the MINISO Content-Driven Growth Decision System
Write-Host "Starting MINISO Content-Driven Growth Decision System..." -ForegroundColor Green

# Check if node_modules directory exists, if not run npm install
if (-not (Test-Path -Path ".\node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Start the application
Write-Host "Starting the application..." -ForegroundColor Green
npm start 