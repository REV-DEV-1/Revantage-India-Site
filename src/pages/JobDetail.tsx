import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { Job } from '@/types';
import Reveal from '@/components/Reveal';
import {
  MapPin, Briefcase, ArrowLeft, CheckCircle2, Clock,
  Users, Heart, Send, AlertCircle, CheckCircle
} from 'lucide-react';

export default function JobDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applyMode, setApplyMode] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    (async () => {
      if (!slug) return;
      const { data } = await supabase.from('jobs').select('*').eq('slug', slug).eq('is_active', true).maybeSingle();
      if (data) setJob(data);
      setLoading(false);
    })();
  }, [slug]);

  const handleApply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    const form = e.currentTarget;
    const formData = new FormData(form);
    const { error } = await supabase.from('job_applications').insert({
      job_id: job?.id ?? null,
      job_title: job?.title ?? '',
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      linkedin_url: formData.get('linkedin_url'),
      experience_years: formData.get('experience_years') ? parseInt(formData.get('experience_years') as string) : null,
      current_company: formData.get('current_company'),
      cover_letter: formData.get('cover_letter'),
    });
    if (error) {
      setSubmitStatus('error');
    } else {
      setSubmitStatus('success');
      form.reset();
    }
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-[#F7F9FF] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-[#10159B] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="pt-16 min-h-screen bg-[#F7F9FF] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold mb-4">Position not found</h1>
        <p className="text-[#4B5578] mb-8">This position may have been filled or removed.</p>
        <button onClick={() => navigate('/careers')} className="btn-primary">Back to Careers</button>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F9FF] pt-16">
      {/* Header */}
      <section className="bg-[#EEF1FF] py-16 sm:py-24">
        <div className="container-rev">
          <Link to="/careers" className="inline-flex items-center gap-2 text-sm text-[#10159B] hover:underline mb-8 font-bold">
            <ArrowLeft size={16} /> Back to all positions
          </Link>
          <Reveal>
            <span className="text-xs font-bold text-[#10159B] bg-[#10159B]/10 px-3 py-1 rounded-full">{job.department}</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-4 mb-6">{job.title}</h1>
            <div className="flex flex-wrap gap-6 text-sm text-[#4B5578]">
              <span className="flex items-center gap-2"><MapPin size={16} />{job.location}</span>
              <span className="flex items-center gap-2"><Briefcase size={16} />{job.experience_level}</span>
              <span className="flex items-center gap-2"><Clock size={16} />{job.job_type}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-24">
        <div className="container-rev">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <Reveal>
                <h2 className="text-2xl font-bold mb-4">About the Role</h2>
                <p className="text-[#4B5578] leading-relaxed text-lg">{job.description}</p>
              </Reveal>

              {job.responsibilities && job.responsibilities.length > 0 && (
                <Reveal>
                  <h2 className="text-2xl font-bold mb-4">Key Responsibilities</h2>
                  <ul className="space-y-3">
                    {job.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-3 text-[#4B5578]">
                        <CheckCircle2 className="text-[#2DCB3B] flex-shrink-0 mt-0.5" size={20} />
                        <span className="leading-relaxed">{r}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}

              {job.requirements && job.requirements.length > 0 && (
                <Reveal>
                  <h2 className="text-2xl font-bold mb-4">What You Need</h2>
                  <ul className="space-y-3">
                    {job.requirements.map((r, i) => (
                      <li key={i} className="flex items-start gap-3 text-[#4B5578]">
                        <CheckCircle2 className="text-[#2DCB3B] flex-shrink-0 mt-0.5" size={20} />
                        <span className="leading-relaxed">{r}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}

              {job.qualifications && job.qualifications.length > 0 && (
                <Reveal>
                  <h2 className="text-2xl font-bold mb-4">Qualifications</h2>
                  <ul className="space-y-3">
                    {job.qualifications.map((r, i) => (
                      <li key={i} className="flex items-start gap-3 text-[#4B5578]">
                        <CheckCircle2 className="text-[#2DCB3B] flex-shrink-0 mt-0.5" size={20} />
                        <span className="leading-relaxed">{r}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}

              {job.benefits && job.benefits.length > 0 && (
                <Reveal>
                  <h2 className="text-2xl font-bold mb-4">What We Offer</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {job.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-[#EEF1FF] rounded-xl">
                        <Heart className="text-[#10159B] flex-shrink-0 mt-0.5" size={20} />
                        <span className="text-sm text-[#4B5578] leading-relaxed">{b}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-3xl p-8 shadow-md">
                  <h3 className="text-lg font-bold mb-4">Apply for this position</h3>
                  <p className="text-sm text-[#4B5578] mb-6">
                    Ready to take the next step in your career? Submit your application and our team will reach out.
                  </p>
                  <button
                    onClick={() => setApplyMode(!applyMode)}
                    className="btn-primary w-full"
                  >
                    {applyMode ? 'Cancel' : 'Apply Now'}
                  </button>

                  {applyMode && (
                    <form onSubmit={handleApply} className="mt-6 space-y-3">
                      <input type="text" name="name" placeholder="Full name *" required className="input-field text-sm" />
                      <input type="email" name="email" placeholder="Email address *" required className="input-field text-sm" />
                      <input type="tel" name="phone" placeholder="Phone number" className="input-field text-sm" />
                      <input type="url" name="linkedin_url" placeholder="LinkedIn profile URL" className="input-field text-sm" />
                      <input type="number" name="experience_years" placeholder="Years of experience" min="0" max="50" className="input-field text-sm" />
                      <input type="text" name="current_company" placeholder="Current company" className="input-field text-sm" />
                      <textarea name="cover_letter" placeholder="Tell us why you're a great fit..." rows={4} className="input-field text-sm resize-none" />
                      <button
                        type="submit"
                        disabled={submitStatus === 'submitting'}
                        className="btn-primary w-full text-sm disabled:opacity-50"
                      >
                        {submitStatus === 'submitting' ? 'Submitting...' : 'Submit Application'} <Send size={14} className="ml-1" />
                      </button>
                      {submitStatus === 'success' && (
                        <div className="flex items-center gap-2 text-sm text-[#2D9B6B] justify-center">
                          <CheckCircle size={16} /> Application submitted! We'll be in touch.
                        </div>
                      )}
                      {submitStatus === 'error' && (
                        <div className="flex items-center gap-2 text-sm text-[#10159B] justify-center">
                          <AlertCircle size={16} /> Something went wrong. Please try again.
                        </div>
                      )}
                    </form>
                  )}
                </div>

                <div className="mt-6 bg-white rounded-3xl p-8 shadow-md">
                  <h4 className="text-sm font-bold mb-3">Share this role</h4>
                  <div className="flex gap-3">
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#EEF1FF] flex items-center justify-center text-[#2DCB3B] hover:bg-[#2DCB3B] hover:text-white transition-all">
                      <Users size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
