import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { z } from "zod";
import { insertPostSchema, insertCommentSchema, insertContactMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Configurar autenticación
  setupAuth(app);

  // API endpoints
  // =============================

  // Países
  app.get("/api/countries", async (req, res, next) => {
    try {
      const countries = await storage.getCountries();
      res.json(countries);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/countries/:id", async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const country = await storage.getCountry(id);
      
      if (!country) {
        return res.status(404).json({ message: "País no encontrado" });
      }
      
      res.json(country);
    } catch (error) {
      next(error);
    }
  });

  // Categorías de recursos
  app.get("/api/resource-categories", async (req, res, next) => {
    try {
      const categories = await storage.getResourceCategories();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  });

  // Recursos
  app.get("/api/resources", async (req, res, next) => {
    try {
      const { countryId, categoryId } = req.query;
      
      if (countryId) {
        const resources = await storage.getResourcesByCountry(Number(countryId));
        return res.json(resources);
      } else if (categoryId) {
        const resources = await storage.getResourcesByCategory(Number(categoryId));
        return res.json(resources);
      } else {
        const resources = await storage.getResources();
        return res.json(resources);
      }
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/resources/:id", async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const resource = await storage.getResource(id);
      
      if (!resource) {
        return res.status(404).json({ message: "Recurso no encontrado" });
      }
      
      res.json(resource);
    } catch (error) {
      next(error);
    }
  });

  // Posts de la comunidad
  app.get("/api/posts", async (req, res, next) => {
    try {
      const posts = await storage.getPosts();
      res.json(posts);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/posts", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Debes iniciar sesión para publicar" });
      }

      const parsedData = insertPostSchema.safeParse(req.body);
      
      if (!parsedData.success) {
        return res.status(400).json({ message: "Datos inválidos", errors: parsedData.error.format() });
      }
      
      const post = await storage.createPost({
        ...parsedData.data,
        userId: req.user!.id
      });
      
      res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/posts/:id/like", async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getPost(id);
      
      if (!post) {
        return res.status(404).json({ message: "Publicación no encontrada" });
      }
      
      const updatedPost = await storage.updatePostLikes(id, post.likes + 1);
      res.json(updatedPost);
    } catch (error) {
      next(error);
    }
  });

  // Comentarios
  app.get("/api/posts/:postId/comments", async (req, res, next) => {
    try {
      const postId = parseInt(req.params.postId);
      const comments = await storage.getCommentsByPost(postId);
      res.json(comments);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/posts/:postId/comments", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Debes iniciar sesión para comentar" });
      }

      const postId = parseInt(req.params.postId);
      const parsedData = insertCommentSchema.safeParse({
        ...req.body,
        postId,
        userId: req.user!.id
      });
      
      if (!parsedData.success) {
        return res.status(400).json({ message: "Datos inválidos", errors: parsedData.error.format() });
      }
      
      const comment = await storage.createComment(parsedData.data);
      res.status(201).json(comment);
    } catch (error) {
      next(error);
    }
  });

  // Contactos de emergencia
  app.get("/api/emergency-contacts/:countryId", async (req, res, next) => {
    try {
      const countryId = parseInt(req.params.countryId);
      const contacts = await storage.getEmergencyContactsByCountry(countryId);
      res.json(contacts);
    } catch (error) {
      next(error);
    }
  });

  // Eventos
  app.get("/api/events", async (req, res, next) => {
    try {
      const { countryId } = req.query;
      
      if (countryId) {
        const events = await storage.getEventsByCountry(Number(countryId));
        return res.json(events);
      } else {
        const events = await storage.getEvents();
        return res.json(events);
      }
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/events/:id/attend", async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const event = await storage.getEvents().then(events => 
        events.find(e => e.id === id)
      );
      
      if (!event) {
        return res.status(404).json({ message: "Evento no encontrado" });
      }
      
      const updatedEvent = await storage.updateEventAttendees(id, event.attendees + 1);
      res.json(updatedEvent);
    } catch (error) {
      next(error);
    }
  });

  // Mensajes de contacto
  app.post("/api/contact", async (req, res, next) => {
    try {
      const parsedData = insertContactMessageSchema.safeParse(req.body);
      
      if (!parsedData.success) {
        return res.status(400).json({ message: "Datos inválidos", errors: parsedData.error.format() });
      }
      
      const message = await storage.createContactMessage(parsedData.data);
      res.status(201).json({ message: "Mensaje enviado con éxito" });
    } catch (error) {
      next(error);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
