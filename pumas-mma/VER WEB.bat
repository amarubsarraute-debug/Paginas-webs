@echo off
title PUMAS MMA - Servidor Local
echo.
echo   Iniciando servidor de PUMAS MMA...
echo   Abri en tu navegador:  http://localhost:8765
echo.
cd /d "%~dp0"
start "" http://localhost:8765
node serve.js
pause
