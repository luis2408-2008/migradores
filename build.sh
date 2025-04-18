#!/bin/bash

# Instalar todas las dependencias (incluyendo devDependencies)
echo "Instalando todas las dependencias..."
npm install --production=false

# Instalar explícitamente las dependencias necesarias para el build
echo "Instalando explícitamente las dependencias de Vite..."
npm install @vitejs/plugin-react @replit/vite-plugin-shadcn-theme-json @replit/vite-plugin-runtime-error-modal @replit/vite-plugin-cartographer

# Ejecutar el build
echo "Ejecutando build..."
npm run build

echo "Construcción finalizada."