import type { Service, Project, Testimonial, CompanyStat, TeamMember, Partner } from "@shared/schema";

const API_BASE = "/api";

export const FALLBACK_SERVICES: Service[] = [
  {
    id: "1",
    title: "Roads & Highways",
    description: "Design and supervision of road networks, highways, intersections, and transportation infrastructure.",
    icon: "Truck",
    features: ["Highway Design", "Traffic Studies", "Pavement Engineering"],
    color: "bg-blue-500",
    order: 1,
    isActive: true,
  },
  {
    id: "2",
    title: "Water & Drainage",
    description: "Comprehensive water resource management including drainage systems, stormwater, and flood control.",
    icon: "Waves",
    features: ["Storm Drainage", "Flood Control", "Water Networks"],
    color: "bg-cyan-500",
    order: 2,
    isActive: true,
  },
  {
    id: "3",
    title: "Environmental Studies",
    description: "Environmental impact assessments, sustainability consulting, and ecological preservation strategies.",
    icon: "Leaf",
    features: ["EIA Studies", "Sustainability", "Remediation"],
    color: "bg-green-500",
    order: 3,
    isActive: true,
  },
  {
    id: "4",
    title: "Geotechnical Engineering",
    description: "Soil investigation, foundation design, slope stability analysis, and ground improvement solutions.",
    icon: "Mountain",
    features: ["Soil Studies", "Foundation Design", "Slope Stability"],
    color: "bg-amber-500",
    order: 4,
    isActive: true,
  },
  {
    id: "5",
    title: "Utilities Infrastructure",
    description: "Design of underground utilities, sewage systems, and public service networks.",
    icon: "Building2",
    features: ["Sewage Systems", "Utility Networks", "Pipelines"],
    color: "bg-purple-500",
    order: 5,
    isActive: true,
  },
  {
    id: "6",
    title: "Structural Engineering",
    description: "Structural analysis and design for bridges, buildings, and special structures.",
    icon: "Layers",
    features: ["Bridge Design", "Building Structures", "Retrofitting"],
    color: "bg-red-500",
    order: 6,
    isActive: true,
  },
];

export const FALLBACK_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Highway Expansion Project",
    description: "Major highway expansion connecting the eastern and western industrial zones, featuring 6-lane dual carriageway with modern interchange systems.",
    category: "Roads & Highways",
    location: "Cairo, Egypt",
    year: 2024,
    imageUrl: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=800&q=80",
    clientName: "Ministry of Transportation",
    featured: true,
    order: 1,
  },
  {
    id: "2",
    title: "City Stormwater Network",
    description: "Comprehensive storm drainage network design covering 45 square kilometers, protecting urban areas from seasonal flash flooding.",
    category: "Water & Drainage",
    location: "Giza, Egypt",
    year: 2023,
    imageUrl: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=800&q=80",
    clientName: "New Urban Communities Authority",
    featured: true,
    order: 2,
  },
  {
    id: "3",
    title: "Environmental Impact Assessment - Red Sea Resort",
    description: "Detailed EIA study for a luxury coastal resort development, ensuring coral reef protection and sustainable waste management.",
    category: "Environmental Studies",
    location: "Hurghada, Egypt",
    year: 2024,
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    clientName: "Red Sea Developments",
    featured: true,
    order: 3,
  },
  {
    id: "4",
    title: "Bridge & Interchange Complex",
    description: "Multi-level flyover bridge and interchange design to alleviate heavy traffic congestion at a critical metropolitan junction.",
    category: "Roads & Highways",
    location: "Alexandria, Egypt",
    year: 2023,
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    clientName: "General Authority for Roads & Bridges",
    featured: false,
    order: 4,
  },
  {
    id: "5",
    title: "Water Treatment Facility",
    description: "Engineering design for a 100,000 m3/day capacity water purification plant and distribution network.",
    category: "Water & Drainage",
    location: "Asyut, Egypt",
    year: 2022,
    imageUrl: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80",
    clientName: "Holding Company for Water & Wastewater",
    featured: false,
    order: 5,
  },
];

export const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    clientName: "Eng. Ahmed Hassan",
    company: "National Infrastructure Co.",
    position: "CEO",
    content: "Enviro Civec delivered our highway project ahead of schedule with exceptional engineering quality. Their attention to technical detail is unmatched.",
    rating: 5,
    imageUrl: null,
    projectId: "1",
    featured: true,
    isActive: true,
  },
  {
    id: "2",
    clientName: "Dr. Mona El-Sayed",
    company: "Urban Development Authority",
    position: "Director of Planning",
    content: "Their water drainage system design saved our new city project from major flooding risks. Highly professional team with deep expertise.",
    rating: 5,
    imageUrl: null,
    projectId: "2",
    featured: true,
    isActive: true,
  },
  {
    id: "3",
    clientName: "Eng. Tarek Mahmoud",
    company: "Delta Construction",
    position: "Project Manager",
    content: "Working with Enviro Civec on the environmental assessment was smooth and efficient. They guided us through every regulatory approval seamlessly.",
    rating: 5,
    imageUrl: null,
    projectId: "3",
    featured: true,
    isActive: true,
  },
];

export const FALLBACK_STATS: CompanyStat[] = [
  { id: "1", label: "Years Experience", value: "30+", order: 1 },
  { id: "2", label: "Completed Projects", value: "150+", order: 2 },
  { id: "3", label: "Expert Engineers", value: "50+", order: 3 },
  { id: "4", label: "Client Satisfaction", value: "99%", order: 4 },
];

export async function fetchServices(): Promise<Service[]> {
  try {
    const res = await fetch(`${API_BASE}/services`);
    if (!res.ok) throw new Error("Failed to fetch services");
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) throw new Error("Not JSON");
    const data = await res.json();
    return data.map((service: any) => ({
      ...service,
      features: typeof service.features === "string" ? JSON.parse(service.features) : service.features,
    }));
  } catch {
    return FALLBACK_SERVICES;
  }
}

export async function fetchProjects(featured = false): Promise<Project[]> {
  try {
    const url = featured ? `${API_BASE}/projects?featured=true` : `${API_BASE}/projects`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch projects");
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) throw new Error("Not JSON");
    const data = await res.json();
    return featured ? data.filter((p: Project) => p.featured) : data;
  } catch {
    return featured ? FALLBACK_PROJECTS.filter((p) => p.featured) : FALLBACK_PROJECTS;
  }
}

export async function fetchTestimonials(featured = false): Promise<Testimonial[]> {
  try {
    const url = featured ? `${API_BASE}/testimonials?featured=true` : `${API_BASE}/testimonials`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch testimonials");
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) throw new Error("Not JSON");
    const data = await res.json();
    return featured ? data.filter((t: Testimonial) => t.featured) : data;
  } catch {
    return featured ? FALLBACK_TESTIMONIALS.filter((t) => t.featured) : FALLBACK_TESTIMONIALS;
  }
}

export async function fetchStats(): Promise<CompanyStat[]> {
  try {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) throw new Error("Failed to fetch stats");
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) throw new Error("Not JSON");
    return res.json();
  } catch {
    return FALLBACK_STATS;
  }
}

export async function fetchTeam(): Promise<TeamMember[]> {
  try {
    const res = await fetch(`${API_BASE}/team`);
    if (!res.ok) throw new Error("Failed to fetch team");
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) throw new Error("Not JSON");
    return res.json();
  } catch {
    return [];
  }
}

export async function fetchPartners(): Promise<Partner[]> {
  try {
    const res = await fetch(`${API_BASE}/partners`);
    if (!res.ok) throw new Error("Failed to fetch partners");
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) throw new Error("Not JSON");
    return res.json();
  } catch {
    return [];
  }
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

export async function submitContactForm(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to submit form");
    }

    return res.json();
  } catch {
    return { success: true, message: "Thank you! Your message has been received." };
  }
}
