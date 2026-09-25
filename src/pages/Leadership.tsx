import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { LeadershipMember } from '@/types';
import Reveal from '@/components/Reveal';
import { ArrowRight, Award } from 'lucide-react';

const leadershipImages = [
  'https://images.pexels.com/photos/7580940/pexels-photo-7580940.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/7580837/pexels-photo-7580837.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/7580986/pexels-photo-7580986.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/7580822/pexels-photo-7580822.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/7581122/pexels-photo-7581122.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/7658430/pexels-photo-7658430.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/7581015/pexels-photo-7581015.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/8837788/pexels-photo-8837788.jpeg?auto=compress&cs=tinysrgb&w=600',
];

export default function Leadership() {
  const [leaders, setLeaders] = useState<LeadershipMember[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('leadership').select('*').eq('is_active', true).order('display_order');
      if (data) setLeaders(data);
    })();
  }, []);

  return (
    <div className="bg-[#F7F9FF] pt-16">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden bg-[#0D1248]">
        <div className="absolute inset-0 bg-grid-warm opacity-10" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-[#D60808] text-sm font-bold tracking-wide mb-3 animate-fade-in-up">Leadership</p>
          <h1 className="text-white hero-title animate-fade-in-up delay-200">Leaders who know your<br /><span className="text-gradient-warm">name and your potential.</span></h1>
        </div>
      </section>

      {/* Leaders Grid */}
      <section className="py-24 sm:py-32">
        <div className="container-rev">
          <Reveal>
            <p className="body-large text-[#4B5578] max-w-2xl mb-16 text-center mx-auto">
              Our leadership team is accessible, approachable, and invested in your
              growth. They started where you are — and they remember the journey.
            </p>
          </Reveal>
          {leaders.length === 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[0, 1, 2, 3].map(i => <div key={i} className="bg-white rounded-2xl h-80 shimmer" />)}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {leaders.map((leader, i) => (
                <Reveal key={leader.id} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                  <div className="text-center group">
                    <div className="w-full aspect-square rounded-3xl overflow-hidden mb-4 bg-[#EEF1FF] shadow-md group-hover:shadow-2xl transition-all duration-500">
                      <img
                        src={leader.image_url || leadershipImages[i % leadershipImages.length]}
                        alt={leader.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-bold text-base">{leader.name}</h3>
                    <p className="text-sm text-[#10159B] font-semibold mt-1">{leader.title}</p>
                    {leader.bio && <p className="text-xs text-[#4B5578] mt-2 leading-relaxed">{leader.bio}</p>}
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#EEF1FF]">
        <div className="container-rev text-center">
          <Reveal>
            <Award className="text-[#10159B] mx-auto mb-4" size={36} />
            <h2 className="section-title mb-6">Join leaders who<br />invest in you.</h2>
            <Link to="/careers" className="btn-primary">
              Explore Careers <ArrowRight size={18} className="ml-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
