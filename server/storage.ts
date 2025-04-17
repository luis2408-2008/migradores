import { 
  User, InsertUser, 
  Country, InsertCountry,
  ResourceCategory, InsertResourceCategory,
  Resource, InsertResource,
  Post, InsertPost,
  Comment, InsertComment,
  EmergencyContact, InsertEmergencyContact,
  Event, InsertEvent,
  ContactMessage, InsertContactMessage,
  users, countries, resourceCategories, resources, posts, comments, emergencyContacts, events, contactMessages
} from "@shared/schema";
import { db, pool } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Country operations
  getCountries(): Promise<Country[]>;
  getCountry(id: number): Promise<Country | undefined>;
  createCountry(country: InsertCountry): Promise<Country>;
  
  // Resource categories operations
  getResourceCategories(): Promise<ResourceCategory[]>;
  getResourceCategory(id: number): Promise<ResourceCategory | undefined>;
  createResourceCategory(category: InsertResourceCategory): Promise<ResourceCategory>;
  
  // Resources operations
  getResources(): Promise<Resource[]>;
  getResourcesByCountry(countryId: number): Promise<Resource[]>;
  getResourcesByCategory(categoryId: number): Promise<Resource[]>;
  getResource(id: number): Promise<Resource | undefined>;
  createResource(resource: InsertResource): Promise<Resource>;
  
  // Posts operations
  getPosts(): Promise<Post[]>;
  getPost(id: number): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  updatePostLikes(id: number, likes: number): Promise<Post>;
  
  // Comments operations
  getCommentsByPost(postId: number): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  
  // Emergency contacts operations
  getEmergencyContactsByCountry(countryId: number): Promise<EmergencyContact[]>;
  createEmergencyContact(contact: InsertEmergencyContact): Promise<EmergencyContact>;
  
  // Events operations
  getEvents(): Promise<Event[]>;
  getEventsByCountry(countryId: number): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEventAttendees(id: number, attendees: number): Promise<Event>;
  
  // Contact messages operations
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  
  // Session store
  sessionStore: any;
}

export class DatabaseStorage implements IStorage {
  sessionStore: any;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool: pool,
      createTableIfMissing: true 
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [createdUser] = await db.insert(users).values(user).returning();
    return createdUser;
  }

  // Country operations
  async getCountries(): Promise<Country[]> {
    return await db.select().from(countries);
  }

  async getCountry(id: number): Promise<Country | undefined> {
    const [country] = await db.select().from(countries).where(eq(countries.id, id));
    return country;
  }

  async createCountry(country: InsertCountry): Promise<Country> {
    const [createdCountry] = await db.insert(countries).values(country).returning();
    return createdCountry;
  }

  // Resource categories operations
  async getResourceCategories(): Promise<ResourceCategory[]> {
    return await db.select().from(resourceCategories);
  }

  async getResourceCategory(id: number): Promise<ResourceCategory | undefined> {
    const [category] = await db.select().from(resourceCategories).where(eq(resourceCategories.id, id));
    return category;
  }

  async createResourceCategory(category: InsertResourceCategory): Promise<ResourceCategory> {
    const [createdCategory] = await db.insert(resourceCategories).values(category).returning();
    return createdCategory;
  }

  // Resources operations
  async getResources(): Promise<Resource[]> {
    return await db.select().from(resources);
  }

  async getResourcesByCountry(countryId: number): Promise<Resource[]> {
    return await db.select().from(resources).where(eq(resources.countryId, countryId));
  }

  async getResourcesByCategory(categoryId: number): Promise<Resource[]> {
    return await db.select().from(resources).where(eq(resources.categoryId, categoryId));
  }

  async getResource(id: number): Promise<Resource | undefined> {
    const [resource] = await db.select().from(resources).where(eq(resources.id, id));
    return resource;
  }

  async createResource(resource: InsertResource): Promise<Resource> {
    const [createdResource] = await db.insert(resources).values(resource).returning();
    return createdResource;
  }

  // Posts operations
  async getPosts(): Promise<Post[]> {
    return await db.select().from(posts);
  }

  async getPost(id: number): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    return post;
  }

  async createPost(post: InsertPost): Promise<Post> {
    const [createdPost] = await db.insert(posts).values(post).returning();
    return createdPost;
  }

  async updatePostLikes(id: number, likes: number): Promise<Post> {
    const [updatedPost] = await db
      .update(posts)
      .set({ likes })
      .where(eq(posts.id, id))
      .returning();
    return updatedPost;
  }

  // Comments operations
  async getCommentsByPost(postId: number): Promise<Comment[]> {
    return await db.select().from(comments).where(eq(comments.postId, postId));
  }

  async createComment(comment: InsertComment): Promise<Comment> {
    const [createdComment] = await db.insert(comments).values(comment).returning();
    return createdComment;
  }

  // Emergency contacts operations
  async getEmergencyContactsByCountry(countryId: number): Promise<EmergencyContact[]> {
    return await db.select().from(emergencyContacts).where(eq(emergencyContacts.countryId, countryId));
  }

  async createEmergencyContact(contact: InsertEmergencyContact): Promise<EmergencyContact> {
    const [createdContact] = await db.insert(emergencyContacts).values(contact).returning();
    return createdContact;
  }

  // Events operations
  async getEvents(): Promise<Event[]> {
    return await db.select().from(events);
  }

  async getEventsByCountry(countryId: number): Promise<Event[]> {
    return await db.select().from(events).where(eq(events.countryId, countryId));
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const [createdEvent] = await db.insert(events).values(event).returning();
    return createdEvent;
  }

  async updateEventAttendees(id: number, attendees: number): Promise<Event> {
    const [updatedEvent] = await db
      .update(events)
      .set({ attendees })
      .where(eq(events.id, id))
      .returning();
    return updatedEvent;
  }

  // Contact messages operations
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [createdMessage] = await db.insert(contactMessages).values(message).returning();
    return createdMessage;
  }
}

export const storage = new DatabaseStorage();
