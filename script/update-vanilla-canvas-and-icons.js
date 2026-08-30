import fs from 'fs';
import path from 'path';

const targetDir = 'C:\\Users\\ptdng\\Desktop\\Enviro-Civec';

// 1. Updated index.html with Lucide SVG icons and Canvas Hero
const indexHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Enviro-Civec | مركز استشارات الهندسة البيئية والمدنية</title>
  <meta name="description" content="مركز الاستشارات الهندسية البيئية والمدنية - حلول هندسية متقدمة واستدامة بيئية رائدة في الشرق الأوسط.">
  <link rel="icon" type="image/png" href="assets/favicon.png">
  <link rel="stylesheet" href="css/style.css">
  <!-- Lucide Icons Script -->
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
  <!-- Top Reading Progress -->
  <div id="scroll-progress"></div>

  <!-- Header Navigation -->
  <header class="site-header">
    <div class="container header-container">
      <!-- Brand Logo -->
      <a href="index.html" class="brand-link">
        <img src="assets/images/Enviro_Civec.png" alt="Enviro Civec" class="brand-logo">
        <div class="brand-text">
          <span class="brand-title" data-i18n="brandName">إنـفـايـرو سـيـفيـك</span>
          <span class="brand-subtitle">استشارات هندسية وبيئية</span>
        </div>
      </a>

      <!-- Navigation Links -->
      <nav class="nav-menu">
        <a href="#services" class="nav-link" data-scroll-to="services" data-i18n="nav.services">خدماتنا</a>
        <a href="#methodology" class="nav-link" data-scroll-to="methodology">منهجية العمل</a>
        <a href="#projects" class="nav-link" data-scroll-to="projects" data-i18n="nav.projects">المشاريع</a>
        <a href="#testimonials" class="nav-link" data-scroll-to="testimonials" data-i18n="nav.testimonials">آراء العملاء</a>
        <a href="#contact" class="nav-link" data-scroll-to="contact" data-i18n="nav.contact">تواصل معنا</a>
      </nav>

      <!-- Action Controls -->
      <div class="header-actions">
        <!-- Language Switch -->
        <button id="lang-toggle" class="icon-btn" aria-label="Toggle Language">
          <i data-lucide="globe" class="icon-sm"></i>
          <span id="lang-text">English</span>
        </button>

        <!-- Theme Switch -->
        <button id="theme-toggle" class="icon-btn" aria-label="Toggle Theme">
          <i id="theme-icon" data-lucide="moon" class="icon-sm"></i>
        </button>

        <!-- Consultation Button -->
        <button class="btn-primary" data-scroll-to="contact">
          <span data-i18n="nav.consultation">طلب استشارة</span>
          <i data-lucide="arrow-left" class="icon-sm rtl-flip"></i>
        </button>
      </div>
    </div>
  </header>

  <main>
    <!-- ================= SCROLL-LOCKED CANVAS HERO SECTION ================= -->
    <section class="hero-section" id="hero-section">
      <div class="hero-canvas-wrapper">
        <canvas id="hero-canvas" class="hero-canvas"></canvas>
        <div class="hero-overlay"></div>
      </div>

      <!-- Primary Title Panel -->
      <div class="hero-content" id="hero-title-panel">
        <div class="hero-badge">
          <i data-lucide="shield-check" class="icon-sm"></i>
          <span data-i18n="hero.badge">التميز في الهندسة البيئية والمدنية</span>
        </div>

        <h1 class="hero-title">
          <span data-i18n="hero.title_line1">بناء</span>
          <span class="text-accent" data-i18n="hero.title_line2">بنية تحتية</span>
          <span data-i18n="hero.title_line3">مـستـدامـة</span>
        </h1>

        <p class="hero-desc" data-i18n="hero.description">
          شريكك الموثوق في الاستشارات الهندسية البيئية والمدنية. نصمم بنية تحتية تخدم المجتمعات وتحترم كوكبنا.
        </p>

        <div class="hero-buttons">
          <button class="btn-primary" data-scroll-to="contact">
            <span data-i18n="nav.consultation">طلب استشارة</span>
            <i data-lucide="arrow-left" class="icon-sm rtl-flip"></i>
          </button>
          <button class="btn-secondary" data-scroll-to="projects">
            <span data-i18n="nav.viewProjects">استكشاف المشاريع</span>
          </button>
        </div>
      </div>

      <!-- Tagline Panel (Revealed on scrub) -->
      <div class="hero-tagline-panel" id="hero-tagline-panel">
        <h2 class="hero-tagline-title">حلول هندسية متقدمة</h2>
        <span class="hero-tagline-sub">استدامة بيئية رائدة</span>
      </div>

      <!-- Scroll Down Indicator -->
      <div class="hero-scroll-hint" id="hero-scroll-hint">
        <span data-i18n="hero.scroll">تمرير لأسفل</span>
        <i data-lucide="arrow-down" class="icon-sm animate-bounce"></i>
      </div>

      <!-- Bottom Scrub Line -->
      <div class="hero-bottom-bar">
        <div id="hero-fill-bar" class="hero-bottom-bar-fill"></div>
      </div>
    </section>

    <!-- ================= STATS COUNTER ================= -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-value">30+</span>
            <span class="stat-label">عاماً من الخبرة والتميز</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">250+</span>
            <span class="stat-label">مشروع بنية تحتية منجز</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">100%</span>
            <span class="stat-label">مطابقة لمعايير ISO الدولية</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">45M m²</span>
            <span class="stat-label">مساحة دراسات وتخطيط شامل</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= ABOUT FIRM ================= -->
    <section id="about" class="section">
      <div class="container">
        <div class="about-grid">
          <!-- Left Visual Image -->
          <div class="about-image-card">
            <img src="assets/images/generated_images/civil_engineering_blueprint_abstract.png" alt="Civil Engineering" class="about-image">
            <div class="about-image-overlay">
              <span class="about-badge">
                <i data-lucide="award" class="icon-xs"></i>
                <span>ISO 9001 & 14001</span>
              </span>
              <h3 class="about-overlay-title">ثلاثة عقود من الريادة الهندسية</h3>
              <p class="about-overlay-text">دمج الابتكار التكنولوجي مع حماية البيئة والتنمية المستدامة في الشرق الأوسط.</p>
            </div>
          </div>

          <!-- Right Content -->
          <div>
            <span class="section-subtitle" data-i18n="about.subtitle">عن إنفايرو-سيفيك</span>
            <h2 class="section-title">
              <span data-i18n="about.title_line1">مركز استشارات</span><br>
              <span data-i18n="about.title_line2">الهندسة البيئية والمدنية</span>
            </h2>
            <p class="section-desc" data-i18n="about.description">
              لأكثر من ثلاثة عقود، كانت إنفايرو-سيفيك رائدة في الاستشارات الهندسية البيئية والمدنية. نجمع بين الخبرة الفنية والمسؤولية البيئية لتقديم حلول بنية تحتية تصمد أمام اختبار الزمن مع حماية مواردنا الطبيعية.
            </p>

            <div class="about-points-grid">
              <div class="about-point">
                <i data-lucide="check-circle-2" class="about-point-icon"></i>
                <span>شهادة ISO 9001:2015 و ISO 14001</span>
              </div>
              <div class="about-point">
                <i data-lucide="check-circle-2" class="about-point-icon"></i>
                <span>تطوير البنية التحتية المستدامة</span>
              </div>
              <div class="about-point">
                <i data-lucide="check-circle-2" class="about-point-icon"></i>
                <span>خبراء تقييم الأثر البيئي (EIA)</span>
              </div>
              <div class="about-point">
                <i data-lucide="check-circle-2" class="about-point-icon"></i>
                <span>تكامل متقدم لـ BIM ونظم GIS</span>
              </div>
            </div>

            <button class="btn-primary" data-scroll-to="services">
              <span data-i18n="about.discover">اكتشف خدماتنا</span>
              <i data-lucide="arrow-left" class="icon-sm rtl-flip"></i>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= METHODOLOGY ================= -->
    <section id="methodology" class="section" style="background: var(--bg-secondary);">
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle">منهجية العمل الهندسية</span>
          <h2 class="section-title">معايير دقيقة لكل مراحل المشروع</h2>
          <p class="section-desc">نعتمد أفضل الممارسات الهندسية والتقنيات الرقمية لضمان تنفيذ آمن وفعال ومستدام.</p>
        </div>

        <div class="methodology-grid">
          <div class="methodology-card">
            <span class="methodology-step-num">01</span>
            <div class="methodology-icon-wrap">
              <i data-lucide="drafting-compass" class="icon-md"></i>
            </div>
            <h3 class="methodology-title">المسح والدراسات الجيوتقنية</h3>
            <p class="methodology-desc">فحص طبقات التربة، الدراسات الهيدرولوجية، والمسح الطبوغرافي الشامل لتأسيس قاعدة بيانات دقيقة.</p>
          </div>

          <div class="methodology-card">
            <span class="methodology-step-num">02</span>
            <div class="methodology-icon-wrap">
              <i data-lucide="cpu" class="icon-md"></i>
            </div>
            <h3 class="methodology-title">النمذجة الرقمية وتكامل BIM</h3>
            <p class="methodology-desc">محاكاة ثلاثية الأبعاد متقدمة لكافة شبكات البنية التحتية والمباني لضمان دقة التنفيذ ومنع التعارضات.</p>
          </div>

          <div class="methodology-card">
            <span class="methodology-step-num">03</span>
            <div class="methodology-icon-wrap">
              <i data-lucide="activity" class="icon-md"></i>
            </div>
            <h3 class="methodology-title">تقييم الأثر البيئي والاستدامة</h3>
            <p class="methodology-desc">دراسات معتمدة للحفاظ على الموارد، إدارة تصريف السيول، وتقليل الانبعاثات الكربونية في كل مشروع.</p>
          </div>

          <div class="methodology-card">
            <span class="methodology-step-num">04</span>
            <div class="methodology-icon-wrap">
              <i data-lucide="file-check-2" class="icon-md"></i>
            </div>
            <h3 class="methodology-title">الإشراف الهندسي وضمان الجودة</h3>
            <p class="methodology-desc">متابعة دقيقة لمطابقة المواصفات القياسية الدولية ومعايير ISO في كافة مراحل التنفيذ.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= SERVICES ================= -->
    <section id="services" class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle" data-i18n="services.subtitle">خبراتنا</span>
          <h2 class="section-title" data-i18n="services.title">خدمات هندسة البنية التحتية</h2>
          <p class="section-desc" data-i18n="services.description">حلول شاملة للهندسة المدنية والبيئية من أجل تنمية مستدامة.</p>
        </div>

        <div class="services-grid">
          <!-- Service 1 -->
          <div class="service-card">
            <div class="service-icon-box">
              <i data-lucide="leaf" class="icon-md"></i>
            </div>
            <h3 class="service-card-title">الهندسة البيئية</h3>
            <p class="service-card-desc">حلول مستدامة للتحديات البيئية، وضمان الامتثال البيئي وحماية النظم البيئية.</p>
            <ul class="service-features-list">
              <li class="service-feature-item"><i data-lucide="check" class="icon-xs"></i> <span>تقييم الأثر البيئي</span></li>
              <li class="service-feature-item"><i data-lucide="check" class="icon-xs"></i> <span>إدارة النفايات وإعادة التدوير</span></li>
              <li class="service-feature-item"><i data-lucide="check" class="icon-xs"></i> <span>مكافحة التلوث ومعالجة الانبعاثات</span></li>
            </ul>
          </div>

          <!-- Service 2 -->
          <div class="service-card">
            <div class="service-icon-box">
              <i data-lucide="building-2" class="icon-md"></i>
            </div>
            <h3 class="service-card-title">الهندسة المدنية</h3>
            <p class="service-card-desc">خدمات هندسة مدنية شاملة للبنية التحتية، الطرق، والمنشآت الكبرى.</p>
            <ul class="service-features-list">
              <li class="service-feature-item"><i data-lucide="check" class="icon-xs"></i> <span>التصميم الإنشائي المتقدم</span></li>
              <li class="service-feature-item"><i data-lucide="check" class="icon-xs"></i> <span>التخطيط العمراني وتصميم الطرق</span></li>
              <li class="service-feature-item"><i data-lucide="check" class="icon-xs"></i> <span>إدارة التشييد والإشراف الميداني</span></li>
            </ul>
          </div>

          <!-- Service 3 -->
          <div class="service-card">
            <div class="service-icon-box">
              <i data-lucide="waves" class="icon-md"></i>
            </div>
            <h3 class="service-card-title">الموارد المائية</h3>
            <p class="service-card-desc">إدارة وهندسة خبيرة لشبكات المياه ومحطات المعالجة وتصريف السيول.</p>
            <ul class="service-features-list">
              <li class="service-feature-item"><i data-lucide="check" class="icon-xs"></i> <span>الهيدرولوجيا وهندسة الأنهار</span></li>
              <li class="service-feature-item"><i data-lucide="check" class="icon-xs"></i> <span>تصميم محطات معالجة المياه</span></li>
              <li class="service-feature-item"><i data-lucide="check" class="icon-xs"></i> <span>إدارة وتصريف مياه الأمطار والسيول</span></li>
            </ul>
          </div>

          <!-- Service 4 -->
          <div class="service-card">
            <div class="service-icon-box">
              <i data-lucide="mountain" class="icon-md"></i>
            </div>
            <h3 class="service-card-title">الخدمات الجيوتقنية</h3>
            <p class="service-card-desc">التحليل والتصميم المتعلق بميكانيكا التربة واستقرار الأساسات والمنحدرات.</p>
            <ul class="service-features-list">
              <li class="service-feature-item"><i data-lucide="check" class="icon-xs"></i> <span>اختبارات التربة والجسات العميقة</span></li>
              <li class="service-feature-item"><i data-lucide="check" class="icon-xs"></i> <span>تصميم الأساسات السطحية والعميقة</span></li>
              <li class="service-feature-item"><i data-lucide="check" class="icon-xs"></i> <span>تحليل استقرار المنحدرات وحماية التربة</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= FEATURED PROJECTS ================= -->
    <section id="projects" class="section" style="background: var(--bg-secondary);">
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle" data-i18n="projects.subtitle">معرض أعمالنا</span>
          <h2 class="section-title" data-i18n="projects.title">مشاريع مميزة</h2>
          <p class="section-desc" data-i18n="projects.description">استكشف أحدث إنجازاتنا في البنية التحتية التي تغير المجتمعات.</p>
        </div>

        <!-- Filter Tabs -->
        <div class="projects-filter-tabs">
          <button class="filter-tab active" data-filter="all">الكل</button>
          <button class="filter-tab" data-filter="Civil Engineering">الهندسة المدنية</button>
          <button class="filter-tab" data-filter="Water Resources">الموارد المائية</button>
          <button class="filter-tab" data-filter="Renewable Energy">الطاقة المتجددة</button>
          <button class="filter-tab" data-filter="Environmental">البيئة</button>
        </div>

        <!-- Projects Grid -->
        <div class="projects-grid">
          <!-- Project 1 -->
          <div class="project-card" data-category="Civil Engineering">
            <div class="project-image-wrap">
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" alt="Eco-Friendly Complex" class="project-image">
              <span class="project-category-badge">الهندسة المدنية</span>
            </div>
            <div class="project-info">
              <h3 class="project-title">مجمع مكتبي صديق للبيئة</h3>
              <p class="project-desc">مبنى مكتبي مستدام حديث حاصل على شهادة LEED البلاتينية مع تصميم إنشائي متكامل.</p>
              <div class="project-meta">
                <span>العميل: <strong class="project-client-name">شركة جرين كورب</strong></span>
                <span>القاهرة، مصر (2024)</span>
              </div>
            </div>
          </div>

          <!-- Project 2 -->
          <div class="project-card" data-category="Water Resources">
            <div class="project-image-wrap">
              <img src="https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&q=80&w=800" alt="Water Treatment Plant" class="project-image">
              <span class="project-category-badge">الموارد المائية</span>
            </div>
            <div class="project-info">
              <h3 class="project-title">محطة معالجة مياه النهر</h3>
              <p class="project-desc">تحديث وتطوير البنية التحتية لمعالجة المياه بتقنيات ترشيح حديثة لخدمة 500,000 نسمة.</p>
              <div class="project-meta">
                <span>العميل: <strong class="project-client-name">وزارة الموارد المائية</strong></span>
                <span>الجيزة، مصر (2023)</span>
              </div>
            </div>
          </div>

          <!-- Project 3 -->
          <div class="project-card" data-category="Renewable Energy">
            <div class="project-image-wrap">
              <img src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800" alt="Solar Park Infrastructure" class="project-image">
              <span class="project-category-badge">الطاقة المتجددة</span>
            </div>
            <div class="project-info">
              <h3 class="project-title">بنية تحتية لمجمع الطاقة الشمسية</h3>
              <p class="project-desc">الأعمال المدنية وتصميم الأساسات وتصريف السيول لمحطة طاقة شمسية بقدرة 50 ميجاوات.</p>
              <div class="project-meta">
                <span>العميل: <strong class="project-client-name">شمس مصر للطاقة</strong></span>
                <span>أسوان، مصر (2023)</span>
              </div>
            </div>
          </div>

          <!-- Project 4 -->
          <div class="project-card" data-category="Environmental">
            <div class="project-image-wrap">
              <img src="https://images.unsplash.com/photo-1496417263034-38ec4f0d6b21?auto=format&fit=crop&q=80&w=800" alt="Urban Park" class="project-image">
              <span class="project-category-badge">البيئة</span>
            </div>
            <div class="project-info">
              <h3 class="project-title">تطوير الحديقة الحضرية وتأهيل الموقع</h3>
              <p class="project-desc">تحويل موقع صناعي مهجور إلى مساحة خضراء عامة مزدهرة ومحمية بيئية مستدامة.</p>
              <div class="project-meta">
                <span>العميل: <strong class="project-client-name">مجلس المدينة</strong></span>
                <span>الإسكندرية، مصر (2024)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= TESTIMONIALS ================= -->
    <section id="testimonials" class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle" data-i18n="testimonials.subtitle">قصص العملاء</span>
          <h2 class="section-title" data-i18n="testimonials.title">ماذا يقول عملاؤنا</h2>
          <p class="section-desc" data-i18n="testimonials.description">موثوق بنا من قبل المؤسسات والشركات الرائدة في جميع أنحاء المنطقة.</p>
        </div>

        <div class="testimonials-grid">
          <div class="testimonial-card">
            <i data-lucide="quote" class="testimonial-quote-icon"></i>
            <p class="testimonial-text">"بناء مستقبل مستدام يتطلب رؤية وتفانٍ. نحن فخورون بقيادة الطريق في التميز الهندسي البيئي وتطبيق أعلى معايير الجودة."</p>
            <div class="testimonial-author">
              <div class="testimonial-avatar">خ</div>
              <div>
                <h4 class="testimonial-author-name">خالد سويلم</h4>
                <span class="testimonial-author-role">الرئيس التنفيذي والمؤسس</span>
              </div>
            </div>
          </div>

          <div class="testimonial-card">
            <i data-lucide="quote" class="testimonial-quote-icon"></i>
            <p class="testimonial-text">"التزام فريقنا بالابتكار والجودة يضمن أن كل مشروع نقوم به يلبي أعلى المعايير العالمية في الدقة الهندسية وحماية البيئة."</p>
            <div class="testimonial-author">
              <div class="testimonial-avatar">ح</div>
              <div>
                <h4 class="testimonial-author-name">حسين محمد</h4>
                <span class="testimonial-author-role">نائب الرئيس</span>
              </div>
            </div>
          </div>

          <div class="testimonial-card">
            <i data-lucide="quote" class="testimonial-quote-icon"></i>
            <p class="testimonial-text">"تنفيذ إنفايرو-سيفيك لتقنيات CAD و BIM المتقدمة في سير عملهم هو حقاً عالمي المستوى ويضع معياراً جديداً في قطاع البنية التحتية."</p>
            <div class="testimonial-author">
              <div class="testimonial-avatar">J</div>
              <div>
                <h4 class="testimonial-author-name">John Walker</h4>
                <span class="testimonial-author-role">مؤسس أوتوكاد (AutoCAD Founder)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= WHY CHOOSE US ================= -->
    <section class="section" style="background: var(--bg-secondary);">
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle" data-i18n="expertise.subtitle">لماذا تختارنا</span>
          <h2 class="section-title">تميز هندسي مبني على الخبرة</h2>
          <p class="section-desc">مع ثلاثة عقود من تنفيذ مشاريع البنية التحتية المعقدة، نقدم خبرة استثنائية وسجل حافل بالنجاح.</p>
        </div>

        <div class="expertise-grid">
          <div class="expertise-card">
            <h3 class="expertise-card-title">نهج متكامل</h3>
            <p class="expertise-card-desc">الهندسة البيئية والمدنية تحت سقف واحد لتسليم المشاريع المتكاملة بسلاسة ودقة متناهية.</p>
          </div>
          <div class="expertise-card">
            <h3 class="expertise-card-title">تقنية متطورة</h3>
            <p class="expertise-card-desc">نمذجة معلومات البناء (BIM)، نظم المعلومات الجغرافية (GIS)، والمحاكاة الرقمية المتقدمة.</p>
          </div>
          <div class="expertise-card">
            <h3 class="expertise-card-title">تركيز مستدام</h3>
            <p class="expertise-card-desc">كل مشروع مصمم مع وضع الاستدامة والمسؤولية البيئية وتقليل الانبعاثات في جوهره.</p>
          </div>
          <div class="expertise-card">
            <h3 class="expertise-card-title">خبرة إقليمية</h3>
            <p class="expertise-card-desc">فهم عميق للوائح والظروف الجيولوجية والهيدرولوجية والمتطلبات التنظيمية في المنطقة.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= CTA BANNER ================= -->
    <section class="section" style="padding-bottom: 0;">
      <div class="container">
        <div class="cta-banner">
          <h2 class="cta-title">جاهز لبناء بنية تحتية مستدامة؟</h2>
          <p class="cta-desc">شارك إنفايرو-سيفيك من أجل حلول هندسية توازن بين الابتكار والاستدامة والموثوقية. اتصل بنا اليوم للحصول على استشارة هندسية متخصصة.</p>
          <div class="cta-buttons">
            <button class="btn-primary" data-scroll-to="contact" data-i18n="cta.request">
              <span>طلب استشارة</span>
              <i data-lucide="arrow-left" class="icon-sm rtl-flip"></i>
            </button>
            <a href="tel:+15551234567" class="btn-secondary">
              <i data-lucide="phone" class="icon-sm"></i>
              <span>اتصل بنا الآن</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= CONTACT ================= -->
    <section id="contact" class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle" data-i18n="contact.subtitle">تواصل معنا</span>
          <h2 class="section-title" data-i18n="contact.title">لنناقش مشروع البنية التحتية الخاص بك</h2>
          <p class="section-desc" data-i18n="contact.description">سواء كنت بحاجة إلى استشارات بيئية، تصميم هندسي مدني، أو إدارة مشاريع، فإن فريق الخبراء لدينا مستعد للمساعدة.</p>
        </div>

        <div class="contact-grid">
          <!-- Contact Info -->
          <div class="contact-info-panel">
            <div class="contact-info-item">
              <div class="contact-icon-box">
                <i data-lucide="map-pin" class="icon-md"></i>
              </div>
              <div>
                <h4 class="contact-info-title">المكتب الرئيسي</h4>
                <p class="contact-info-text">المنطقة الهندسية، مبنى 45، مدينة البنية التحتية، القاهرة، مصر</p>
              </div>
            </div>

            <div class="contact-info-item">
              <div class="contact-icon-box">
                <i data-lucide="phone" class="icon-md"></i>
              </div>
              <div>
                <h4 class="contact-info-title">الهاتف</h4>
                <p class="contact-info-text">+20 2 1234 5678 / +1 (555) 123-4567</p>
              </div>
            </div>

            <div class="contact-info-item">
              <div class="contact-icon-box">
                <i data-lucide="mail" class="icon-md"></i>
              </div>
              <div>
                <h4 class="contact-info-title">البريد الإلكتروني</h4>
                <p class="contact-info-text">info@envirocivec.com</p>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="contact-form-card">
            <form id="contact-form">
              <div class="form-group">
                <label class="form-label" for="form-name">الاسم الكريم</label>
                <input type="text" id="form-name" class="form-input" placeholder="اسمك الكامل" required>
              </div>

              <div class="form-group">
                <label class="form-label" for="form-email">البريد الإلكتروني</label>
                <input type="email" id="form-email" class="form-input" placeholder="name@company.com" required>
              </div>

              <div class="form-group">
                <label class="form-label" for="form-phone">رقم الهاتف (اختياري)</label>
                <input type="tel" id="form-phone" class="form-input" placeholder="+20 100 000 0000">
              </div>

              <div class="form-group">
                <label class="form-label" for="form-service">الخدمة المطلوبة</label>
                <select id="form-service" class="form-select" required>
                  <option value="">اختر الخدمة...</option>
                  <option value="Environmental Engineering">الهندسة البيئية وتقييم الأثر</option>
                  <option value="Civil Engineering">الهندسة المدنية وتصميم المنشآت</option>
                  <option value="Water Resources">الموارد المائية ومعالجة المياه</option>
                  <option value="Geotechnical Services">الدراسات الجيوتقنية والتربة</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="form-message">وصف المشروع أو الاستفسار</label>
                <textarea id="form-message" class="form-textarea" placeholder="أخبرنا عن متطلبات وتفاصيل مشروعك..." required></textarea>
              </div>

              <button type="submit" class="btn-primary" style="width: 100%;">
                <span>إرسال الطلب</span>
                <i data-lucide="arrow-left" class="icon-sm rtl-flip"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- ================= FOOTER ================= -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <h3 class="footer-brand-title">إنـفـايـرو سـيـفيـك</h3>
          <p class="footer-desc" data-i18n="footer.desc">
            مركز الاستشارات الهندسية البيئية - المدنية. بناء بنية تحتية مستدامة لغد أفضل.
          </p>
        </div>

        <div>
          <h4 class="footer-heading" data-i18n="footer.services">الخدمات</h4>
          <ul class="footer-links">
            <li><a href="#services" class="footer-link">الهندسة البيئية</a></li>
            <li><a href="#services" class="footer-link">الهندسة المدنية</a></li>
            <li><a href="#services" class="footer-link">الموارد المائية</a></li>
            <li><a href="#services" class="footer-link">الخدمات الجيوتقنية</a></li>
          </ul>
        </div>

        <div>
          <h4 class="footer-heading" data-i18n="footer.company">الشركة</h4>
          <ul class="footer-links">
            <li><a href="#about" class="footer-link" data-i18n="footer.links.about">من نحن</a></li>
            <li><a href="#projects" class="footer-link" data-i18n="footer.links.projects">المشاريع</a></li>
            <li><a href="#testimonials" class="footer-link" data-i18n="footer.links.testimonials">آراء العملاء</a></li>
            <li><a href="#contact" class="footer-link" data-i18n="footer.links.contact">اتصل بنا</a></li>
          </ul>
        </div>

        <div>
          <h4 class="footer-heading">معلومات التواصل</h4>
          <ul class="footer-links">
            <li class="footer-link">📍 القاهرة، جمهورية مصر العربية</li>
            <li class="footer-link">📞 +20 2 1234 5678</li>
            <li class="footer-link">✉️ info@envirocivec.com</li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <span data-i18n="footer.rights">© 2026 إنفايرو-سيفيك. جميع الحقوق محفوظة.</span>
        <div class="footer-legal-links">
          <a href="privacy-policy.html" class="footer-link" data-i18n="footer.privacy">سياسة الخصوصية</a>
          <a href="terms-of-service.html" class="footer-link" data-i18n="footer.terms">شروط الخدمة</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Scripts -->
  <script type="module" src="js/main.js"></script>
</body>
</html>`;

fs.writeFileSync(path.join(targetDir, 'index.html'), indexHtml, 'utf8');

// 2. Updated js/main.js with Apple-style Frame Scrubbing Engine & Scroll-Lock
const jsMain = `/**
 * Enviro-Civec - Interactive Application Engine
 * Apple-style 60fps Canvas Frame Scrubbing with Smooth Scroll-Lock
 */
import { translations } from './translations.js';
import { AutoCADCursor } from './autocad-cursor.js';

class AppEngine {
  constructor() {
    this.currentLanguage = localStorage.getItem('language') || 'ar';
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.currentFilter = 'all';

    // Canvas Frame Scrubbing State
    this.totalFrames = 141;
    this.images = [];
    this.imagesLoaded = 0;
    this.currentProgress = 0;
    this.targetProgress = 0;
    this.scrubDistance = 3200; // Optimal scrub distance for smooth response
    this.isLocked = false;
    this.touchStartY = 0;
    this.rafId = 0;

    this.init();
  }

  init() {
    // 1. Initialize AutoCAD Cursor
    new AutoCADCursor();

    // 2. Setup Theme & Language
    this.applyTheme(this.currentTheme);
    this.applyLanguage(this.currentLanguage);

    // 3. Preload Canvas Video Frames
    this.preloadHeroFrames();

    // 4. Setup Event Handlers
    this.bindEvents();
    this.setupScrollProgress();
    this.setupScrollLockHero();
    this.setupProjectsFilter();
    this.setupContactForm();

    // 5. Render Lucide Icons
    this.renderIcons();
  }

  renderIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  bindEvents() {
    // Language Toggle
    const langToggleBtn = document.getElementById('lang-toggle');
    if (langToggleBtn) {
      langToggleBtn.addEventListener('click', () => {
        const newLang = this.currentLanguage === 'ar' ? 'en' : 'ar';
        this.applyLanguage(newLang);
      });
    }

    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
      });
    }

    // Smooth Scroll Links
    document.querySelectorAll('[data-scroll-to]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.releaseLock();
        const targetId = btn.getAttribute('data-scroll-to');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);

    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
      themeIcon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
      this.renderIcons();
    }
  }

  applyLanguage(lang) {
    this.currentLanguage = lang;
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem('language', lang);

    const langText = document.getElementById('lang-text');
    if (langText) {
      langText.textContent = lang === 'ar' ? 'English' : 'العربية';
    }

    this.translateDOM();
    this.renderIcons();
  }

  t(key) {
    const dict = translations[this.currentLanguage] || translations.ar;
    return key.split('.').reduce((acc, part) => (acc ? acc[part] : null), dict) || key;
  }

  translateDOM() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = this.t(key);
      if (val && typeof val === 'string') {
        el.textContent = val;
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = this.t(key);
      if (val && typeof val === 'string') {
        el.setAttribute('placeholder', val);
      }
    });
  }

  preloadHeroFrames() {
    this.canvas = document.getElementById('hero-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d', { alpha: false });

    // Preload all extracted frames
    for (let i = 1; i <= this.totalFrames; i++) {
      const img = new Image();
      const numStr = String(i).padStart(4, '0');
      img.src = \`assets/hero_frames/frame_\${numStr}.jpg\`;
      img.onload = () => {
        this.imagesLoaded++;
        if (this.imagesLoaded === 1) {
          this.resizeCanvas();
          this.drawFrame(0);
        }
      };
      this.images.push(img);
    }

    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.drawFrame(Math.floor(this.currentProgress * (this.totalFrames - 1)));
  }

  drawFrame(frameIndex) {
    if (!this.ctx || !this.canvas) return;
    const idx = Math.max(0, Math.min(this.totalFrames - 1, frameIndex));
    const img = this.images[idx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = this.canvas.width;
    const ch = this.canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Aspect-cover scaling
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const ox = (cw - sw) / 2;
    const oy = (ch - sh) / 2;

    this.ctx.drawImage(img, ox, oy, sw, sh);
  }

  setupScrollLockHero() {
    const heroSection = document.getElementById('hero-section');
    if (!heroSection) return;

    // Engage lock initially if at very top
    if (window.scrollY < 10) {
      this.engageLock();
    }

    // Wheel Event Listener
    window.addEventListener('wheel', (e) => {
      if (window.scrollY > 20) {
        if (this.isLocked) this.releaseLock();
        return;
      }

      if (this.isLocked) {
        const handled = this.addDelta(e.deltaY);
        if (handled) {
          e.preventDefault();
        }
      } else if (window.scrollY <= 2 && e.deltaY < 0) {
        this.targetProgress = 1;
        this.currentProgress = 1;
        this.engageLock();
      }
    }, { passive: false });

    // Touch Support
    window.addEventListener('touchstart', (e) => {
      this.touchStartY = e.touches[0]?.clientY ?? 0;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (window.scrollY > 20) {
        if (this.isLocked) this.releaseLock();
        return;
      }
      if (!this.isLocked && window.scrollY > 5) return;

      const y = e.touches[0]?.clientY ?? this.touchStartY;
      const deltaY = this.touchStartY - y;
      this.touchStartY = y;

      const handled = this.addDelta(deltaY);
      if (handled) {
        e.preventDefault();
      }
    }, { passive: false });

    // Frame Animation Loop
    const loop = () => {
      // Smooth spring interpolation
      this.currentProgress += (this.targetProgress - this.currentProgress) * 0.15;

      const frameIdx = Math.floor(this.currentProgress * (this.totalFrames - 1));
      this.drawFrame(frameIdx);

      // UI Transitions
      this.updateHeroUI(this.currentProgress);

      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  addDelta(deltaY) {
    if (!this.isLocked) return false;

    const next = this.targetProgress + deltaY / this.scrubDistance;

    if (next >= 1 && deltaY > 0) {
      this.targetProgress = 1;
      this.releaseLock();
      return false;
    }

    if (next <= 0 && deltaY < 0) {
      this.targetProgress = 0;
      return true;
    }

    this.targetProgress = Math.max(0, Math.min(1, next));
    return true;
  }

  engageLock() {
    if (this.isLocked) return;
    this.isLocked = true;
    document.body.style.overflow = 'hidden';
  }

  releaseLock() {
    this.isLocked = false;
    document.body.style.overflow = '';
  }

  updateHeroUI(progress) {
    const titlePanel = document.getElementById('hero-title-panel');
    const taglinePanel = document.getElementById('hero-tagline-panel');
    const fillBar = document.getElementById('hero-fill-bar');
    const scrollHint = document.getElementById('hero-scroll-hint');

    if (fillBar) {
      fillBar.style.width = \`\${progress * 100}%\`;
    }

    if (scrollHint) {
      scrollHint.style.opacity = progress > 0.05 ? '0' : '1';
    }

    if (titlePanel) {
      const t = Math.max(0, 1 - progress / 0.4);
      titlePanel.style.opacity = String(t);
      titlePanel.style.transform = \`translateY(\${(1 - t) * -25}px) scale(\${0.96 + t * 0.04})\`;
      titlePanel.style.pointerEvents = t > 0.2 ? 'auto' : 'none';
    }

    if (taglinePanel) {
      const t = Math.max(0, Math.min(1, (progress - 0.7) / 0.3));
      taglinePanel.style.opacity = String(t);
      taglinePanel.style.transform = \`translateY(\${(1 - t) * 20}px) scale(\${0.96 + t * 0.04})\`;
    }
  }

  setupScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    const header = document.querySelector('.site-header');

    window.addEventListener('scroll', () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
      if (progressBar) {
        progressBar.style.width = \`\${progress}%\`;
      }

      if (header) {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    }, { passive: true });
  }

  setupProjectsFilter() {
    const tabs = document.querySelectorAll('.filter-tab');
    const projectCards = document.querySelectorAll('.project-card');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const category = tab.getAttribute('data-filter');
        this.currentFilter = category;

        projectCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (category === 'all' || cardCat === category) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = this.currentLanguage === 'ar' ? '<span>جاري الإرسال...</span>' : '<span>Sending...</span>';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        form.reset();
        this.renderIcons();
        this.showToast(
          this.currentLanguage === 'ar'
            ? 'تم إرسال طلبك بنجاح! سيتواصل معك أحد مهندسينا قريباً.'
            : 'Your message has been sent successfully! Our engineering team will contact you soon.'
        );
      }, 1000);
    });
  }

  showToast(msg) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = \`<i data-lucide="check-circle-2" class="icon-sm" style="color: var(--accent);"></i> <span>\${msg}</span>\`;
    container.appendChild(toast);
    this.renderIcons();

    setTimeout(() => {
      toast.remove();
    }, 4500);
  }
}

// Start Engine
document.addEventListener('DOMContentLoaded', () => {
  new AppEngine();
});
`;

fs.writeFileSync(path.join(targetDir, 'js', 'main.js'), jsMain, 'utf8');

// 3. Updated css/style.css with Canvas & Tagline styling
const currentCss = fs.readFileSync(path.join(targetDir, 'css', 'style.css'), 'utf8');
const updatedCss = currentCss.replace(
  '.hero-video-wrapper {',
  `.icon-xs { width: 14px; height: 14px; display: inline-block; vertical-align: middle; }
.icon-sm { width: 18px; height: 18px; display: inline-block; vertical-align: middle; }
.icon-md { width: 24px; height: 24px; display: inline-block; vertical-align: middle; }
.icon-lg { width: 32px; height: 32px; display: inline-block; vertical-align: middle; }

[dir="rtl"] .rtl-flip {
  transform: scaleX(-1);
}

.hero-canvas-wrapper {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.hero-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hero-tagline-panel {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 24px;
  opacity: 0;
  pointer-events: none;
  z-index: 15;
}

.hero-tagline-title {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 12px;
  text-shadow: 0 10px 30px rgba(0,0,0,0.9);
}

.hero-tagline-sub {
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 3.5vw, 3rem);
  font-weight: 700;
  color: var(--accent);
  text-shadow: 0 10px 30px rgba(0,0,0,0.9);
}

.hero-video-wrapper {`
);

fs.writeFileSync(path.join(targetDir, 'css', 'style.css'), updatedCss, 'utf8');

console.log('Updated index.html, main.js, and style.css with Lucide icons and Apple-style Canvas scrubbing!');
