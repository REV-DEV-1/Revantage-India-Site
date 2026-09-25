import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { EmployeeStory } from '@/types';
import Reveal from '@/components/Reveal';
import { Quote, ArrowRight } from 'lucide-react';

const storyImages = [
  'https://images.pexels.com/photos/7658430/pexels-photo-7658430.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/7580987/pexels-photo-7580987.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/8837788/pexels-photo-8837788.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/7581015/pexels-photo-7581015.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/8192242/pexels-photo-8192242.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/12903186/pexels-photo-12903186.jpeg?auto=compress&cs=tinysrgb&w=800',
];

export default function Stories() {
  const [stories, setStories] = useState<EmployeeStory[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('employee_stories').select('*').eq('is_active', true).order('display_order');
      if (data) setStories(data);
    })();
  }, []);

  return (
    <div className="bg-[#F7F9FF] pt-16">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden bg-[#0D1248]">
        <div className="absolute inset-0 bg-dots opacity-10" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-[#D60808] text-sm font-bold tracking-wide mb-3 animate-fade-in-up">Employee Stories</p>
          <h1 className="text-white hero-title animate-fade-in-up delay-200">Real people. Real growth.<br /><span className="text-gradient-warm">Real impact.</span></h1>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-24 sm:py-32">
        <div className="container-wide">
          {stories.length === 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[0, 1, 2, 3, 4, 5].map(i => (
                <div key={i} className="bg-white rounded-3xl h-80 shimmer" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      <Quote className="text-[#D60808] mb-3" size={24} />
                      <p className="text-[#0D1248] leading-relaxed mb-4 italic">"{story.quote}"</p>
                      {story.story && (
                        <p className="text-sm text-[#4B5578] leading-relaxed mb-4 line-clamp-3">{story.story}</p>
                      )}
                      <div className="border-t border-[#DDE3F5] pt-4">
                        <p className="font-bold text-[#0D1248]">{story.name}</p>
                        <p className="text-sm text-[#7882A5]">{story.role} · {story.years_at_company} years · {story.department}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#10159B] to-[#D60808]">
        <div className="container-rev text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">Your story could be next.</h2>
            <Link to="/careers" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-[#10159B] text-base font-bold transition-all duration-300 hover:scale-105 shadow-xl">
              Join Our Team <ArrowRight size={18} className="ml-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
