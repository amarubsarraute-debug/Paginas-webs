@echo off
chcp 65001 >nul
title Deploy - Paginas Web Amaru
echo.
echo  Instalando dependencias si es necesario...
cd /d "%~dp0deploy"
if not exist node_modules (
    call npm install --silent
)
echo.
node deploy.js
echo.
pause
