import type { Service, Project, Testimonial, CompanyStat, TeamMember, Partner } from "@shared/schema";

const API_BASE = "/api";

export async function fetchServices(): Promise<Service[]> {
  const res = await fetch(`${API_BASE}/services`);
  if (!res.ok) throw new Error("Failed to fetch services");
  const data = await res.json();
  return data.map((service: any) => ({
    ...service,
    features: typeof service.features === "string" ? JSON.parse(service.features) : service.features,
  }));
}

export async function fetchProjects(featured = false): Promise<Project[]> {
  const url = featured ? `${API_BASE}/projects?featured=true` : `${API_BASE}/projects`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function fetchTestimonials(featured = false): Promise<Testimonial[]> {
  const url = featured ? `${API_BASE}/testimonials?featured=true` : `${API_BASE}/testimonials`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch testimonials");
  return res.json();
}

export async function fetchStats(): Promise<CompanyStat[]> {
  const res = await fetch(`${API_BASE}/stats`);
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}

export async function fetchTeam(): Promise<TeamMember[]> {
  const res = await fetch(`${API_BASE}/team`);
  if (!res.ok) throw new Error("Failed to fetch team");
  return res.json();
}

export async function fetchPartners(): Promise<Partner[]> {
  const res = await fetch(`${API_BASE}/partners`);
  if (!res.ok) throw new Error("Failed to fetch partners");
  return res.json();
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

export async function submitContactForm(data: ContactFormData): Promise<{ success: boolean; message: string }> {
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
}
