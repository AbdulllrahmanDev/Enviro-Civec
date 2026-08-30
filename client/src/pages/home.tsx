import type React from "react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  ArrowRight,
  Building2,
  Leaf,
  Compass,
  ShieldCheck,
  Award,
  Users,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  CheckCircle2,
  Truck,
  Waves,
  Mountain,
  Quote,
  Star,
  Calendar,
  MapPinned,
  Loader2,
  Moon,
  Sun,
  ArrowUp,
  Globe
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/components/theme-provider";
import { useTranslation } from "@/lib/i18n";
import {
  fetchServices,
  fetchProjects,
  fetchTestimonials,
  fetchStats,
  submitContactForm,
  type ContactFormData
} from "@/lib/api";
import logo from "@assets/Enviro_Civec.png";
import heroImage from "@assets/generated_images/infrastructure_engineering_hero_background.png";
import patternImage from "@assets/generated_images/civil_engineering_blueprint_abstract.png";

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-7 h-7 text-accent" />,
  Waves: <Waves className="w-7 h-7 text-accent" />,
  Truck: <Truck className="w-7 h-7 text-accent" />,
  ShieldCheck: <ShieldCheck className="w-7 h-7 text-accent" />,
  Leaf: <Leaf className="w-7 h-7 text-accent" />,
  Mountain: <Mountain className="w-7 h-7 text-accent" />,
};

export default function Home() {
  const { t, language, setLanguage, dir } = useTranslation();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const navLinks = [
    { id: 'about', label: t('nav.about') },
    { id: 'services', label: t('nav.services') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'testimonials', label: t('nav.testimonials') },
    { id: 'contact', label: t('nav.contact') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // ... (rest of component)

  // Form state
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  // API Queries
  const { data: services = [] } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  const { data: projects = [] } = useQuery({
    queryKey: ["projects", "featured"],
    queryFn: () => fetchProjects(true),
  });

  const { data: testimonials = [] } = useQuery({
    queryKey: ["testimonials"],
    queryFn: () => fetchTestimonials(),
  });

  const { data: stats = [] } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
  });

  // Contact form mutation
  const contactMutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: () => {
      toast({
        title: t('contact.toast.success.title'),
        description: t('contact.toast.success.desc'),
      });
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    },
    onError: (error) => {
      toast({
        title: t('contact.toast.error.title'),
        description: error.message || t('contact.toast.error.desc'),
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  // Fallback stats if database is empty
  const displayStats = stats.length > 0 ? stats : [
    { id: "1", label: "Infrastructure Projects", value: "500+", order: 1 },
    { id: "2", label: "Expert Engineers", value: "200+", order: 2 },
    { id: "3", label: "Years of Excellence", value: "30+", order: 3 },
    { id: "4", label: "Client Satisfaction", value: "98%", order: 4 }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex flex-col items-center justify-center -space-y-1">
            <img src={logo} alt="Enviro-Civec Logo" className="h-14 w-auto" />
            <span className={`font-serif font-bold tracking-wide uppercase text-foreground ${dir === 'rtl' ? 'text-xl' : 'text-sm tracking-widest'}`}>
              {t('brandName')}
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-sm font-medium text-muted-foreground">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onMouseEnter={() => setHoveredTab(link.id)}
                onMouseLeave={() => setHoveredTab(null)}
                className="relative px-4 py-2 transition-colors hover:text-primary z-10"
              >
                {hoveredTab === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-accent/10 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className="p-2 rounded-full hover:bg-accent/10 transition-colors flex items-center gap-1"
              aria-label="Toggle language"
            >
              <Globe className="h-5 w-5 text-foreground" />
              <span className="text-xs font-bold text-foreground">{language === "en" ? "عربي" : "EN"}</span>
            </button>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-accent/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-foreground" />
              ) : (
                <Moon className="h-5 w-5 text-foreground" />
              )}
            </button>

            <button
              data-testid="button-consultation"
              className="flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer"
              type="button"
              onClick={() => scrollToSection("contact")}
            >
              {t('nav.consultation')}
              {dir === 'ltr' ? <ArrowRight className="w-4 h-4" /> : <ArrowRight className="w-4 h-4 rotate-180" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Infrastructure Engineering"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        </div>

        {/* Geometric accent inspired by logo */}
        <div className="absolute top-0 right-0 w-1/3 h-full z-[1] opacity-20">
          <div className="absolute top-0 right-0 w-full h-1/3 bg-gradient-to-bl from-gray-400/30 to-transparent" />
          <div className="absolute top-1/4 right-0 w-full h-1/3 bg-gradient-to-bl from-[#8B7355]/40 to-transparent" />
          <div className="absolute top-1/2 right-0 w-full h-1/2 bg-gradient-to-bl from-red-600/30 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-semibold tracking-wider uppercase mb-8">
              <Award className="w-4 h-4 text-accent" />
              {t('hero.badge')}
            </div>

            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
              {t('hero.title_line1')} <br />
              <span className="text-accent">{t('hero.title_line2')}</span><br />
              {t('hero.title_line3')}
            </h1>

            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-lg">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#services"
                data-testid="button-explore-services"
                className="cursor-pointer flex items-center justify-center gap-2 bg-accent text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent/90 transition-all shadow-xl hover:shadow-2xl active:scale-95"
              >
                {t('nav.exploreServices')}
                {dir === 'ltr' ? <ArrowRight className="w-4 h-4" /> : <ArrowRight className="w-4 h-4 rotate-180" />}
              </a>
              <a
                href="#projects"
                data-testid="button-view-projects"
                className="cursor-pointer flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all"
              >
                {t('nav.viewProjects')}
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 grid grid-cols-3 gap-8">
              {displayStats.slice(0, 3).map((stat, i) => (
                <div key={stat.id || i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white font-serif">{stat.value}</div>
                  <div className="text-xs text-white/60 uppercase tracking-wider mt-1">{t('hero.stats')[stat.label] || stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 z-10">
          <span className="text-xs uppercase tracking-widest">{t('hero.scroll')}</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-background relative grid-pattern">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">{t('about.subtitle')}</div>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                {t('about.title_line1')}<br />
                <span className="text-primary">{t('about.title_line2')}</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {t('about.description')}
              </p>

              <ul className="space-y-4 mb-8">
                {(t('about.points') as string[]).map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a href="#services" className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all">
                {t('about.discover')} {dir === 'ltr' ? <ChevronRight className="w-4 h-4" /> : <ChevronRight className="w-4 h-4 rotate-180" />}
              </a>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-muted/50 to-muted/10 rounded-3xl p-8 lg:p-12 border border-border">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: <Building2 className="w-8 h-8" />, title: t('about.cards.civil.title'), desc: t('about.cards.civil.desc'), color: "text-accent" },
                    { icon: <Leaf className="w-8 h-8" />, title: t('about.cards.env.title'), desc: t('about.cards.env.desc'), color: "text-accent" },
                    { icon: <Waves className="w-8 h-8" />, title: t('about.cards.water.title'), desc: t('about.cards.water.desc'), color: "text-accent" },
                    { icon: <Mountain className="w-8 h-8" />, title: t('about.cards.geo.title'), desc: t('about.cards.geo.desc'), color: "text-accent" }
                  ].map((item, i) => (
                    <div key={i} className="bg-card p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-border group cursor-pointer">
                      <div className={`${item.color} mb-3 group-hover:scale-110 transition-transform`}>{item.icon}</div>
                      <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Badge with brand colors */}
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-primary to-primary/80 text-white p-6 rounded-2xl shadow-xl">
                <div className="text-4xl font-serif font-bold">30+</div>
                <div className="text-sm text-white/80">{t('about.years_badge')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure Services Section - Now from Database */}
      <section id="services" className="py-24 px-6 bg-muted/30 grid-pattern">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">{t('services.subtitle')}</div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
              {t('services.title')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('services.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => {
              const translation = t('services.items')?.[service.title] || {};
              const title = translation.title || service.title;
              const description = translation.description || service.description;
              const features = translation.features || service.features;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-card p-8 rounded-2xl border border-border hover:border-primary/20 hover:shadow-xl transition-all group cursor-pointer"
                  data-testid={`service-card-${service.id}`}
                >
                  <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-300">
                    {iconMap[service.icon] || <Building2 className="w-7 h-7" />}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-foreground mb-3">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{description}</p>
                  <div className="flex flex-wrap gap-2">
                    {features.map((f: string, i: number) => (
                      <span key={i} className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full">
                        {f}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects Section - From Database */}
      <section id="projects" className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">{t('projects.subtitle')}</div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
              {t('projects.title')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('projects.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-card rounded-2xl overflow-hidden group cursor-pointer hover:shadow-xl transition-all border border-border"
                data-testid={`project-card-${project.id}`}
              >
                <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                  <div className="relative z-10">
                    <Building2 className="w-16 h-16 text-primary/40" />
                  </div>
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary">
                    {t('projects.items')?.[project.title]?.category || project.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {t('projects.items')?.[project.title]?.title || project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {t('projects.items')?.[project.title]?.description || project.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPinned className="w-4 h-4" />
                      {t('projects.items')?.[project.title]?.location || project.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {project.year}
                    </div>
                  </div>
                  {project.clientName && (
                    <div className="mt-4 pt-4 border-t border-border text-sm">
                      <span className="text-muted-foreground">{t('projects.client')}</span>
                      <span className="font-medium text-foreground">{t('projects.items')?.[project.title]?.clientName || project.clientName}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner with brand colors */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary via-primary/90 to-accent relative overflow-hidden">
        {/* Blueprint pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <img src={patternImage} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {displayStats.map((stat, i) => (
              <div key={stat.id || i}>
                <div className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/70 text-sm uppercase tracking-wider">{t('hero.stats')[stat.label] || stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - From Database */}
      <section id="testimonials" className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">{t('testimonials.subtitle')}</div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
              {t('testimonials.title')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('testimonials.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => {
              const translation = t('testimonials.items')?.[testimonial.clientName] || {};
              const content = translation.content || testimonial.content;
              const position = translation.position || testimonial.position;

              return (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-card p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-border relative h-full flex flex-col"
                  data-testid={`testimonial-card-${testimonial.id}`}
                >
                  <Quote className={`w-10 h-10 text-accent/20 absolute top-6 ${dir === 'rtl' ? 'left-6' : 'right-6'}`} />

                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6 italic flex-grow">
                    "{content}"
                  </p>

                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.clientName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        {t('testimonials.items')?.[testimonial.clientName]?.clientName || testimonial.clientName}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {position && `${position}, `}{testimonial.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="expertise" className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-square bg-gradient-to-br from-muted/50 via-muted/30 to-background rounded-3xl overflow-hidden border border-border relative">
                <img src={patternImage} alt="Engineering Pattern" className="w-full h-full object-cover opacity-40" loading="lazy" />

                {/* Logo Shape Recreation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-64 h-48">
                    <div className="absolute left-0 bottom-0 w-16 h-32 bg-gradient-to-t from-gray-400 to-gray-300 transform skew-x-[-15deg]" />
                    <div className="absolute left-12 bottom-0 w-24 h-40 bg-gradient-to-t from-primary to-primary/80 transform skew-x-[-10deg]" />
                    <div className="absolute right-0 bottom-0 w-20 h-36 bg-gradient-to-t from-accent to-accent/80 transform skew-x-[15deg]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">{t('expertise.subtitle')}</div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                {t('expertise.title_line1')}<br />
                <span className="text-primary">{t('expertise.title_line2')}</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                {t('expertise.description')}
              </p>

              <div className="space-y-6">
                {(t('expertise.items') as any[]).map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-muted/30 geometric-pattern">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">{t('cta.subtitle')}</div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-6">
            {t('cta.title_line1')}<br />
            <span className="text-primary">{t('cta.title_line2')}</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              data-testid="button-get-started"
              className="cursor-pointer flex items-center justify-center gap-2 bg-accent text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent/90 transition-all shadow-xl hover:shadow-2xl active:scale-95"
            >
              {t('cta.request')}
              {dir === 'ltr' ? <ArrowRight className="w-4 h-4" /> : <ArrowRight className="w-4 h-4 rotate-180" />}
            </a>
            <button
              data-testid="button-call-us"
              className="cursor-pointer flex items-center justify-center gap-2 bg-card border border-border text-foreground px-8 py-4 rounded-lg font-semibold hover:bg-muted transition-all shadow-sm"
            >
              <Phone className="w-4 h-4" />
              {t('cta.call')}
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section - Now Functional */}
      <section id="contact" className="py-24 px-6 bg-muted/50 text-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">{t('contact.subtitle')}</div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                {t('contact.title')}
              </h2>
              <p className="text-muted-foreground text-lg mb-10">
                {t('contact.description')}
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{t('contact.info.office.title')}</h4>
                    <p className="text-muted-foreground">{t('contact.info.office.text')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{t('contact.info.phone.title')}</h4>
                    <p className="text-muted-foreground">{t('contact.info.phone.text')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{t('contact.info.email.title')}</h4>
                    <p className="text-muted-foreground">{t('contact.info.email.text')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card backdrop-blur-sm rounded-2xl p-8 border border-border">
              <h3 className="font-serif text-2xl font-bold mb-6">{t('contact.form.title')}</h3>
              <form onSubmit={handleSubmit} className="space-y-5 relative">
                {/* Honeypot field for bot spam protection - completely invisible to human users */}
                <div style={{ opacity: 0, position: 'absolute', top: 0, left: 0, height: 0, width: 0, zIndex: -1, pointerEvents: 'none' }} aria-hidden="true">
                  <input
                    type="text"
                    name="bot_trap"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.bot_trap || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, bot_trap: e.target.value }))}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder={t('contact.form.name')}
                    required
                    maxLength={100}
                    data-testid="input-name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                  />
                  <input
                    type="email"
                    placeholder={t('contact.form.email')}
                    required
                    maxLength={255}
                    data-testid="input-email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <input
                  type="tel"
                  placeholder={t('contact.form.phone')}
                  maxLength={30}
                  data-testid="input-phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                />
                <select
                  data-testid="select-service"
                  value={formData.service}
                  onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-accent transition-colors"
                >
                  <option value="" className="bg-background text-foreground">{t('contact.form.service')}</option>
                  {services.map(service => (
                    <option key={service.id} value={service.title} className="bg-background text-foreground">
                      {t('services.items')?.[service.title]?.title || service.title}
                    </option>
                  ))}
                </select>
                <textarea
                  placeholder={t('contact.form.message')}
                  required
                  maxLength={3000}
                  rows={5}
                  data-testid="input-message"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                />
                <button
                  type="submit"
                  disabled={contactMutation.isPending}
                  data-testid="button-send-message"
                  className="w-full cursor-pointer flex items-center justify-center gap-2 bg-accent text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent/90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {contactMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t('contact.form.sending')}
                    </>
                  ) : (
                    <>
                      {t('contact.form.send')}
                      {dir === 'ltr' ? <ArrowRight className="w-4 h-4" /> : <ArrowRight className="w-4 h-4 rotate-180" />}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 text-foreground py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 pb-8 border-b border-border">
            <div className="md:col-span-2">
              <div className="flex flex-col items-start mb-4">
                <img src={logo} alt="Enviro-Civec" className="h-10 w-auto mb-2" />
                <span className="font-serif text-base font-bold tracking-widest uppercase text-foreground">
                  {t('brandName')}
                </span>
              </div>
              <p className="text-muted-foreground max-w-md">
                {t('footer.desc')}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t('footer.services')}</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                {services.slice(0, 4).map(service => (
                  <li key={service.id}>
                    <a href="#services" className="hover:text-primary transition-colors">
                      {t('services.items')?.[service.title]?.title || service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t('footer.company')}</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><a href="#about" className="hover:text-primary transition-colors">{t('footer.links.about')}</a></li>
                <li><a href="#projects" className="hover:text-primary transition-colors">{t('footer.links.projects')}</a></li>
                <li><a href="#testimonials" className="hover:text-primary transition-colors">{t('footer.links.testimonials')}</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors">{t('footer.links.contact')}</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
            <div className="text-muted-foreground text-sm">
              {t('footer.rights')}
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/privacy-policy" className="hover:text-primary transition-colors">{t('footer.privacy')}</Link>
              <Link href="/terms-of-service" className="hover:text-primary transition-colors">{t('footer.terms')}</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0.8 }}
        transition={{ duration: 0.3 }}
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-3 rounded-full shadow-lg transition-colors ${showScrollTop ? "pointer-events-auto" : "pointer-events-none"
          } bg-primary text-primary-foreground hover:bg-primary/90`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </div >
  );
}
