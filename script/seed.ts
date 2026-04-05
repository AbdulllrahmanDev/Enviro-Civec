import { db } from "../server/db";
import { services, projects, teamMembers, testimonials, partners, companyStats } from "../shared/schema";

async function seed() {
    console.log("Seeding database...");

    // Clear existing data
    await db.delete(services);
    await db.delete(projects);
    await db.delete(teamMembers);
    await db.delete(testimonials);
    await db.delete(partners);
    await db.delete(companyStats);

    // Services
    await db.insert(services).values([
        {
            title: "Environmental Engineering",
            description: "Sustainable solutions for environmental challenges, ensuring compliance and ecological balance.",
            icon: "Leaf",
            features: JSON.stringify(["Impact Assessment", "Waste Management", "Pollution Control"]),
            color: "bg-green-500",
            order: 1,
        },
        {
            title: "Civil Engineering",
            description: "Comprehensive civil engineering services for infrastructure and development projects.",
            icon: "Building2",
            features: JSON.stringify(["Structural Design", "Urban Planning", "Construction Management"]),
            color: "bg-blue-500",
            order: 2,
        },
        {
            title: "Water Resources",
            description: "Expert management and engineering of water systems and resources.",
            icon: "Waves",
            features: JSON.stringify(["Hydrology", "Water Treatment", "Stormwater Management"]),
            color: "bg-cyan-500",
            order: 3,
        },
        {
            title: "Geotechnical Services",
            description: "Analysis and design related to earth materials and ground engineering.",
            icon: "Mountain",
            features: JSON.stringify(["Soil Testing", "Foundation Design", "Slope Stability"]),
            color: "bg-amber-500",
            order: 4,
        },
    ]);

    // Projects
    await db.insert(projects).values([
        {
            title: "Eco-Friendly Office Complex",
            description: "A state-of-the-art sustainable office building with LEED Platinum certification.",
            category: "Civil Engineering",
            location: "Cairo, Egypt",
            year: 2024,
            imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
            clientName: "Green Corp",
            featured: 1,
            order: 1,
        },
        {
            title: "River Water Treatment Plant",
            description: "Modernizing water treatment infrastructure to serve 500,000 residents.",
            category: "Water Resources",
            location: "Giza, Egypt",
            year: 2023,
            imageUrl: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&q=80&w=800",
            clientName: "Ministry of Water",
            featured: 1,
            order: 2,
        },
        {
            title: "Solar Park Infrastructure",
            description: "Civil works and foundation design for a 50MW solar power plant.",
            category: "Renewable Energy",
            location: "Aswan, Egypt",
            year: 2023,
            imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800",
            clientName: "Solar Egy",
            featured: 1,
            order: 3,
        },
        {
            title: "Urban Park Redevelopment",
            description: "Transforming an industrial site into a thriving public green space.",
            category: "Environmental",
            location: "Alexandria, Egypt",
            year: 2024,
            imageUrl: "https://images.unsplash.com/photo-1496417263034-38ec4f0d6b21?auto=format&fit=crop&q=80&w=800",
            clientName: "City Council",
            featured: 0,
            order: 4,
        },
    ]);

    // Team Members
    await db.insert(teamMembers).values([
        {
            name: "Eng. Ahmed Hassan",
            position: "Chief Executive Officer",
            bio: "Over 20 years of experience in civil and environmental engineering projects across the MENA region.",
            imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
            email: "ahmed@envirocivec.com",
            linkedIn: "https://linkedin.com",
            order: 1,
        },
        {
            name: "Dr. Sarah Mahmoud",
            position: "Head of Environmental Dept.",
            bio: "Ph.D. in Environmental Science with a focus on sustainable urban development.",
            imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
            email: "sarah@envirocivec.com",
            linkedIn: "https://linkedin.com",
            order: 2,
        },
        {
            name: "Eng. Mohamed Ali",
            position: "Senior Project Manager",
            bio: "Expert in managing large-scale infrastructure projects and ensuring timely delivery.",
            imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
            email: "mohamed@envirocivec.com",
            linkedIn: "https://linkedin.com",
            order: 3,
        },
    ]);

    // Testimonials
    await db.insert(testimonials).values([
        {
            clientName: "Khaled Sweilem",
            company: "Enviro Civec",
            position: "CEO & Founder",
            content: "Building a sustainable future requires vision and dedication. We are proud to lead the way in environmental engineering excellence.",
            rating: 5,
            featured: 1,
        },
        {
            clientName: "Hussein Mohamed",
            company: "Enviro Civec",
            position: "Vice President",
            content: "Our team's commitment to innovation and quality ensures that every project we undertake meets the highest global standards.",
            rating: 5,
            featured: 1,
        },
        {
            clientName: "John Walker",
            company: "Autodesk",
            position: "Founder of AutoCAD",
            content: "Enviro Civec's implementation of advanced CAD and BIM technologies in their workflow is truly world-class and sets a new industry benchmark.",
            rating: 5,
            featured: 1,
        },
    ]);

    // Partners
    await db.insert(partners).values([
        { name: "Partner 1", logoUrl: "https://placehold.co/200x100?text=Partner+1", order: 1 },
        { name: "Partner 2", logoUrl: "https://placehold.co/200x100?text=Partner+2", order: 2 },
        { name: "Partner 3", logoUrl: "https://placehold.co/200x100?text=Partner+3", order: 3 },
        { name: "Partner 4", logoUrl: "https://placehold.co/200x100?text=Partner+4", order: 4 },
    ]);

    // Company Stats
    await db.insert(companyStats).values([
        { label: "Years of Experience", value: "30+", order: 1 },
        { label: "Projects Completed", value: "500+", order: 2 },
        { label: "Happy Clients", value: "150+", order: 3 },
        { label: "Team Members", value: "50+", order: 4 },
    ]);

    console.log("Seeding completed!");
}

seed().catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
});
