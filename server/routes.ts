import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertServiceSchema, insertProjectSchema, insertTestimonialSchema, insertCompanyStatSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // ============ Services ============
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  app.get("/api/services/:id", async (req, res) => {
    try {
      const service = await storage.getService(req.params.id);
      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      console.error("Error fetching service:", error);
      res.status(500).json({ error: "Failed to fetch service" });
    }
  });

  // ============ Projects ============
  app.get("/api/projects", async (req, res) => {
    try {
      const featured = req.query.featured === "true";
      const projects = featured 
        ? await storage.getFeaturedProjects()
        : await storage.getProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  // ============ Team Members ============
  app.get("/api/team", async (req, res) => {
    try {
      const members = await storage.getTeamMembers();
      res.json(members);
    } catch (error) {
      console.error("Error fetching team members:", error);
      res.status(500).json({ error: "Failed to fetch team members" });
    }
  });

  // ============ Testimonials ============
  app.get("/api/testimonials", async (req, res) => {
    try {
      const featured = req.query.featured === "true";
      const testimonials = featured
        ? await storage.getFeaturedTestimonials()
        : await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  // ============ Partners ============
  app.get("/api/partners", async (req, res) => {
    try {
      const partners = await storage.getPartners();
      res.json(partners);
    } catch (error) {
      console.error("Error fetching partners:", error);
      res.status(500).json({ error: "Failed to fetch partners" });
    }
  });

  // ============ Company Stats ============
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getCompanyStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // Rate limiting tracker for contact submissions (in-memory)
  const contactRateLimits = new Map<string, number[]>();
  const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
  const MAX_SUBMISSIONS_PER_WINDOW = 5;

  // ============ Contact Messages ============
  app.post("/api/contact", async (req, res) => {
    try {
      // IP Rate limiting
      const clientIp = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
      const now = Date.now();
      const userTimestamps = (contactRateLimits.get(clientIp) || []).filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);

      if (userTimestamps.length >= MAX_SUBMISSIONS_PER_WINDOW) {
        return res.status(429).json({
          error: "لقد أرسلت عدة رسائل في وقت قصير، يرجى الانتظار بضع دقائق ثم المحاولة مجدداً / Too many requests, please try again later."
        });
      }

      const validatedData = insertContactMessageSchema.parse(req.body);

      // Honeypot Bot Trap: If hidden bot_trap field was filled by a spam bot, reject/fake success silently
      if (validatedData.bot_trap && validatedData.bot_trap.trim().length > 0) {
        return res.status(200).json({ success: true, message: "Message sent successfully" });
      }

      // Record this attempt for rate limiting
      userTimestamps.push(now);
      contactRateLimits.set(clientIp, userTimestamps);

      const { bot_trap, ...messageData } = validatedData;
      const message = await storage.createContactMessage(messageData);
      res.status(201).json({ success: true, message: "Message sent successfully", id: message.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0]?.message || "Invalid data";
        return res.status(400).json({ error: firstError, details: error.errors });
      }
      console.error("Error creating contact message:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  // ============ Seed Data Endpoint (for initial setup) ============
  app.post("/api/seed", async (req, res) => {
    try {
      // Seed Services
      const servicesData = [
        {
          title: "Roads & Highways",
          description: "Design and supervision of road networks, highways, intersections, and transportation infrastructure.",
          icon: "Building2",
          features: ["Highway Design", "Traffic Studies", "Pavement Engineering"],
          color: "bg-gray-500",
          order: 1,
          isActive: true
        },
        {
          title: "Water & Drainage",
          description: "Comprehensive water resource management including drainage systems, stormwater, and flood control.",
          icon: "Waves",
          features: ["Storm Drainage", "Flood Control", "Water Networks"],
          color: "bg-blue-500",
          order: 2,
          isActive: true
        },
        {
          title: "Environmental Studies",
          description: "Environmental impact assessments, sustainability consulting, and ecological preservation strategies.",
          icon: "Leaf",
          features: ["EIA Studies", "Sustainability", "Remediation"],
          color: "bg-green-600",
          order: 3,
          isActive: true
        },
        {
          title: "Geotechnical Engineering",
          description: "Soil investigation, foundation design, slope stability analysis, and ground improvement solutions.",
          icon: "Mountain",
          features: ["Soil Studies", "Foundation Design", "Slope Stability"],
          color: "bg-amber-700",
          order: 4,
          isActive: true
        },
        {
          title: "Utilities Infrastructure",
          description: "Design of underground utilities, sewage systems, and public service networks.",
          icon: "Truck",
          features: ["Sewage Systems", "Utility Networks", "Pipelines"],
          color: "bg-amber-600",
          order: 5,
          isActive: true
        },
        {
          title: "Structural Engineering",
          description: "Structural analysis and design for bridges, buildings, and special structures.",
          icon: "ShieldCheck",
          features: ["Bridge Design", "Building Structures", "Retrofitting"],
          color: "bg-red-600",
          order: 6,
          isActive: true
        }
      ];

      for (const service of servicesData) {
        await storage.createService(service);
      }

      // Seed Projects
      const projectsData = [
        {
          title: "Highway Expansion Project",
          description: "Major highway expansion connecting the eastern and western industrial zones, featuring 6-lane dual carriageway with modern interchange systems.",
          category: "Roads & Highways",
          location: "Capital Region",
          year: 2024,
          clientName: "Ministry of Transport",
          featured: true,
          order: 1
        },
        {
          title: "Urban Drainage Master Plan",
          description: "Comprehensive stormwater management system for the downtown district, including underground detention basins and smart monitoring.",
          category: "Water & Drainage",
          location: "Metropolitan City",
          year: 2023,
          clientName: "City Municipality",
          featured: true,
          order: 2
        },
        {
          title: "Industrial Zone EIA",
          description: "Environmental impact assessment for a 500-hectare industrial development zone with mitigation strategies and monitoring programs.",
          category: "Environmental Studies",
          location: "Southern Province",
          year: 2024,
          clientName: "Industrial Development Authority",
          featured: true,
          order: 3
        },
        {
          title: "Bridge Foundation Analysis",
          description: "Geotechnical investigation and foundation design for a 2km river crossing bridge in challenging soil conditions.",
          category: "Geotechnical Engineering",
          location: "Riverside District",
          year: 2023,
          clientName: "Infrastructure Development Corp",
          featured: true,
          order: 4
        }
      ];

      for (const project of projectsData) {
        await storage.createProject(project);
      }

      // Seed Testimonials
      const testimonialsData = [
        {
          clientName: "Ahmed Al-Hassan",
          company: "Ministry of Infrastructure",
          position: "Director of Projects",
          content: "Enviro-Civec delivered exceptional results on our highway project. Their attention to detail and commitment to sustainability set them apart from other consultants.",
          rating: 5,
          featured: true,
          isActive: true
        },
        {
          clientName: "Sarah Mitchell",
          company: "Green Development Corp",
          position: "CEO",
          content: "The environmental assessment provided by Enviro-Civec was thorough and professional. They helped us navigate complex regulations while meeting our project timelines.",
          rating: 5,
          featured: true,
          isActive: true
        },
        {
          clientName: "Mohammed Rashid",
          company: "Capital City Municipality",
          position: "Chief Engineer",
          content: "Working with Enviro-Civec on our drainage project was a pleasure. Their innovative solutions helped us address flooding issues that had plagued the city for years.",
          rating: 5,
          featured: true,
          isActive: true
        }
      ];

      for (const testimonial of testimonialsData) {
        await storage.createTestimonial(testimonial);
      }

      // Seed Company Stats
      const statsData = [
        { label: "Infrastructure Projects", value: "500+", order: 1 },
        { label: "Expert Engineers", value: "200+", order: 2 },
        { label: "Years of Excellence", value: "30+", order: 3 },
        { label: "Client Satisfaction", value: "98%", order: 4 }
      ];

      for (const stat of statsData) {
        await storage.createCompanyStat(stat);
      }

      res.json({ success: true, message: "Database seeded successfully" });
    } catch (error) {
      console.error("Error seeding database:", error);
      res.status(500).json({ error: "Failed to seed database" });
    }
  });

  return httpServer;
}
