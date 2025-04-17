import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Usuarios
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  fullName: true,
  username: true,
  email: true,
  password: true,
});

// Países
export const countries = pgTable("countries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  flagUrl: text("flag_url").notNull(),
  imageUrl: text("image_url").notNull(),
  description: text("description").notNull(),
});

export const insertCountrySchema = createInsertSchema(countries).pick({
  name: true,
  flagUrl: true,
  imageUrl: true,
  description: true,
});

// Categorías de recursos
export const resourceCategories = pgTable("resource_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  description: text("description").notNull(),
});

export const insertResourceCategorySchema = createInsertSchema(resourceCategories).pick({
  name: true,
  icon: true,
  description: true,
});

// Recursos
export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  categoryId: integer("category_id").notNull(),
  countryId: integer("country_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertResourceSchema = createInsertSchema(resources).pick({
  title: true,
  description: true,
  content: true,
  categoryId: true,
  countryId: true,
});

// Publicaciones de la comunidad
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  userId: integer("user_id").notNull(),
  originCountry: text("origin_country"),
  destinationCountry: text("destination_country"),
  likes: integer("likes").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPostSchema = createInsertSchema(posts).pick({
  content: true,
  userId: true,
  originCountry: true,
  destinationCountry: true,
});

// Comentarios
export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  userId: integer("user_id").notNull(),
  postId: integer("post_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCommentSchema = createInsertSchema(comments).pick({
  content: true,
  userId: true,
  postId: true,
});

// Contactos de emergencia
export const emergencyContacts = pgTable("emergency_contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  countryId: integer("country_id").notNull(),
});

export const insertEmergencyContactSchema = createInsertSchema(emergencyContacts).pick({
  name: true,
  phone: true,
  description: true,
  category: true,
  countryId: true,
});

// Eventos
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  online: boolean("online").default(false).notNull(),
  date: timestamp("date").notNull(),
  time: text("time").notNull(),
  countryId: integer("country_id").notNull(),
  attendees: integer("attendees").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertEventSchema = createInsertSchema(events).pick({
  title: true,
  description: true,
  location: true,
  online: true,
  date: true,
  time: true,
  countryId: true,
});

// Mensajes de contacto
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isProcessed: boolean("is_processed").default(false).notNull(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Country = typeof countries.$inferSelect;
export type InsertCountry = z.infer<typeof insertCountrySchema>;

export type ResourceCategory = typeof resourceCategories.$inferSelect;
export type InsertResourceCategory = z.infer<typeof insertResourceCategorySchema>;

export type Resource = typeof resources.$inferSelect;
export type InsertResource = z.infer<typeof insertResourceSchema>;

export type Post = typeof posts.$inferSelect;
export type InsertPost = z.infer<typeof insertPostSchema>;

export type Comment = typeof comments.$inferSelect;
export type InsertComment = z.infer<typeof insertCommentSchema>;

export type EmergencyContact = typeof emergencyContacts.$inferSelect;
export type InsertEmergencyContact = z.infer<typeof insertEmergencyContactSchema>;

export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
