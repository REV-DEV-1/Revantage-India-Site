import { Link } from 'react-router-dom';
import Reveal from '@/components/Reveal';
import { BookOpen, Activity, Target, Network, Briefcase, Zap, ArrowRight } from 'lucide-react';

const growthSteps = [
  { level: 'Trainee', desc: 'Structured onboarding with US healthcare fundamentals training.', icon: BookOpen },
  { level: 'Associate', desc: 'Hands-on RCM operations with mentorship and skill building.', icon: Activity },
  { level: 'Senior Associate', desc: 'Independent handling of complex cases and client portfolios.', icon: Target },
  { level: 'Team Lead', desc: 'Leading teams, managing performance, and driving results.', icon: Network },
  { level: 'Manager', desc: 'Strategic ownership of operations and client relationships.', icon: Briefcase },
  { level: 'Director', desc: 'Visionary leadership shaping the future of our India operations.', icon: Zap },
];

export default function Growth() {
  return (
    <div className="bg-[#F7F9FF] pt-16">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden bg-gradient-to-br from-[#2DCB3B] to-[#6BE878]">
        <div className="absolute inset-0 bg-dots opacity-15" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-white/80 text-sm font-bold tracking-wide mb-3 animate-fade-in-up">Career Growth</p>
          <h1 className="text-white hero-title animate-fade-in-up delay-200">A clear path from<br /><span className="text-white">trainee to director.</span></h1>
        </div>
      </section>

      {/* Growth Path */}
      <section className="py-24 sm:py-32">
        <div className="container-rev">
          <Reveal>
            <p className="body-large text-[#4B5578] max-w-2xl mb-16 text-center mx-auto">
              Promotions are based on performance and potential — not just tenure.
              Many of our current leaders started as entry-level associates and
              grew into leadership roles.
            </p>
          </Reveal>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#10159B] to-[#D60808] -translate-x-1/2 rounded-full" />
            {growthSteps.map((step, i) => (
              <Reveal key={i} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <div className={`flex gap-8 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                  <div className="flex-1 md:text-right">
                    {i % 2 === 0 ? (
                      <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500">
                        <h3 className="text-xl font-bold mb-2">{step.level}</h3>
                        <p className="text-[#4B5578]">{step.desc}</p>
                      </div>
                    ) : <div className="hidden md:block" />}
                  </div>
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#10159B] to-[#D60808] flex items-center justify-center relative z-10 shadow-lg">
                    <step.icon className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    {i % 2 !== 0 ? (
                      <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500">
                        <h3 className="text-xl font-bold mb-2">{step.level}</h3>
                        <p className="text-[#4B5578]">{step.desc}</p>
                      </div>
                    ) : <div className="hidden md:block" />}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#EEF1FF]">
        <div className="container-rev text-center">
          <Reveal>
            <h2 className="section-title mb-6">Your career path<br />starts here.</h2>
            <Link to="/careers" className="btn-primary">
              Explore Careers <ArrowRight size={18} className="ml-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
