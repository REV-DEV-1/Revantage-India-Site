import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { Department } from '@/types';
import Reveal from '@/components/Reveal';
import { ArrowRight, TrendingUp, FileText, CreditCard, ShieldCheck, BadgeCheck, Award, RotateCcw, CheckCircle, Cpu, Code, Activity } from 'lucide-react';

const iconMap: Record<string, typeof TrendingUp> = {
  TrendingUp, FileText, CreditCard, ShieldCheck, BadgeCheck, Award, RotateCcw, CheckCircle, Cpu, Code,
};

const deptImages = [
  'https://images.pexels.com/photos/8204363/pexels-photo-8204363.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/8297442/pexels-photo-8297442.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/8102000/pexels-photo-8102000.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3135229/pexels-photo-3135229.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/7658430/pexels-photo-7658430.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/7580987/pexels-photo-7580987.jpeg?auto=compress&cs=tinysrgb&w=800',
];

export default function Departments() {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('departments').select('*').order('display_order');
      if (data) setDepartments(data);
    })();
  }, []);

  return (
    <div className="bg-[#F7F9FF] pt-16">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden bg-[#0D1248]">
        <div className="absolute inset-0 bg-grid-warm opacity-10" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-[#D60808] text-sm font-bold tracking-wide mb-3 animate-fade-in-up">Departments</p>
          <h1 className="text-white hero-title animate-fade-in-up delay-200">Ten specialized functions.<br /><span className="text-gradient-warm">One unified mission.</span></h1>
          <p className="text-white/60 text-lg mt-6 max-w-2xl animate-fade-in-up delay-300">
            Our RCM expertise spans the complete revenue cycle. Find where your skills fit.
          </p>
        </div>
      </section>

      {/* Department Grid */}
      <section className="py-24 sm:py-32">
        <div className="container-wide">
          {departments.length === 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[0, 1, 2, 3, 4, 5].map(i => (
                <div key={i} className="bg-white rounded-2xl p-8 h-48 shimmer" />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept, i) => {
                const Icon = iconMap[dept.icon] || Activity;
                return (
                  <Reveal key={dept.id} delay={((i % 3) + 1) as 1 | 2 | 3}>
                    <Link to="/careers" className="block h-full">
                      <div className="card-playful p-8 h-full group">
                        <div className="flex items-start justify-between mb-5">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#10159B] to-[#D60808] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Icon className="text-white" size={28} />
                          </div>
                          <ArrowRight className="text-[#7882A5] group-hover:text-[#10159B] group-hover:translate-x-1 transition-all" size={20} />
                        </div>
                        <h3 className="text-lg font-bold mb-2">{dept.name}</h3>
                        <p className="text-sm text-[#4B5578] leading-relaxed">{dept.description}</p>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Banner */}
      <section className="relative h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${deptImages[0]})` }} />
        <div className="absolute inset-0 bg-[#0D1248]/70" />
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <Reveal>
            <h2 className="text-white text-2xl sm:text-3xl font-bold max-w-2xl">
              Every department plays a vital role in the revenue cycle.
            </h2>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-rev text-center">
          <Reveal>
            <h2 className="section-title mb-6">Found your fit?<br />Let's talk.</h2>
            <Link to="/careers" className="btn-primary">
              View Open Positions <ArrowRight size={18} className="ml-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
