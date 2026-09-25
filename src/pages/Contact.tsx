import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import Reveal from '@/components/Reveal';
import { Building, Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    const form = e.currentTarget;
    const formData = new FormData(form);
    const { error } = await supabase.from('contact_submissions').insert({
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    });
    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      form.reset();
    }
  };

  return (
    <div className="bg-[#F7F9FF] pt-16">
      {/* Hero */}
      <section className="relative h-[35vh] min-h-[250px] overflow-hidden bg-[#0D1248]">
        <div className="absolute inset-0 bg-dots opacity-10" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-[#D60808] text-sm font-bold tracking-wide mb-3 animate-fade-in-up">Contact</p>
          <h1 className="text-white hero-title animate-fade-in-up delay-200">Let's start a<br /><span className="text-gradient-warm">conversation.</span></h1>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 sm:py-32">
        <div className="container-rev">
          <div className="grid md:grid-cols-2 gap-12">
            <Reveal>
              <div className="space-y-8">
                <p className="body-large text-[#4B5578]">
                  Whether you have a question about careers, partnerships, or anything
                  else, we would love to hear from you.
                </p>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#10159B]/10 flex items-center justify-center flex-shrink-0">
                    <Building className="text-[#10159B]" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">India Offices</h4>
                    <p className="text-sm text-[#4B5578]">Chennai · Hyderabad</p>
                    <p className="text-sm text-[#4B5578]">India</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#2DCB3B]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-[#2DCB3B]" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Email</h4>
                    <p className="text-sm text-[#4B5578]">careers@revantage.in</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#D60808]/15 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-[#D60808]" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Phone</h4>
                    <p className="text-sm text-[#4B5578]">+91 44 1234 5678</p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={2}>
              <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-3xl p-8 shadow-md">
                <input type="text" name="name" placeholder="Your name" required className="input-field" />
                <input type="email" name="email" placeholder="Email address" required className="input-field" />
                <input type="tel" name="phone" placeholder="Phone number (optional)" className="input-field" />
                <input type="text" name="subject" placeholder="Subject" className="input-field" />
                <textarea name="message" placeholder="Your message" required rows={5} className="input-field resize-none" />
                <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full disabled:opacity-50">
                  {status === 'submitting' ? 'Sending...' : 'Send Message'} <Send size={16} className="ml-1" />
                </button>
                {status === 'success' && (
                  <div className="flex items-center gap-2 p-3 bg-[#2D9B6B]/10 text-[#2D9B6B] rounded-xl text-sm">
                    <CheckCircle size={18} /> Thank you! We will get back to you soon.
                  </div>
                )}
                {status === 'error' && (
                  <div className="flex items-center gap-2 p-3 bg-[#10159B]/10 text-[#10159B] rounded-xl text-sm">
                    <AlertCircle size={18} /> Something went wrong. Please try again.
                  </div>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
