#!/bin/bash

# Actualizar npm para evitar errores
echo "Actualizando npm..."
npm install -g npm@latest

# Limpiar caché de npm
echo "Limpiando caché de npm..."
npm cache clean --force

# Instalar todas las dependencias sin restricciones de producción
echo "Instalando todas las dependencias..."
npm install --no-save --legacy-peer-deps

# Instalar explícitamente los paquetes necesarios para la construcción
echo "Instalando explícitamente las dependencias de Vite..."
npm install --no-save --legacy-peer-deps @vitejs/plugin-react@4.3.2 @replit/vite-plugin-shadcn-theme-json@0.0.4 @replit/vite-plugin-runtime-error-modal@0.0.3 @replit/vite-plugin-cartographer@0.0.11 vite@5.4.14 esbuild@0.25.0 typescript@5.6.3

# Crear archivo .env con las variables de entorno correctas
echo "Creando archivo .env..."
cat > .env << EOL
DATABASE_URL=postgresql://migrantes_ox59_user:W3Km6UrMiS3hokvEQ6xgXXsq2iEIayXD@dpg-d00pjbadbo4c73dilgeg-a/migrantes_ox59
PGHOST=dpg-d00pjbadbo4c73dilgeg-a
PGPORT=5432
PGUSER=migrantes_ox59_user
PGPASSWORD=W3Km6UrMiS3hokvEQ6xgXXsq2iEIayXD
PGDATABASE=migrantes_ox59
NODE_ENV=production
SESSION_SECRET=fO2pL9zX3qY7tV5wR1bN8mS6kI0dE4aG
EOL

# Ejecutar el build
echo "Ejecutando build..."
npm run build

echo "Construcción finalizada."