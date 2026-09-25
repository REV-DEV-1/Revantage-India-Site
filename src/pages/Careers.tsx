import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { Job } from '@/types';
import Reveal from '@/components/Reveal';
import { Search, MapPin, Briefcase, ArrowRight, Filter, ChevronDown } from 'lucide-react';

const heroImage = 'https://images.pexels.com/photos/8204363/pexels-photo-8204363.jpeg?auto=compress&cs=tinysrgb&w=1920';

export default function Careers() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('jobs').select('*').eq('is_active', true).order('created_at', { ascending: false });
      if (data) setJobs(data);
      setLoading(false);
    })();
  }, []);

  const departments = useMemo(() => ['All', ...Array.from(new Set(jobs.map(j => j.department)))], [jobs]);
  const locations = useMemo(() => ['All', ...Array.from(new Set(jobs.map(j => j.location)))], [jobs]);
  const types = useMemo(() => ['All', ...Array.from(new Set(jobs.map(j => j.job_type)))], [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchSearch = search === '' || job.title.toLowerCase().includes(search.toLowerCase()) || job.description.toLowerCase().includes(search.toLowerCase()) || job.department.toLowerCase().includes(search.toLowerCase());
      const matchDept = deptFilter === 'All' || job.department === deptFilter;
      const matchLoc = locationFilter === 'All' || job.location === locationFilter;
      const matchType = typeFilter === 'All' || job.job_type === typeFilter;
      return matchSearch && matchDept && matchLoc && matchType;
    });
  }, [jobs, search, deptFilter, locationFilter, typeFilter]);

  return (
    <div className="bg-[#F7F9FF] pt-16">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1248]/50 to-[#0D1248]/70" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-white/80 text-sm font-bold tracking-wide mb-3 animate-fade-in-up">Careers at Revantage</p>
          <h1 className="text-white hero-title animate-fade-in-up delay-200">Find your next role.</h1>
          <p className="text-white/70 text-lg mt-6 max-w-2xl animate-fade-in-up delay-300">
            Explore open positions across our RCM operations and technology teams in India.
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="sticky top-16 z-30 bg-[rgba(255,252,247,0.85)] bg-blur border-b border-[#DDE3F5] py-4">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7882A5]" size={18} />
              <input
                type="text"
                placeholder="Search by title, department, or keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-full border border-[#DDE3F5] bg-white text-sm focus:outline-none focus:border-[#10159B] transition-all"
              />
            </div>
            <div className="flex gap-3 flex-wrap">
              <FilterDropdown label="Department" value={deptFilter} options={departments} onChange={setDeptFilter} />
              <FilterDropdown label="Location" value={locationFilter} options={locations} onChange={setLocationFilter} />
              <FilterDropdown label="Type" value={typeFilter} options={types} onChange={setTypeFilter} />
            </div>
          </div>
          <p className="text-xs text-[#7882A5] mt-3">{filteredJobs.length} position{filteredJobs.length !== 1 ? 's' : ''} found</p>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16 sm:py-24 min-h-[400px]">
        <div className="container-wide">
          {loading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {[0, 1, 2, 3].map(i => <div key={i} className="bg-white rounded-2xl p-8 h-48 shimmer" />)}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl font-bold text-[#4B5578]">No positions match your search.</p>
              <p className="text-sm text-[#7882A5] mt-2">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredJobs.map((job, i) => (
                <Reveal key={job.id} delay={((i % 2) + 1) as 1 | 2}>
                  <Link to={`/careers/${job.slug}`} className="block h-full">
                    <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 group h-full border-2 border-transparent hover:border-[#10159B]/20">
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-xs font-bold text-[#10159B] bg-[#10159B]/10 px-3 py-1 rounded-full">{job.department}</span>
                        {job.is_featured && <span className="text-xs font-bold text-[#D60808] bg-[#D60808]/10 px-3 py-1 rounded-full">Featured</span>}
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-[#10159B] transition-colors">{job.title}</h3>
                      <p className="text-sm text-[#4B5578] leading-relaxed mb-4 line-clamp-2">{job.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-[#4B5578]">
                        <span className="flex items-center gap-1"><MapPin size={14} />{job.location}</span>
                        <span className="flex items-center gap-1"><Briefcase size={14} />{job.experience_level}</span>
                        <span className="flex items-center gap-1"><Filter size={14} />{job.job_type}</span>
                      </div>
                      <div className="mt-6 flex items-center gap-2 text-[#10159B] text-sm font-bold group-hover:gap-3 transition-all">
                        View Details <ArrowRight size={16} />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function FilterDropdown({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#DDE3F5] bg-white text-sm font-medium hover:border-[#10159B] transition-all"
      >
        <Filter size={14} className="text-[#7882A5]" />
        {value === 'All' ? label : value}
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full mt-2 right-0 z-20 bg-white rounded-xl shadow-lg border border-[#DDE3F5] py-2 min-w-[180px] max-h-60 overflow-y-auto">
            {options.map(opt => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-[#EEF1FF] transition-colors ${value === opt ? 'text-[#10159B] font-bold' : 'text-[#0D1248]'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
