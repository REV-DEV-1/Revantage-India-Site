/*
# Seed Initial Data for RCM Website

## Overview
Populates all tables with initial content: departments, jobs, employee stories, leadership, and events.
This gives the website a rich, production-ready appearance on first load.

## Data inserted:
1. Departments — 10 RCM departments
2. Jobs — 12 open positions across departments
3. Employee stories — 6 testimonials
4. Leadership — 8 leaders
5. Events — 6 culture events
*/

-- ============ Departments ============
INSERT INTO departments (name, slug, description, icon, display_order) VALUES
('Accounts Receivable (AR)', 'ar', 'Managing the complete revenue cycle from claim submission to final payment, reducing days in AR and maximizing collections.', 'TrendingUp', 1),
('Medical Billing', 'billing', 'End-to-end billing operations including charge entry, claim submission, and payment reconciliation.', 'FileText', 2),
('Payment Posting', 'payment-posting', 'Accurate and efficient posting of payments, adjustments, and denials from EOBs and ERAs.', 'CreditCard', 3),
('Prior Authorization', 'prior-auth', 'Securing prior authorizations to ensure timely patient access to medical procedures.', 'ShieldCheck', 4),
('Eligibility & Benefits Verification', 'eligibility', 'Verifying patient insurance coverage and benefits to prevent claim denials.', 'BadgeCheck', 5),
('Credentialing', 'credentialing', 'Managing provider credentialing and enrollment with payers and facilities.', 'Award', 6),
('Denials Management', 'denials', 'Analyzing, appealing, and resolving denied claims to recover lost revenue.', 'RotateCcw', 7),
('Quality Assurance', 'qa', 'Ensuring accuracy and compliance across all RCM processes through rigorous quality checks.', 'CheckCircle', 8),
('Automation & Technology', 'automation', 'Leveraging RPA, AI, and advanced analytics to transform RCM operations.', 'Cpu', 9),
('Coding', 'coding', 'Certified medical coding ensuring accurate claim submission and compliance.', 'Code', 10)
ON CONFLICT (slug) DO NOTHING;

-- ============ Jobs ============
INSERT INTO jobs (title, slug, department, location, job_type, experience_level, description, responsibilities, requirements, qualifications, benefits, is_active, is_featured) VALUES
('Senior AR Analyst', 'senior-ar-analyst', 'Accounts Receivable (AR)', 'Chennai, India', 'Full-time', '3-5 years',
'Manage complex AR portfolios for US healthcare clients, analyze aging reports, and drive collection strategies.',
ARRAY['Manage AR portfolios of $2M+ for assigned clients','Analyze aging reports and prioritize collection efforts','Follow up with insurance payers via calls and portals','Identify root causes of denials and implement corrective actions','Prepare monthly AR reports for client review'],
ARRAY['3-5 years of AR experience in US healthcare RCM','Strong understanding of US insurance payer landscape','Experience with multiple billing systems','Excellent analytical and communication skills'],
ARRAY['Bachelor''s degree in any discipline','Certification in medical billing or coding preferred','Experience with Epic, eClinicalWorks, or Athena preferred'],
ARRAY['Competitive salary with performance bonuses','Health insurance for you and your family','Flexible work arrangements','Career growth into team lead roles','US healthcare domain training'],
true, true),

('Medical Billing Specialist', 'medical-billing-specialist', 'Medical Billing', 'Hyderabad, India', 'Full-time', '1-3 years',
'Handle end-to-end medical billing operations for US healthcare providers including charge entry and claim submission.',
ARRAY['Accurate charge entry from superbills','Submit claims to insurance payers electronically','Monitor claim status and resolve rejections','Coordinate with coding team for code verification','Maintain billing reports and dashboards'],
ARRAY['1-3 years of medical billing experience','Knowledge of CPT, ICD-10, and HCPCS codes','Experience with US healthcare billing software','High attention to detail and accuracy'],
ARRAY['Bachelor''s degree','Medical billing certification preferred','Typing speed of 40+ WPM'],
ARRAY['Comprehensive training program','Performance-based incentives','Health and wellness benefits','Transport facilities','Career progression to senior billing roles'],
true, true),

('Payment Posting Associate', 'payment-posting-associate', 'Payment Posting', 'Chennai, India', 'Full-time', '0-2 years',
'Process payments, adjustments, and denials from EOBs and ERAs with high accuracy and efficiency.',
ARRAY['Post payments from EOBs and ERAs accurately','Process adjustments and denials in billing system','Reconcile daily posting reports','Identify and escalate discrepancies','Maintain productivity and quality standards'],
ARRAY['0-2 years of payment posting experience','Understanding of EOB/ERA processing','Good keyboard skills and attention to detail','Basic knowledge of US healthcare insurance'],
ARRAY['Bachelor''s degree','Prior BPO or healthcare experience a plus'],
ARRAY['Entry-level training program','Performance incentives','Health insurance','Career growth into AR or billing','Supportive work environment'],
true, false),

('Prior Authorization Specialist', 'prior-auth-specialist', 'Prior Authorization', 'Hyderabad, India', 'Full-time', '2-4 years',
'Obtain prior authorizations for medical procedures, ensuring timely patient access and compliance.',
ARRAY['Submit prior authorization requests to insurance payers','Follow up on pending authorizations','Verify medical necessity documentation','Coordinate with provider offices for additional info','Maintain authorization logs and reports'],
ARRAY['2-4 years of prior authorization experience','Strong knowledge of authorization processes','Experience with payer portals','Excellent phone and communication skills'],
ARRAY['Bachelor''s degree','Prior auth certification preferred','Experience with multiple specialties preferred'],
ARRAY['Competitive compensation','Health benefits for family','Performance bonuses','Skill development programs','Career advancement opportunities'],
true, true),

('Eligibility Verification Analyst', 'eligibility-verification-analyst', 'Eligibility & Benefits Verification', 'Chennai, India', 'Full-time', '1-3 years',
'Verify patient insurance coverage and benefits to ensure accurate billing and reduce denials.',
ARRAY['Verify insurance coverage via payer portals and calls','Document benefits including copays, deductibles, and coinsurance','Communicate patient financial responsibilities','Update eligibility information in billing system','Identify coverage issues and escalate appropriately'],
ARRAY['1-3 years of eligibility verification experience','Familiarity with US insurance payer portals','Strong attention to detail','Good communication and phone skills'],
ARRAY['Bachelor''s degree','Healthcare or insurance background preferred'],
ARRAY['Structured training program','Incentives for accuracy','Health insurance coverage','Career growth opportunities','Modern workplace facilities'],
true, false),

('Denials Management Specialist', 'denials-management-specialist', 'Denials Management', 'Hyderabad, India', 'Full-time', '2-5 years',
'Analyze denied claims, develop appeal strategies, and recover lost revenue for US healthcare clients.',
ARRAY['Analyze denial trends and root causes','Prepare and submit appeals for denied claims','Work with payers to resolve claim issues','Develop denial prevention strategies','Report denial analytics to management'],
ARRAY['2-5 years of denials management experience','Deep understanding of denial codes and reasons','Experience writing appeals and reconsideration letters','Strong analytical and problem-solving skills'],
ARRAY['Bachelor''s degree','Certification in medical billing or coding','Experience with multiple specialties'],
ARRAY['Performance-based compensation','Comprehensive health benefits','Career growth into management','Advanced training programs','Recognition and awards'],
true, true),

('QA Analyst - RCM', 'qa-analyst-rcm', 'Quality Assurance', 'Chennai, India', 'Full-time', '2-4 years',
'Conduct quality audits across RCM processes to ensure accuracy, compliance, and client satisfaction.',
ARRAY['Audit RCM transactions for accuracy and compliance','Identify quality issues and training needs','Prepare QA reports and dashboards','Conduct feedback sessions with teams','Implement quality improvement initiatives'],
ARRAY['2-4 years of QA experience in healthcare RCM','Strong understanding of RCM processes','Excellent analytical and reporting skills','Detail-oriented with high quality standards'],
ARRAY['Bachelor''s degree','Six Sigma or QA certification preferred','Experience with quality frameworks'],
ARRAY['Competitive salary and bonuses','Health and family benefits','Career growth into QA leadership','Continuous learning opportunities','Recognition programs'],
true, false),

('RPA Developer - Healthcare', 'rpa-developer-healthcare', 'Automation & Technology', 'Hyderabad, India', 'Full-time', '3-6 years',
'Develop RPA solutions and automation tools to transform RCM operations and drive efficiency.',
ARRAY['Design and develop RPA solutions using UiPath or Power Automate','Automate repetitive RCM processes','Integrate automation with existing billing systems','Monitor and maintain deployed bots','Document technical solutions and processes'],
ARRAY['3-6 years of RPA development experience','Proficiency in UiPath, Power Automate, or similar','Programming skills in Python, C#, or similar','Understanding of RCM processes preferred'],
ARRAY['Bachelor''s degree in Computer Science or related field','RPA certification (UiPath preferred)','Experience with API integration'],
ARRAY['Premium technology compensation','Health benefits for family','Learning and certification budget','Career growth into tech leadership','Modern tech workspace'],
true, true),

('Medical Coding Specialist', 'medical-coding-specialist', 'Coding', 'Chennai, India', 'Full-time', '1-3 years',
'Assign accurate medical codes to diagnoses and procedures for US healthcare providers.',
ARRAY['Assign ICD-10, CPT, and HCPCS codes accurately','Review medical documentation for completeness','Ensure coding compliance with guidelines','Coordinate with billing team on code queries','Maintain coding productivity and accuracy standards'],
ARRAY['1-3 years of medical coding experience','Certification: CPC, CCS, or equivalent','Strong knowledge of ICD-10, CPT, HCPCS','Detail-oriented with high accuracy'],
ARRAY['Bachelor''s degree','CPC or CCS certification required','Experience with multiple specialties preferred'],
ARRAY['Competitive salary with accuracy incentives','Health insurance benefits','Continuing education support','Career growth to coding auditor','Flexible scheduling options'],
true, false),

('Team Lead - AR Operations', 'team-lead-ar-operations', 'Accounts Receivable (AR)', 'Hyderabad, India', 'Full-time', '5-8 years',
'Lead a team of AR analysts, drive performance, and ensure client deliverables are met consistently.',
ARRAY['Lead and mentor a team of 15-20 AR analysts','Monitor team performance and productivity','Conduct regular team meetings and reviews','Ensure client SLAs and quality standards are met','Drive process improvements and initiatives'],
ARRAY['5-8 years of AR experience including 2+ years in leadership','Strong team management skills','Deep understanding of AR processes and metrics','Excellent communication and client management skills'],
ARRAY['Bachelor''s degree','Medical billing or coding certification','Leadership or management training preferred'],
ARRAY['Leadership compensation package','Comprehensive family health insurance','Performance bonuses and profit sharing','Career growth into operations management','Leadership development programs'],
true, true),

('Credentialing Specialist', 'credentialing-specialist', 'Credentialing', 'Chennai, India', 'Full-time', '2-4 years',
'Manage provider credentialing, enrollment, and re-credentialing with payers and healthcare facilities.',
ARRAY['Process provider credentialing applications','Verify provider credentials and documentation','Submit enrollment to Medicare, Medicaid, and commercial payers','Track re-credentialing deadlines','Maintain credentialing database and reports'],
ARRAY['2-4 years of credentialing experience','Knowledge of credentialing processes and standards','Experience with CAQH and payer enrollment','Strong organizational and documentation skills'],
ARRAY['Bachelor''s degree','CPCS certification preferred','Experience with credentialing software'],
ARRAY['Competitive compensation','Health and wellness benefits','Career development opportunities','Supportive team environment','Performance recognition'],
true, false),

('Data Analyst - RCM Analytics', 'data-analyst-rcm-analytics', 'Automation & Technology', 'Hyderabad, India', 'Full-time', '2-5 years',
'Build analytics dashboards and reports to drive data-informed RCM decisions for US healthcare clients.',
ARRAY['Develop and maintain RCM analytics dashboards','Analyze revenue cycle performance metrics','Create client-facing reports and presentations','Identify trends and opportunities for improvement','Work with operations to implement data-driven solutions'],
ARRAY['2-5 years of data analysis experience','Proficiency in SQL, Excel, and BI tools (Tableau, Power BI)','Experience with Python or R preferred','Strong data visualization skills'],
ARRAY['Bachelor''s degree in a quantitative field','Experience in healthcare analytics preferred','Knowledge of RCM metrics and KPIs'],
ARRAY['Premium technology compensation','Health benefits for family','Learning and certification budget','Career growth into analytics leadership','Modern workspace and tools'],
true, false)
ON CONFLICT (slug) DO NOTHING;

-- ============ Employee Stories ============
INSERT INTO employee_stories (name, role, department, years_at_company, image_url, quote, story, display_order, is_active) VALUES
('Priya Sharma', 'Senior AR Analyst', 'Accounts Receivable (AR)', 4, NULL,
'I started as a trainee and now I manage a portfolio worth millions. The growth here is real.',
'When I joined four years ago, I was new to US healthcare. The structured training program gave me a strong foundation, and my managers consistently pushed me to take on more responsibility. Today, I manage AR portfolios for multiple clients and mentor a team of three. What I love most is that my work directly impacts the financial health of healthcare providers across the US.',
1, true),

('Rajesh Kumar', 'Team Lead - Denials', 'Denials Management', 6, NULL,
'Every denial I resolve is revenue recovered for a patient. That sense of purpose drives me every day.',
'After six years, I can confidently say this is more than a job. I started in payment posting, moved to denials, and now lead a team. The company invested in my CPC certification, sent me to client meetings, and gave me leadership training. The US healthcare exposure is unmatched — I work with payers and providers across the country.',
2, true),

('Anitha Reddy', 'Prior Auth Specialist', 'Prior Authorization', 3, NULL,
'Knowing my work helps patients get access to their procedures on time is incredibly fulfilling.',
'I came from a general BPO background and was worried about the transition to healthcare. But the training was thorough, and my team leads were patient and supportive. Now I handle prior authorizations across multiple specialties and have become a subject matter expert. The recognition programs here make you feel valued.',
3, true),

('Vikram Singh', 'RPA Developer', 'Automation & Technology', 2, NULL,
'Building automation that saves thousands of hours of manual work — that''s the kind of impact I wanted.',
'As an RPA developer, I get to work at the intersection of technology and healthcare. We are automating processes that used to take hours of manual effort. The tech stack is modern, the leadership supports experimentation, and I have a clear path to becoming a senior architect. This is the best tech environment I have worked in.',
4, true),

('Deepika Iyer', 'QA Analyst', 'Quality Assurance', 5, NULL,
'Quality is not just about finding errors — it is about building excellence into every process.',
'I started in billing and discovered my passion for quality. The company supported my transition to QA, funded my Six Sigma certification, and now I audit processes across departments. What sets this place apart is the genuine investment in employee development. I have grown more in five years here than I ever expected.',
5, true),

('Karthik Nair', 'Team Lead - Billing Operations', 'Medical Billing', 7, NULL,
'From a billing associate to a team lead — the career path here is not just promised, it is delivered.',
'Seven years ago, I walked in as a fresher with no healthcare experience. Today I lead a team of 25 billing professionals and manage client relationships directly. The promotions were not just about tenure — they were about performance and potential. The leadership access is incredible; I can walk into my director''s office and be heard.',
6, true);

-- ============ Leadership ============
INSERT INTO leadership (name, title, bio, image_url, display_order, is_active) VALUES
('Rajesh Menon', 'CEO & Managing Director, India Operations', '20+ years in healthcare RCM. Led India operations from 200 to 2,000+ employees. Passionate about building careers, not just teams.', NULL, 1, true),
('Sarah Mitchell', 'President & CEO, US Operations', '25+ years in US healthcare revenue cycle management. Founded the company with a vision to transform RCM through people and technology.', NULL, 2, true),
('Anand Krishnan', 'VP, India Operations', '15+ years in BPO/RCM operations. Oversees all India delivery centers and ensures operational excellence across teams.', NULL, 3, true),
('Lakshmi Venkat', 'VP, Human Resources', '18+ years in HR leadership. Architect of the company''s people-first culture and career development framework.', NULL, 4, true),
('David Chen', 'VP, Technology & Innovation', '12+ years in healthcare technology. Leads automation, AI, and analytics initiatives that transform RCM operations.', NULL, 5, true),
('Priya Nair', 'Director, Training & Development', '10+ years in learning and development. Built the company''s comprehensive training academy from the ground up.', NULL, 6, true),
('Michael Roberts', 'VP, Client Services', '20+ years in client relationship management. Ensures exceptional service delivery for all US healthcare clients.', NULL, 7, true),
('Suresh Babu', 'Director, Quality & Compliance', '15+ years in quality management. Six Sigma Black Belt leading quality initiatives across all RCM processes.', NULL, 8, true);

-- ============ Events ============
INSERT INTO events (title, description, event_date, image_url, category, display_order, is_active) VALUES
('Annual Day Celebration', 'A grand celebration of our people and achievements, featuring performances, awards, and recognition.', '2026-01-15', NULL, 'Culture', 1, true),
('Health & Wellness Week', 'A week dedicated to employee wellbeing with fitness challenges, yoga sessions, and health screenings.', '2026-02-10', NULL, 'Wellness', 2, true),
('Diwali Celebration', 'Lighting up the workplace with festive decorations, cultural performances, and sweet celebrations.', '2026-10-28', NULL, 'Festival', 3, true),
('Sports Tournament', 'Inter-department cricket, badminton, and table tennis tournaments with exciting prizes.', '2026-03-20', NULL, 'Sports', 4, true),
('Learning Summit', 'Annual learning and development summit featuring guest speakers, workshops, and certification programs.', '2026-06-12', NULL, 'Learning', 5, true),
('Family Day', 'A special day where families of employees visit our offices to experience our culture and workplace.', '2026-04-18', NULL, 'Culture', 6, true);
