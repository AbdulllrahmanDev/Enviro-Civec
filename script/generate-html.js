import fs from 'fs';
import path from 'path';

const targetDir = 'C:\\Users\\ptdng\\Desktop\\Enviro-Civec';

// ==========================================
// 1. INDEX.HTML
// ==========================================
const indexHtmlContent = `<!DOCTYPE html>
<html lang="ar" dir="rtl" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Enviro-Civec | مركز استشارات الهندسة البيئية والمدنية</title>
  <meta name="description" content="مركز الاستشارات الهندسية البيئية والمدنية - حلول هندسية متقدمة واستدامة بيئية رائدة في الشرق الأوسط.">
  <link rel="icon" type="image/png" href="assets/favicon.png">
  <link rel="stylesheet" href="css/style.css">
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
          <span>🌐</span>
          <span id="lang-text">English</span>
        </button>

        <!-- Theme Switch -->
        <button id="theme-toggle" class="icon-btn" aria-label="Toggle Theme">
          <span id="theme-icon">🌙</span>
        </button>

        <!-- Consultation Button -->
        <button class="btn-primary" data-scroll-to="contact" data-i18n="nav.consultation">
          طلب استشارة
        </button>
      </div>
    </div>
  </header>

  <main>
    <!-- ================= HERO SECTION ================= -->
    <section class="hero-section">
      <div class="hero-video-wrapper">
        <video id="hero-video" class="hero-video" muted playsinline autoplay loop preload="auto" poster="assets/images/generated_images/infrastructure_engineering_hero_background.png">
          <source src="assets/videos/infrastructure.hero.mp4" type="video/mp4">
          <source src="assets/videos/infrastructure_hero.mp4" type="video/mp4">
        </video>
        <div class="hero-overlay"></div>
      </div>

      <div class="hero-content">
        <div class="hero-badge">
          <span>🛡️</span>
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
          <button class="btn-primary" data-scroll-to="contact" data-i18n="nav.consultation">طلب استشارة</button>
          <button class="btn-secondary" data-scroll-to="projects" data-i18n="nav.viewProjects">استكشاف المشاريع</button>
        </div>
      </div>

      <div class="hero-scroll-hint">
        <span data-i18n="hero.scroll">تمرير لأسفل</span>
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M7 1 L7 17 M2 12 L7 17 L12 12" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

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
              <span class="about-badge">ISO 9001 & 14001</span>
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
                <span class="about-point-icon">✓</span>
                <span>شهادة ISO 9001:2015 و ISO 14001</span>
              </div>
              <div class="about-point">
                <span class="about-point-icon">✓</span>
                <span>تطوير البنية التحتية المستدامة</span>
              </div>
              <div class="about-point">
                <span class="about-point-icon">✓</span>
                <span>خبراء تقييم الأثر البيئي (EIA)</span>
              </div>
              <div class="about-point">
                <span class="about-point-icon">✓</span>
                <span>تكامل متقدم لـ BIM ونظم GIS</span>
              </div>
            </div>

            <button class="btn-primary" data-scroll-to="services" data-i18n="about.discover">اكتشف خدماتنا</button>
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
            <div class="methodology-icon-wrap">📐</div>
            <h3 class="methodology-title">المسح والدراسات الجيوتقنية</h3>
            <p class="methodology-desc">فحص طبقات التربة، الدراسات الهيدرولوجية، والمسح الطبوغرافي الشامل لتأسيس قاعدة بيانات دقيقة.</p>
          </div>

          <div class="methodology-card">
            <span class="methodology-step-num">02</span>
            <div class="methodology-icon-wrap">💻</div>
            <h3 class="methodology-title">النمذجة الرقمية وتكامل BIM</h3>
            <p class="methodology-desc">محاكاة ثلاثية الأبعاد متقدمة لكافة شبكات البنية التحتية والمباني لضمان دقة التنفيذ ومنع التعارضات.</p>
          </div>

          <div class="methodology-card">
            <span class="methodology-step-num">03</span>
            <div class="methodology-icon-wrap">🌿</div>
            <h3 class="methodology-title">تقييم الأثر البيئي والاستدامة</h3>
            <p class="methodology-desc">دراسات معتمدة للحفاظ على الموارد، إدارة تصريف السيول، وتقليل الانبعاثات الكربونية في كل مشروع.</p>
          </div>

          <div class="methodology-card">
            <span class="methodology-step-num">04</span>
            <div class="methodology-icon-wrap">📋</div>
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
            <div class="service-icon-box">🌱</div>
            <h3 class="service-card-title">الهندسة البيئية</h3>
            <p class="service-card-desc">حلول مستدامة للتحديات البيئية، وضمان الامتثال البيئي وحماية النظم البيئية.</p>
            <ul class="service-features-list">
              <li class="service-feature-item"><span>•</span> <span>تقييم الأثر البيئي</span></li>
              <li class="service-feature-item"><span>•</span> <span>إدارة النفايات وإعادة التدوير</span></li>
              <li class="service-feature-item"><span>•</span> <span>مكافحة التلوث ومعالجة الانبعاثات</span></li>
            </ul>
          </div>

          <!-- Service 2 -->
          <div class="service-card">
            <div class="service-icon-box">🏢</div>
            <h3 class="service-card-title">الهندسة المدنية</h3>
            <p class="service-card-desc">خدمات هندسة مدنية شاملة للبنية التحتية، الطرق، والمنشآت الكبرى.</p>
            <ul class="service-features-list">
              <li class="service-feature-item"><span>•</span> <span>التصميم الإنشائي المتقدم</span></li>
              <li class="service-feature-item"><span>•</span> <span>التخطيط العمراني وتصميم الطرق</span></li>
              <li class="service-feature-item"><span>•</span> <span>إدارة التشييد والإشراف الميداني</span></li>
            </ul>
          </div>

          <!-- Service 3 -->
          <div class="service-card">
            <div class="service-icon-box">🌊</div>
            <h3 class="service-card-title">الموارد المائية</h3>
            <p class="service-card-desc">إدارة وهندسة خبيرة لشبكات المياه ومحطات المعالجة وتصريف السيول.</p>
            <ul class="service-features-list">
              <li class="service-feature-item"><span>•</span> <span>الهيدرولوجيا وهندسة الأنهار</span></li>
              <li class="service-feature-item"><span>•</span> <span>تصميم محطات معالجة المياه</span></li>
              <li class="service-feature-item"><span>•</span> <span>إدارة وتصريف مياه الأمطار والسيول</span></li>
            </ul>
          </div>

          <!-- Service 4 -->
          <div class="service-card">
            <div class="service-icon-box">⛰️</div>
            <h3 class="service-card-title">الخدمات الجيوتقنية</h3>
            <p class="service-card-desc">التحليل والتصميم المتعلق بميكانيكا التربة واستقرار الأساسات والمنحدرات.</p>
            <ul class="service-features-list">
              <li class="service-feature-item"><span>•</span> <span>اختبارات التربة والجسات العميقة</span></li>
              <li class="service-feature-item"><span>•</span> <span>تصميم الأساسات السطحية والعميقة</span></li>
              <li class="service-feature-item"><span>•</span> <span>تحليل استقرار المنحدرات وحماية التربة</span></li>
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
            <div class="testimonial-quote-icon">“</div>
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
            <div class="testimonial-quote-icon">“</div>
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
            <div class="testimonial-quote-icon">“</div>
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
            <button class="btn-primary" data-scroll-to="contact" data-i18n="cta.request">طلب استشارة</button>
            <a href="tel:+15551234567" class="btn-secondary">📞 اتصل بنا الآن</a>
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
              <div class="contact-icon-box">📍</div>
              <div>
                <h4 class="contact-info-title">المكتب الرئيسي</h4>
                <p class="contact-info-text">المنطقة الهندسية، مبنى 45، مدينة البنية التحتية، القاهرة، مصر</p>
              </div>
            </div>

            <div class="contact-info-item">
              <div class="contact-icon-box">📞</div>
              <div>
                <h4 class="contact-info-title">الهاتف</h4>
                <p class="contact-info-text">+20 2 1234 5678 / +1 (555) 123-4567</p>
              </div>
            </div>

            <div class="contact-info-item">
              <div class="contact-icon-box">✉️</div>
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
                إرسال الطلب
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

fs.writeFileSync(path.join(targetDir, 'index.html'), indexHtmlContent, 'utf8');

// ==========================================
// 2. PRIVACY-POLICY.HTML
// ==========================================
const privacyHtmlContent = `<!DOCTYPE html>
<html lang="ar" dir="rtl" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>سياسة الخصوصية | Enviro-Civec</title>
  <link rel="icon" type="image/png" href="assets/favicon.png">
  <link rel="stylesheet" href="css/style.css">
</head>
<body style="background: var(--bg-primary);">
  <div id="scroll-progress"></div>

  <header class="site-header scrolled">
    <div class="container header-container">
      <a href="index.html" class="brand-link">
        <img src="assets/images/Enviro_Civec.png" alt="Enviro Civec" class="brand-logo">
        <div class="brand-text">
          <span class="brand-title" style="color: var(--text-primary);">إنـفـايـرو سـيـفيـك</span>
          <span class="brand-subtitle" style="color: var(--text-muted);">استشارات هندسية وبيئية</span>
        </div>
      </a>
      <div class="header-actions">
        <a href="index.html" class="btn-secondary" style="color: var(--text-primary); border-color: var(--border);">← العودة للرئيسية</a>
      </div>
    </div>
  </header>

  <main style="padding-top: 120px; padding-bottom: 80px;">
    <div class="container" style="max-w: 800px; margin: 0 auto;">
      <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 48px; box-shadow: var(--shadow-md);">
        <h1 class="section-title" style="margin-bottom: 12px;">سياسة الخصوصية</h1>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 36px;">آخر تحديث: 17 ديسمبر 2025</p>

        <div style="display: flex; flex-direction: column; gap: 28px; line-height: 1.8; color: var(--text-secondary);">
          <section>
            <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">1. المعلومات التي نجمعها</h2>
            <p>نقوم بجمع المعلومات التي تقدمها لنا مباشرة، مثل عند ملء نموذج الاتصال، أو طلب استشارة هندسية، أو التواصل معنا. قد يشمل ذلك اسمك وعنوان بريدك الإلكتروني ورقم هاتفك وتفاصيل المشروع.</p>
          </section>

          <section>
            <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">2. كيف نستخدم معلوماتك</h2>
            <p>نستخدم المعلومات التي نجمعها لتقديم خدماتنا الهندسية والاستشارية وصيانتها وتحسينها، وللرد على استفساراتكم، وللتواصل معكم بشأن مراحل المشروعات الميدانية والدراسات الفنية.</p>
          </section>

          <section>
            <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">3. سرية وأمن البيانات</h2>
            <p>نتخذ كافة التدابير التقنية والتنظيمية الصارمة للمساعدة في حماية المعلومات والبيانات الهندسية من الفقدان أو السرقة أو سوء الاستخدام أو الوصول غير المصرح به.</p>
          </section>

          <section>
            <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">4. التواصل معنا</h2>
            <p>إذا كانت لديك أي أسئلة حول سياسة الخصوصية، يرجى التواصل معنا عبر البريد الإلكتروني: <strong>info@envirocivec.com</strong>.</p>
          </section>
        </div>
      </div>
    </div>
  </main>

  <footer class="site-footer">
    <div class="container">
      <div class="footer-bottom">
        <span>© 2026 إنفايرو-سيفيك. جميع الحقوق محفوظة.</span>
        <div class="footer-legal-links">
          <a href="privacy-policy.html" class="footer-link">سياسة الخصوصية</a>
          <a href="terms-of-service.html" class="footer-link">شروط الخدمة</a>
        </div>
      </div>
    </div>
  </footer>

  <script type="module" src="js/main.js"></script>
</body>
</html>`;

fs.writeFileSync(path.join(targetDir, 'privacy-policy.html'), privacyHtmlContent, 'utf8');

// ==========================================
// 3. TERMS-OF-SERVICE.HTML
// ==========================================
const termsHtmlContent = `<!DOCTYPE html>
<html lang="ar" dir="rtl" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>شروط الخدمة | Enviro-Civec</title>
  <link rel="icon" type="image/png" href="assets/favicon.png">
  <link rel="stylesheet" href="css/style.css">
</head>
<body style="background: var(--bg-primary);">
  <div id="scroll-progress"></div>

  <header class="site-header scrolled">
    <div class="container header-container">
      <a href="index.html" class="brand-link">
        <img src="assets/images/Enviro_Civec.png" alt="Enviro Civec" class="brand-logo">
        <div class="brand-text">
          <span class="brand-title" style="color: var(--text-primary);">إنـفـايـرو سـيـفيـك</span>
          <span class="brand-subtitle" style="color: var(--text-muted);">استشارات هندسية وبيئية</span>
        </div>
      </a>
      <div class="header-actions">
        <a href="index.html" class="btn-secondary" style="color: var(--text-primary); border-color: var(--border);">← العودة للرئيسية</a>
      </div>
    </div>
  </header>

  <main style="padding-top: 120px; padding-bottom: 80px;">
    <div class="container" style="max-w: 800px; margin: 0 auto;">
      <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 48px; box-shadow: var(--shadow-md);">
        <h1 class="section-title" style="margin-bottom: 12px;">شروط الخدمة</h1>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 36px;">آخر تحديث: 17 ديسمبر 2025</p>

        <div style="display: flex; flex-direction: column; gap: 28px; line-height: 1.8; color: var(--text-secondary);">
          <section>
            <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">1. قبول الشروط</h2>
            <p>من خلال تصفح واستخدام هذا الموقع وطلب الخدمات الاستشارية، فإنك تقبل وتوافق على الالتزام بشروط وأحكام هذه الاتفاقية المعمول بها.</p>
          </section>

          <section>
            <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">2. حقوق الملكية الفكرية</h2>
            <p>جميع المواد والتصاميم والدراسات المنشورة على موقع إنفايرو-سيفيك محمية بموجب قوانين الملكية الفكرية وحقوق النشر ذات الصلة.</p>
          </section>

          <section>
            <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">3. القانون المعمول به</h2>
            <p>تخضع هذه الشروط والأحكام وتفسر وفقاً للقوانين المصرية والتشريعات الهندسية المعتمدة.</p>
          </section>
        </div>
      </div>
    </div>
  </main>

  <footer class="site-footer">
    <div class="container">
      <div class="footer-bottom">
        <span>© 2026 إنفايرو-سيفيك. جميع الحقوق محفوظة.</span>
        <div class="footer-legal-links">
          <a href="privacy-policy.html" class="footer-link">سياسة الخصوصية</a>
          <a href="terms-of-service.html" class="footer-link">شروط الخدمة</a>
        </div>
      </div>
    </div>
  </footer>

  <script type="module" src="js/main.js"></script>
</body>
</html>`;

fs.writeFileSync(path.join(targetDir, 'terms-of-service.html'), termsHtmlContent, 'utf8');

console.log('HTML pages generated successfully.');
