import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '@/components/Reveal';
import {
  ArrowRight, Users, Sparkles, Heart, Calendar, Coffee, Music, Trophy,
  Zap, Gamepad2, Palette, Dumbbell, Globe, Star, Pizza, Camera, BookOpen,
} from 'lucide-react';

const lifeImages = [
  'https://images.pexels.com/photos/7710129/pexels-photo-7710129.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/7580783/pexels-photo-7580783.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/23496662/pexels-photo-23496662.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/7580810/pexels-photo-7580810.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/7793691/pexels-photo-7793691.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/7658430/pexels-photo-7658430.jpeg?auto=compress&cs=tinysrgb&w=800',
];

const culturePillars = [
  { icon: Users, title: 'People-First Culture', desc: 'Open communication, leadership accessibility, and genuine investment in every individual. Our leaders know your name, your goals, and your potential.', color: '#10159B' },
  { icon: Sparkles, title: 'Meaningful Work', desc: 'Every claim processed, every denial resolved, and every authorization secured directly impacts patient care across the United States. Your work matters.', color: '#2DCB3B' },
  { icon: Heart, title: 'Wellness & Care', desc: 'Yoga sessions, fitness challenges, mental health support, and regular health screenings. We care for the whole person, not just the professional.', color: '#D60808' },
  { icon: Calendar, title: 'Celebrations', desc: 'From festivals to team outings, cultural events to annual days — we celebrate together, because work should be joyful.', color: '#F5B835' },
];

const funCategories = [
  { icon: Trophy, title: 'Sports Leagues', desc: 'Cricket, football, badminton, and table tennis tournaments with inter-department rivalry.', color: '#2DCB3B', count: '12+ teams' },
  { icon: Music, title: 'Cultural Festivals', desc: 'Diwali, Pongal, Onam, Eid, Christmas — every festival celebrated with full enthusiasm.', color: '#D60808', count: '20+ events/year' },
  { icon: Gamepad2, title: 'Fun Fridays', desc: 'Board games, trivia quizzes, karaoke, and team-building activities every Friday afternoon.', color: '#F5B835', count: 'Weekly' },
  { icon: Palette, title: 'Creative Clubs', desc: 'Art, photography, dance, and music clubs for self-expression and creative exploration.', color: '#4B52D8', count: '6 active clubs' },
  { icon: Dumbbell, title: 'Fitness Programs', desc: 'Yoga, Zumba, step challenges, and annual sports day with prizes and recognition.', color: '#10159B', count: 'Daily sessions' },
  { icon: Coffee, title: 'Coffee & Connect', desc: 'Monthly coffee chats with leaders, cross-team networking, and mentorship circles.', color: '#2DCB3B', count: 'Monthly' },
  { icon: Pizza, title: 'Food Festivals', desc: 'Potlucks, food festivals, and team lunches celebrating the diverse cuisines of India.', color: '#D60808', count: 'Quarterly' },
  { icon: Camera, title: 'Annual Day', desc: 'Grand annual celebration with performances, awards, and unforgettable memories.', color: '#F5B835', count: 'Yearly highlight' },
  { icon: Globe, title: 'CSR & Giving Back', desc: 'Community service, environmental drives, and social impact initiatives that matter.', color: '#4B52D8', count: 'Ongoing' },
];

const dayInLife = [
  { time: 'Morning', icon: Coffee, title: 'Energizing Start', desc: 'Begin with team huddles, coffee, and a clear plan for the day ahead.', color: '#10159B' },
  { time: 'Midday', icon: Zap, title: 'Focused Work', desc: 'Deep work on RCM operations with collaborative problem-solving and mentorship.', color: '#2DCB3B' },
  { time: 'Afternoon', icon: Music, title: 'Break & Recharge', desc: 'Wellness breaks, team activities, and time to recharge with colleagues.', color: '#D60808' },
  { time: 'Evening', icon: Trophy, title: 'Wrap & Celebrate', desc: 'Review achievements, recognize wins, and end the day on a high note.', color: '#F5B835' },
];

const activeFilters = ['All', 'Sports', 'Culture', 'Wellness', 'Social', 'Creative'] as const;
type FilterType = typeof activeFilters[number];

const categoryFilters: Record<FilterType, number[]> = {
  All: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  Sports: [0, 4],
  Culture: [1, 6, 7],
  Wellness: [4, 2],
  Social: [5, 6],
  Creative: [3, 7, 8],
};

export default function Life() {
  const [filter, setFilter] = useState<FilterType>('All');
  const visibleIndices = categoryFilters[filter];

  return (
    <div className="bg-[#F7F9FF] pt-16">
      {/* Hero with dynamic gradient */}
      <section className="relative h-[50vh] min-h-[350px] overflow-hidden hero-orbit">
        <div className="absolute inset-0 bg-grid-warm opacity-30" />
        <div className="absolute top-1/3 left-[15%] w-28 h-28 rounded-full bg-[#2DCB3B]/20 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-[15%] w-32 h-32 rounded-full bg-[#D60808]/15 blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4 animate-fade-in-up">
            <Sparkles size={16} className="text-[#6BE878]" />
            <span className="text-white text-sm font-bold tracking-wide">Life at Revantage</span>
          </div>
          <h1 className="text-white hero-title animate-fade-in-up delay-200">More than a workplace.<br /><span className="text-gradient-brand">A place to belong.</span></h1>
        </div>
      </section>

      {/* Culture Pillars */}
      <section className="py-24 sm:py-32">
        <div className="container-rev">
          <Reveal>
            <p className="section-eyebrow text-[#10159B]">Our Culture</p>
            <h2 className="section-title mb-6">Built on people,<br />purpose, and possibility.</h2>
            <p className="body-large text-[#4B5578] max-w-2xl mb-16">
              From collaborative workspaces to vibrant celebrations, every day at
              Revantage is an opportunity to grow and connect.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {culturePillars.map((pillar, i) => (
              <Reveal key={i} delay={((i % 2) + 1) as 1 | 2}>
                <div className="bg-white rounded-3xl p-10 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 h-full">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: `${pillar.color}15` }}>
                    <pillar.icon style={{ color: pillar.color }} size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
                  <p className="text-[#4B5578] leading-relaxed">{pillar.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fun & Activity Categories with Filters */}
      <section className="py-24 sm:py-32 bg-[#EEF1FF]">
        <div className="container-rev">
          <Reveal>
            <p className="section-eyebrow text-[#2DCB3B]">Fun & Activities</p>
            <h2 className="section-title mb-6">Work hard, play harder.<br /><span className="text-gradient-warm">We make work fun.</span></h2>
            <p className="body-large text-[#4B5578] max-w-2xl mb-10">
              From sports tournaments to cultural festivals, creative clubs to
              wellness programs — there is always something exciting happening
              at Revantage.
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
            {funCategories.map((cat, i) => {
              const isVisible = visibleIndices.includes(i);
              return (
                <div key={i} className={`transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 hidden'}`}>
                  <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 h-full group">
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" style={{ backgroundColor: `${cat.color}15` }}>
                        <cat.icon style={{ color: cat.color }} size={28} />
                      </div>
                      <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: `${cat.color}10`, color: cat.color }}>
                        {cat.count}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{cat.title}</h3>
                    <p className="text-sm text-[#4B5578] leading-relaxed">{cat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-24 sm:py-32">
        <div className="container-wide">
          <Reveal>
            <p className="section-eyebrow text-[#D60808] text-center">Gallery</p>
            <h2 className="section-title text-center mb-16">A glimpse into<br />our everyday.</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {lifeImages.map((img, i) => (
              <Reveal key={i} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <div className={`rounded-2xl overflow-hidden shadow-lg group ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                  <div className={`overflow-hidden ${i === 0 ? 'h-64 md:h-full' : 'h-48 md:h-56'}`}>
                    <img src={img} alt={`Life at Revantage ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* A Day in the Life */}
      <section className="py-24 sm:py-32 bg-[#EEF1FF]">
        <div className="container-rev">
          <Reveal>
            <p className="section-eyebrow text-[#F5B835]">A Day in the Life</p>
            <h2 className="section-title mb-16">Your day, our way.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dayInLife.map((item, i) => (
              <Reveal key={i} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                <div className="card-playful p-8 h-full text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 animate-float" style={{ backgroundColor: `${item.color}15`, animationDelay: `${i * 0.3}s` }}>
                    <item.icon style={{ color: item.color }} size={28} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: item.color }}>{item.time}</span>
                  <h3 className="text-lg font-bold mt-2 mb-2">{item.title}</h3>
                  <p className="text-sm text-[#4B5578] leading-relaxed">{item.desc}</p>
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
            <Star className="text-[#6BE878] mx-auto mb-4" size={36} />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">Experience it yourself.</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Join a team where your wellbeing matters as much as your work.
            </p>
            <Link to="/careers" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#2DCB3B] text-white text-base font-bold transition-all duration-300 hover:scale-105 shadow-xl">
              Browse Open Roles <ArrowRight size={18} className="ml-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
