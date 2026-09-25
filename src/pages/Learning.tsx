import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '@/components/Reveal';
import {
  ArrowRight, BookOpen, GraduationCap, Users, Rocket, Award,
  CheckCircle, Star, Cpu, Brain, Target, Briefcase, Zap,
  Globe, ShieldCheck, TrendingUp, Lightbulb, Trophy,
} from 'lucide-react';

const learningImage = 'https://images.pexels.com/photos/8761328/pexels-photo-8761328.jpeg?auto=compress&cs=tinysrgb&w=1920';

const programs = [
  { icon: BookOpen, title: 'Structured Training Academy', desc: 'US healthcare fundamentals, medical terminology, billing systems, and payer processes — all covered in your first 30 days.', color: '#10159B' },
  { icon: GraduationCap, title: 'Certification Support', desc: 'Full funding for CPC, CCS, Six Sigma, and other industry-recognized certifications that advance your career.', color: '#2DCB3B' },
  { icon: Users, title: 'Dedicated Mentorship', desc: 'Every employee is paired with an experienced mentor who guides your professional development and career path.', color: '#D60808' },
  { icon: Rocket, title: 'Leadership Development', desc: 'Targeted programs that prepare high performers for team lead, manager, and director roles.', color: '#F5B835' },
];

const ldCategories = [
  { icon: BookOpen, title: 'Healthcare Fundamentals', desc: 'US healthcare system, insurance landscape, medical terminology, and RCM basics.', color: '#10159B', count: '30 days', tag: 'Foundation' },
  { icon: Cpu, title: 'Technology & Tools', desc: 'Hands-on training in billing software, EHR systems, and AI-driven RCM platforms.', color: '#2DCB3B', count: 'Ongoing', tag: 'Technical' },
  { icon: Brain, title: 'Cognitive Skill Building', desc: 'Critical thinking, problem-solving, and analytical skills for complex claim scenarios.', color: '#D60808', count: 'Quarterly', tag: 'Cognitive' },
  { icon: ShieldCheck, title: 'Compliance & HIPAA', desc: 'Healthcare privacy, data security, and regulatory compliance training.', color: '#F5B835', count: 'Annual', tag: 'Compliance' },
  { icon: TrendingUp, title: 'Process Excellence', desc: 'Six Sigma, Lean methodologies, and quality improvement frameworks.', color: '#4B52D8', count: 'Project-based', tag: 'Quality' },
  { icon: Lightbulb, title: 'Innovation Lab', desc: 'Creative problem-solving, hackathons, and process improvement ideation sessions.', color: '#10159B', count: 'Monthly', tag: 'Innovation' },
  { icon: Briefcase, title: 'Leadership Academy', desc: 'Management fundamentals, team dynamics, and executive presence development.', color: '#2DCB3B', count: 'Cohort-based', tag: 'Leadership' },
  { icon: Globe, title: 'Cross-Cultural Training', desc: 'US business culture, communication styles, and client-facing etiquette.', color: '#D60808', count: 'Onboarding', tag: 'Culture' },
  { icon: Trophy, title: 'Recognition & Gamification', desc: 'Skill badges, leaderboards, and learning milestones with rewards and recognition.', color: '#F5B835', count: 'Continuous', tag: 'Gamified' },
];

const certifications = [
  'CPC (Certified Professional Coder)',
  'CCS (Certified Coding Specialist)',
  'Six Sigma Green & Black Belt',
  'CPB (Certified Professional Biller)',
  'CMRS (Certified Medical Reimbursement Specialist)',
  'Project Management (PMP)',
];

const trainingTimeline = [
  { week: 'Week 1-2', title: 'Healthcare Fundamentals', desc: 'US healthcare system, insurance landscape, and medical terminology basics.', color: '#10159B' },
  { week: 'Week 3-4', title: 'RCM Operations', desc: 'Hands-on training in billing software, coding standards, and payer processes.', color: '#2DCB3B' },
  { week: 'Month 2-3', title: 'Live Operations', desc: 'Begin working on real accounts with mentorship and quality support.', color: '#D60808' },
  { week: 'Ongoing', title: 'Continuous Learning', desc: 'Regular upskilling, certifications, and cross-training opportunities.', color: '#F5B835' },
];

const activeFilters = ['All', 'Foundation', 'Technical', 'Cognitive', 'Compliance', 'Quality', 'Innovation', 'Leadership', 'Culture', 'Gamified'] as const;
type FilterType = typeof activeFilters[number];

const categoryFilters: Record<FilterType, number[]> = {
  All: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  Foundation: [0],
  Technical: [1],
  Cognitive: [2],
  Compliance: [3],
  Quality: [4],
  Innovation: [5],
  Leadership: [6],
  Culture: [7],
  Gamified: [8],
};

export default function Learning() {
  const [filter, setFilter] = useState<FilterType>('All');
  const visibleIndices = categoryFilters[filter];

  return (
    <div className="bg-[#F7F9FF] pt-16">
      {/* Hero with dynamic gradient */}
      <section className="relative h-[50vh] min-h-[350px] overflow-hidden hero-orbit">
        <div className="absolute inset-0 bg-grid-warm opacity-30" />
        <div className="absolute top-1/3 right-[15%] w-32 h-32 rounded-full bg-[#2DCB3B]/20 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-[15%] w-28 h-28 rounded-full bg-[#4B52D8]/20 blur-3xl animate-float" style={{ animationDelay: '1.2s' }} />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4 animate-fade-in-up">
            <GraduationCap size={16} className="text-[#6BE878]" />
            <span className="text-white text-sm font-bold tracking-wide">Learning & Development</span>
          </div>
          <h1 className="text-white hero-title animate-fade-in-up delay-200">Your growth is<br /><span className="text-gradient-brand">our investment.</span></h1>
        </div>
      </section>

      {/* Programs */}
      <section className="py-24 sm:py-32">
        <div className="container-rev">
          <Reveal>
            <p className="section-eyebrow text-[#10159B]">Our Programs</p>
            <h2 className="section-title mb-16">From day one to<br />director and beyond.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {programs.map((program, i) => (
              <Reveal key={i} delay={((i % 2) + 1) as 1 | 2}>
                <div className="bg-white rounded-3xl p-10 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 h-full flex gap-5">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${program.color}15` }}>
                    <program.icon style={{ color: program.color }} size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                    <p className="text-[#4B5578] leading-relaxed">{program.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* L&D Categories with Filters */}
      <section className="py-24 sm:py-32 bg-[#EEF1FF]">
        <div className="container-rev">
          <Reveal>
            <p className="section-eyebrow text-[#2DCB3B]">Learning Categories</p>
            <h2 className="section-title mb-6">Nine ways we invest<br />in your growth.</h2>
            <p className="body-large text-[#4B5578] max-w-2xl mb-10">
              Our learning ecosystem covers everything from healthcare fundamentals
              to leadership development, with gamified milestones and continuous
              skill building.
            </p>
          </Reveal>

          {/* Filter Chips */}
          <Reveal delay={2}>
            <div className="flex flex-wrap gap-3 mb-12">
              {activeFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`category-chip ${filter === f ? 'active' : ''}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Category Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ldCategories.map((cat, i) => {
              const isVisible = visibleIndices.includes(i);
              return (
                <div key={i} className={`transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 hidden'}`}>
                  <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 h-full group">
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: `${cat.color}15` }}>
                        <cat.icon style={{ color: cat.color }} size={28} />
                      </div>
                      <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: `${cat.color}10`, color: cat.color }}>
                        {cat.count}
                      </span>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: cat.color }}>{cat.tag}</span>
                    <h3 className="text-lg font-bold mt-1 mb-2">{cat.title}</h3>
                    <p className="text-sm text-[#4B5578] leading-relaxed">{cat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Training Timeline */}
      <section className="py-24 sm:py-32">
        <div className="container-rev">
          <Reveal>
            <p className="section-eyebrow text-[#D60808]">Training Journey</p>
            <h2 className="section-title mb-16">Your first 90 days<br />and beyond.</h2>
          </Reveal>
          <div className="space-y-6">
            {trainingTimeline.map((item, i) => (
              <Reveal key={i} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <div className="flex gap-6 items-start bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-500">
                  <div className="flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-sm text-center p-2" style={{ backgroundColor: item.color }}>
                    {item.week}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                    <p className="text-[#4B5578]">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 sm:py-32 bg-[#EEF1FF]">
        <div className="container-rev">
          <Reveal>
            <p className="section-eyebrow text-[#F5B835]">Certifications We Fund</p>
            <h2 className="section-title mb-16">Investing in your<br />professional credentials.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, i) => (
              <Reveal key={i} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <div className="flex items-center gap-3 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border-2 border-transparent hover:border-[#2DCB3B]/30">
                  <CheckCircle className="text-[#2DCB3B] flex-shrink-0" size={24} />
                  <span className="font-semibold text-sm">{cert}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden hero-orbit">
        <div className="absolute inset-0 bg-grid-warm opacity-20" />
        <div className="container-rev text-center relative z-10">
          <Reveal>
            <Award className="text-[#6BE878] mx-auto mb-6" size={40} />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">Ready to learn and grow?</h2>
            <Link to="/careers" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#2DCB3B] text-white text-base font-bold transition-all duration-300 hover:scale-105 shadow-xl">
              Start Your Journey <ArrowRight size={18} className="ml-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
