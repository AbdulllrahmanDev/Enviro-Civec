import { 
  services, type Service, type InsertService,
  projects, type Project, type InsertProject,
  teamMembers, type TeamMember, type InsertTeamMember,
  testimonials, type Testimonial, type InsertTestimonial,
  partners, type Partner, type InsertPartner,
  contactMessages, type ContactMessage, type InsertContactMessage,
  companyStats, type CompanyStat, type InsertCompanyStat
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc } from "drizzle-orm";

export interface IStorage {
  // Services
  getServices(): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  
  // Projects
  getProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Team Members
  getTeamMembers(): Promise<TeamMember[]>;
  getTeamMember(id: string): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  
  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  getFeaturedTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Partners
  getPartners(): Promise<Partner[]>;
  createPartner(partner: InsertPartner): Promise<Partner>;
  
  // Contact Messages
  getContactMessages(): Promise<ContactMessage[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  markMessageAsRead(id: string): Promise<void>;
  
  // Company Stats
  getCompanyStats(): Promise<CompanyStat[]>;
  createCompanyStat(stat: InsertCompanyStat): Promise<CompanyStat>;
}

export class DatabaseStorage implements IStorage {
  // Services
  async getServices(): Promise<Service[]> {
    return db.select().from(services).where(eq(services.isActive, true)).orderBy(asc(services.order));
  }

  async getService(id: string): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service;
  }

  async createService(service: InsertService): Promise<Service> {
    const [newService] = await db.insert(services).values(service).returning();
    return newService;
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return db.select().from(projects).orderBy(desc(projects.year), asc(projects.order));
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return db.select().from(projects).where(eq(projects.featured, true)).orderBy(asc(projects.order));
  }

  async getProject(id: string): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }

  // Team Members
  async getTeamMembers(): Promise<TeamMember[]> {
    return db.select().from(teamMembers).where(eq(teamMembers.isActive, true)).orderBy(asc(teamMembers.order));
  }

  async getTeamMember(id: string): Promise<TeamMember | undefined> {
    const [member] = await db.select().from(teamMembers).where(eq(teamMembers.id, id));
    return member;
  }

  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const [newMember] = await db.insert(teamMembers).values(member).returning();
    return newMember;
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return db.select().from(testimonials).where(eq(testimonials.isActive, true));
  }

  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    return db.select().from(testimonials)
      .where(and(eq(testimonials.featured, true), eq(testimonials.isActive, true)));
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db.insert(testimonials).values(testimonial).returning();
    return newTestimonial;
  }

  // Partners
  async getPartners(): Promise<Partner[]> {
    return db.select().from(partners).where(eq(partners.isActive, true)).orderBy(asc(partners.order));
  }

  async createPartner(partner: InsertPartner): Promise<Partner> {
    const [newPartner] = await db.insert(partners).values(partner).returning();
    return newPartner;
  }

  // Contact Messages
  async getContactMessages(): Promise<ContactMessage[]> {
    return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [newMessage] = await db.insert(contactMessages).values(message).returning();
    return newMessage;
  }

  async markMessageAsRead(id: string): Promise<void> {
    await db.update(contactMessages).set({ isRead: true }).where(eq(contactMessages.id, id));
  }

  // Company Stats
  async getCompanyStats(): Promise<CompanyStat[]> {
    return db.select().from(companyStats).orderBy(asc(companyStats.order));
  }

  async createCompanyStat(stat: InsertCompanyStat): Promise<CompanyStat> {
    const [newStat] = await db.insert(companyStats).values(stat).returning();
    return newStat;
  }
}

export const storage = new DatabaseStorage();
