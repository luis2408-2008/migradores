-- Creación de tablas para MigraGuía

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS "users" (
  "id" SERIAL PRIMARY KEY,
  "full_name" TEXT NOT NULL,
  "username" TEXT NOT NULL UNIQUE,
  "email" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Tabla de países
CREATE TABLE IF NOT EXISTS "countries" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "flag_url" TEXT NOT NULL,
  "image_url" TEXT NOT NULL,
  "description" TEXT NOT NULL
);

-- Tabla de categorías de recursos
CREATE TABLE IF NOT EXISTS "resource_categories" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "icon" TEXT NOT NULL,
  "description" TEXT NOT NULL
);

-- Tabla de recursos
CREATE TABLE IF NOT EXISTS "resources" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "category_id" INTEGER NOT NULL REFERENCES "resource_categories"("id"),
  "country_id" INTEGER NOT NULL REFERENCES "countries"("id"),
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Tabla de publicaciones de la comunidad
CREATE TABLE IF NOT EXISTS "posts" (
  "id" SERIAL PRIMARY KEY,
  "content" TEXT NOT NULL,
  "user_id" INTEGER NOT NULL REFERENCES "users"("id"),
  "origin_country" TEXT,
  "destination_country" TEXT,
  "likes" INTEGER NOT NULL DEFAULT 0,
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Tabla de comentarios
CREATE TABLE IF NOT EXISTS "comments" (
  "id" SERIAL PRIMARY KEY,
  "content" TEXT NOT NULL,
  "user_id" INTEGER NOT NULL REFERENCES "users"("id"),
  "post_id" INTEGER NOT NULL REFERENCES "posts"("id"),
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Tabla de contactos de emergencia
CREATE TABLE IF NOT EXISTS "emergency_contacts" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "country_id" INTEGER NOT NULL REFERENCES "countries"("id")
);

-- Tabla de eventos
CREATE TABLE IF NOT EXISTS "events" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "location" TEXT NOT NULL,
  "online" BOOLEAN NOT NULL DEFAULT FALSE,
  "date" TIMESTAMP WITH TIME ZONE NOT NULL,
  "time" TEXT NOT NULL,
  "country_id" INTEGER NOT NULL REFERENCES "countries"("id"),
  "attendees" INTEGER NOT NULL DEFAULT 0,
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Tabla de mensajes de contacto
CREATE TABLE IF NOT EXISTS "contact_messages" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "subject" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "is_processed" BOOLEAN NOT NULL DEFAULT FALSE
);

-- Tabla para sesiones
CREATE TABLE IF NOT EXISTS "session" (
  "sid" VARCHAR NOT NULL PRIMARY KEY,
  "sess" JSON NOT NULL,
  "expire" TIMESTAMP(6) NOT NULL
);

-- Índices
CREATE INDEX IF NOT EXISTS "idx_resources_category" ON "resources" ("category_id");
CREATE INDEX IF NOT EXISTS "idx_resources_country" ON "resources" ("country_id");
CREATE INDEX IF NOT EXISTS "idx_posts_user" ON "posts" ("user_id");
CREATE INDEX IF NOT EXISTS "idx_comments_post" ON "comments" ("post_id");
CREATE INDEX IF NOT EXISTS "idx_comments_user" ON "comments" ("user_id");
CREATE INDEX IF NOT EXISTS "idx_emergency_contacts_country" ON "emergency_contacts" ("country_id");
CREATE INDEX IF NOT EXISTS "idx_events_country" ON "events" ("country_id");
CREATE INDEX IF NOT EXISTS "idx_session_expire" ON "session" ("expire");
