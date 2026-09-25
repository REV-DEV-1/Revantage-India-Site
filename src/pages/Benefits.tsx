import { Link } from 'react-router-dom';
import Reveal from '@/components/Reveal';
import {
  Heart, GraduationCap, Trophy, Sparkles, Users, Rocket,
  HeartPulse, Calendar, ArrowRight, Star, Award, Zap,
} from 'lucide-react';

const benefits = [
  { icon: Heart, title: 'Comprehensive Health Insurance', desc: 'Coverage for you and your family, including parents, with cashless hospitalization.' },
  { icon: GraduationCap, title: 'Learning & Certification Support', desc: 'Fully funded certifications, training programs, and skill development courses.' },
  { icon: Trophy, title: 'Performance Bonuses', desc: 'Quarterly and annual performance-based incentives that reward excellence.' },
  { icon: Sparkles, title: 'Recognition & Awards', desc: 'Monthly, quarterly, and annual awards celebrating outstanding contributions.' },
  { icon: Users, title: 'Mentorship Program', desc: 'Dedicated mentors who guide your career path and professional growth.' },
  { icon: Rocket, title: 'Career Progression', desc: 'Clear promotion tracks with regular reviews and advancement opportunities.' },
  { icon: HeartPulse, title: 'Wellness Programs', desc: 'Yoga sessions, fitness challenges, mental health support, and health screenings.' },
  { icon: Calendar, title: 'Flexible Work Arrangements', desc: 'Flexible scheduling, hybrid options, and paid time off that respects your life.' },
];

const recognitionPrograms = [
  { title: 'Employee of the Month', desc: 'Recognizing outstanding individual contributions each month.', icon: Star },
  { title: 'Quarterly Excellence Awards', desc: 'Celebrating exceptional performance across all departments.', icon: Trophy },
  { title: "President's Club", desc: 'Annual award for the top performers company-wide.', icon: Award },
  { title: 'Innovation Awards', desc: 'For creative solutions that improve processes and outcomes.', icon: Sparkles },
  { title: 'Long Service Awards', desc: 'Honoring loyalty at 3, 5, 7, and 10 year milestones.', icon: Heart },
  { title: 'Team of the Quarter', desc: 'Recognizing collaborative excellence and team achievements.', icon: Users },
];

export default function Benefits() {
  return (
    <div className="bg-[#F7F9FF] pt-16">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden bg-gradient-to-br from-[#10159B] to-[#D60808]">
        <div className="absolute inset-0 bg-dots opacity-15" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-white/80 text-sm font-bold tracking-wide mb-3 animate-fade-in-up">Employee Benefits</p>
          <h1 className="text-white hero-title animate-fade-in-up delay-200">Comprehensive benefits that<br /><span className="text-white">care for you and your family.</span></h1>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 sm:py-32">
        <div className="container-rev">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <Reveal key={i} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                <div className="bg-white rounded-2xl p-6 h-full shadow-md hover:shadow-2xl transition-all duration-500 group hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10159B] to-[#D60808] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="text-white" size={24} />
                  </div>
                  <h3 className="font-bold mb-2 text-sm">{benefit.title}</h3>
                  <p className="text-xs text-[#4B5578] leading-relaxed">{benefit.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition Programs */}
      <section className="py-24 sm:py-32 bg-[#EEF1FF]">
        <div className="container-rev">
          <Reveal>
            <p className="section-eyebrow text-[#10159B]">Recognition & Awards</p>
            <h2 className="section-title mb-6">Excellence deserves<br />to be celebrated.</h2>
            <p className="body-large text-[#4B5578] max-w-2xl mb-16">
              We do not just recognize top performers — we celebrate them. Our
              recognition programs ensure that outstanding work is seen, valued,
              and rewarded.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recognitionPrograms.map((program, i) => (
              <Reveal key={i} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <div className="bg-white rounded-3xl p-8 h-full shadow-md hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-[#D60808]/30">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#10159B] to-[#D60808] flex items-center justify-center mb-5">
                    <program.icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{program.title}</h3>
                  <p className="text-sm text-[#4B5578] leading-relaxed">{program.desc}</p>
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
            <Zap className="text-[#D60808] mx-auto mb-4" size={36} />
            <h2 className="section-title mb-6">Your wellbeing<br />is our priority.</h2>
            <Link to="/careers" className="btn-primary">
              Explore Careers <ArrowRight size={18} className="ml-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
