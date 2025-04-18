#!/bin/bash

# Instalar explícitamente todas las dependencias necesarias, incluidas las de dev
echo "Instalando todas las dependencias..."
npm install --no-save
npm install --no-save @vitejs/plugin-react@4.3.2 vite@5.4.14 @replit/vite-plugin-shadcn-theme-json@0.0.4 @replit/vite-plugin-runtime-error-modal@0.0.3 @replit/vite-plugin-cartographer@0.0.11

# Crear un directorio dist si no existe
mkdir -p dist

# Solo construir la parte del frontend para Vercel
echo "Ejecutando build solo del frontend..."
npx vite build --outDir dist

echo "Verificando contenido de dist..."
ls -la dist

echo "Construcción finalizada para Vercel."