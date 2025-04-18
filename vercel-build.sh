#!/bin/bash

# Actualizar npm para evitar errores
echo "Actualizando npm..."
npm install -g npm@latest

# Instalar todas las dependencias sin restricciones de producción
echo "Instalando todas las dependencias..."
npm install --no-save

# Ejecutar el build
echo "Ejecutando build..."
npm run build

# Crear archivos necesarios para Vercel
echo "Preparando archivos para Vercel..."
cp -r dist/public/* dist/

echo "Construcción finalizada para Vercel."