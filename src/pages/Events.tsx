import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { EventItem } from '@/types';
import Reveal from '@/components/Reveal';
import { Calendar, ArrowRight } from 'lucide-react';

const eventImages = [
  'https://images.pexels.com/photos/3135229/pexels-photo-3135229.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/8297442/pexels-photo-8297442.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/23496662/pexels-photo-23496662.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/7658430/pexels-photo-7658430.jpeg?auto=compress&cs=tinysrgb&w=800',
];

export default function Events() {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('events').select('*').eq('is_active', true).order('event_date', { ascending: false });
      if (data) setEvents(data);
    })();
  }, []);

  return (
    <div className="bg-[#F7F9FF] pt-16">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${eventImages[0]})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1248]/60 to-[#0D1248]/80" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-white/80 text-sm font-bold tracking-wide mb-3 animate-fade-in-up">Events & Culture</p>
          <h1 className="text-white hero-title animate-fade-in-up delay-200">Celebrations that<br /><span className="text-gradient-warm">bring us together.</span></h1>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-24 sm:py-32">
        <div className="container-wide">
          {events.length === 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[0, 1, 2].map(i => <div key={i} className="bg-white rounded-2xl h-64 shimmer" />)}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, i) => (
                <Reveal key={event.id} delay={((i % 3) + 1) as 1 | 2 | 3}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group h-full">
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={event.image_url || eventImages[i % eventImages.length]}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold text-[#10159B]">
                        {event.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-[#7882A5] mb-2">
                        <Calendar size={14} />
                        <span>{new Date(event.event_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                      <p className="text-sm text-[#4B5578] leading-relaxed">{event.description}</p>
                    </div>
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
            <h2 className="section-title mb-6">Want to be part of<br />our celebrations?</h2>
            <Link to="/careers" className="btn-primary">
              Join Our Team <ArrowRight size={18} className="ml-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
