import type React from "react";
import { useState, useEffect, useMemo } from "react";
import { Link } from "wouter";
import { motion, useScroll, useSpring, type Variants } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  ArrowRight,
  Building2,
  Leaf,
  ShieldCheck,
  Award,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Truck,
  Waves,
  Mountain,
  Quote,
  Star,
  Layers,
  Activity,
  Cpu,
  FileCheck2,
  Loader2,
  Moon,
  Sun,
  ArrowUp,
  Globe,
  DraftingCompass
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
import MetroHero from "@/components/ui/scroll-locked-video-hero";

// Icon mapping for services
const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-6 h-6 text-accent" />,
  Waves: <Waves className="w-6 h-6 text-accent" />,
  Truck: <Truck className="w-6 h-6 text-accent" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-accent" />,
  Leaf: <Leaf className="w-6 h-6 text-accent" />,
  Mountain: <Mountain className="w-6 h-6 text-accent" />,
  Layers: <Layers className="w-6 h-6 text-accent" />,
};

// Subtle animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

export default function Home() {
  const { t, language, setLanguage, dir } = useTranslation();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Scroll Progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Form state
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    bot_trap: "",
  });

  // API Queries
  const { data: services = [] } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  const { data: projects = [] } = useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchProjects(false),
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
    onSuccess: (data) => {
      toast({
        title: language === "ar" ? "تم إرسال طلبك بنجاح" : "Inquiry Sent Successfully",
        description: data.message || (language === "ar" ? "شكراً لتواصلك معنا، سيتواصل معك أحد مستشارينا الهندسيين في أقرب وقت." : "Thank you for contacting us. Our engineering consultants will be in touch shortly."),
      });
      setFormData({ name: "", email: "", phone: "", service: "", message: "", bot_trap: "" });
    },
    onError: (error: any) => {
      toast({
        title: language === "ar" ? "تعذر إرسال الطلب" : "Submission Failed",
        description: error.message || (language === "ar" ? "يرجى التحقق من الحقول والمحاولة مجدداً." : "Please check your inputs and try again."),
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.body.style.overflow = "";
    window.dispatchEvent(new CustomEvent("unlock-scroll-hero"));
    const element = document.getElementById(id);
    if (element) {
      requestAnimationFrame(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  };

  // Filter projects by category
  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category));
    return ["all", ...Array.from(cats)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "all") return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [projects, selectedCategory]);

  const navLinks = [
    { id: "services", label: t("nav.services") },
    { id: "methodology", label: language === "ar" ? "منهجية العمل" : "Methodology" },
    { id: "projects", label: t("nav.projects") },
    { id: "testimonials", label: t("nav.testimonials") },
    { id: "contact", label: t("nav.contact") },
  ];

  // Engineering methodology steps
  const methodologySteps = [
    {
      num: "01",
      icon: <DraftingCompass className="w-6 h-6 text-accent" />,
      title: language === "ar" ? "المسح والدراسات الجيوتقنية" : "Topographical & Geotechnical Survey",
      desc: language === "ar" ? "فحص طبقات التربة، الدراسات الهيدرولوجية، والمسح الطبوغرافي الشامل لتأسيس قاعدة بيانات دقيقة." : "Soil investigation, hydrological modelling, and comprehensive site surveying for exact baseline data."
    },
    {
      num: "02",
      icon: <Cpu className="w-6 h-6 text-accent" />,
      title: language === "ar" ? "النمذجة الرقمية وتكامل BIM" : "Advanced BIM & Digital Modeling",
      desc: language === "ar" ? "محاكاة ثلاثية الأبعاد متقدمة لكافة شبكات البنية التحتية والمباني لضمان دقة التنفيذ ومنع التعارضات." : "Multi-discipline 3D BIM integration and digital twin simulation to eliminate clashes and optimize material efficiency."
    },
    {
      num: "03",
      icon: <Activity className="w-6 h-6 text-accent" />,
      title: language === "ar" ? "تقييم الأثر البيئي والاستدامة" : "Environmental Impact & Sustainability",
      desc: language === "ar" ? "دراسات معتمدة للحفاظ على الموارد، إدارة تصريف السيول، وتقليل الانبعاثات الكربونية في كل مشروع." : "Rigorous EIA studies, stormwater mitigation strategies, and ecological preservation compliance."
    },
    {
      num: "04",
      icon: <FileCheck2 className="w-6 h-6 text-accent" />,
      title: language === "ar" ? "الإشراف الهندسي وضمان الجودة" : "Supervision & Quality Assurance",
      desc: language === "ar" ? "متابعة دقيقة لمطابقة المواصفات القياسية الدولية ومعايير ISO 9001:2015 في كافة مراحل التنفيذ." : "On-site quality compliance, materials testing supervision, and ISO-certified structural verification."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden selection:bg-accent/20">
      {/* Top Architectural Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-accent z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Navigation Header with Floating Transparent to Solid Transition */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <img
              src={logo}
              alt="Enviro Civec Logo"
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span
                className={`font-serif text-lg font-bold tracking-tight transition-colors duration-200 ${
                  isScrolled ? "text-foreground" : "text-white drop-shadow-md"
                }`}
              >
                {t("brandName")}
              </span>
              <span
                className={`text-[10px] uppercase tracking-widest font-semibold transition-colors duration-200 ${
                  isScrolled ? "text-muted-foreground" : "text-white/80"
                }`}
              >
                {language === "ar" ? "استشارات هندسية وبيئية" : "Engineering Consultants"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-sm font-medium transition-colors duration-150 relative py-1 cursor-pointer ${
                  isScrolled
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-white/85 hover:text-white drop-shadow-sm"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action Controls: Language, Theme, Consultation CTA */}
          <div className="flex items-center gap-3">
            {/* Language Switch */}
            <button
              onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
              className={`px-2.5 py-1.5 rounded-lg border-0 bg-transparent text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                isScrolled
                  ? "text-foreground hover:text-accent active:text-accent"
                  : "text-white hover:text-accent active:text-accent drop-shadow-md"
              }`}
              title="Change Language"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4 transition-colors" />
              <span>{language === "ar" ? "English" : "العربية"}</span>
            </button>

            {/* Theme Switch */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`p-1.5 rounded-lg border-0 bg-transparent transition-colors cursor-pointer ${
                isScrolled
                  ? "text-foreground hover:text-accent active:text-accent"
                  : "text-white hover:text-accent active:text-accent drop-shadow-md"
              }`}
              title="Toggle Theme"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 transition-colors" />
              ) : (
                <Moon className="w-5 h-5 transition-colors" />
              )}
            </button>

            {/* Inquire CTA */}
            <button
              onClick={() => scrollToSection("contact")}
              className="hidden sm:inline-flex items-center gap-2 bg-accent text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-accent/90 transition-all active:scale-95 shadow-md cursor-pointer"
            >
              <span>{t("nav.consultation")}</span>
              {dir === "ltr" ? <ArrowRight className="w-4 h-4" /> : <ArrowRight className="w-4 h-4 rotate-180" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-0">
        {/* ================= SCROLL-LOCKED VIDEO HERO SECTION ================= */}
        <MetroHero
          titleLine1={t("hero.title_line1")}
          titleLine2={t("hero.title_line2")}
          titleLine3={t("hero.title_line3")}
          description={t("hero.description")}
          scrollHint={language === "ar" ? "مرر لأسفل لاستعراض المشروع" : "SCROLL TO EXPLORE"}
          taglineLine1={language === "ar" ? "حلول هندسية متقدمة" : "Advanced Engineering Solutions"}
          taglineLine2={language === "ar" ? "استدامة بيئية رائدة" : "Sustainable Infrastructure"}
          consultationText={t("nav.consultation")}
          viewProjectsText={t("nav.viewProjects")}
          onConsultationClick={() => scrollToSection("contact")}
          onViewProjectsClick={() => scrollToSection("projects")}
          dir={dir}
          scrubDistance={4800}
        />

        {/* ================= METRICS & STATS BAR ================= */}
        <section className="py-12 bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.length > 0 ? (
                stats.map((stat, idx) => (
                  <motion.div
                    key={stat.id || idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="flex flex-col items-center md:items-start text-center md:text-start"
                  >
                    <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-1 tracking-tight">
                      {stat.value}
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                      {t(`hero.stats.${stat.label}`) || stat.label}
                    </span>
                  </motion.div>
                ))
              ) : (
                <>
                  <div className="flex flex-col items-center md:items-start">
                    <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-1">30+</span>
                    <span className="text-xs sm:text-sm text-muted-foreground font-medium">{language === "ar" ? "عاماً من الخبرة والتميز" : "Years of Excellence"}</span>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-1">250+</span>
                    <span className="text-xs sm:text-sm text-muted-foreground font-medium">{language === "ar" ? "مشروع بنية تحتية منجز" : "Infrastructure Projects"}</span>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-1">100%</span>
                    <span className="text-xs sm:text-sm text-muted-foreground font-medium">{language === "ar" ? "مطابقة للمعايير الدولية" : "ISO Certified Quality"}</span>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-1">45M m²</span>
                    <span className="text-xs sm:text-sm text-muted-foreground font-medium">{language === "ar" ? "مساحة دراسات وتخطيط" : "Total Surveyed Area"}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ================= ABOUT / FIRM IDENTITY SECTION ================= */}
        <section id="about" className="py-24 px-6 bg-background relative overflow-hidden border-b border-border">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Left Visual Column */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-5"
              >
                <div className="relative rounded-2xl overflow-hidden border border-border shadow-md bg-card">
                  <img
                    src={patternImage}
                    alt="Civil Engineering Abstract"
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-8 text-white">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-accent text-white text-xs font-semibold mb-3 w-fit">
                      <Award className="w-3.5 h-3.5" />
                      <span>ISO 9001 & 14001</span>
                    </div>
                    <h4 className="font-serif text-2xl font-bold mb-2 text-white">
                      {language === "ar" ? "ثلاثة عقود من الريادة الهندسية" : "Three Decades of Engineering Leadership"}
                    </h4>
                    <p className="text-sm text-white/80 leading-relaxed">
                      {language === "ar" ? "دمج الابتكار التكنولوجي مع حماية البيئة والتنمية المستدامة في الشرق الأوسط." : "Pioneering sustainable civil and environmental infrastructure solutions across the region."}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Right Content Column */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7 flex flex-col items-start"
              >
                <span className="text-xs uppercase tracking-widest text-accent font-bold mb-3">
                  {t("about.subtitle")}
                </span>

                <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6">
                  {t("about.title_line1")} {t("about.title_line2")}
                </h2>

                <p className="text-base text-muted-foreground leading-relaxed mb-8">
                  {t("about.description")}
                </p>

                {/* Key Certified Points Grid */}
                <div className="grid sm:grid-cols-2 gap-4 w-full mb-8">
                  {((t("about.points") as string[]) || []).map((point, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-card border border-border shadow-sm"
                    >
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-foreground leading-snug">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => scrollToSection("services")}
                  className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:underline cursor-pointer group"
                >
                  <span>{t("about.discover")}</span>
                  {dir === "ltr" ? <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> : <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />}
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ================= SERVICES / CAPABILITIES SECTION ================= */}
        <section id="services" className="py-24 px-6 bg-card border-b border-border">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-widest text-accent font-bold mb-3 block">
                {t("services.subtitle")}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
                {t("services.title")}
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                {t("services.description")}
              </p>
            </div>

            {/* Services Grid with Clean Architectural Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, idx) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className="bg-background border border-border rounded-2xl p-7 flex flex-col justify-between h-full shadow-sm hover:border-accent/40 transition-colors"
                >
                  <div>
                    {/* Service Icon Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-muted/60 border border-border flex items-center justify-center text-accent">
                        {iconMap[service.icon] || <Building2 className="w-6 h-6 text-accent" />}
                      </div>
                      <span className="text-xs font-mono font-bold text-muted-foreground/60">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                      {t(`services.items.${service.title}.title`) || service.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {t(`services.items.${service.title}.description`) || service.description}
                    </p>
                  </div>

                  {/* Capabilities Checklist */}
                  <div className="pt-4 border-t border-border/70 space-y-2">
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-foreground/80 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= ENGINEERING METHODOLOGY (HOW WE WORK) ================= */}
        <section id="methodology" className="py-24 px-6 bg-background border-b border-border">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-widest text-accent font-bold mb-3 block">
                {language === "ar" ? "دقة التنفيذ المعماري" : "Methodology & Precision"}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
                {language === "ar" ? "منهجية الاستشارات الهندسية المتكاملة" : "Our Engineering Methodology"}
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                {language === "ar" ? "نطبق معايير هندسية صارمة من الفحص الأولي وحتى التسليم النهائي لضمان سلامة واستدامة البنية التحتية." : "Applying strict international engineering protocols from preliminary survey to final quality handover."}
              </p>
            </div>

            {/* 4-Step Process Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {methodologySteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="bg-card border border-border rounded-2xl p-6 relative flex flex-col justify-between shadow-sm hover:border-accent/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-muted/60 border border-border text-accent">
                        {step.icon}
                      </div>
                      <span className="font-mono text-xl font-bold text-muted-foreground/40">
                        {step.num}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-foreground mb-2">
                      {step.title}
                    </h3>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FEATURED PROJECTS SHOWCASE ================= */}
        <section id="projects" className="py-24 px-6 bg-card border-b border-border">
          <div className="max-w-7xl mx-auto">
            {/* Header & Filter Controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-xs uppercase tracking-widest text-accent font-bold mb-3 block">
                  {t("projects.subtitle")}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                  {t("projects.title")}
                </h2>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-accent text-white shadow-sm"
                        : "bg-background border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {cat === "all" ? (language === "ar" ? "جميع المشاريع" : "All Projects") : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Showcase Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className="bg-background border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between h-full group hover:border-accent/40 transition-colors"
                >
                  {/* Project Image Header */}
                  <div className="relative h-56 overflow-hidden bg-slate-900">
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <Building2 className="w-12 h-12 text-muted-foreground/40" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded border border-white/15">
                        {project.category}
                      </span>
                      <span className="bg-black/60 backdrop-blur-md text-white/90 text-[11px] font-mono px-2.5 py-1 rounded border border-white/15">
                        {project.year}
                      </span>
                    </div>

                    {/* Location Tag */}
                    <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-white/90 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-accent" />
                      <span>{project.location}</span>
                    </div>
                  </div>

                  {/* Project Meta Information */}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-foreground mb-2 leading-snug">
                        {t(`projects.items.${project.title}.title`) || project.title}
                      </h3>

                      <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                        {t(`projects.items.${project.title}.description`) || project.description}
                      </p>
                    </div>

                    {project.clientName && (
                      <div className="pt-4 border-t border-border/70 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          {language === "ar" ? "الجهة المالكة:" : "Client:"}
                        </span>
                        <span className="font-semibold text-foreground">
                          {project.clientName}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= TESTIMONIALS & TRUST SECTION ================= */}
        {testimonials.length > 0 && (
          <section id="testimonials" className="py-24 px-6 bg-background border-b border-border">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs uppercase tracking-widest text-accent font-bold mb-3 block">
                  {t("testimonials.subtitle")}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
                  {t("testimonials.title")}
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((test, index) => (
                  <motion.div
                    key={test.id || index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="bg-card border border-border rounded-2xl p-7 flex flex-col justify-between h-full shadow-sm"
                  >
                    <div>
                      <Quote className="w-8 h-8 text-accent/40 mb-4" />
                      <p className="text-sm text-foreground/90 leading-relaxed italic mb-6">
                        "{test.content}"
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border/70 flex items-center justify-between">
                      <div>
                        <h4 className="font-serif text-sm font-bold text-foreground">
                          {test.clientName}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {test.position} - {test.company}
                        </p>
                      </div>
                      <div className="flex text-amber-400">
                        {[...Array(test.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ================= CONSULTATION INQUIRY PORTAL ================= */}
        <section id="contact" className="py-24 px-6 bg-card border-b border-border relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              {/* Left Contact Info Column */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-5 flex flex-col justify-between h-full"
              >
                <div>
                  <span className="text-xs uppercase tracking-widest text-accent font-bold mb-3 block">
                    {t("contact.subtitle")}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-6">
                    {t("contact.title")}
                  </h2>
                  <p className="text-base text-muted-foreground leading-relaxed mb-8">
                    {t("contact.description")}
                  </p>

                  {/* Direct Contact Cards */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border shadow-sm">
                      <div className="p-3 rounded-lg bg-accent/10 text-accent">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-xs text-muted-foreground font-medium">
                          {t("contact.info.phone.label")}
                        </span>
                        <a href="tel:+201000000000" className="text-sm font-bold text-foreground hover:text-accent transition-colors">
                          +20 2 2456 7890
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border shadow-sm">
                      <div className="p-3 rounded-lg bg-accent/10 text-accent">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-xs text-muted-foreground font-medium">
                          {t("contact.info.email.label")}
                        </span>
                        <a href="mailto:info@envirocivec.com" className="text-sm font-bold text-foreground hover:text-accent transition-colors">
                          info@envirocivec.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border shadow-sm">
                      <div className="p-3 rounded-lg bg-accent/10 text-accent">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-xs text-muted-foreground font-medium">
                          {t("contact.info.address.label")}
                        </span>
                        <span className="text-sm font-bold text-foreground">
                          {t("contact.info.address.value")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ISO Trust Stamp */}
                <div className="p-5 rounded-2xl bg-muted/40 border border-border/80 flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-accent shrink-0" />
                  <div>
                    <span className="block text-xs font-bold text-foreground">
                      {language === "ar" ? "استشارات معتمدة دولياً" : "Certified Engineering Standards"}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      ISO 9001:2015 & ISO 14001 Certified Advisory
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Right Inquiry Form Column (Clean, fully clickable, no 3D transform) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-7"
              >
                <div className="bg-background border border-border rounded-2xl p-8 sm:p-10 shadow-md relative">
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-6">
                    {t("contact.form.title")}
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-5 relative">
                    {/* Invisible Honeypot field for bot spam neutralization */}
                    <div style={{ opacity: 0, position: "absolute", top: 0, left: 0, height: 0, width: 0, zIndex: -1, pointerEvents: "none" }} aria-hidden="true">
                      <input
                        type="text"
                        name="bot_trap"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.bot_trap || ""}
                        onChange={(e) => setFormData(prev => ({ ...prev, bot_trap: e.target.value }))}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-2">
                          {t("contact.form.name")} *
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={100}
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors text-sm"
                          placeholder={language === "ar" ? "الاسم الكامل أو اسم الجهة" : "Your full name or organization"}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-2">
                          {t("contact.form.email")} *
                        </label>
                        <input
                          type="email"
                          required
                          maxLength={255}
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors text-sm"
                          placeholder="name@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-2">
                          {t("contact.form.phone")}
                        </label>
                        <input
                          type="tel"
                          maxLength={30}
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors text-sm"
                          placeholder="+20 ..."
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-2">
                          {t("contact.form.service")}
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                          className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-accent transition-colors text-sm cursor-pointer"
                        >
                          <option value="">{language === "ar" ? "اختر مجال الاستشارة المطلوبة" : "Select consulting domain"}</option>
                          {services.map((service) => (
                            <option key={service.id} value={service.title}>
                              {t(`services.items.${service.title}.title`) || service.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-2">
                        {t("contact.form.message")} *
                      </label>
                      <textarea
                        required
                        rows={4}
                        maxLength={3000}
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none text-sm"
                        placeholder={language === "ar" ? "اذكر تفاصيل المشروع، الموقع، ونطاق الأعمال المطلوب..." : "Provide project scope, location, and requirements..."}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={contactMutation.isPending}
                      className="w-full inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent/90 transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-base"
                    >
                      {contactMutation.isPending ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>{t("contact.form.sending")}</span>
                        </>
                      ) : (
                        <>
                          <span>{t("contact.form.send")}</span>
                          {dir === "ltr" ? <ArrowRight className="w-4 h-4" /> : <ArrowRight className="w-4 h-4 rotate-180" />}
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* ================= ARCHITECTURAL FOOTER ================= */}
      <footer className="bg-background text-foreground py-16 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 pb-12 border-b border-border/80">
            {/* Brand Intro */}
            <div className="md:col-span-5 flex flex-col items-start">
              <Link href="/" className="flex items-center gap-3 mb-4 cursor-pointer">
                <img src={logo} alt="Enviro Civec" className="h-10 w-auto object-contain" />
                <span className="font-serif text-lg font-bold tracking-tight text-foreground">
                  {t("brandName")}
                </span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mb-6">
                {t("footer.desc")}
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground/80">
                <span>EST. 1994</span>
                <span>•</span>
                <span>CAIRO, EGYPT</span>
                <span>•</span>
                <span>ISO 9001 / 14001</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3">
              <h4 className="font-serif font-bold text-sm text-foreground uppercase tracking-wider mb-4">
                {t("footer.services")}
              </h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {services.slice(0, 5).map((service) => (
                  <li key={service.id}>
                    <button
                      onClick={() => scrollToSection("services")}
                      className="hover:text-accent transition-colors text-start cursor-pointer"
                    >
                      {t(`services.items.${service.title}.title`) || service.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className="md:col-span-4">
              <h4 className="font-serif font-bold text-sm text-foreground uppercase tracking-wider mb-4">
                {t("footer.company")}
              </h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li>
                  <button onClick={() => scrollToSection("about")} className="hover:text-accent transition-colors cursor-pointer">
                    {t("footer.links.about")}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("methodology")} className="hover:text-accent transition-colors cursor-pointer">
                    {language === "ar" ? "منهجية العمل" : "Methodology"}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("projects")} className="hover:text-accent transition-colors cursor-pointer">
                    {t("footer.links.projects")}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("contact")} className="hover:text-accent transition-colors cursor-pointer">
                    {t("footer.links.contact")}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-muted-foreground">
            <div>
              {t("footer.rights")}
            </div>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="hover:text-accent transition-colors cursor-pointer">
                {t("footer.privacy")}
              </Link>
              <Link href="/terms-of-service" className="hover:text-accent transition-colors cursor-pointer">
                {t("footer.terms")}
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0.8 }}
        transition={{ duration: 0.2 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 right-8 z-50 p-3.5 rounded-full shadow-xl transition-colors ${
          showScrollTop ? "pointer-events-auto" : "pointer-events-none"
        } bg-accent text-white hover:bg-accent/90 cursor-pointer`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
