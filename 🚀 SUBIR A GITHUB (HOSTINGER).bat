@echo off
chcp 65001 >nul
title Actualizar y Subir a GitHub (Hostinger)
echo.
echo ====================================================
echo  1. REGENERANDO VERSIONES ESTÁTICAS (Vite / TanStack)
echo ====================================================
node build-and-scrape-all.js
echo.
echo ====================================================
echo  2. GUARDANDO CAMBIOS EN GIT
echo ====================================================
git add .
git commit -m "Actualizacion automatica de webs y propuestas"
echo.
echo ====================================================
echo  3. SUBIENDO A HOSTINGER (vía GitHub)
echo ====================================================
git push origin main
echo.
echo ====================================================
echo ✨ ¡Listo! Todo actualizado y subido a tu Hosting.
echo ====================================================
pause
