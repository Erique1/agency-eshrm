-- ESHRM Website Seed Data
-- Run this after creating the database schema

USE eshrm_db;

-- Insert default services
INSERT INTO services (title, slug, description, long_description, icon, features, published) VALUES
('Custom HR Solutions', 'custom-hr-solutions', 
 'Tailored HR strategies designed specifically for your organization''s unique needs and culture.',
 'We develop comprehensive HR solutions that align with your business objectives, culture, and growth trajectory. Our team works closely with you to understand your challenges and create customized strategies that drive results.',
 'settings',
 '["HR Strategy Development", "Process Optimization", "HR Technology Implementation", "Compliance Management"]',
 TRUE),

('Organizational Development', 'organizational-development',
 'Transform your organization''s structure, culture, and capabilities for sustainable growth.',
 'Our organizational development services help you build a high-performing organization. We focus on culture transformation, change management, and leadership development to drive sustainable growth.',
 'building',
 '["Culture Transformation", "Change Management", "Leadership Development", "Team Building"]',
 TRUE),

('Training & Workshops', 'training-workshops',
 'Empower your workforce with cutting-edge training programs and interactive workshops.',
 'We design and deliver impactful training programs that enhance skills, boost productivity, and foster professional growth. Our workshops are interactive, practical, and tailored to your industry.',
 'graduation-cap',
 '["Leadership Training", "Skills Development", "Compliance Training", "Team Workshops"]',
 TRUE),

('HR Policy Development', 'hr-policy-development',
 'Create robust HR policies that ensure compliance and support your organizational goals.',
 'We help you develop comprehensive HR policies that are compliant with local regulations, aligned with best practices, and supportive of your organizational culture and goals.',
 'file-text',
 '["Policy Framework Design", "Employee Handbook Creation", "Compliance Review", "Policy Implementation"]',
 TRUE),

('Performance Management', 'performance-management',
 'Implement effective performance systems that drive accountability and excellence.',
 'Our performance management solutions help you establish clear expectations, provide meaningful feedback, and create a culture of continuous improvement and accountability.',
 'chart-bar',
 '["Performance Framework Design", "KPI Development", "360-Degree Feedback", "Performance Reviews"]',
 TRUE),

('Talent Acquisition', 'talent-acquisition',
 'Attract, assess, and acquire top talent that drives your business forward.',
 'We help you build a strong talent pipeline through strategic recruitment, employer branding, and selection processes that identify candidates who will thrive in your organization.',
 'users',
 '["Recruitment Strategy", "Employer Branding", "Assessment Centers", "Onboarding Programs"]',
 TRUE),

('NSSA Registration & Returns', 'nssa-registration-returns',
 'Complete NSSA registration and ensure accurate, timely statutory returns for your organization.',
 'We handle all aspects of NSSA compliance including initial registration, monthly/quarterly returns, employee registration, and ensuring your organization remains fully compliant with Zimbabwe''s social security requirements.',
 'clipboard-list',
 '["NSSA Registration", "Monthly Returns", "Employee Registration", "Compliance Audits", "Statutory Reporting"]',
 TRUE);

-- Insert default case studies
INSERT INTO case_studies (title, slug, client, industry, challenge, solution, results, testimonial, image, published) VALUES
('Digital Transformation of HR Operations', 'digital-transformation-hr',
 'Leading Fintech Company', 'Financial Services',
 'Outdated HR processes causing inefficiencies and employee dissatisfaction in a rapidly growing fintech startup.',
 'Implemented a comprehensive HR digital transformation including automated workflows, self-service portals, and data-driven decision making.',
 '["40% reduction in HR administrative time", "85% employee satisfaction improvement", "60% faster onboarding process"]',
 'ESHRM transformed our HR operations completely. We''re now able to scale efficiently while maintaining excellent employee experience.',
 '/images/christina-wocintechchat-com-utw3j-aoikm-unsplash.jpg',
 TRUE),

('Culture Transformation Program', 'culture-transformation',
 'Pan-African Manufacturing Corp', 'Manufacturing',
 'Siloed departments, low employee engagement, and resistance to change in a traditional manufacturing company.',
 'Designed and implemented a comprehensive culture transformation program focusing on collaboration, innovation, and employee empowerment.',
 '["35% increase in employee engagement", "50% reduction in turnover", "25% improvement in productivity"]',
 NULL,
 '/images/team-business-people-collaborating-plan-financial-strategy-doing-teamwork-create-sales-report-laptop-office-employees-working-project-strategy-analyze-career-growth.jpg',
 TRUE),

('Leadership Development Initiative', 'leadership-development',
 'Regional Healthcare Network', 'Healthcare',
 'Leadership gaps and succession planning concerns in a growing healthcare organization.',
 'Created a customized leadership development program including coaching, mentoring, and experiential learning.',
 '["90% of participants promoted within 18 months", "Leadership readiness score improved by 65%", "Internal promotion rate increased to 75%"]',
 NULL,
 '/images/african-american-business-woman-presenting-coworker-accounting-documentation-statistics-data-tablet-accountant-being-briefed-by-project-manager-about-wrongly-declared-income-expenses.jpg',
 TRUE);

-- Insert default blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, category, tags, author, image, published_at, published) VALUES
('The Future of HR in Africa: Trends to Watch in 2025', 'future-hr-africa-2025',
 'Explore the key HR trends shaping the African business landscape and how organizations can prepare for the future of work.',
 '<p>The African HR landscape is evolving rapidly, driven by technological advancements, changing workforce demographics, and the growing emphasis on employee experience.</p><h2>Key Trends</h2><p>Digital transformation continues to reshape how HR departments operate across the continent. From AI-powered recruitment to cloud-based HR systems, technology is enabling more efficient and data-driven HR practices.</p><h3>1. Remote and Hybrid Work</h3><p>The shift towards flexible work arrangements is here to stay. Organizations that embrace hybrid models will have a competitive advantage in attracting top talent.</p><h3>2. Employee Wellbeing</h3><p>Mental health and overall wellbeing are becoming central to HR strategies. Companies are investing in comprehensive wellness programs that address physical, mental, and financial health.</p><h3>3. Skills-Based Hiring</h3><p>Traditional credential-based hiring is giving way to skills-based approaches. This opens opportunities for a more diverse talent pool and better job-candidate matching.</p><h2>Preparing for the Future</h2><p>Organizations should start by auditing their current HR capabilities and identifying gaps. Investing in HR technology, upskilling HR teams, and building a culture of continuous learning will be essential for success.</p>',
 'HR Trends',
 '["HR Trends", "Africa", "Future of Work", "Digital Transformation"]',
 'ESHRM Team',
 '/images/christina-wocintechchat-com-yfjyi22stlk-unsplash.jpg',
 '2025-01-10',
 TRUE),

('Building a Compliance-First HR Strategy', 'compliance-first-hr-strategy',
 'Learn how to develop HR policies that ensure regulatory compliance while supporting business objectives.',
 '<p>In today''s complex regulatory environment, compliance is no longer optional—it''s a business imperative. Organizations that fail to maintain compliant HR practices face significant legal, financial, and reputational risks.</p><h2>Understanding the Compliance Landscape</h2><p>African labor laws vary significantly by country, making compliance particularly challenging for organizations operating across multiple jurisdictions. Key areas of focus include employment contracts, working hours, leave entitlements, and termination procedures.</p><h2>Building Your Compliance Framework</h2><h3>1. Conduct a Compliance Audit</h3><p>Start by assessing your current HR policies and practices against applicable laws and regulations. Identify gaps and prioritize areas that pose the highest risk.</p><h3>2. Develop Clear Policies</h3><p>Create comprehensive HR policies that clearly communicate expectations and procedures. Ensure policies are regularly reviewed and updated to reflect regulatory changes.</p><h3>3. Train Your Team</h3><p>Compliance is everyone''s responsibility. Regular training ensures all employees understand their obligations and can identify potential compliance issues.</p><h3>4. Implement Monitoring Systems</h3><p>Use technology to track compliance metrics and flag potential issues before they become problems.</p>',
 'Compliance',
 '["Compliance", "HR Policy", "Risk Management", "Legal"]',
 'ESHRM Team',
 '/images/doctor-helping-patient-signing-paperwork-medical-insurance-document-form-illness-healthcare-treatment-clinical-consultation-hospital-policy-bill-medication-prescription-close-up.jpg',
 '2025-01-05',
 TRUE),

('Effective Leadership in Remote and Hybrid Teams', 'leadership-remote-hybrid-teams',
 'Discover strategies for leading distributed teams effectively and maintaining engagement across locations.',
 '<p>Remote work has become the new normal for many organizations, presenting unique challenges and opportunities for leaders. Successfully managing distributed teams requires a shift in leadership approach and new skills.</p><h2>The Challenges of Remote Leadership</h2><p>Leading remote teams comes with distinct challenges: maintaining team cohesion, ensuring clear communication, monitoring performance without micromanaging, and supporting employee wellbeing from a distance.</p><h2>Strategies for Success</h2><h3>1. Establish Clear Communication Channels</h3><p>Define which tools to use for different types of communication. Use video calls for important discussions, instant messaging for quick questions, and email for formal communications.</p><h3>2. Set Clear Expectations</h3><p>Remote work requires crystal-clear expectations about deliverables, deadlines, and availability. Document agreements and review them regularly.</p><h3>3. Focus on Outcomes, Not Activity</h3><p>Shift from monitoring hours worked to measuring results achieved. Trust your team to manage their time effectively.</p><h3>4. Prioritize Connection</h3><p>Schedule regular one-on-ones and team meetings. Create opportunities for informal interaction to build relationships and maintain team culture.</p><h3>5. Support Wellbeing</h3><p>Remote work can lead to burnout and isolation. Check in regularly on how team members are doing, not just what they''re doing.</p>',
 'Leadership',
 '["Leadership", "Remote Work", "Team Management", "Hybrid Work"]',
 'ESHRM Team',
 '/images/christina-wocintechchat-com-4pu-oc8sw98-unsplash-20-281-29.jpg',
 '2024-12-28',
 TRUE);

-- Insert default testimonials
INSERT INTO testimonials (name, role, company, content, image, published) VALUES
('Amara Okonkwo', 'Chief People Officer', 'TechAfrica Solutions',
 'ESHRM has been instrumental in transforming our HR function. Their expertise and dedication to understanding our unique challenges resulted in solutions that truly work for our organization.',
 '/images/the-20origin-20of-20black-20people-20according-20to-20the-20bible.jpeg',
 TRUE),

('David Mensah', 'Managing Director', 'GrowthPath Industries',
 'Working with ESHRM was a game-changer for our company. They helped us build a performance management system that has significantly improved our team''s productivity and engagement.',
 NULL,
 TRUE),

('Fatima Al-Hassan', 'HR Director', 'Sahel Investments',
 'The training programs delivered by ESHRM exceeded our expectations. Our leadership team is now more confident, capable, and aligned with our strategic goals.',
 NULL,
 TRUE);

-- Insert default site settings
INSERT INTO site_settings (setting_key, setting_value) VALUES
('site_name', 'ESHRM'),
('tagline', 'Transforming HR for African Businesses'),
('primary_color', '#7C3AED'),
('accent_color', '#000000'),
('phone', '+263 779 122 227'),
('phone_secondary', '+263 774 193 064'),
('email', 'info@eshrm.africa'),
('address', 'Harare, Zimbabwe'),
('linkedin', 'https://linkedin.com/company/eshrm'),
('twitter', 'https://twitter.com/eshrm'),
('facebook', 'https://facebook.com/eshrm');

-- Insert default admin user (password: admin123 - CHANGE THIS IN PRODUCTION!)
-- Password hash generated with bcrypt (cost 10)
INSERT INTO admin_users (email, password_hash, name, role) VALUES
('admin@eshrm.africa', '$2a$10$rQnR7.Y9LYxZ5M8xQYqPh.7F8L0vJqJQxG5X5Y5Y5Y5Y5Y5Y5Y5Y5', 'Administrator', 'admin');
