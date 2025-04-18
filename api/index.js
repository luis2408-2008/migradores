// Vercel Serverless Function
import express from 'express';
import { WebSocketServer } from 'ws';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import session from 'express-session';
import passport from 'passport';
import connectPg from 'connect-pg-simple';
import * as schema from '../shared/schema';
import { registerRoutes } from '../server/routes';
import { setupAuth } from '../server/auth';

// Configuración para Neon Database
neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Inicializar pool de conexiones y Drizzle
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool, schema });

// Configurar Express
const app = express();
app.use(express.json());

// Configurar sesión y autenticación
const PostgresSessionStore = connectPg(session);
const sessionStore = new PostgresSessionStore({
  pool,
  createTableIfMissing: true,
});

const sessionSettings = {
  secret: process.env.SESSION_SECRET || 'secreto-predeterminado',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 días
  }
};

// Configurar sesión y autenticación
app.use(session(sessionSettings));
app.use(passport.initialize());
app.use(passport.session());

// Configurar autenticación
setupAuth(app);

// Registrar rutas API
registerRoutes(app);

// Handler para Vercel serverless function
export default app;