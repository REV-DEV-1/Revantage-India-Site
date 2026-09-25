import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { EmployeeStory, EventItem, Job, SocialPost } from '@/types';
import Reveal from '@/components/Reveal';
import {
  ArrowRight, Sparkles, Heart, Users, GraduationCap, Rocket,
  Trophy, Calendar, MapPin, Briefcase, ChevronDown, Quote,
  ShieldCheck, Cpu, Zap, Star, Network, BookOpen, Target,
  Coffee, Music, Gamepad2, Palette, Dumbbell, Globe,
  Linkedin, Instagram, ExternalLink, ThumbsUp,
} from 'lucide-react';

const storyImages = [
  'https://images.pexels.com/photos/7658430/pexels-photo-7658430.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/7580987/pexels-photo-7580987.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/8837788/pexels-photo-8837788.jpeg?auto=compress&cs=tinysrgb&w=600',
];

const cultureImage = 'https://images.pexels.com/photos/7710129/pexels-photo-7710129.jpeg?auto=compress&cs=tinysrgb&w=1920';
const teamImage = 'https://images.pexels.com/photos/23496662/pexels-photo-23496662.jpeg?auto=compress&cs=tinysrgb&w=1920';

const stats = [
  { value: '50+', label: 'Employees', icon: Users, color: '#2DCB3B' },
  { value: '40+', label: 'US Clients', icon: ShieldCheck, color: '#D60808' },
  { value: '3+', label: 'Years of RCM', icon: Star, color: '#F5B835' },
  { value: '45+', label: 'Years Ops Leadership', icon: Network, color: '#4B52D8' },
];

const pillars = [
  { icon: Heart, title: 'People-First Culture', desc: 'Open communication, leadership accessibility, and genuine investment in every individual.', link: '/life', color: '#10159B' },
  { icon: GraduationCap, title: 'Learning & Growth', desc: 'Structured training academy, funded certifications, and dedicated mentorship from day one.', link: '/learning', color: '#2DCB3B' },
  { icon: Rocket, title: 'Career Progression', desc: 'Clear path from trainee to director — promotions based on performance, not just tenure.', link: '/growth', color: '#D60808' },
  { icon: Sparkles, title: 'Recognition & Awards', desc: 'Monthly, quarterly, and annual celebrations of outstanding contributions.', link: '/benefits', color: '#F5B835' },
];

const services = [
  { icon: Zap, title: 'Revenue Cycle Management', desc: 'End-to-end RCM from patient registration to payment posting.' },
  { icon: ShieldCheck, title: 'Denials Management', desc: 'Proactive denial prevention and expert appeal workflows.' },
  { icon: Cpu, title: 'AI-Driven Solutions', desc: 'Technology-enabled billing with intelligent automation.' },
  { icon: BookOpen, title: 'Medical Coding', desc: 'Certified coding across specialties with compliance focus.' },
  { icon: Target, title: 'AR & Collections', desc: 'Aggressive yet patient-friendly accounts receivable management.' },
  { icon: Network, title: 'Provider Enrollment', desc: 'Credentialing and payer enrollment done right.' },
];

const funCategories = [
  { icon: Trophy, title: 'Sports & Tournaments', desc: 'Cricket, football, badminton leagues and inter-department competitions.', color: '#2DCB3B' },
  { icon: Music, title: 'Cultural Celebrations', desc: 'Diwali, Pongal, Onam, and festivals celebrated with full enthusiasm.', color: '#D60808' },
  { icon: Gamepad2, title: 'Game & Fun Fridays', desc: 'Board games, trivia, and team-building activities every Friday.', color: '#F5B835' },
  { icon: Palette, title: 'Creative Clubs', desc: 'Art, photography, dance, and music clubs for self-expression.', color: '#4B52D8' },
  { icon: Dumbbell, title: 'Wellness & Fitness', desc: 'Yoga, Zumba, fitness challenges, and mental health support.', color: '#10159B' },
  { icon: Coffee, title: 'Coffee & Connect', desc: 'Monthly coffee chats with leaders and cross-team networking.', color: '#2DCB3B' },
];

export default function Home() {
  const [stories, setStories] = useState<EmployeeStory[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([]);

  useEffect(() => {
    (async () => {
      const [storyRes, eventRes, jobRes, socialRes] = await Promise.all([
        supabase.from('employee_stories').select('*').eq('is_active', true).order('display_order').limit(3),
        supabase.from('events').select('*').eq('is_active', true).order('event_date', { ascending: false }).limit(3),
        supabase.from('jobs').select('*').eq('is_active', true).eq('is_featured', true).limit(4),
        supabase.from('social_posts').select('*').eq('is_active', true).order('display_order').limit(4),
      ]);
      if (storyRes.data) setStories(storyRes.data);
      if (eventRes.data) setEvents(eventRes.data);
      if (jobRes.data) setFeaturedJobs(jobRes.data);
      if (socialRes.data) setSocialPosts(socialRes.data);
    })();
  }, []);

  return (
    <div className="bg-[#F7F9FF]">
      {/* ===== HERO with dynamic brand mesh ===== */}
      <section className="relative h-[100vh] min-h-[600px] w-full overflow-hidden hero-mesh">
        <div className="absolute inset-0 bg-grid-warm opacity-30" />
        {/* Subtle floating accent rings */}
        <div className="absolute top-1/4 left-[8%] w-32 h-32 rounded-full border border-white/10 animate-float" />
        <div className="absolute bottom-1/4 right-[10%] w-48 h-48 rounded-full border border-white/10 animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full border border-white/5 animate-float" style={{ animationDelay: '0.8s' }} />

        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
          <div className="bg-[#0D1248]/70 backdrop-blur-md rounded-3xl px-8 py-12 sm:px-12 sm:py-16 max-w-3xl mx-auto border border-white/10 shadow-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 animate-fade-in-up delay-100">
              <Sparkles size={16} className="text-[#6BE878]" />
              <span className="text-white text-sm font-bold tracking-wide">Revantage Systems India</span>
            </div>
            <h1 className="text-white hero-title max-w-4xl animate-fade-in-up delay-200 leading-[1.1]">
              Where healthcare RCM<br />meets{' '}
              <span className="hero-title-shimmer font-extrabold">human potential</span>.
            </h1>
            <p className="text-white/80 text-lg sm:text-xl mt-6 max-w-2xl mx-auto animate-fade-in-up delay-300 leading-relaxed">
              A global healthcare RCM and technology workplace where every role
              creates meaningful impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center animate-fade-in-up delay-500">
              <Link to="/careers" className="btn-primary group">
                Explore Careers <ArrowRight size={18} className="ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/life" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/10 text-white border border-white/20 text-base font-bold backdrop-blur-md hover:bg-white/20 hover:scale-105 transition-all duration-300">
                Life at Revantage
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-soft z-10">
          <ChevronDown className="text-white/40" size={32} />
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="py-14 bg-[#0D1248] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-warm opacity-20" />
        <div className="container-wide relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <Reveal key={i} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                <div className="text-center group">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: `${stat.color}20` }}>
                    <stat.icon style={{ color: stat.color }} size={28} />
                  </div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-white">{stat.value}</p>
                  <p className="text-sm text-[#B7C0E5] mt-1">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PILLARS ===== */}
      <section className="py-24 sm:py-32">
        <div className="container-rev">
          <Reveal>
            <p className="section-eyebrow text-[#10159B]">Why Revantage</p>
            <h2 className="section-title mb-6">More than a workplace.<br /><span className="text-gradient-teal">A place to belong.</span></h2>
            <p className="body-large text-[#4B5578] max-w-2xl mb-16">
              Our culture is built on people, purpose, and possibility. Explore what
              makes Revantage a career destination, not just a job.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, i) => (
              <Reveal key={i} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                <Link to={pillar.link} className="block h-full">
                  <div className="card-playful p-8 h-full group">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: `${pillar.color}15` }}>
                      <pillar.icon style={{ color: pillar.color }} size={24} />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{pillar.title}</h3>
                    <p className="text-sm text-[#4B5578] leading-relaxed mb-4">{pillar.desc}</p>
                    <span className="text-sm font-bold text-[#10159B] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn more <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FUN & CULTURE CATEGORIES ===== */}
      <section className="py-24 sm:py-32 bg-[#EEF1FF]">
        <div className="container-rev">
          <Reveal>
            <p className="section-eyebrow text-[#2DCB3B]">Fun & Culture</p>
            <h2 className="section-title mb-6">Work hard, play harder.<br /><span className="text-gradient-warm">We make work fun.</span></h2>
            <p className="body-large text-[#4B5578] max-w-2xl mb-16">
              At Revantage, we believe a fun workplace is a productive workplace.
              From sports tournaments to cultural festivals, there is always
              something exciting happening.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {funCategories.map((cat, i) => (
              <Reveal key={i} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 h-full group">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" style={{ backgroundColor: `${cat.color}15` }}>
                    <cat.icon style={{ color: cat.color }} size={28} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{cat.title}</h3>
                  <p className="text-sm text-[#4B5578] leading-relaxed">{cat.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={3}>
            <div className="text-center mt-12">
              <Link to="/life" className="btn-secondary">
                Explore Life at Revantage <ArrowRight size={18} className="ml-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== CULTURE BANNER ===== */}
      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${cultureImage})` }} />
        <div className="absolute inset-0 bg-[#0D1248]/75" />
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <Reveal>
            <Quote className="text-[#6BE878] mx-auto mb-6" size={40} />
            <p className="text-white text-2xl sm:text-3xl md:text-4xl font-bold max-w-3xl leading-tight">
              "We chose India not just for talent, but for the deep commitment to
              learning, the passion for excellence, and the long-term career
              orientation that defines our workforce."
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== SERVICES OVERVIEW ===== */}
      <section className="py-24 sm:py-32">
        <div className="container-rev">
          <Reveal>
            <p className="section-eyebrow text-[#D60808]">What We Do</p>
            <h2 className="section-title mb-6">Intelligent RCM solutions,<br />powered by people.</h2>
            <p className="body-large text-[#4B5578] max-w-2xl mb-16">
              From AI-driven billing to expert denials management, our India teams
              power the complete revenue cycle for US healthcare providers.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <Reveal key={i} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <div className="bg-white rounded-2xl p-8 h-full shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border-2 border-transparent hover:border-[#2DCB3B]/20">
                  <div className="w-12 h-12 rounded-xl bg-[#2DCB3B]/10 flex items-center justify-center mb-5">
                    <service.icon className="text-[#2DCB3B]" size={24} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-sm text-[#4B5578] leading-relaxed">{service.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={3}>
            <div className="text-center mt-12">
              <Link to="/departments" className="btn-secondary">
                Explore Departments <ArrowRight size={18} className="ml-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== FEATURED STORIES ===== */}
      {stories.length > 0 && (
        <section className="py-24 sm:py-32 bg-[#EEF1FF]">
          <div className="container-rev">
            <Reveal>
              <p className="section-eyebrow text-[#10159B]">Employee Stories</p>
              <h2 className="section-title mb-6">Real people. Real growth.<br />Real impact.</h2>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {stories.map((story, i) => (
                <Reveal key={story.id} delay={((i % 3) + 1) as 1 | 2 | 3}>
                  <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group h-full">
                    <div className="h-56 overflow-hidden">
                      <img
                        src={story.image_url || storyImages[i % storyImages.length]}
                        alt={story.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <Quote className="text-[#2DCB3B] mb-3" size={24} />
                      <p className="text-[#101A4A] leading-relaxed mb-4 italic">"{story.quote}"</p>
                      <p className="font-bold text-[#101A4A]">{story.name}</p>
                      <p className="text-sm text-[#7882A5]">{story.role} · {story.years_at_company} years</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={3}>
              <div className="text-center mt-10">
                <Link to="/stories" className="btn-ghost">
                  Read All Stories <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ===== UPCOMING EVENTS ===== */}
      {events.length > 0 && (
        <section className="py-24 sm:py-32">
          <div className="container-rev">
            <Reveal>
              <p className="section-eyebrow text-[#D60808]">Events & Culture</p>
              <h2 className="section-title mb-6">Celebrations that<br />bring us together.</h2>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {events.map((event, i) => (
                <Reveal key={event.id} delay={((i % 3) + 1) as 1 | 2 | 3}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 group h-full">
                    <div className="h-40 overflow-hidden relative">
                      <img
                        src={event.image_url || cultureImage}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold text-[#10159B]">
                        {event.category}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-[#7882A5] mb-2">
                        <Calendar size={14} />
                        <span>{new Date(event.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <h3 className="font-bold mb-1">{event.title}</h3>
                      <p className="text-sm text-[#4B5578] line-clamp-2">{event.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={3}>
              <div className="text-center mt-10">
                <Link to="/events" className="btn-ghost" style={{ color: '#D60808' }}>
                  See All Events <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ===== FEATURED JOBS ===== */}
      {featuredJobs.length > 0 && (
        <section className="py-24 sm:py-32 bg-[#EEF1FF]">
          <div className="container-rev">
            <Reveal>
              <p className="section-eyebrow text-[#10159B]">Open Positions</p>
              <h2 className="section-title mb-6">Featured roles<br />waiting for you.</h2>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {featuredJobs.map((job, i) => (
                <Reveal key={job.id} delay={((i % 2) + 1) as 1 | 2}>
                  <Link to={`/careers/${job.slug}`} className="block h-full">
                    <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 group h-full border-2 border-transparent hover:border-[#10159B]/20">
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-xs font-bold text-[#10159B] bg-[#10159B]/10 px-3 py-1 rounded-full">{job.department}</span>
                        <ArrowRight className="text-[#7882A5] group-hover:text-[#10159B] group-hover:translate-x-1 transition-all" size={20} />
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-[#10159B] transition-colors">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-[#4B5578]">
                        <span className="flex items-center gap-1"><MapPin size={14} />{job.location}</span>
                        <span className="flex items-center gap-1"><Briefcase size={14} />{job.experience_level}</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
            <Reveal delay={3}>
              <div className="text-center mt-10">
                <Link to="/careers" className="btn-primary">
                  View All Open Positions <ArrowRight size={18} className="ml-1" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ===== SOCIAL MEDIA SHOWCASE ===== */}
      <section className="py-24 sm:py-32">
        <div className="container-rev">
          <Reveal>
            <p className="section-eyebrow text-[#10159B]">Follow Our Journey</p>
            <h2 className="section-title mb-6">Stay connected with<br /><span className="text-gradient-teal">Revantage on social.</span></h2>
            <p className="body-large text-[#4B5578] max-w-2xl mb-12">
              Follow us on LinkedIn for company updates and industry insights, and on
              Instagram for a behind-the-scenes look at life at Revantage.
            </p>
          </Reveal>

          {/* Platform CTA cards */}
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <Reveal delay={1}>
              <a
                href="https://www.linkedin.com/company/revantage-healthcare/"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#0D1248] rounded-3xl p-8 h-full group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#4B52D8] flex items-center justify-center">
                    <Linkedin className="text-white" size={28} />
                  </div>
                  <ExternalLink className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" size={20} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">LinkedIn</h3>
                <p className="text-sm text-[#B7C0E5] mb-4">Company news, hiring updates, and healthcare RCM insights.</p>
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white text-sm font-bold group-hover:bg-[#2DCB3B] transition-all">
                  <ThumbsUp size={16} /> Follow Us
                </span>
              </a>
            </Reveal>
            <Reveal delay={2}>
              <a
                href="https://www.instagram.com/revantage_healthcare/"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gradient-to-br from-[#D60808] to-[#10159B] rounded-3xl p-8 h-full group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Instagram className="text-white" size={28} />
                  </div>
                  <ExternalLink className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" size={20} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Instagram</h3>
                <p className="text-sm text-white/80 mb-4">Behind-the-scenes, culture moments, and celebrations.</p>
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 text-white text-sm font-bold group-hover:bg-white group-hover:text-[#D60808] transition-all">
                  <Heart size={16} /> Subscribe
                </span>
              </a>
            </Reveal>
          </div>

          {/* Recent posts grid */}
          {socialPosts.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {socialPosts.map((post, i) => (
                <Reveal key={post.id} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                  <a
                    href={post.post_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group h-full"
                  >
                    <div className="h-44 overflow-hidden relative">
                      {post.image_url ? (
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center ${post.platform === 'LinkedIn' ? 'bg-[#0D1248]' : 'bg-gradient-to-br from-[#D60808] to-[#10159B]'}`}>
                          {post.platform === 'LinkedIn' ? <Linkedin className="text-white/30" size={48} /> : <Instagram className="text-white/30" size={48} />}
                        </div>
                      )}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold">
                        {post.platform === 'LinkedIn' ? <Linkedin size={12} className="text-[#10159B]" /> : <Instagram size={12} className="text-[#D60808]" />}
                        <span className={post.platform === 'LinkedIn' ? 'text-[#10159B]' : 'text-[#D60808]'}>{post.platform}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-sm mb-2 group-hover:text-[#10159B] transition-colors">{post.title}</h3>
                      <p className="text-xs text-[#4B5578] line-clamp-2 mb-3">{post.excerpt}</p>
                      <span className="text-xs text-[#7882A5]">{new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 sm:py-32 relative overflow-hidden hero-mesh">
        <div className="absolute inset-0 bg-grid-warm opacity-30" />
        <div className="container-rev relative z-10 text-center">
          <Reveal>
            <Star className="text-[#6BE878] mx-auto mb-6" size={40} />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              Ready to build your career<br />in healthcare RCM?
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Join 2,000+ professionals who chose Revantage for growth, learning,
              and a culture that puts people first.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/careers" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#2DCB3B] text-white text-base font-bold transition-all duration-300 hover:scale-105 shadow-xl">
                Browse Open Roles <ArrowRight size={18} className="ml-1" />
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-transparent border-2 border-white text-white text-base font-bold transition-all duration-300 hover:bg-white/10">
                Get in Touch
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
