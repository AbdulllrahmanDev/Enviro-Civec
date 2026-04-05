@echo off
title Enviro Civec Launcher
echo ==========================================
echo   Starting Enviro Civec Website...
echo ==========================================

:: Change directory to the script's location
cd /d "%~dp0"

:: Open the browser to the local server URL
:: We do this first so it's ready when the server starts
echo Opening browser...
start http://localhost:5000

:: Start the development server
echo Starting server...
npm run dev

pause
