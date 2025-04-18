// Este archivo es usado por Vercel para redirigir peticiones
export default function handler(req, res) {
  // Redirigir a la API principal desplegada en Render
  const apiBaseUrl = 'https://migradores.onrender.com';
  
  // Obtener la ruta de la API
  const apiPath = req.url.replace('/api', '');
  
  // Redirigir a la API completa
  res.setHeader('Content-Type', 'application/json');
  res.redirect(`${apiBaseUrl}/api${apiPath}`);
}