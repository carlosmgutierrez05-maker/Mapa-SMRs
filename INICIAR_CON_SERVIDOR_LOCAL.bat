@echo off
title Iniciar Servidor Local SMR - Economia Energetica
echo =========================================================================
echo    INICIANDO SERVIDOR LOCAL PARA VISUALIZADOR DE SMRs
echo    Asignatura: Economia de los Sistemas Energeticos (UVa)
echo =========================================================================
echo.

python --version >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Python detectado. Iniciando servidor HTTP en puerto 8085...
    start "" http://localhost:8085/index.html
    cd /d "%~dp0"
    python -m http.server 8085
) else (
    echo [INFO] Python no encontrado en este equipo.
    echo Abriendo directamente en tu navegador web de forma autonoma...
    start "" "%~dp0index.html"
)
