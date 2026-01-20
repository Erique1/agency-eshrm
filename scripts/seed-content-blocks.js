const mysql = require('mysql2/promise');

// Database connection configuration
const dbConfig = {
  host: process.env.MYSQL_HOST || "127.0.0.1",
  port: Number.parseInt(process.env.MYSQL_PORT || "3306"),
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "eshrm_db",
};

const contentBlocks = [
  // Home Page
  { page: 'home', section: 'hero', block_type: 'text', block_key: 'badge', content: JSON.stringify({ text: "Leading HR Consulting in Africa" }), sort_order: 1 },
  { page: 'home', section: 'hero', block_type: 'text', block_key: 'title', content: JSON.stringify({ text: "Transforming Human Resources for African Businesses", highlight: "Human Resources" }), sort_order: 2 },
  { page: 'home', section: 'hero', block_type: 'text', block_key: 'subtitle', content: JSON.stringify({ text: "We deliver customized, client-centric, and impact-driven HR solutions that empower organizations to build high-performing teams and achieve sustainable growth across Africa." }), sort_order: 3 },
  { page: 'home', section: 'hero', block_type: 'button', block_key: 'primary_cta', content: JSON.stringify({ text: "Book a Consultation", link: "/book-consultation", variant: "default" }), sort_order: 4 },
  { page: 'home', section: 'hero', block_type: 'button', block_key: 'secondary_cta', content: JSON.stringify({ text: "Explore Services", link: "/services/custom-hr-solutions", variant: "outline" }), sort_order: 5 },
  { page: 'home', section: 'hero', block_type: 'image', block_key: 'background', content: JSON.stringify({ src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=800&fit=crop", alt: "ESHRM - Professional HR Consulting Team" }), sort_order: 6 },
  { page: 'home', section: 'hero', block_type: 'stats', block_key: 'organizations', content: JSON.stringify({ value: "20+", label: "Organizations Transformed" }), sort_order: 7 },
  { page: 'home', section: 'hero', block_type: 'stats', block_key: 'years', content: JSON.stringify({ value: "4+", label: "Years" }), sort_order: 8 },
  { page: 'home', section: 'hero', block_type: 'trust_indicators', block_key: 'indicators', content: JSON.stringify({ indicators: ["4+ Years of Excellence", "20+ Clients Served", "2+", "98% Client Satisfaction"] }), sort_order: 9 },

  // About Page - Hero
  { page: 'about', section: 'hero', block_type: 'text', block_key: 'badge', content: JSON.stringify({ text: "About ESHRM" }), sort_order: 1 },
  { page: 'about', section: 'hero', block_type: 'text', block_key: 'title', content: JSON.stringify({ text: "Transforming HR for African Businesses", highlight: "African Businesses" }), sort_order: 2 },
  { page: 'about', section: 'hero', block_type: 'text', block_key: 'subtitle', content: JSON.stringify({ text: "We are a leading HR and business consulting firm dedicated to empowering African organizations through customized, client-centric, and impact-driven human resource solutions." }), sort_order: 3 },
  { page: 'about', section: 'hero', block_type: 'image', block_key: 'background', content: JSON.stringify({ src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop", alt: "ESHRM Team Collaboration" }), sort_order: 4 },

  // About Page - Story
  { page: 'about', section: 'story', block_type: 'text', block_key: 'title', content: JSON.stringify({ text: "Our Story" }), sort_order: 1 },
  { page: 'about', section: 'story', block_type: 'text', block_key: 'content1', content: JSON.stringify({ text: "Founded in 2010, ESHRM emerged from a vision to revolutionize how African businesses approach human resource management. We recognized that the unique challenges and opportunities of the African market required HR solutions tailored to local contexts while meeting global standards." }), sort_order: 2 },
  { page: 'about', section: 'story', block_type: 'text', block_key: 'content2', content: JSON.stringify({ text: "Over the years, we've grown from a small consultancy to a trusted partner for over 500 organizations across 2+. Our success is built on deep expertise, unwavering commitment to our clients, and a genuine passion for developing Africa's workforce." }), sort_order: 3 },
  { page: 'about', section: 'story', block_type: 'text', block_key: 'content3', content: JSON.stringify({ text: "Today, ESHRM stands as a beacon of HR excellence in Africa, helping organizations build high-performing teams, develop future leaders, and create workplaces where both people and businesses thrive." }), sort_order: 4 },
  { page: 'about', section: 'story', block_type: 'image', block_key: 'story_image', content: JSON.stringify({ src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop", alt: "ESHRM Team Collaboration" }), sort_order: 5 },
  { page: 'about', section: 'story', block_type: 'stats', block_key: 'impact_years', content: JSON.stringify({ value: "4+", label: "Years of Impact" }), sort_order: 6 },

  // About Page - Mission & Vision
  { page: 'about', section: 'mission_vision', block_type: 'text', block_key: 'mission_title', content: JSON.stringify({ text: "Our Mission" }), sort_order: 1 },
  { page: 'about', section: 'mission_vision', block_type: 'text', block_key: 'mission_content', content: JSON.stringify({ text: "To transform human resource management for African businesses through customized, client-centric, and impact-driven solutions that empower organizations to build high-performing teams and achieve sustainable growth." }), sort_order: 2 },
  { page: 'about', section: 'mission_vision', block_type: 'text', block_key: 'vision_title', content: JSON.stringify({ text: "Our Vision" }), sort_order: 3 },
  { page: 'about', section: 'mission_vision', block_type: 'text', block_key: 'vision_content', content: JSON.stringify({ text: "To be Africa's most trusted HR consulting partner, recognized for driving organizational excellence and building workplaces where people and businesses flourish together across the continent." }), sort_order: 4 },

  // About Page - Values
  { page: 'about', section: 'values', block_type: 'text', block_key: 'title', content: JSON.stringify({ text: "Our Core Values" }), sort_order: 1 },
  { page: 'about', section: 'values', block_type: 'text', block_key: 'subtitle', content: JSON.stringify({ text: "These principles guide every engagement and shape who we are as an organization." }), sort_order: 2 },
  { page: 'about', section: 'values', block_type: 'feature', block_key: 'excellence', content: JSON.stringify({ title: "Excellence", description: "We pursue the highest standards in everything we do, delivering exceptional quality and results.", icon: "Award" }), sort_order: 3 },
  { page: 'about', section: 'values', block_type: 'feature', block_key: 'integrity', content: JSON.stringify({ title: "Integrity", description: "We operate with honesty, transparency, and ethical conduct in all our relationships and engagements.", icon: "Heart" }), sort_order: 4 },
  { page: 'about', section: 'values', block_type: 'feature', block_key: 'innovation', content: JSON.stringify({ title: "Innovation", description: "We embrace new ideas and approaches, continuously evolving to meet the changing needs of our clients.", icon: "TrendingUp" }), sort_order: 5 },
  { page: 'about', section: 'values', block_type: 'feature', block_key: 'collaboration', content: JSON.stringify({ title: "Collaboration", description: "We work as true partners with our clients, fostering teamwork and shared success.", icon: "Users" }), sort_order: 6 },

  // Contact Page
  { page: 'contact', section: 'hero', block_type: 'text', block_key: 'badge', content: JSON.stringify({ text: "Get in Touch" }), sort_order: 1 },
  { page: 'contact', section: 'hero', block_type: 'text', block_key: 'title', content: JSON.stringify({ text: "Let's Start a Conversation", highlight: "Conversation" }), sort_order: 2 },
  { page: 'contact', section: 'hero', block_type: 'text', block_key: 'subtitle', content: JSON.stringify({ text: "Have questions about our services or ready to discuss your HR challenges? We're here to help." }), sort_order: 3 },

  // Book Consultation Page
  { page: 'book_consultation', section: 'hero', block_type: 'text', block_key: 'badge', content: JSON.stringify({ text: "Free Consultation" }), sort_order: 1 },
  { page: 'book_consultation', section: 'hero', block_type: 'text', block_key: 'title', content: JSON.stringify({ text: "Book Your Consultation", highlight: "Consultation" }), sort_order: 2 },
  { page: 'book_consultation', section: 'hero', block_type: 'text', block_key: 'subtitle', content: JSON.stringify({ text: "Schedule a complimentary 30-minute consultation with our HR experts to discuss your challenges and explore how we can help." }), sort_order: 3 },

  // Insights Page
  { page: 'insights', section: 'hero', block_type: 'text', block_key: 'badge', content: JSON.stringify({ text: "Insights & Resources" }), sort_order: 1 },
  { page: 'insights', section: 'hero', block_type: 'text', block_key: 'title', content: JSON.stringify({ text: "HR Knowledge & Insights", highlight: "Insights" }), sort_order: 2 },
  { page: 'insights', section: 'hero', block_type: 'text', block_key: 'subtitle', content: JSON.stringify({ text: "Stay ahead with expert perspectives on HR trends, compliance, leadership, and workforce strategies across Africa." }), sort_order: 3 },

  // Case Studies Page
  { page: 'case_studies', section: 'hero', block_type: 'text', block_key: 'title', content: JSON.stringify({ text: "Case Studies" }), sort_order: 1 },
  { page: 'case_studies', section: 'hero', block_type: 'text', block_key: 'subtitle', content: JSON.stringify({ text: "Real results from real clients" }), sort_order: 2 },

  // Home Page - Testimonials Section
  { page: 'home', section: 'testimonials', block_type: 'text', block_key: 'title', content: JSON.stringify({ text: "Testimonials" }), sort_order: 1 },
  { page: 'home', section: 'testimonials', block_type: 'text', block_key: 'subtitle', content: JSON.stringify({ text: "What Our Clients Say" }), sort_order: 2 },
  { page: 'home', section: 'testimonials', block_type: 'text', block_key: 'description', content: JSON.stringify({ text: "Don't just take our word for it—hear from the organizations we've had the privilege to serve." }), sort_order: 3 },
  { page: 'home', section: 'testimonials', block_type: 'testimonial', block_key: 'testimonial_1', content: JSON.stringify({ name: "Amara Okonkwo", role: "Chief People Officer", company: "TechAfrica Solutions", content: "ESHRM has been instrumental in transforming our HR function. Their expertise and dedication to understanding our unique challenges resulted in solutions that truly work for our organization.", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face" }), sort_order: 4 },
  { page: 'home', section: 'testimonials', block_type: 'testimonial', block_key: 'testimonial_2', content: JSON.stringify({ name: "David Mensah", role: "Managing Director", company: "GrowthPath Industries", content: "Working with ESHRM was a game-changer for our company. They helped us build a performance management system that has significantly improved our team's productivity and engagement.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" }), sort_order: 5 },
  { page: 'home', section: 'testimonials', block_type: 'testimonial', block_key: 'testimonial_3', content: JSON.stringify({ name: "Fatima Al-Hassan", role: "HR Director", company: "Sahel Investments", content: "The training programs delivered by ESHRM exceeded our expectations. Our leadership team is now more confident, capable, and aligned with our strategic goals.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" }), sort_order: 6 },

  // Home Page - Case Studies Section
  { page: 'home', section: 'case_studies', block_type: 'text', block_key: 'title', content: JSON.stringify({ text: "Our Impact" }), sort_order: 1 },
  { page: 'home', section: 'case_studies', block_type: 'text', block_key: 'subtitle', content: JSON.stringify({ text: "Real Results for Real Organizations" }), sort_order: 2 },
  { page: 'home', section: 'case_studies', block_type: 'text', block_key: 'description', content: JSON.stringify({ text: "Discover how we've helped organizations across Africa transform their HR functions and achieve remarkable results." }), sort_order: 3 },
  { page: 'home', section: 'case_studies', block_type: 'case_study', block_key: 'case_study_1', content: JSON.stringify({ title: "Digital Transformation of HR Operations", client: "Leading Fintech Company", industry: "Financial Services", results: ["40% reduction in HR administrative time", "85% employee satisfaction improvement", "60% faster onboarding"], image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop", href: "/case-studies/digital-transformation-hr" }), sort_order: 4 },
  { page: 'home', section: 'case_studies', block_type: 'case_study', block_key: 'case_study_2', content: JSON.stringify({ title: "Culture Transformation Program", client: "Pan-African Manufacturing Corp", industry: "Manufacturing", results: ["35% increase in engagement", "50% reduction in turnover", "25% productivity boost"], image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop", href: "/case-studies/culture-transformation" }), sort_order: 5 },
  { page: 'home', section: 'case_studies', block_type: 'case_study', block_key: 'case_study_3', content: JSON.stringify({ title: "Leadership Development Initiative", client: "Regional Healthcare Network", industry: "Healthcare", results: ["90% participants promoted", "65% leadership readiness improvement", "75% internal promotions"], image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop", href: "/case-studies/leadership-development" }), sort_order: 6 },

  // Home Page - Clients Section
  { page: 'home', section: 'clients', block_type: 'text', block_key: 'title', content: JSON.stringify({ text: "Trusted Partners" }), sort_order: 1 },
  { page: 'home', section: 'clients', block_type: 'text', block_key: 'subtitle', content: JSON.stringify({ text: "Clients We Work With", highlight: "Work With" }), sort_order: 2 },
  { page: 'home', section: 'clients', block_type: 'text', block_key: 'description', content: JSON.stringify({ text: "We're proud to partner with leading organizations across various industries to transform their HR functions." }), sort_order: 3 },
  { page: 'home', section: 'clients', block_type: 'text', block_key: 'footer_text', content: JSON.stringify({ text: "Join hundreds of organizations that trust ESHRM with their HR transformation" }), sort_order: 4 },
  { page: 'home', section: 'clients', block_type: 'client', block_key: 'client_1', content: JSON.stringify({ name: "JULY MOTION", logo: "JM" }), sort_order: 5 },
  { page: 'home', section: 'clients', block_type: 'client', block_key: 'client_2', content: JSON.stringify({ name: "LYNDEL HOUSE COLLEGE", logo: "LHC" }), sort_order: 6 },
  { page: 'home', section: 'clients', block_type: 'client', block_key: 'client_3', content: JSON.stringify({ name: "MONTAGUE RADIOLOGY", logo: "MR" }), sort_order: 7 },
  { page: 'home', section: 'clients', block_type: 'client', block_key: 'client_4', content: JSON.stringify({ name: "MEGAMEDIA GROUP", logo: "MMG" }), sort_order: 8 },
  { page: 'home', section: 'clients', block_type: 'client', block_key: 'client_5', content: JSON.stringify({ name: "HYDRO DRILLING", logo: "HD" }), sort_order: 9 },
  { page: 'home', section: 'clients', block_type: 'client', block_key: 'client_6', content: JSON.stringify({ name: "STRANGE LOVE ENTERPRISES", logo: "SLE" }), sort_order: 10 },
  { page: 'home', section: 'clients', block_type: 'client', block_key: 'client_7', content: JSON.stringify({ name: "BROOKLYN BRIGHT CONSTRUCTION", logo: "BBC" }), sort_order: 11 },
  { page: 'home', section: 'clients', block_type: 'client', block_key: 'client_8', content: JSON.stringify({ name: "PERLICOP AUTO", logo: "PA" }), sort_order: 12 },

  // Home Page - Why Choose Us Section
  { page: 'home', section: 'why_choose_us', block_type: 'text', block_key: 'title', content: JSON.stringify({ text: "Why Choose Us" }), sort_order: 1 },
  { page: 'home', section: 'why_choose_us', block_type: 'text', block_key: 'subtitle', content: JSON.stringify({ text: "Your Trusted Partner in HR Excellence" }), sort_order: 2 },
  { page: 'home', section: 'why_choose_us', block_type: 'text', block_key: 'description', content: JSON.stringify({ text: "At ESHRM, we understand that your people are your greatest asset. That's why we're committed to delivering HR solutions that not only solve today's challenges but position your organization for long-term success." }), sort_order: 3 },
  { page: 'home', section: 'why_choose_us', block_type: 'image', block_key: 'image', content: JSON.stringify({ src: "/professional-consulting-meeting-diverse-team.jpg", alt: "ESHRM Consulting Team at Work" }), sort_order: 4 },
  { page: 'home', section: 'why_choose_us', block_type: 'reason', block_key: 'reason_1', content: JSON.stringify({ icon: "award", title: "Deep Expertise", description: "Our team brings decades of combined experience across diverse industries and HR disciplines, ensuring you receive expert guidance tailored to your specific challenges." }), sort_order: 5 },
  { page: 'home', section: 'why_choose_us', block_type: 'reason', block_key: 'reason_2', content: JSON.stringify({ icon: "target", title: "Tailored Solutions", description: "We don't believe in one-size-fits-all. Every solution we develop is customized to align with your unique organizational culture, goals, and market context." }), sort_order: 6 },
  { page: 'home', section: 'why_choose_us', block_type: 'reason', block_key: 'reason_3', content: JSON.stringify({ icon: "trending-up", title: "Proven Track Record", description: "With over 500 successful client engagements and a 98% satisfaction rate, our results speak for themselves. We deliver measurable outcomes that drive real business value." }), sort_order: 7 },
  { page: 'home', section: 'why_choose_us', block_type: 'reason', block_key: 'reason_4', content: JSON.stringify({ icon: "handshake", title: "Partnership Approach", description: "We work alongside your team as true partners, providing ongoing support and guidance to ensure sustainable success long after our engagement ends." }), sort_order: 8 },

  // Home Page - Process Section
  { page: 'home', section: 'process', block_type: 'text', block_key: 'title', content: JSON.stringify({ text: "How We Work" }), sort_order: 1 },
  { page: 'home', section: 'process', block_type: 'text', block_key: 'subtitle', content: JSON.stringify({ text: "A Proven Approach to HR Transformation" }), sort_order: 2 },
  { page: 'home', section: 'process', block_type: 'text', block_key: 'description', content: JSON.stringify({ text: "Our structured methodology ensures consistent, high-quality results while remaining flexible enough to adapt to your unique needs." }), sort_order: 3 },
  { page: 'home', section: 'process', block_type: 'process_step', block_key: 'step_1', content: JSON.stringify({ icon: "search", step: "01", title: "Discovery & Assessment", description: "We begin by deeply understanding your organization—your culture, challenges, goals, and current HR landscape. Through comprehensive assessments and stakeholder interviews, we identify opportunities for improvement." }), sort_order: 4 },
  { page: 'home', section: 'process', block_type: 'process_step', block_key: 'step_2', content: JSON.stringify({ icon: "lightbulb", step: "02", title: "Strategy Development", description: "Based on our findings, we develop a customized HR strategy that aligns with your business objectives. We present clear recommendations with expected outcomes and implementation roadmaps." }), sort_order: 5 },
  { page: 'home', section: 'process', block_type: 'process_step', block_key: 'step_3', content: JSON.stringify({ icon: "rocket", step: "03", title: "Implementation & Support", description: "We work alongside your team to implement solutions, providing hands-on support, training, and guidance. Our commitment doesn't end at delivery—we ensure sustainable success through ongoing partnership." }), sort_order: 6 },

  // Home Page - FAQ Section
  { page: 'home', section: 'faq', block_type: 'text', block_key: 'title', content: JSON.stringify({ text: "FAQ" }), sort_order: 1 },
  { page: 'home', section: 'faq', block_type: 'text', block_key: 'subtitle', content: JSON.stringify({ text: "Frequently Asked Questions" }), sort_order: 2 },
  { page: 'home', section: 'faq', block_type: 'text', block_key: 'description', content: JSON.stringify({ text: "Find answers to common questions about our services and approach." }), sort_order: 3 },
  { page: 'home', section: 'faq', block_type: 'faq', block_key: 'faq_1', content: JSON.stringify({ question: "What industries do you specialize in?", answer: "We work across all industries including financial services, healthcare, manufacturing, technology, retail, and more. Our team has deep expertise in adapting HR best practices to the unique challenges and regulations of each sector." }), sort_order: 4 },
  { page: 'home', section: 'faq', block_type: 'faq', block_key: 'faq_2', content: JSON.stringify({ question: "How long does a typical engagement last?", answer: "Engagement duration varies based on scope and complexity. A focused project like policy development might take 4-8 weeks, while comprehensive organizational transformation can span 6-12 months. We'll provide a clear timeline during our initial consultation." }), sort_order: 5 },
  { page: 'home', section: 'faq', block_type: 'faq', block_key: 'faq_3', content: JSON.stringify({ question: "Do you work with small businesses or only large corporations?", answer: "We work with organizations of all sizes. Whether you're a growing startup needing to establish HR foundations or a large enterprise seeking transformation, we tailor our approach and pricing to match your needs and budget." }), sort_order: 6 },
  { page: 'home', section: 'faq', block_type: 'faq', block_key: 'faq_4', content: JSON.stringify({ question: "What makes ESHRM different from other HR consultants?", answer: "Our deep African market expertise, client-centric approach, and commitment to sustainable results set us apart. We don't just deliver recommendations—we partner with you through implementation and beyond to ensure lasting success." }), sort_order: 7 },
  { page: 'home', section: 'faq', block_type: 'faq', block_key: 'faq_5', content: JSON.stringify({ question: "Can you help with compliance across multiple African countries?", answer: "Absolutely. We have expertise in labor laws and HR regulations across 2+. We help organizations navigate complex multi-country compliance requirements while maintaining consistent HR practices." }), sort_order: 8 },
  { page: 'home', section: 'faq', block_type: 'faq', block_key: 'faq_6', content: JSON.stringify({ question: "What does the consultation process look like?", answer: "It starts with a complimentary discovery call where we learn about your challenges and goals. From there, we propose a tailored engagement plan. Once agreed, we begin with a thorough assessment before developing and implementing solutions." }), sort_order: 9 },

  // Home Page - CTA Section
  { page: 'home', section: 'cta', block_type: 'text', block_key: 'title', content: JSON.stringify({ text: "Ready to Transform Your HR Function?" }), sort_order: 1 },
  { page: 'home', section: 'cta', block_type: 'text', block_key: 'subtitle', content: JSON.stringify({ text: "Take the first step toward building a high-performing organization. Schedule a complimentary consultation with our experts and discover how we can help you achieve your HR goals." }), sort_order: 2 },
  { page: 'home', section: 'cta', block_type: 'button', block_key: 'primary_cta', content: JSON.stringify({ text: "Book a Consultation", link: "/book-consultation", variant: "secondary" }), sort_order: 3 },
  { page: 'home', section: 'cta', block_type: 'button', block_key: 'secondary_cta', content: JSON.stringify({ text: "Contact Us", link: "/contact", variant: "outline" }), sort_order: 4 },

  // Global - Header
  { page: 'global', section: 'header', block_type: 'brand_name', block_key: 'brand_name', content: JSON.stringify({ text: "ESHRM", src: "/logo.png", alt: "ESHRM Logo" }), sort_order: 1 },

  // Global - Footer
  { page: 'global', section: 'footer', block_type: 'brand_name', block_key: 'brand_name', content: JSON.stringify({ text: "ESHRM", src: "/logo.png", alt: "ESHRM Logo" }), sort_order: 1 },
  { page: 'global', section: 'header', block_type: 'navigation', block_key: 'navigation', content: JSON.stringify({ items: [{ title: "Home", href: "/", type: "link" }, { title: "About", href: "/about", type: "link" }, { title: "Services", href: "#", type: "dropdown", children: [{ title: "Custom HR Solutions", href: "/services/custom-hr-solutions" }, { title: "Organizational Development", href: "/services/organizational-development" }, { title: "Training & Workshops", href: "/services/training-workshops" }, { title: "HR Policy Development", href: "/services/hr-policy-development" }, { title: "Performance Management", href: "/services/performance-management" }, { title: "Talent Acquisition", href: "/services/talent-acquisition" }, { title: "NSSA Registration & Returns", href: "/services/nssa-registration-returns" }] }, { title: "Case Studies", href: "/case-studies", type: "link" }, { title: "Insights", href: "/insights", type: "link" }, { title: "Contact", href: "/contact", type: "link" }] }), sort_order: 2 },
  { page: 'global', section: 'header', block_type: 'cta_buttons', block_key: 'cta_buttons', content: JSON.stringify({ buttons: [{ text: "Contact Us", href: "/contact", variant: "outline" }, { text: "Book a Consultation", href: "/book-consultation", variant: "default" }] }), sort_order: 3 },

  // About Page - Team Section
  { page: 'about', section: 'team', block_type: 'text', block_key: 'title', content: JSON.stringify({ text: "Our Leadership Team" }), sort_order: 1 },
  { page: 'about', section: 'team', block_type: 'text', block_key: 'subtitle', content: JSON.stringify({ text: "Meet the experts driving HR transformation across Africa." }), sort_order: 2 },
  { page: 'about', section: 'team', block_type: 'team_member', block_key: 'team_member_1', content: JSON.stringify({ name: "Dr. Adaora Nwankwo", role: "Founder & CEO", bio: "With over 25 years of HR leadership experience across Africa, Dr. Nwankwo founded ESHRM to transform how African businesses approach human capital.", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face" }), sort_order: 3 },
  { page: 'about', section: 'team', block_type: 'team_member', block_key: 'team_member_2', content: JSON.stringify({ name: "Emmanuel Koffi", role: "Chief Consulting Officer", bio: "Emmanuel brings 20 years of organizational development expertise, having led transformation projects for Fortune 500 companies and African enterprises alike.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" }), sort_order: 4 },
  { page: 'about', section: 'team', block_type: 'team_member', block_key: 'team_member_3', content: JSON.stringify({ name: "Zainab Ibrahim", role: "Head of Training & Development", bio: "A certified master trainer with expertise in leadership development, Zainab has designed and delivered programs for over 10,000 professionals.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face" }), sort_order: 5 },

  // About Page - Stats Section
  { page: 'about', section: 'stats', block_type: 'stats_item', block_key: 'stat_1', content: JSON.stringify({ value: "4+", label: "Years of Excellence" }), sort_order: 1 },
  { page: 'about', section: 'stats', block_type: 'stats_item', block_key: 'stat_2', content: JSON.stringify({ value: "20+", label: "Clients Served" }), sort_order: 2 },
  { page: 'about', section: 'stats', block_type: 'stats_item', block_key: 'stat_3', content: JSON.stringify({ value: "20+", label: "African Countries" }), sort_order: 3 },
  { page: 'about', section: 'stats', block_type: 'stats_item', block_key: 'stat_4', content: JSON.stringify({ value: "98%", label: "Client Satisfaction" }), sort_order: 4 },

  // About Page - Africa Focus Section
  { page: 'about', section: 'africa_focus', block_type: 'text', block_key: 'badge', content: JSON.stringify({ text: "Africa Focus" }), sort_order: 1 },
  { page: 'about', section: 'africa_focus', block_type: 'text', block_key: 'title', content: JSON.stringify({ text: "Deep Roots Across the Continent" }), sort_order: 2 },
  { page: 'about', section: 'africa_focus', block_type: 'text', block_key: 'description1', content: JSON.stringify({ text: "Our African heritage gives us unique insight into the opportunities and challenges facing businesses on the continent. We understand the diverse regulatory landscapes, cultural nuances, and market dynamics that shape HR practices across different regions." }), sort_order: 3 },
  { page: 'about', section: 'africa_focus', block_type: 'text', block_key: 'description2', content: JSON.stringify({ text: "From Harare to Nairobi, Johannesburg to Accra, we've helped organizations navigate complex HR challenges while building workforces ready for the future. Our pan-African network ensures we can support your business wherever you operate." }), sort_order: 4 },
  { page: 'about', section: 'africa_focus', block_type: 'image', block_key: 'image', content: JSON.stringify({ src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop", alt: "ESHRM Africa Coverage" }), sort_order: 5 },
  { page: 'about', section: 'africa_focus', block_type: 'stats_item', block_key: 'countries_stat', content: JSON.stringify({ value: "20+", label: "Countries Served" }), sort_order: 6 },
  { page: 'about', section: 'africa_focus', block_type: 'stats_item', block_key: 'sectors_stat', content: JSON.stringify({ value: "50+", label: "Industry Sectors" }), sort_order: 7 },

  // About Page - CTA Section
  { page: 'about', section: 'cta', block_type: 'text', block_key: 'title', content: JSON.stringify({ text: "Ready to Partner with Us?" }), sort_order: 1 },
  { page: 'about', section: 'cta', block_type: 'text', block_key: 'subtitle', content: JSON.stringify({ text: "Discover how ESHRM can help transform your organization's HR function and drive sustainable success." }), sort_order: 2 },
  { page: 'about', section: 'cta', block_type: 'button', block_key: 'primary_cta', content: JSON.stringify({ text: "Book a Consultation", link: "/book-consultation", variant: "secondary" }), sort_order: 3 },
  { page: 'about', section: 'cta', block_type: 'button', block_key: 'secondary_cta', content: JSON.stringify({ text: "Contact Us", link: "/contact", variant: "outline" }), sort_order: 4 },

  // Contact Page - Hero Section
  { page: 'contact', section: 'hero', block_type: 'text', block_key: 'badge', content: JSON.stringify({ text: "Get in Touch" }), sort_order: 1 },
  { page: 'contact', section: 'hero', block_type: 'text', block_key: 'title', content: JSON.stringify({ text: "Let's Start a Conversation", highlight: "Conversation" }), sort_order: 2 },
  { page: 'contact', section: 'hero', block_type: 'text', block_key: 'subtitle', content: JSON.stringify({ text: "Have questions about our services or ready to discuss your HR challenges? We're here to help." }), sort_order: 3 },

  // Contact Page - Contact Info Section
  { page: 'contact', section: 'contact_info', block_type: 'text', block_key: 'title', content: JSON.stringify({ text: "Contact Information" }), sort_order: 1 },
  { page: 'contact', section: 'contact_info', block_type: 'contact_detail', block_key: 'office_address', content: JSON.stringify({ type: "address", title: "Our Office", value: "Harare, Zimbabwe", icon: "MapPin" }), sort_order: 2 },
  { page: 'contact', section: 'contact_info', block_type: 'contact_detail', block_key: 'phone_numbers', content: JSON.stringify({ type: "phone", title: "Phone", value: "+263 779 122 227", label: "+263 774 193 064", note: "Mon-Fri, 8am-5pm CAT", icon: "Phone" }), sort_order: 3 },
  { page: 'contact', section: 'contact_info', block_type: 'contact_detail', block_key: 'email_address', content: JSON.stringify({ type: "email", title: "Email", value: "info@eshrm.africa", note: "We'll respond within 24 hours", icon: "Mail" }), sort_order: 4 },
  { page: 'contact', section: 'contact_info', block_type: 'contact_detail', block_key: 'business_hours', content: JSON.stringify({ type: "hours", title: "Business Hours", value: "Monday - Friday: 8:00 AM - 5:00 PM\nSaturday: 9:00 AM - 1:00 PM\nSunday: Closed", icon: "Clock" }), sort_order: 5 },
  { page: 'contact', section: 'contact_info', block_type: 'image', block_key: 'office_image', content: JSON.stringify({ src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop", alt: "ESHRM Office" }), sort_order: 6 },
  { page: 'contact', section: 'contact_info', block_type: 'services_list', block_key: 'services_options', content: JSON.stringify({ services: ["Custom HR Solutions", "Organizational Development", "Training & Workshops", "HR Policy Development", "Performance Management", "Talent Acquisition", "Other"] }), sort_order: 7 },

  // Global - Footer
  { page: 'global', section: 'footer', block_type: 'brand_name', block_key: 'brand_name', content: JSON.stringify({ text: "ESHRM", src: "/logo.png", alt: "ESHRM Logo" }), sort_order: 1 },
  { page: 'global', section: 'footer', block_type: 'text', block_key: 'brand_description', content: JSON.stringify({ text: "Transforming human resource management for African businesses through customized, client-centric, and impact-driven solutions." }), sort_order: 2 },
  { page: 'global', section: 'footer', block_type: 'text', block_key: 'newsletter_title', content: JSON.stringify({ text: "Subscribe to our newsletter" }), sort_order: 3 },
  { page: 'global', section: 'footer', block_type: 'text', block_key: 'copyright_text', content: JSON.stringify({ text: `© ${new Date().getFullYear()} ESHRM. All rights reserved.` }), sort_order: 4 },
  { page: 'global', section: 'footer', block_type: 'links', block_key: 'services_links', content: JSON.stringify({ links: [{ title: "Custom HR Solutions", href: "/services/custom-hr-solutions" }, { title: "Organizational Development", href: "/services/organizational-development" }, { title: "Training & Workshops", href: "/services/training-workshops" }, { title: "HR Policy Development", href: "/services/hr-policy-development" }, { title: "Performance Management", href: "/services/performance-management" }, { title: "Talent Acquisition", href: "/services/talent-acquisition" }] }), sort_order: 5 },
  { page: 'global', section: 'footer', block_type: 'links', block_key: 'quick_links', content: JSON.stringify({ links: [{ title: "About Us", href: "/about" }, { title: "Case Studies", href: "/case-studies" }, { title: "Insights", href: "/insights" }, { title: "Contact", href: "/contact" }, { title: "Book Consultation", href: "/book-consultation" }] }), sort_order: 6 },
  { page: 'global', section: 'footer', block_type: 'links', block_key: 'legal_links', content: JSON.stringify({ links: [{ title: "Privacy Policy", href: "/privacy-policy" }, { title: "Terms & Conditions", href: "/terms-conditions" }] }), sort_order: 7 },
  { page: 'global', section: 'footer', block_type: 'social_links', block_key: 'social_links', content: JSON.stringify({ links: [{ platform: "linkedin", url: "https://linkedin.com" }, { platform: "twitter", url: "https://twitter.com" }, { platform: "facebook", url: "https://facebook.com" }] }), sort_order: 8 },
  { page: 'global', section: 'footer', block_type: 'contact_info', block_key: 'contact_info', content: JSON.stringify({ contacts: [{ type: "address", value: "Harare, Zimbabwe" }, { type: "phone", value: "+263 779 122 227", label: "+263 774 193 064" }, { type: "email", value: "info@eshrm.africa" }] }), sort_order: 9 },
];

async function seedContentBlocks() {
  let connection;

  try {
    console.log('Connecting to database...');
    connection = await mysql.createConnection(dbConfig);

    console.log('Inserting content blocks...');
    for (const block of contentBlocks) {
      try {
        await connection.execute(
          `INSERT INTO content_blocks (page, section, block_type, block_key, content, sort_order)
           VALUES (?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
           content = VALUES(content),
           sort_order = VALUES(sort_order),
           updated_at = CURRENT_TIMESTAMP`,
          [block.page, block.section, block.block_type, block.block_key, block.content, block.sort_order]
        );
        console.log(`✓ Inserted ${block.page}/${block.section}/${block.block_key}`);
      } catch (error) {
        console.error(`✗ Failed to insert ${block.page}/${block.section}/${block.block_key}:`, error.message);
      }
    }

    console.log('Content blocks seeded successfully!');

    // Verify
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM content_blocks');
    console.log(`Total content blocks in database: ${rows[0].count}`);

  } catch (error) {
    console.error('Error seeding content blocks:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the seeder
seedContentBlocks().catch(console.error);
