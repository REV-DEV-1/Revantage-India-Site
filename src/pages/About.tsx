import { Link } from 'react-router-dom';
import Reveal from '@/components/Reveal';
import { ArrowRight, TrendingUp, Users, ShieldCheck, Heart, Sparkles, Target, MapPin } from 'lucide-react';

const buildingImage = 'https://images.pexels.com/photos/946310/pexels-photo-946310.jpeg?auto=compress&cs=tinysrgb&w=1920';
const teamImage = 'https://images.pexels.com/photos/8297442/pexels-photo-8297442.jpeg?auto=compress&cs=tinysrgb&w=1920';

const milestones = [
  { year: '2010', title: 'The Beginning', desc: 'Started with a 20-person team in Chennai, serving our first US healthcare client.' },
  { year: '2013', title: 'Rapid Growth', desc: 'Expanded to 200+ employees with multiple US provider partnerships.' },
  { year: '2016', title: 'Hyderabad Campus', desc: 'Opened our second delivery center in Hyderabad to scale operations.' },
  { year: '2019', title: 'Technology Leap', desc: 'Launched AI-driven RCM solutions and automation across all departments.' },
  { year: '2022', title: '1,500+ Strong', desc: 'Crossed 1,500 employees with 40+ US healthcare provider clients.' },
  { year: '2025', title: '2,000+ Powerhouse', desc: 'Today we are 2,000+ strong across Chennai and Hyderabad, serving 50+ clients.' },
];

const values = [
  { icon: Heart, title: 'People First', desc: 'Every decision starts with what is best for our people and their growth.' },
  { icon: Sparkles, title: 'Excellence', desc: 'We pursue excellence in every claim, every call, every interaction.' },
  { icon: Target, title: 'Purpose Driven', desc: 'Our work directly impacts patient care across the United States.' },
  { icon: Users, title: 'Collaboration', desc: 'We win together — across teams, departments, and geographies.' },
];

export default function About() {
  return (
    <div className="bg-[#F7F9FF] pt-16">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${buildingImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1248]/60 to-[#0D1248]/80" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-white/80 text-sm font-bold tracking-wide mb-3 animate-fade-in-up">Our India Story</p>
          <h1 className="text-white hero-title animate-fade-in-up delay-200">From 20 people to<br />2,000+ strong.</h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 sm:py-32">
        <div className="container-rev">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Reveal>
              <p className="section-eyebrow text-[#10159B]">The Journey</p>
              <h2 className="section-title mb-6">Building careers,<br />not just teams.</h2>
              <p className="body-large text-[#4B5578] mb-6">
                What began in 2010 as a 20-person team in Chennai has grown into a
                premier RCM organization with delivery centers in Chennai and
                Hyderabad, serving over 50 US healthcare providers.
              </p>
              <p className="body-medium text-[#4B5578]">
                We chose India not just for talent, but for the deep commitment to
                learning, the passion for excellence, and the long-term career
                orientation that defines our workforce. Every person who joins us
                is not just filling a seat — they are building a career.
              </p>
            </Reveal>
            <Reveal delay={2}>
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src={teamImage} alt="Revantage team" className="w-full h-[400px] object-cover" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#0D1248] text-white">
        <div className="container-rev">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '2,000+', label: 'Employees', icon: Users },
              { value: '50+', label: 'US Clients', icon: ShieldCheck },
              { value: '15+', label: 'Years', icon: TrendingUp },
              { value: '2', label: 'Delivery Centers', icon: MapPin },
            ].map((stat, i) => (
              <Reveal key={i} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                <div className="text-center">
                  <stat.icon className="mx-auto mb-3 text-[#D60808]" size={28} />
                  <p className="text-3xl sm:text-4xl font-extrabold">{stat.value}</p>
                  <p className="text-sm text-[#B7C0E5] mt-1">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 sm:py-32">
        <div className="container-rev">
          <Reveal>
            <p className="section-eyebrow text-[#2DCB3B]">Milestones</p>
            <h2 className="section-title mb-16">15 years of<br />growth and impact.</h2>
          </Reveal>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#10159B] to-[#D60808] -translate-x-1/2 rounded-full" />
            {milestones.map((m, i) => (
              <Reveal key={i} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <div className={`flex gap-8 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                  <div className="flex-1 md:text-right">
                    {i % 2 === 0 ? (
                      <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500">
                        <span className="text-2xl font-extrabold text-[#10159B]">{m.year}</span>
                        <h3 className="text-lg font-bold mt-1 mb-2">{m.title}</h3>
                        <p className="text-sm text-[#4B5578]">{m.desc}</p>
                      </div>
                    ) : <div className="hidden md:block" />}
                  </div>
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#F7F9FF] border-4 border-[#10159B] flex items-center justify-center z-10 shadow-lg">
                    <span className="text-xs font-extrabold text-[#10159B]">{m.year}</span>
                  </div>
                  <div className="flex-1">
                    {i % 2 !== 0 ? (
                      <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500">
                        <span className="text-2xl font-extrabold text-[#10159B]">{m.year}</span>
                        <h3 className="text-lg font-bold mt-1 mb-2">{m.title}</h3>
                        <p className="text-sm text-[#4B5578]">{m.desc}</p>
                      </div>
                    ) : <div className="hidden md:block" />}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 sm:py-32 bg-[#EEF1FF]">
        <div className="container-rev">
          <Reveal>
            <p className="section-eyebrow text-[#10159B]">Our Values</p>
            <h2 className="section-title mb-16">What we stand for.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <Reveal key={i} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                <div className="card-playful p-8 h-full text-center">
                  <div className="w-14 h-14 rounded-2xl bg-[#10159B]/10 flex items-center justify-center mx-auto mb-5">
                    <value.icon className="text-[#10159B]" size={28} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                  <p className="text-sm text-[#4B5578] leading-relaxed">{value.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-rev text-center">
          <Reveal>
            <h2 className="section-title mb-6">Want to be part of<br />our next chapter?</h2>
            <Link to="/careers" className="btn-primary">
              Explore Careers <ArrowRight size={18} className="ml-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
