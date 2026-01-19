-- Content Management System Schema
-- Run this script to add content blocks and media assets tables

USE eshrm_db;

-- Content blocks for dynamic content management
CREATE TABLE IF NOT EXISTS content_blocks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  page VARCHAR(100) NOT NULL, -- 'home', 'about', 'services', etc.
  section VARCHAR(100) NOT NULL, -- 'hero', 'services', 'testimonials', etc.
  block_type VARCHAR(50) NOT NULL, -- 'text', 'image', 'rich_text', 'button', etc.
  block_key VARCHAR(100) NOT NULL, -- unique identifier within section
  content JSON NOT NULL, -- flexible content storage
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_page_section (page, section),
  INDEX idx_block_key (block_key),
  UNIQUE KEY unique_block (page, section, block_key)
) ENGINE=InnoDB;

-- Media assets for file management
CREATE TABLE IF NOT EXISTS media_assets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  file_size INT NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  alt_text VARCHAR(255),
  tags JSON,
  uploaded_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uploaded_by) REFERENCES admin_users(id) ON DELETE SET NULL,
  INDEX idx_filename (filename),
  INDEX idx_uploaded_by (uploaded_by)
) ENGINE=InnoDB;

-- Insert default content blocks for existing website content
INSERT INTO content_blocks (page, section, block_type, block_key, content, sort_order) VALUES
-- Hero Section
('home', 'hero', 'text', 'badge', '{"text": "Leading HR Consulting in Africa"}', 1),
('home', 'hero', 'text', 'title', '{"text": "Transforming Human Resources for African Businesses", "highlight": "Human Resources"}', 2),
('home', 'hero', 'text', 'subtitle', '{"text": "We deliver customized, client-centric, and impact-driven HR solutions that empower organizations to build high-performing teams and achieve sustainable growth across Africa."}', 3),
('home', 'hero', 'button', 'primary_cta', '{"text": "Book a Consultation", "link": "/book-consultation", "variant": "default"}', 4),
('home', 'hero', 'button', 'secondary_cta', '{"text": "Explore Services", "link": "/services/custom-hr-solutions", "variant": "outline"}', 5),
('home', 'hero', 'image', 'background', '{"src": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=800&fit=crop", "alt": "ESHRM - Professional HR Consulting Team"}', 6),
('home', 'hero', 'stats', 'organizations', '{"value": "500+", "label": "Organizations Transformed"}', 7),
('home', 'hero', 'stats', 'years', '{"value": "15+", "label": "Years"}', 8),
('home', 'hero', 'trust_indicators', 'indicators', '{"indicators": ["15+ Years of Excellence", "500+ Clients Served", "20+ African Countries", "98% Client Satisfaction"]}', 9),

-- Services Section
('home', 'services', 'text', 'title', '{"text": "Our Services"}', 1),
('home', 'services', 'text', 'subtitle', '{"text": "Comprehensive HR solutions tailored for African businesses"}', 2),
('home', 'services', 'text', 'description', '{"text": "We offer a full spectrum of HR consulting services designed to meet the unique needs of African businesses."}', 3),

-- Why Choose Us Section
('home', 'why_choose_us', 'text', 'title', '{"text": "Why Choose ESHRM"}', 1),
('home', 'why_choose_us', 'text', 'subtitle', '{"text": "Partner with Africa''s leading HR consulting firm"}', 2),
('home', 'why_choose_us', 'feature', 'experience', '{"title": "15+ Years Experience", "description": "Decades of expertise in African HR consulting"}', 3),
('home', 'why_choose_us', 'feature', 'expertise', '{"title": "Local Expertise", "description": "Deep understanding of African business landscape"}', 4),
('home', 'why_choose_us', 'feature', 'results', '{"title": "Proven Results", "description": "Track record of successful transformations"}', 5),

-- Process Section
('home', 'process', 'text', 'title', '{"text": "Our Process"}', 1),
('home', 'process', 'text', 'subtitle', '{"text": "How we deliver exceptional HR solutions"}', 2),
('home', 'process', 'step', 'assessment', '{"title": "Assessment", "description": "Comprehensive analysis of your HR needs"}', 3),
('home', 'process', 'step', 'strategy', '{"title": "Strategy Development", "description": "Customized HR strategy tailored to your business"}', 4),
('home', 'process', 'step', 'implementation', '{"title": "Implementation", "description": "Seamless execution with ongoing support"}', 5),
('home', 'process', 'step', 'results', '{"title": "Results & Optimization", "description": "Measuring success and continuous improvement"}', 6),

-- Case Studies Section
('home', 'case_studies', 'text', 'title', '{"text": "Case Studies"}', 1),
('home', 'case_studies', 'text', 'subtitle', '{"text": "Real results from real clients"}', 2),

-- Testimonials Section
('home', 'testimonials', 'text', 'title', '{"text": "What Our Clients Say"}', 1),
('home', 'testimonials', 'text', 'subtitle', '{"text": "Trusted by leading African businesses"}', 2),

-- Clients Section
('home', 'clients', 'text', 'title', '{"text": "Trusted By"}', 1),
('home', 'clients', 'text', 'subtitle', '{"text": "Leading companies across Africa"}', 2),

-- Mission Section
('home', 'mission', 'text', 'title', '{"text": "Our Mission"}', 1),
('home', 'mission', 'text', 'content', '{"text": "To empower African businesses with world-class HR solutions that drive sustainable growth and create high-performing teams."}', 2),
('home', 'mission', 'stats', 'clients', '{"value": "500+", "label": "Happy Clients"}', 3),
('home', 'mission', 'stats', 'countries', '{"value": "20+", "label": "African Countries"}', 4),
('home', 'mission', 'stats', 'satisfaction', '{"value": "98%", "label": "Client Satisfaction"}', 5),

-- FAQ Section
('home', 'faq', 'text', 'title', '{"text": "Frequently Asked Questions"}', 1),
('home', 'faq', 'text', 'subtitle', '{"text": "Everything you need to know about our services"}', 2),

-- CTA Section
('home', 'cta', 'text', 'title', '{"text": "Ready to Transform Your HR?"}', 1),
('home', 'cta', 'text', 'subtitle', '{"text": "Let''s discuss how we can help your business thrive"}', 2),
('home', 'cta', 'button', 'primary', '{"text": "Book a Consultation", "link": "/book-consultation"}', 3),
('home', 'cta', 'button', 'secondary', '{"text": "Explore Services", "link": "/services"}', 4),

-- Footer
('global', 'footer', 'text', 'description', '{"text": "Transforming human resource management for African businesses through customized, client-centric, and impact-driven solutions."}', 1),
('global', 'footer', 'contact', 'address', '{"text": "Harare, Zimbabwe"}', 2),
('global', 'footer', 'contact', 'phone_primary', '{"text": "+263 779 122 227"}', 3),
('global', 'footer', 'contact', 'phone_secondary', '{"text": "+263 774 193 064"}', 4),
('global', 'footer', 'contact', 'email', '{"text": "info@eshrm.africa"}', 5),
('global', 'footer', 'social', 'linkedin', '{"url": "https://linkedin.com"}', 6),
('global', 'footer', 'social', 'twitter', '{"url": "https://twitter.com"}', 7),
('global', 'footer', 'social', 'facebook', '{"url": "https://facebook.com"}', 8),

-- Header
('global', 'header', 'logo', 'main_logo', '{"text": "ESHRM", "type": "text"}', 1),

-- About Page Content Blocks
-- Hero Section
('about', 'hero', 'text', 'badge', '{"text": "About ESHRM"}', 1),
('about', 'hero', 'text', 'title', '{"text": "Transforming HR for African Businesses", "highlight": "African Businesses"}', 2),
('about', 'hero', 'text', 'subtitle', '{"text": "We are a leading HR and business consulting firm dedicated to empowering African organizations through customized, client-centric, and impact-driven human resource solutions."}', 3),
('about', 'hero', 'image', 'background', '{"src": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop", "alt": "ESHRM Team Collaboration"}', 4),

-- Story Section
('about', 'story', 'text', 'title', '{"text": "Our Story"}', 1),
('about', 'story', 'text', 'content1', '{"text": "Founded in 2010, ESHRM emerged from a vision to revolutionize how African businesses approach human resource management. We recognized that the unique challenges and opportunities of the African market required HR solutions tailored to local contexts while meeting global standards."}', 2),
('about', 'story', 'text', 'content2', '{"text": "Over the years, we''ve grown from a small consultancy to a trusted partner for over 500 organizations across 20+ African countries. Our success is built on deep expertise, unwavering commitment to our clients, and a genuine passion for developing Africa''s workforce."}', 3),
('about', 'story', 'text', 'content3', '{"text": "Today, ESHRM stands as a beacon of HR excellence in Africa, helping organizations build high-performing teams, develop future leaders, and create workplaces where both people and businesses thrive."}', 4),
('about', 'story', 'image', 'story_image', '{"src": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop", "alt": "ESHRM Team Collaboration"}', 5),
('about', 'story', 'stats', 'impact_years', '{"value": "15+", "label": "Years of Impact"}', 6),

-- Mission & Vision Section
('about', 'mission_vision', 'text', 'mission_title', '{"text": "Our Mission"}', 1),
('about', 'mission_vision', 'text', 'mission_content', '{"text": "To transform human resource management for African businesses through customized, client-centric, and impact-driven solutions that empower organizations to build high-performing teams and achieve sustainable growth."}', 2),
('about', 'mission_vision', 'text', 'vision_title', '{"text": "Our Vision"}', 3),
('about', 'mission_vision', 'text', 'vision_content', '{"text": "To be Africa''s most trusted HR consulting partner, recognized for driving organizational excellence and building workplaces where people and businesses flourish together across the continent."}', 4),

-- Values Section
('about', 'values', 'text', 'title', '{"text": "Our Core Values"}', 1),
('about', 'values', 'text', 'subtitle', '{"text": "These principles guide every engagement and shape who we are as an organization."}', 2),
('about', 'values', 'feature', 'excellence', '{"title": "Excellence", "description": "We pursue the highest standards in everything we do, delivering exceptional quality and results.", "icon": "Award"}', 3),
('about', 'values', 'feature', 'integrity', '{"title": "Integrity", "description": "We operate with honesty, transparency, and ethical conduct in all our relationships and engagements.", "icon": "Heart"}', 4),
('about', 'values', 'feature', 'innovation', '{"title": "Innovation", "description": "We embrace new ideas and approaches, continuously evolving to meet the changing needs of our clients.", "icon": "TrendingUp"}', 5),
('about', 'values', 'feature', 'collaboration', '{"title": "Collaboration", "description": "We work as true partners with our clients, fostering teamwork and shared success.", "icon": "Users"}', 6),

-- Stats Section
('about', 'stats', 'stats', 'experience', '{"value": "15+", "label": "Years of Excellence"}', 1),
('about', 'stats', 'stats', 'clients', '{"value": "500+", "label": "Clients Served"}', 2),
('about', 'stats', 'stats', 'countries', '{"value": "20+", "label": "African Countries"}', 3),
('about', 'stats', 'stats', 'satisfaction', '{"value": "98%", "label": "Client Satisfaction"}', 4),

-- Africa Focus Section
('about', 'africa_focus', 'text', 'badge', '{"text": "Africa Focus"}', 1),
('about', 'africa_focus', 'text', 'title', '{"text": "Deep Roots Across the Continent"}', 2),
('about', 'africa_focus', 'text', 'content1', '{"text": "Our African heritage gives us unique insight into the opportunities and challenges facing businesses on the continent. We understand the diverse regulatory landscapes, cultural nuances, and market dynamics that shape HR practices across different regions."}', 3),
('about', 'africa_focus', 'text', 'content2', '{"text": "From Harare to Nairobi, Johannesburg to Accra, we''ve helped organizations navigate complex HR challenges while building workforces ready for the future. Our pan-African network ensures we can support your business wherever you operate."}', 4),
('about', 'africa_focus', 'image', 'africa_map', '{"src": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop", "alt": "ESHRM Africa Coverage"}', 5),
('about', 'africa_focus', 'stats', 'countries_served', '{"value": "20+", "label": "Countries Served"}', 6),
('about', 'africa_focus', 'stats', 'industry_sectors', '{"value": "50+", "label": "Industry Sectors"}', 7),

-- Team Section
('about', 'team', 'text', 'title', '{"text": "Our Leadership Team"}', 1),
('about', 'team', 'text', 'subtitle', '{"text": "Meet the experts driving HR transformation across Africa."}', 2),
('about', 'team', 'team_member', 'adaora_nwankwo', '{"name": "Dr. Adaora Nwankwo", "role": "Founder & CEO", "bio": "With over 25 years of HR leadership experience across Africa, Dr. Nwankwo founded ESHRM to transform how African businesses approach human capital.", "image": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"}', 3),
('about', 'team', 'team_member', 'emmanuel_koffi', '{"name": "Emmanuel Koffi", "role": "Chief Consulting Officer", "bio": "Emmanuel brings 20 years of organizational development expertise, having led transformation projects for Fortune 500 companies and African enterprises alike.", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"}', 4),
('about', 'team', 'team_member', 'zainab_ibrahim', '{"name": "Zainab Ibrahim", "role": "Head of Training & Development", "bio": "A certified master trainer with expertise in leadership development, Zainab has designed and delivered programs for over 10,000 professionals.", "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"}', 5),

-- CTA Section
('about', 'cta', 'text', 'title', '{"text": "Ready to Partner with Us?"}', 1),
('about', 'cta', 'text', 'subtitle', '{"text": "Discover how ESHRM can help transform your organization''s HR function and drive sustainable success."}', 2),
('about', 'cta', 'button', 'consultation', '{"text": "Book a Consultation", "link": "/book-consultation"}', 3),
('about', 'cta', 'button', 'contact', '{"text": "Contact Us", "link": "/contact"}', 4),

-- Contact Page Content Blocks
-- Hero Section
('contact', 'hero', 'text', 'badge', '{"text": "Get in Touch"}', 1),
('contact', 'hero', 'text', 'title', '{"text": "Let''s Start a Conversation", "highlight": "Conversation"}', 2),
('contact', 'hero', 'text', 'subtitle', '{"text": "Have questions about our services or ready to discuss your HR challenges? We''re here to help."}', 3),

-- Contact Info Section
('contact', 'contact_info', 'contact', 'office', '{"type": "office", "title": "Our Office", "content": "Harare, Zimbabwe"}', 1),
('contact', 'contact_info', 'contact', 'phone_primary', '{"type": "phone", "title": "Phone", "content": "+263 779 122 227", "note": "Mon-Fri, 8am-5pm CAT"}', 2),
('contact', 'contact_info', 'contact', 'phone_secondary', '{"type": "phone", "title": "Phone", "content": "+263 774 193 064", "note": "Mon-Fri, 8am-5pm CAT"}', 3),
('contact', 'contact_info', 'contact', 'email', '{"type": "email", "title": "Email", "content": "info@eshrm.africa", "note": "We''ll respond within 24 hours"}', 4),
('contact', 'contact_info', 'contact', 'hours', '{"type": "hours", "title": "Business Hours", "content": "Monday - Friday: 8:00 AM - 5:00 PM\\nSaturday: 9:00 AM - 1:00 PM\\nSunday: Closed"}', 5),
('contact', 'contact_info', 'image', 'office_image', '{"src": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop", "alt": "ESHRM Office"}', 6),

-- Book Consultation Page Content Blocks
-- Hero Section
('book_consultation', 'hero', 'text', 'badge', '{"text": "Free Consultation"}', 1),
('book_consultation', 'hero', 'text', 'title', '{"text": "Book Your Consultation", "highlight": "Consultation"}', 2),
('book_consultation', 'hero', 'text', 'subtitle', '{"text": "Schedule a complimentary 30-minute consultation with our HR experts to discuss your challenges and explore how we can help."}', 3),

-- Info Section
('book_consultation', 'info', 'text', 'title', '{"text": "What to Expect"}', 1),
('book_consultation', 'info', 'feature', 'duration', '{"title": "30 Minutes", "description": "A focused session to understand your challenges and explore solutions.", "icon": "Clock"}', 2),
('book_consultation', 'info', 'feature', 'expert', '{"title": "Expert Consultant", "description": "Speak directly with an experienced HR consultant from our team.", "icon": "Users"}', 3),
('book_consultation', 'info', 'feature', 'obligation', '{"title": "No Obligation", "description": "A complimentary consultation with no pressure or commitment required.", "icon": "CheckCircle"}', 4),

-- Insights Page Content Blocks
-- Hero Section
('insights', 'hero', 'text', 'badge', '{"text": "Insights & Resources"}', 1),
('insights', 'hero', 'text', 'title', '{"text": "HR Knowledge & Insights", "highlight": "Insights"}', 2),
('insights', 'hero', 'text', 'subtitle', '{"text": "Stay ahead with expert perspectives on HR trends, compliance, leadership, and workforce strategies across Africa."}', 3),

-- Categories Section
('insights', 'categories', 'text', 'title', '{"text": "Browse by Category"}', 1),
('insights', 'categories', 'categories', 'list', '{"categories": ["All", "HR Trends", "Compliance", "Leadership", "Talent Management", "Workforce Strategy"]}', 2),

-- Featured Section
('insights', 'featured', 'text', 'title', '{"text": "Featured Articles"}', 1),

-- Latest Section
('insights', 'latest', 'text', 'title', '{"text": "Latest Articles"}', 1),

-- Newsletter CTA Section
('insights', 'newsletter', 'text', 'title', '{"text": "Stay Updated"}', 1),
('insights', 'newsletter', 'text', 'subtitle', '{"text": "Subscribe to our newsletter and get the latest HR insights delivered directly to your inbox."}', 2),
('insights', 'newsletter', 'text', 'privacy', '{"text": "By subscribing, you agree to our Privacy Policy. Unsubscribe anytime."}', 3),

-- Case Studies Page Content Blocks
-- Hero Section
('case_studies', 'hero', 'text', 'title', '{"text": "Case Studies"}', 1),
('case_studies', 'hero', 'text', 'subtitle', '{"text": "Real results from real clients"}', 2),

;

-- Verify the tables were created
SELECT 'Content blocks table created' as status, COUNT(*) as records FROM content_blocks;
SELECT 'Media assets table created' as status, COUNT(*) as records FROM media_assets;
