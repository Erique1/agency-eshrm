// CMS Data Store - Using localStorage for persistence without database
export interface Service {
  id: string
  title: string
  slug: string
  description: string
  longDescription: string
  icon: string
  features: string[]
  published: boolean
}

export interface CaseStudy {
  id: string
  title: string
  slug: string
  client: string
  industry: string
  challenge: string
  solution: string
  results: string[]
  testimonial?: string
  image: string
  published: boolean
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  author: string
  image: string
  publishedAt: string
  metaTitle?: string
  metaDescription?: string
  published: boolean
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  image?: string
  published: boolean
}

export interface Lead {
  id: string
  name: string
  email: string
  company: string
  message: string
  serviceInterest: string
  createdAt: string
  status: "new" | "contacted" | "qualified" | "converted" | "lost"
}

export type LeadStatus = Lead["status"]

export interface Booking {
  id: string
  name: string
  email: string
  company: string
  phone: string
  service: string
  date: string
  time: string
  message?: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  createdAt: string
}

export interface SiteSettings {
  siteName: string
  tagline: string
  primaryColor: string
  accentColor: string
  phone: string
  email: string
  address: string
  socialLinks: {
    linkedin?: string
    twitter?: string
    facebook?: string
    instagram?: string
  }
}

// Default Data
export const defaultServices: Service[] = [
  {
    id: "1",
    title: "Custom HR Solutions",
    slug: "custom-hr-solutions",
    description: "Tailored HR strategies designed specifically for your organization's unique needs and culture.",
    longDescription:
      "We develop comprehensive HR solutions that align with your business objectives, culture, and growth trajectory. Our team works closely with you to understand your challenges and create customized strategies that drive results.",
    icon: "settings",
    features: [
      "HR Strategy Development",
      "Process Optimization",
      "HR Technology Implementation",
      "Compliance Management",
    ],
    published: true,
  },
  {
    id: "2",
    title: "Organizational Development",
    slug: "organizational-development",
    description: "Transform your organization's structure, culture, and capabilities for sustainable growth.",
    longDescription:
      "Our organizational development services help you build a high-performing organization. We focus on culture transformation, change management, and leadership development to drive sustainable growth.",
    icon: "building",
    features: ["Culture Transformation", "Change Management", "Leadership Development", "Team Building"],
    published: true,
  },
  {
    id: "3",
    title: "Training & Workshops",
    slug: "training-workshops",
    description: "Empower your workforce with cutting-edge training programs and interactive workshops.",
    longDescription:
      "We design and deliver impactful training programs that enhance skills, boost productivity, and foster professional growth. Our workshops are interactive, practical, and tailored to your industry.",
    icon: "graduation-cap",
    features: ["Leadership Training", "Skills Development", "Compliance Training", "Team Workshops"],
    published: true,
  },
  {
    id: "4",
    title: "HR Policy Development",
    slug: "hr-policy-development",
    description: "Create robust HR policies that ensure compliance and support your organizational goals.",
    longDescription:
      "We help you develop comprehensive HR policies that are compliant with local regulations, aligned with best practices, and supportive of your organizational culture and goals.",
    icon: "file-text",
    features: ["Policy Framework Design", "Employee Handbook Creation", "Compliance Review", "Policy Implementation"],
    published: true,
  },
  {
    id: "5",
    title: "Performance Management",
    slug: "performance-management",
    description: "Implement effective performance systems that drive accountability and excellence.",
    longDescription:
      "Our performance management solutions help you establish clear expectations, provide meaningful feedback, and create a culture of continuous improvement and accountability.",
    icon: "chart-bar",
    features: ["Performance Framework Design", "KPI Development", "360-Degree Feedback", "Performance Reviews"],
    published: true,
  },
  {
    id: "6",
    title: "Talent Acquisition",
    slug: "talent-acquisition",
    description: "Attract, assess, and acquire top talent that drives your business forward.",
    longDescription:
      "We help you build a strong talent pipeline through strategic recruitment, employer branding, and selection processes that identify candidates who will thrive in your organization.",
    icon: "users",
    features: ["Recruitment Strategy", "Employer Branding", "Assessment Centers", "Onboarding Programs"],
    published: true,
  },
]

export const defaultCaseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "Digital Transformation of HR Operations",
    slug: "digital-transformation-hr",
    client: "Leading Fintech Company",
    industry: "Financial Services",
    challenge:
      "Outdated HR processes causing inefficiencies and employee dissatisfaction in a rapidly growing fintech startup.",
    solution:
      "Implemented a comprehensive HR digital transformation including automated workflows, self-service portals, and data-driven decision making.",
    results: [
      "40% reduction in HR administrative time",
      "85% employee satisfaction improvement",
      "60% faster onboarding process",
    ],
    testimonial:
      "ESHRM transformed our HR operations completely. We're now able to scale efficiently while maintaining excellent employee experience.",
    image: "/modern-office-fintech.jpg",
    published: true,
  },
  {
    id: "2",
    title: "Culture Transformation Program",
    slug: "culture-transformation",
    client: "Pan-African Manufacturing Corp",
    industry: "Manufacturing",
    challenge:
      "Siloed departments, low employee engagement, and resistance to change in a traditional manufacturing company.",
    solution:
      "Designed and implemented a comprehensive culture transformation program focusing on collaboration, innovation, and employee empowerment.",
    results: ["35% increase in employee engagement", "50% reduction in turnover", "25% improvement in productivity"],
    image: "/manufacturing-team-collaboration.jpg",
    published: true,
  },
  {
    id: "3",
    title: "Leadership Development Initiative",
    slug: "leadership-development",
    client: "Regional Healthcare Network",
    industry: "Healthcare",
    challenge: "Leadership gaps and succession planning concerns in a growing healthcare organization.",
    solution:
      "Created a customized leadership development program including coaching, mentoring, and experiential learning.",
    results: [
      "90% of participants promoted within 18 months",
      "Leadership readiness score improved by 65%",
      "Internal promotion rate increased to 75%",
    ],
    image: "/healthcare-leadership-meeting.jpg",
    published: true,
  },
]

export const defaultBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of HR in Africa: Trends to Watch in 2025",
    slug: "future-hr-africa-2025",
    excerpt:
      "Explore the key HR trends shaping the African business landscape and how organizations can prepare for the future of work.",
    content: "The African HR landscape is evolving rapidly...",
    category: "HR Trends",
    tags: ["HR Trends", "Africa", "Future of Work"],
    author: "ESHRM Team",
    image: "/african-business-future.jpg",
    publishedAt: "2025-01-10",
    published: true,
  },
  {
    id: "2",
    title: "Building a Compliance-First HR Strategy",
    slug: "compliance-first-hr-strategy",
    excerpt: "Learn how to develop HR policies that ensure regulatory compliance while supporting business objectives.",
    content: "Compliance is no longer optional...",
    category: "Compliance",
    tags: ["Compliance", "HR Policy", "Risk Management"],
    author: "ESHRM Team",
    image: "/business-compliance-documents.jpg",
    publishedAt: "2025-01-05",
    published: true,
  },
  {
    id: "3",
    title: "Effective Leadership in Remote and Hybrid Teams",
    slug: "leadership-remote-hybrid-teams",
    excerpt:
      "Discover strategies for leading distributed teams effectively and maintaining engagement across locations.",
    content: "Remote work has become the new normal...",
    category: "Leadership",
    tags: ["Leadership", "Remote Work", "Team Management"],
    author: "ESHRM Team",
    image: "/remote-team-video-call.jpg",
    publishedAt: "2024-12-28",
    published: true,
  },
]

export const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Amara Okonkwo",
    role: "Chief People Officer",
    company: "TechAfrica Solutions",
    content:
      "ESHRM has been instrumental in transforming our HR function. Their expertise and dedication to understanding our unique challenges resulted in solutions that truly work for our organization.",
    published: true,
  },
  {
    id: "2",
    name: "David Mensah",
    role: "Managing Director",
    company: "GrowthPath Industries",
    content:
      "Working with ESHRM was a game-changer for our company. They helped us build a performance management system that has significantly improved our team's productivity and engagement.",
    published: true,
  },
  {
    id: "3",
    name: "Fatima Al-Hassan",
    role: "HR Director",
    company: "Sahel Investments",
    content:
      "The training programs delivered by ESHRM exceeded our expectations. Our leadership team is now more confident, capable, and aligned with our strategic goals.",
    published: true,
  },
]

export const defaultSiteSettings: SiteSettings = {
  siteName: "ESHRM",
  tagline: "Transforming HR for African Businesses",
  primaryColor: "#7C3AED",
  accentColor: "#000000",
  phone: "+263 779 122 227",
  email: "info@eshrm.africa",
  address: "Harare, Zimbabwe",
  socialLinks: {
    linkedin: "https://linkedin.com/company/eshrm",
    twitter: "https://twitter.com/eshrm",
    facebook: "https://facebook.com/eshrm",
  },
}

// Data access functions
export function getServices(): Service[] {
  if (typeof window === "undefined") return defaultServices
  const stored = localStorage.getItem("eshrm_services")
  return stored ? JSON.parse(stored) : defaultServices
}

export function getCaseStudies(): CaseStudy[] {
  if (typeof window === "undefined") return defaultCaseStudies
  const stored = localStorage.getItem("eshrm_case_studies")
  return stored ? JSON.parse(stored) : defaultCaseStudies
}

export function getBlogPosts(): BlogPost[] {
  if (typeof window === "undefined") return defaultBlogPosts
  const stored = localStorage.getItem("eshrm_blog_posts")
  return stored ? JSON.parse(stored) : defaultBlogPosts
}

export function getTestimonials(): Testimonial[] {
  if (typeof window === "undefined") return defaultTestimonials
  const stored = localStorage.getItem("eshrm_testimonials")
  return stored ? JSON.parse(stored) : defaultTestimonials
}

export function getLeads(): Lead[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem("eshrm_leads")
  return stored ? JSON.parse(stored) : []
}

export function getBookings(): Booking[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem("eshrm_bookings")
  return stored ? JSON.parse(stored) : []
}

export function getSiteSettings(): SiteSettings {
  if (typeof window === "undefined") return defaultSiteSettings
  const stored = localStorage.getItem("eshrm_settings")
  return stored ? JSON.parse(stored) : defaultSiteSettings
}

// Save functions
export function saveServices(services: Service[]) {
  localStorage.setItem("eshrm_services", JSON.stringify(services))
}

export function saveCaseStudies(caseStudies: CaseStudy[]) {
  localStorage.setItem("eshrm_case_studies", JSON.stringify(caseStudies))
}

export function saveBlogPosts(posts: BlogPost[]) {
  localStorage.setItem("eshrm_blog_posts", JSON.stringify(posts))
}

export function saveTestimonials(testimonials: Testimonial[]) {
  localStorage.setItem("eshrm_testimonials", JSON.stringify(testimonials))
}

export function saveLeads(leads: Lead[]) {
  localStorage.setItem("eshrm_leads", JSON.stringify(leads))
}

export function saveBookings(bookings: Booking[]) {
  localStorage.setItem("eshrm_bookings", JSON.stringify(bookings))
}

export function saveSiteSettings(settings: SiteSettings) {
  localStorage.setItem("eshrm_settings", JSON.stringify(settings))
}

export function addLead(lead: Omit<Lead, "id" | "createdAt" | "status">) {
  const leads = getLeads()
  const newLead: Lead = {
    ...lead,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    status: "new",
  }
  leads.push(newLead)
  saveLeads(leads)
  return newLead
}

export function addBooking(booking: Omit<Booking, "id" | "createdAt" | "status">) {
  const bookings = getBookings()
  const newBooking: Booking = {
    ...booking,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    status: "pending",
  }
  bookings.push(newBooking)
  saveBookings(bookings)
  return newBooking
}
