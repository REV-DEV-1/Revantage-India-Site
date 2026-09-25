import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { Job, EmployeeStory, LeadershipMember, EventItem, JobApplication, ContactSubmission, SocialPost, MediaAsset, Department, SiteSettings, PageContent } from '@/types';
import {
  Briefcase, Users, Calendar, Award, Mail, Inbox, Plus, Edit2,
  Trash2, X, LogOut, LayoutDashboard, Image as ImageIcon,
  Share2, Upload, Search, Network, AlertCircle, CheckCircle,
  Settings, FileText, Eye, EyeOff, ToggleLeft, ToggleRight,
} from 'lucide-react';
import Logo from '@/components/Logo';
import MediaPicker from '@/components/MediaPicker';

type Tab = 'dashboard' | 'settings' | 'pages' | 'jobs' | 'stories' | 'leadership' | 'events' | 'departments' | 'social' | 'media' | 'applications' | 'contacts';

export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [stories, setStories] = useState<EmployeeStory[]>([]);
  const [leaders, setLeaders] = useState<LeadershipMember[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([]);
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [pageContents, setPageContents] = useState<PageContent[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [editingStory, setEditingStory] = useState<EmployeeStory | null>(null);
  const [editingLeader, setEditingLeader] = useState<LeadershipMember | null>(null);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [editingSocial, setEditingSocial] = useState<SocialPost | null>(null);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [editingPage, setEditingPage] = useState<PageContent | null>(null);
  const [showJobForm, setShowJobForm] = useState(false);
  const [showStoryForm, setShowStoryForm] = useState(false);
  const [showLeaderForm, setShowLeaderForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showSocialForm, setShowSocialForm] = useState(false);
  const [showDeptForm, setShowDeptForm] = useState(false);
  const [showPageForm, setShowPageForm] = useState(false);
  const [showMediaUpload, setShowMediaUpload] = useState(false);
  const [search, setSearch] = useState('');
  const [listSearch, setListSearch] = useState('');
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }
      loadAll();
    })();
  }, [navigate]);

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const loadAll = async () => {
    const [j, s, l, e, d, sp, ma, a, c, pc, ss] = await Promise.all([
      supabase.from('jobs').select('*').order('created_at', { ascending: false }),
      supabase.from('employee_stories').select('*').order('display_order'),
      supabase.from('leadership').select('*').order('display_order'),
      supabase.from('events').select('*').order('event_date', { ascending: false }),
      supabase.from('departments').select('*').order('display_order'),
      supabase.from('social_posts').select('*').order('display_order'),
      supabase.from('media_assets').select('*').order('created_at', { ascending: false }),
      supabase.from('job_applications').select('*').order('created_at', { ascending: false }),
      supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }),
      supabase.from('page_content').select('*').order('page_key').order('display_order'),
      supabase.from('site_settings').select('*').maybeSingle(),
    ]);
    if (j.data) setJobs(j.data);
    if (s.data) setStories(s.data);
    if (l.data) setLeaders(l.data);
    if (e.data) setEvents(e.data);
    if (d.data) setDepartments(d.data);
    if (sp.data) setSocialPosts(sp.data);
    if (ma.data) setMediaAssets(ma.data);
    if (a.data) setApplications(a.data);
    if (c.data) setContacts(c.data);
    if (pc.data) setPageContents(pc.data);
    if (ss.data) setSiteSettings(ss.data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleDelete = async (table: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item? This cannot be undone.')) return;
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) {
      showToast('error', `Delete failed: ${error.message}`);
    } else {
      showToast('success', 'Item deleted successfully.');
      loadAll();
    }
  };

  const handleToggleActive = async (table: string, id: string, current: boolean) => {
    const { error } = await supabase.from(table).update({ is_active: !current }).eq('id', id);
    if (error) {
      showToast('error', `Toggle failed: ${error.message}`);
    } else {
      showToast('success', `Item ${!current ? 'activated' : 'deactivated'}.`);
      loadAll();
    }
  };

  const filterBySearch = <T extends { title?: string; name?: string; department?: string }>(items: T[]): T[] => {
    if (!listSearch) return items;
    const q = listSearch.toLowerCase();
    return items.filter(item =>
      (item.title || item.name || item.department || '').toLowerCase().includes(q)
    );
  };

  const tabs: { id: Tab; label: string; icon: typeof Briefcase; count?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'settings', label: 'Site Settings', icon: Settings },
    { id: 'pages', label: 'Page Content', icon: FileText, count: pageContents.length },
    { id: 'jobs', label: 'Jobs', icon: Briefcase, count: jobs.length },
    { id: 'stories', label: 'Stories', icon: Users, count: stories.length },
    { id: 'leadership', label: 'Leadership', icon: Award, count: leaders.length },
    { id: 'events', label: 'Events', icon: Calendar, count: events.length },
    { id: 'departments', label: 'Departments', icon: Network, count: departments.length },
    { id: 'social', label: 'Social Posts', icon: Share2, count: socialPosts.length },
    { id: 'media', label: 'Media Library', icon: ImageIcon, count: mediaAssets.length },
    { id: 'applications', label: 'Applications', icon: Inbox, count: applications.length },
    { id: 'contacts', label: 'Contacts', icon: Mail, count: contacts.length },
  ];

  return (
    <div className="min-h-screen bg-[#EEF1FF] flex">
      <aside className="w-64 bg-[#0D1248] text-white flex flex-col fixed h-full overflow-y-auto z-40">
        <div className="p-6 flex items-center gap-2">
          <Logo className="bg-white/5 border-white/10" showText={false} />
          <span className="font-bold">Revantage Admin</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setListSearch(''); }}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-3">
                <tab.icon size={18} />
                {tab.label}
              </span>
              {tab.count !== undefined && (
                <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">{tab.count}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8">
        {toast && (
          <div className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium animate-fade-in-up ${
            toast.type === 'success' ? 'bg-[#2DCB3B]/10 text-[#1a8c2a] border border-[#2DCB3B]/30' : 'bg-[#D60808]/10 text-[#D60808] border border-[#D60808]/30'
          }`}>
            {toast.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            {toast.msg}
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div>
            <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>
            <p className="text-[#4B5578] mb-8">Overview of your website content and activity.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
              <StatCard label="Open Positions" value={jobs.length} icon={Briefcase} color="#10159B" />
              <StatCard label="Employee Stories" value={stories.length} icon={Users} color="#2DCB3B" />
              <StatCard label="Social Posts" value={socialPosts.length} icon={Share2} color="#4B52D8" />
              <StatCard label="Applications" value={applications.length} icon={Inbox} color="#D60808" />
              <StatCard label="Contact Messages" value={contacts.length} icon={Mail} color="#F5B835" />
              <StatCard label="Media Assets" value={mediaAssets.length} icon={ImageIcon} color="#10159B" />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6">
                <h3 className="font-semibold mb-4">Recent Applications</h3>
                <div className="space-y-3">
                  {applications.slice(0, 5).map(app => (
                    <div key={app.id} className="flex items-center justify-between text-sm">
                      <div>
                        <p className="font-medium">{app.name}</p>
                        <p className="text-[#7882A5] text-xs">{app.job_title}</p>
                      </div>
                      <span className="text-xs text-[#7882A5]">{new Date(app.created_at).toLocaleDateString()}</span>
                    </div>
                  ))}
                  {applications.length === 0 && <p className="text-sm text-[#7882A5]">No applications yet.</p>}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6">
                <h3 className="font-semibold mb-4">Recent Contact Messages</h3>
                <div className="space-y-3">
                  {contacts.slice(0, 5).map(msg => (
                    <div key={msg.id} className="flex items-center justify-between text-sm">
                      <div>
                        <p className="font-medium">{msg.name}</p>
                        <p className="text-[#7882A5] text-xs truncate max-w-[200px]">{msg.message}</p>
                      </div>
                      <span className="text-xs text-[#7882A5]">{new Date(msg.created_at).toLocaleDateString()}</span>
                    </div>
                  ))}
                  {contacts.length === 0 && <p className="text-sm text-[#7882A5]">No messages yet.</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <SiteSettingsPanel settings={siteSettings} onSaved={() => { loadAll(); showToast('success', 'Site settings saved.'); }} onError={(msg: string) => showToast('error', msg)} />
        )}

        {activeTab === 'pages' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold">Page Content Blocks</h1>
                <p className="text-sm text-[#4B5578] mt-1">Manage editable content sections across your website pages.</p>
              </div>
              <button onClick={() => { setEditingPage(null); setShowPageForm(true); }} className="btn-primary text-sm">
                <Plus size={18} className="mr-1" /> Add Content Block
              </button>
            </div>
            <div className="space-y-3">
              {pageContents.map(pc => (
                <div key={pc.id} className="bg-white rounded-xl p-5 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{pc.title || '(untitled)'}</h3>
                      <span className="text-xs bg-[#10159B]/10 text-[#10159B] px-2 py-0.5 rounded-full">{pc.page_key}</span>
                      <span className="text-xs bg-[#4B52D8]/10 text-[#4B52D8] px-2 py-0.5 rounded-full">{pc.section_key}</span>
                    </div>
                    {pc.subtitle && <p className="text-sm text-[#7882A5] mt-1">{pc.subtitle}</p>}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleToggleActive('page_content', pc.id, pc.is_active)} className="p-2 rounded-lg hover:bg-[#EEF1FF]" title={pc.is_active ? 'Deactivate' : 'Activate'}>
                      {pc.is_active ? <Eye size={16} className="text-[#2DCB3B]" /> : <EyeOff size={16} className="text-[#7882A5]" />}
                    </button>
                    <button onClick={() => { setEditingPage(pc); setShowPageForm(true); }} className="p-2 rounded-lg hover:bg-[#EEF1FF]">
                      <Edit2 size={16} className="text-[#4B5578]" />
                    </button>
                    <button onClick={() => handleDelete('page_content', pc.id)} className="p-2 rounded-lg hover:bg-[#10159B]/10">
                      <Trash2 size={16} className="text-[#10159B]" />
                    </button>
                  </div>
                </div>
              ))}
              {pageContents.length === 0 && <p className="text-[#7882A5]">No content blocks yet. Add your first content block.</p>}
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold">Manage Jobs</h1>
              <button onClick={() => { setEditingJob(null); setShowJobForm(true); }} className="btn-primary text-sm">
                <Plus size={18} className="mr-1" /> Add Job
              </button>
            </div>
            <ListSearch value={listSearch} onChange={setListSearch} placeholder="Search jobs by title or department..." />
            <div className="space-y-3">
              {filterBySearch(jobs).map(job => (
                <div key={job.id} className="bg-white rounded-xl p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{job.title}</h3>
                    <p className="text-sm text-[#7882A5]">{job.department} · {job.location} · {job.experience_level}</p>
                    <div className="flex gap-2 mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${job.is_active ? 'bg-[#2DCB3B]/10 text-[#2DCB3B]' : 'bg-[#7882A5]/10 text-[#7882A5]'}`}>
                        {job.is_active ? 'Active' : 'Inactive'}
                      </span>
                      {job.is_featured && <span className="text-xs px-2 py-0.5 rounded-full bg-[#D60808]/10 text-[#D60808]">Featured</span>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleToggleActive('jobs', job.id, job.is_active)} className="p-2 rounded-lg hover:bg-[#EEF1FF]" title={job.is_active ? 'Deactivate' : 'Activate'}>
                      {job.is_active ? <Eye size={16} className="text-[#2DCB3B]" /> : <EyeOff size={16} className="text-[#7882A5]" />}
                    </button>
                    <button onClick={() => { setEditingJob(job); setShowJobForm(true); }} className="p-2 rounded-lg hover:bg-[#EEF1FF] transition-colors">
                      <Edit2 size={16} className="text-[#4B5578]" />
                    </button>
                    <button onClick={() => handleDelete('jobs', job.id)} className="p-2 rounded-lg hover:bg-[#10159B]/10 transition-colors">
                      <Trash2 size={16} className="text-[#10159B]" />
                    </button>
                  </div>
                </div>
              ))}
              {filterBySearch(jobs).length === 0 && <p className="text-[#7882A5]">{listSearch ? 'No matching jobs.' : 'No jobs yet. Add your first job listing.'}</p>}
            </div>
          </div>
        )}

        {activeTab === 'stories' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold">Employee Stories</h1>
              <button onClick={() => { setEditingStory(null); setShowStoryForm(true); }} className="btn-primary text-sm">
                <Plus size={18} className="mr-1" /> Add Story
              </button>
            </div>
            <ListSearch value={listSearch} onChange={setListSearch} placeholder="Search stories by name or role..." />
            <div className="grid md:grid-cols-2 gap-4">
              {filterBySearch(stories).map(story => (
                <div key={story.id} className="bg-white rounded-xl p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex gap-3">
                      {story.image_url && <img src={story.image_url} alt={story.name} className="w-12 h-12 rounded-full object-cover" />}
                      <div>
                        <h3 className="font-semibold">{story.name}</h3>
                        <p className="text-sm text-[#7882A5]">{story.role} · {story.years_at_company} years</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleToggleActive('employee_stories', story.id, story.is_active)} className="p-2 rounded-lg hover:bg-[#EEF1FF]">
                        {story.is_active ? <Eye size={16} className="text-[#2DCB3B]" /> : <EyeOff size={16} className="text-[#7882A5]" />}
                      </button>
                      <button onClick={() => { setEditingStory(story); setShowStoryForm(true); }} className="p-2 rounded-lg hover:bg-[#EEF1FF]">
                        <Edit2 size={16} className="text-[#4B5578]" />
                      </button>
                      <button onClick={() => handleDelete('employee_stories', story.id)} className="p-2 rounded-lg hover:bg-[#10159B]/10">
                        <Trash2 size={16} className="text-[#10159B]" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-[#4B5578] italic">"{story.quote}"</p>
                </div>
              ))}
              {filterBySearch(stories).length === 0 && <p className="text-[#7882A5]">{listSearch ? 'No matching stories.' : 'No stories yet. Add your first employee story.'}</p>}
            </div>
          </div>
        )}

        {activeTab === 'leadership' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold">Leadership</h1>
              <button onClick={() => { setEditingLeader(null); setShowLeaderForm(true); }} className="btn-primary text-sm">
                <Plus size={18} className="mr-1" /> Add Leader
              </button>
            </div>
            <ListSearch value={listSearch} onChange={setListSearch} placeholder="Search leaders by name or title..." />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterBySearch(leaders).map(leader => (
                <div key={leader.id} className="bg-white rounded-xl p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex gap-3">
                      {leader.image_url && <img src={leader.image_url} alt={leader.name} className="w-12 h-12 rounded-full object-cover" />}
                      <div>
                        <h3 className="font-semibold">{leader.name}</h3>
                        <p className="text-sm text-[#10159B]">{leader.title}</p>
                        {leader.bio && <p className="text-xs text-[#7882A5] mt-2 line-clamp-2">{leader.bio}</p>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleToggleActive('leadership', leader.id, leader.is_active)} className="p-2 rounded-lg hover:bg-[#EEF1FF]">
                        {leader.is_active ? <Eye size={16} className="text-[#2DCB3B]" /> : <EyeOff size={16} className="text-[#7882A5]" />}
                      </button>
                      <button onClick={() => { setEditingLeader(leader); setShowLeaderForm(true); }} className="p-2 rounded-lg hover:bg-[#EEF1FF]">
                        <Edit2 size={16} className="text-[#4B5578]" />
                      </button>
                      <button onClick={() => handleDelete('leadership', leader.id)} className="p-2 rounded-lg hover:bg-[#10159B]/10">
                        <Trash2 size={16} className="text-[#10159B]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {filterBySearch(leaders).length === 0 && <p className="text-[#7882A5]">{listSearch ? 'No matching leaders.' : 'No leaders yet. Add your first leadership profile.'}</p>}
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold">Events</h1>
              <button onClick={() => { setEditingEvent(null); setShowEventForm(true); }} className="btn-primary text-sm">
                <Plus size={18} className="mr-1" /> Add Event
              </button>
            </div>
            <ListSearch value={listSearch} onChange={setListSearch} placeholder="Search events by title..." />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterBySearch(events).map(event => (
                <div key={event.id} className="bg-white rounded-xl p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{event.title}</h3>
                      <p className="text-sm text-[#7882A5]">{new Date(event.event_date).toLocaleDateString('en-US', { dateStyle: 'long' })}</p>
                      <p className="text-xs text-[#7882A5] mt-1">{event.category}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleToggleActive('events', event.id, event.is_active)} className="p-2 rounded-lg hover:bg-[#EEF1FF]">
                        {event.is_active ? <Eye size={16} className="text-[#2DCB3B]" /> : <EyeOff size={16} className="text-[#7882A5]" />}
                      </button>
                      <button onClick={() => { setEditingEvent(event); setShowEventForm(true); }} className="p-2 rounded-lg hover:bg-[#EEF1FF]">
                        <Edit2 size={16} className="text-[#4B5578]" />
                      </button>
                      <button onClick={() => handleDelete('events', event.id)} className="p-2 rounded-lg hover:bg-[#10159B]/10">
                        <Trash2 size={16} className="text-[#10159B]" />
                      </button>
                    </div>
                  </div>
                  {event.image_url && <img src={event.image_url} alt={event.title} className="w-full h-32 rounded-lg object-cover mb-2" />}
                  {event.description && <p className="text-sm text-[#4B5578]">{event.description}</p>}
                </div>
              ))}
              {filterBySearch(events).length === 0 && <p className="text-[#7882A5]">{listSearch ? 'No matching events.' : 'No events yet. Add your first event.'}</p>}
            </div>
          </div>
        )}

        {activeTab === 'departments' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold">Departments</h1>
              <button onClick={() => { setEditingDept(null); setShowDeptForm(true); }} className="btn-primary text-sm">
                <Plus size={18} className="mr-1" /> Add Department
              </button>
            </div>
            <ListSearch value={listSearch} onChange={setListSearch} placeholder="Search departments..." />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterBySearch(departments).map(dept => (
                <div key={dept.id} className="bg-white rounded-xl p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{dept.name}</h3>
                      <p className="text-xs text-[#10159B] mt-1">Slug: {dept.slug}</p>
                      <p className="text-xs text-[#7882A5] mt-1">Icon: {dept.icon}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingDept(dept); setShowDeptForm(true); }} className="p-2 rounded-lg hover:bg-[#EEF1FF]">
                        <Edit2 size={16} className="text-[#4B5578]" />
                      </button>
                      <button onClick={() => handleDelete('departments', dept.id)} className="p-2 rounded-lg hover:bg-[#10159B]/10">
                        <Trash2 size={16} className="text-[#10159B]" />
                      </button>
                    </div>
                  </div>
                  {dept.description && <p className="text-sm text-[#4B5578] mt-2">{dept.description}</p>}
                </div>
              ))}
              {filterBySearch(departments).length === 0 && <p className="text-[#7882A5]">{listSearch ? 'No matching departments.' : 'No departments yet. Add your first department.'}</p>}
            </div>
          </div>
        )}

        {activeTab === 'social' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold">Social Media Posts</h1>
              <button onClick={() => { setEditingSocial(null); setShowSocialForm(true); }} className="btn-primary text-sm">
                <Plus size={18} className="mr-1" /> Add Post
              </button>
            </div>
            <ListSearch value={listSearch} onChange={setListSearch} placeholder="Search posts by title..." />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterBySearch(socialPosts).map(post => (
                <div key={post.id} className="bg-white rounded-xl p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${post.platform === 'LinkedIn' ? 'bg-[#10159B]/10 text-[#10159B]' : 'bg-[#D60808]/10 text-[#D60808]'}`}>
                        {post.platform}
                      </span>
                      <h3 className="font-semibold mt-2">{post.title}</h3>
                      <p className="text-sm text-[#7882A5] mt-1 line-clamp-2">{post.excerpt}</p>
                      <p className="text-xs text-[#7882A5] mt-2">{new Date(post.published_at).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2 ml-2">
                      <button onClick={() => handleToggleActive('social_posts', post.id, post.is_active)} className="p-2 rounded-lg hover:bg-[#EEF1FF]">
                        {post.is_active ? <Eye size={16} className="text-[#2DCB3B]" /> : <EyeOff size={16} className="text-[#7882A5]" />}
                      </button>
                      <button onClick={() => { setEditingSocial(post); setShowSocialForm(true); }} className="p-2 rounded-lg hover:bg-[#EEF1FF]">
                        <Edit2 size={16} className="text-[#4B5578]" />
                      </button>
                      <button onClick={() => handleDelete('social_posts', post.id)} className="p-2 rounded-lg hover:bg-[#10159B]/10">
                        <Trash2 size={16} className="text-[#10159B]" />
                      </button>
                    </div>
                  </div>
                  {post.image_url && <img src={post.image_url} alt={post.title} className="w-full h-32 rounded-lg object-cover" />}
                  <a href={post.post_url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#10159B] hover:underline mt-2 inline-block truncate max-w-full">
                    {post.post_url}
                  </a>
                </div>
              ))}
              {filterBySearch(socialPosts).length === 0 && <p className="text-[#7882A5]">{listSearch ? 'No matching posts.' : 'No social posts yet. Add your first LinkedIn or Instagram post.'}</p>}
            </div>
          </div>
        )}

        {activeTab === 'media' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold">Media Library</h1>
                <p className="text-sm text-[#4B5578] mt-1">Upload and manage images. Use "Pick" in any form to reuse these images.</p>
              </div>
              <button onClick={() => setShowMediaUpload(true)} className="btn-primary text-sm">
                <Upload size={18} className="mr-1" /> Upload Image
              </button>
            </div>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7882A5]" size={18} />
              <input
                type="text"
                placeholder="Search media by name, category, or alt text..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mediaAssets
                .filter(m => !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.category.toLowerCase().includes(search.toLowerCase()) || m.alt_text.toLowerCase().includes(search.toLowerCase()))
                .map(asset => (
                  <div key={asset.id} className="bg-white rounded-xl p-3 group">
                    <div className="relative overflow-hidden rounded-lg mb-2">
                      <img src={asset.image_url} alt={asset.alt_text} className="w-full h-32 object-cover" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                        <button
                          onClick={async () => {
                            await navigator.clipboard.writeText(asset.image_url);
                            showToast('success', 'Image URL copied to clipboard!');
                          }}
                          className="p-2 rounded-lg bg-white/90 hover:bg-white"
                          title="Copy URL"
                        >
                          <Share2 size={16} className="text-[#10159B]" />
                        </button>
                        <button
                          onClick={() => handleDelete('media_assets', asset.id)}
                          className="p-2 rounded-lg bg-white/90 hover:bg-white"
                          title="Delete"
                        >
                          <Trash2 size={16} className="text-[#D60808]" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm font-medium truncate">{asset.name}</p>
                    <p className="text-xs text-[#7882A5]">{asset.category}</p>
                  </div>
                ))}
              {mediaAssets.length === 0 && (
                <div className="col-span-full text-center py-12 text-[#7882A5]">
                  <ImageIcon size={48} className="mx-auto mb-3 opacity-30" />
                  <p>No media assets yet. Upload your first image to get started.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div>
            <h1 className="text-2xl font-semibold mb-6">Job Applications</h1>
            <div className="space-y-3">
              {applications.map(app => (
                <div key={app.id} className="bg-white rounded-xl p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{app.name}</h3>
                      <p className="text-sm text-[#10159B]">{app.job_title}</p>
                      <div className="flex flex-wrap gap-4 mt-2 text-xs text-[#7882A5]">
                        <span>{app.email}</span>
                        {app.phone && <span>{app.phone}</span>}
                        {app.experience_years !== null && <span>{app.experience_years} years exp</span>}
                        {app.current_company && <span>{app.current_company}</span>}
                      </div>
                      {app.cover_letter && <p className="text-sm text-[#4B5578] mt-3">{app.cover_letter}</p>}
                    </div>
                    <div className="flex items-center gap-3">
                      <select
                        value={app.status}
                        onChange={async (e) => {
                          const { error } = await supabase.from('job_applications').update({ status: e.target.value }).eq('id', app.id);
                          if (error) {
                            showToast('error', `Update failed: ${error.message}`);
                          } else {
                            showToast('success', 'Application status updated.');
                            loadAll();
                          }
                        }}
                        className="text-xs border border-[#DDE3F5] rounded-lg px-2 py-1"
                      >
                        <option value="new">New</option>
                        <option value="reviewing">Reviewing</option>
                        <option value="interviewed">Interviewed</option>
                        <option value="offered">Offered</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      <span className="text-xs text-[#7882A5]">{new Date(app.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
              {applications.length === 0 && <p className="text-[#7882A5]">No applications yet.</p>}
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div>
            <h1 className="text-2xl font-semibold mb-6">Contact Messages</h1>
            <div className="space-y-3">
              {contacts.map(msg => (
                <div key={msg.id} className="bg-white rounded-xl p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{msg.name}</h3>
                      <p className="text-sm text-[#7882A5]">{msg.email}{msg.phone && ` · ${msg.phone}`}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#7882A5]">{new Date(msg.created_at).toLocaleDateString()}</span>
                      <button onClick={() => handleDelete('contact_submissions', msg.id)} className="p-2 rounded-lg hover:bg-[#10159B]/10">
                        <Trash2 size={16} className="text-[#10159B]" />
                      </button>
                    </div>
                  </div>
                  {msg.subject && <p className="text-sm font-medium mt-2">{msg.subject}</p>}
                  <p className="text-sm text-[#4B5578] mt-1">{msg.message}</p>
                </div>
              ))}
              {contacts.length === 0 && <p className="text-[#7882A5]">No messages yet.</p>}
            </div>
          </div>
        )}
      </main>

      {showJobForm && (
        <JobForm job={editingJob} onClose={() => { setShowJobForm(false); setEditingJob(null); }} onSaved={() => { setShowJobForm(false); setEditingJob(null); loadAll(); }} onError={(msg: string) => showToast('error', msg)} />
      )}
      {showStoryForm && (
        <StoryForm story={editingStory} onClose={() => { setShowStoryForm(false); setEditingStory(null); }} onSaved={() => { setShowStoryForm(false); setEditingStory(null); loadAll(); }} onError={(msg: string) => showToast('error', msg)} />
      )}
      {showLeaderForm && (
        <LeaderForm leader={editingLeader} onClose={() => { setShowLeaderForm(false); setEditingLeader(null); }} onSaved={() => { setShowLeaderForm(false); setEditingLeader(null); loadAll(); }} onError={(msg: string) => showToast('error', msg)} />
      )}
      {showEventForm && (
        <EventForm event={editingEvent} onClose={() => { setShowEventForm(false); setEditingEvent(null); }} onSaved={() => { setShowEventForm(false); setEditingEvent(null); loadAll(); }} onError={(msg: string) => showToast('error', msg)} />
      )}
      {showSocialForm && (
        <SocialForm social={editingSocial} onClose={() => { setShowSocialForm(false); setEditingSocial(null); }} onSaved={() => { setShowSocialForm(false); setEditingSocial(null); loadAll(); }} onError={(msg: string) => showToast('error', msg)} />
      )}
      {showDeptForm && (
        <DepartmentForm dept={editingDept} onClose={() => { setShowDeptForm(false); setEditingDept(null); }} onSaved={() => { setShowDeptForm(false); setEditingDept(null); loadAll(); }} onError={(msg: string) => showToast('error', msg)} />
      )}
      {showPageForm && (
        <PageContentForm page={editingPage} onClose={() => { setShowPageForm(false); setEditingPage(null); }} onSaved={() => { setShowPageForm(false); setEditingPage(null); loadAll(); }} onError={(msg: string) => showToast('error', msg)} />
      )}
      {showMediaUpload && (
        <MediaUploadForm onClose={() => setShowMediaUpload(false)} onSaved={() => { setShowMediaUpload(false); loadAll(); }} onError={(msg: string) => showToast('error', msg)} />
      )}
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: number; icon: typeof Briefcase; color: string }) {
  return (
    <div className="bg-white rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
          <Icon size={20} style={{ color }} />
        </div>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-[#7882A5]">{label}</p>
    </div>
  );
}

function ListSearch({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div className="relative mb-4">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7882A5]" size={18} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="input-field pl-10"
      />
    </div>
  );
}

function SiteSettingsPanel({ settings, onSaved, onError }: { settings: SiteSettings | null; onSaved: () => void; onError: (msg: string) => void }) {
  const [form, setForm] = useState<SiteSettings | null>(settings);
  const [saving, setSaving] = useState(false);

  useEffect(() => { setForm(settings); }, [settings]);

  if (!form) return <p className="text-[#7882A5]">Loading settings...</p>;

  const update = (field: keyof SiteSettings, v: string) => setForm({ ...form, [field]: v });

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase.from('site_settings').update({
      hero_title: form.hero_title,
      hero_subtitle: form.hero_subtitle,
      hero_badge: form.hero_badge,
      stat_1_value: form.stat_1_value, stat_1_label: form.stat_1_label, stat_1_icon: form.stat_1_icon, stat_1_color: form.stat_1_color,
      stat_2_value: form.stat_2_value, stat_2_label: form.stat_2_label, stat_2_icon: form.stat_2_icon, stat_2_color: form.stat_2_color,
      stat_3_value: form.stat_3_value, stat_3_label: form.stat_3_label, stat_3_icon: form.stat_3_icon, stat_3_color: form.stat_3_color,
      stat_4_value: form.stat_4_value, stat_4_label: form.stat_4_label, stat_4_icon: form.stat_4_icon, stat_4_color: form.stat_4_color,
      company_description: form.company_description,
      contact_email: form.contact_email, contact_phone: form.contact_phone, contact_address: form.contact_address,
      linkedin_url: form.linkedin_url, instagram_url: form.instagram_url,
    }).eq('id', 1);
    setSaving(false);
    if (error) {
      onError(`Save failed: ${error.message}`);
    } else {
      onSaved();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Site Settings</h1>
          <p className="text-sm text-[#4B5578] mt-1">Manage global content that appears across your website.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary text-sm disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Hero Section</h3>
          <div className="space-y-3">
            <Field label="Hero Badge Text" value={form.hero_badge} onChange={v => update('hero_badge', v)} />
            <Field label="Hero Title" value={form.hero_title} onChange={v => update('hero_title', v)} />
            <TextArea label="Hero Subtitle" value={form.hero_subtitle} onChange={v => update('hero_subtitle', v)} rows={2} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Statistics (shown on homepage)</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 bg-[#EEF1FF] rounded-xl">
                <Field label={`Stat ${i} Value`} value={form[`stat_${i}_value` as keyof SiteSettings]} onChange={v => update(`stat_${i}_value` as keyof SiteSettings, v)} />
                <Field label={`Stat ${i} Label`} value={form[`stat_${i}_label` as keyof SiteSettings]} onChange={v => update(`stat_${i}_label` as keyof SiteSettings, v)} />
                <Field label={`Stat ${i} Icon (Lucide)`} value={form[`stat_${i}_icon` as keyof SiteSettings]} onChange={v => update(`stat_${i}_icon` as keyof SiteSettings, v)} />
                <Field label={`Stat ${i} Color (hex)`} value={form[`stat_${i}_color` as keyof SiteSettings]} onChange={v => update(`stat_${i}_color` as keyof SiteSettings, v)} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Company Info & Contact</h3>
          <div className="space-y-3">
            <TextArea label="Company Description" value={form.company_description} onChange={v => update('company_description', v)} rows={3} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Contact Email" value={form.contact_email} onChange={v => update('contact_email', v)} />
              <Field label="Contact Phone" value={form.contact_phone} onChange={v => update('contact_phone', v)} />
            </div>
            <Field label="Contact Address" value={form.contact_address} onChange={v => update('contact_address', v)} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Social Media Links</h3>
          <div className="space-y-3">
            <Field label="LinkedIn URL" value={form.linkedin_url} onChange={v => update('linkedin_url', v)} />
            <Field label="Instagram URL" value={form.instagram_url} onChange={v => update('instagram_url', v)} />
          </div>
        </div>

        <button onClick={handleSave} disabled={saving} className="btn-primary w-full disabled:opacity-50">
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
}

function JobForm({ job, onClose, onSaved, onError }: { job: Job | null; onClose: () => void; onSaved: () => void; onError: (msg: string) => void }) {
  const [form, setForm] = useState({
    title: job?.title || '',
    slug: job?.slug || '',
    department: job?.department || '',
    location: job?.location || 'India',
    job_type: job?.job_type || 'Full-time',
    experience_level: job?.experience_level || '',
    description: job?.description || '',
    responsibilities: (job?.responsibilities || []).join('\n'),
    requirements: (job?.requirements || []).join('\n'),
    qualifications: (job?.qualifications || []).join('\n'),
    benefits: (job?.benefits || []).join('\n'),
    is_active: job?.is_active ?? true,
    is_featured: job?.is_featured ?? false,
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!form.title || !form.department || !form.description) {
      onError('Please fill in title, department, and description.');
      return;
    }
    setSaving(true);
    const payload = {
      ...form,
      slug: form.slug || form.title.toLowerCase().replace(/\s+/g, '-'),
      responsibilities: form.responsibilities.split('\n').filter(Boolean),
      requirements: form.requirements.split('\n').filter(Boolean),
      qualifications: form.qualifications.split('\n').filter(Boolean),
      benefits: form.benefits.split('\n').filter(Boolean),
    };
    const { error } = job
      ? await supabase.from('jobs').update(payload).eq('id', job.id)
      : await supabase.from('jobs').insert(payload);
    setSaving(false);
    if (error) {
      onError(`Save failed: ${error.message}`);
    } else {
      onSaved();
    }
  };

  return (
    <Modal title={job ? 'Edit Job' : 'Add Job'} onClose={onClose}>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Title" value={form.title} onChange={v => setForm({ ...form, title: v })} />
          <Field label="Slug (optional)" value={form.slug} onChange={v => setForm({ ...form, slug: v })} />
          <Field label="Department" value={form.department} onChange={v => setForm({ ...form, department: v })} />
          <Field label="Location" value={form.location} onChange={v => setForm({ ...form, location: v })} />
          <Field label="Job Type" value={form.job_type} onChange={v => setForm({ ...form, job_type: v })} />
          <Field label="Experience Level" value={form.experience_level} onChange={v => setForm({ ...form, experience_level: v })} />
        </div>
        <TextArea label="Description" value={form.description} onChange={v => setForm({ ...form, description: v })} rows={3} />
        <TextArea label="Responsibilities (one per line)" value={form.responsibilities} onChange={v => setForm({ ...form, responsibilities: v })} rows={4} />
        <TextArea label="Requirements (one per line)" value={form.requirements} onChange={v => setForm({ ...form, requirements: v })} rows={4} />
        <TextArea label="Qualifications (one per line)" value={form.qualifications} onChange={v => setForm({ ...form, qualifications: v })} rows={4} />
        <TextArea label="Benefits (one per line)" value={form.benefits} onChange={v => setForm({ ...form, benefits: v })} rows={4} />
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} />
            Active
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.is_featured} onChange={e => setForm({ ...form, is_featured: e.target.checked })} />
            Featured
          </label>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary w-full disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Job'}
        </button>
      </div>
    </Modal>
  );
}

function StoryForm({ story, onClose, onSaved, onError }: { story: EmployeeStory | null; onClose: () => void; onSaved: () => void; onError: (msg: string) => void }) {
  const [form, setForm] = useState({
    name: story?.name || '',
    role: story?.role || '',
    department: story?.department || '',
    years_at_company: story?.years_at_company || 0,
    image_url: story?.image_url || '',
    quote: story?.quote || '',
    story: story?.story || '',
    display_order: story?.display_order || 0,
    is_active: story?.is_active ?? true,
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!form.name || !form.role || !form.quote) {
      onError('Please fill in name, role, and quote.');
      return;
    }
    setSaving(true);
    const { error } = story
      ? await supabase.from('employee_stories').update(form).eq('id', story.id)
      : await supabase.from('employee_stories').insert(form);
    setSaving(false);
    if (error) {
      onError(`Save failed: ${error.message}`);
    } else {
      onSaved();
    }
  };

  return (
    <Modal title={story ? 'Edit Story' : 'Add Story'} onClose={onClose}>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Name" value={form.name} onChange={v => setForm({ ...form, name: v })} />
          <Field label="Role" value={form.role} onChange={v => setForm({ ...form, role: v })} />
          <Field label="Department" value={form.department} onChange={v => setForm({ ...form, department: v })} />
          <Field label="Years at Company" type="number" value={String(form.years_at_company)} onChange={v => setForm({ ...form, years_at_company: parseInt(v) || 0 })} />
          <Field label="Display Order" type="number" value={String(form.display_order)} onChange={v => setForm({ ...form, display_order: parseInt(v) || 0 })} />
        </div>
        <MediaPicker label="Photo" value={form.image_url} onChange={v => setForm({ ...form, image_url: v })} />
        <TextArea label="Quote" value={form.quote} onChange={v => setForm({ ...form, quote: v })} rows={2} />
        <TextArea label="Story" value={form.story} onChange={v => setForm({ ...form, story: v })} rows={4} />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} />
          Active
        </label>
        <button onClick={handleSave} disabled={saving} className="btn-primary w-full disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Story'}
        </button>
      </div>
    </Modal>
  );
}

function LeaderForm({ leader, onClose, onSaved, onError }: { leader: LeadershipMember | null; onClose: () => void; onSaved: () => void; onError: (msg: string) => void }) {
  const [form, setForm] = useState({
    name: leader?.name || '',
    title: leader?.title || '',
    bio: leader?.bio || '',
    image_url: leader?.image_url || '',
    display_order: leader?.display_order || 0,
    is_active: leader?.is_active ?? true,
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!form.name || !form.title) {
      onError('Please fill in name and title.');
      return;
    }
    setSaving(true);
    const { error } = leader
      ? await supabase.from('leadership').update(form).eq('id', leader.id)
      : await supabase.from('leadership').insert(form);
    setSaving(false);
    if (error) {
      onError(`Save failed: ${error.message}`);
    } else {
      onSaved();
    }
  };

  return (
    <Modal title={leader ? 'Edit Leader' : 'Add Leader'} onClose={onClose}>
      <div className="space-y-3">
        <Field label="Name" value={form.name} onChange={v => setForm({ ...form, name: v })} />
        <Field label="Title" value={form.title} onChange={v => setForm({ ...form, title: v })} />
        <Field label="Display Order" type="number" value={String(form.display_order)} onChange={v => setForm({ ...form, display_order: parseInt(v) || 0 })} />
        <MediaPicker label="Photo" value={form.image_url} onChange={v => setForm({ ...form, image_url: v })} />
        <TextArea label="Bio" value={form.bio} onChange={v => setForm({ ...form, bio: v })} rows={3} />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} />
          Active
        </label>
        <button onClick={handleSave} disabled={saving} className="btn-primary w-full disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Leader'}
        </button>
      </div>
    </Modal>
  );
}

function EventForm({ event, onClose, onSaved, onError }: { event: EventItem | null; onClose: () => void; onSaved: () => void; onError: (msg: string) => void }) {
  const [form, setForm] = useState({
    title: event?.title || '',
    description: event?.description || '',
    event_date: event?.event_date || '',
    image_url: event?.image_url || '',
    category: event?.category || 'Culture',
    display_order: event?.display_order || 0,
    is_active: event?.is_active ?? true,
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!form.title || !form.event_date) {
      onError('Please fill in title and date.');
      return;
    }
    setSaving(true);
    const { error } = event
      ? await supabase.from('events').update(form).eq('id', event.id)
      : await supabase.from('events').insert(form);
    setSaving(false);
    if (error) {
      onError(`Save failed: ${error.message}`);
    } else {
      onSaved();
    }
  };

  return (
    <Modal title={event ? 'Edit Event' : 'Add Event'} onClose={onClose}>
      <div className="space-y-3">
        <Field label="Title" value={form.title} onChange={v => setForm({ ...form, title: v })} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Date" type="date" value={form.event_date} onChange={v => setForm({ ...form, event_date: v })} />
          <Field label="Category" value={form.category} onChange={v => setForm({ ...form, category: v })} />
          <Field label="Display Order" type="number" value={String(form.display_order)} onChange={v => setForm({ ...form, display_order: parseInt(v) || 0 })} />
        </div>
        <MediaPicker label="Event Image" value={form.image_url} onChange={v => setForm({ ...form, image_url: v })} />
        <TextArea label="Description" value={form.description} onChange={v => setForm({ ...form, description: v })} rows={3} />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} />
          Active
        </label>
        <button onClick={handleSave} disabled={saving} className="btn-primary w-full disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Event'}
        </button>
      </div>
    </Modal>
  );
}

function SocialForm({ social, onClose, onSaved, onError }: { social: SocialPost | null; onClose: () => void; onSaved: () => void; onError: (msg: string) => void }) {
  const [form, setForm] = useState({
    platform: social?.platform || 'LinkedIn' as 'LinkedIn' | 'Instagram',
    title: social?.title || '',
    excerpt: social?.excerpt || '',
    post_url: social?.post_url || '',
    image_url: social?.image_url || '',
    published_at: social?.published_at ? new Date(social.published_at).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
    display_order: social?.display_order || 0,
    is_active: social?.is_active ?? true,
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!form.title || !form.post_url) {
      onError('Please fill in title and post URL.');
      return;
    }
    setSaving(true);
    const payload = { ...form, published_at: new Date(form.published_at).toISOString() };
    const { error } = social
      ? await supabase.from('social_posts').update(payload).eq('id', social.id)
      : await supabase.from('social_posts').insert(payload);
    setSaving(false);
    if (error) {
      onError(`Save failed: ${error.message}`);
    } else {
      onSaved();
    }
  };

  return (
    <Modal title={social ? 'Edit Social Post' : 'Add Social Post'} onClose={onClose}>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-[#4B5578] mb-1 block">Platform</label>
            <select
              value={form.platform}
              onChange={e => setForm({ ...form, platform: e.target.value as 'LinkedIn' | 'Instagram' })}
              className="input-field text-sm py-2"
            >
              <option value="LinkedIn">LinkedIn</option>
              <option value="Instagram">Instagram</option>
            </select>
          </div>
          <Field label="Display Order" type="number" value={String(form.display_order)} onChange={v => setForm({ ...form, display_order: parseInt(v) || 0 })} />
        </div>
        <Field label="Title" value={form.title} onChange={v => setForm({ ...form, title: v })} />
        <TextArea label="Excerpt" value={form.excerpt} onChange={v => setForm({ ...form, excerpt: v })} rows={2} />
        <Field label="Post URL" value={form.post_url} onChange={v => setForm({ ...form, post_url: v })} />
        <MediaPicker label="Post Image (optional)" value={form.image_url} onChange={v => setForm({ ...form, image_url: v })} />
        <Field label="Published Date" type="date" value={form.published_at} onChange={v => setForm({ ...form, published_at: v })} />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} />
          Active
        </label>
        <button onClick={handleSave} disabled={saving} className="btn-primary w-full disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Post'}
        </button>
      </div>
    </Modal>
  );
}

function DepartmentForm({ dept, onClose, onSaved, onError }: { dept: Department | null; onClose: () => void; onSaved: () => void; onError: (msg: string) => void }) {
  const [form, setForm] = useState({
    name: dept?.name || '',
    slug: dept?.slug || '',
    description: dept?.description || '',
    icon: dept?.icon || 'Activity',
    display_order: dept?.display_order || 0,
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!form.name) {
      onError('Please fill in department name.');
      return;
    }
    setSaving(true);
    const payload = { ...form, slug: form.slug || form.name.toLowerCase().replace(/\s+/g, '-') };
    const { error } = dept
      ? await supabase.from('departments').update(payload).eq('id', dept.id)
      : await supabase.from('departments').insert(payload);
    setSaving(false);
    if (error) {
      onError(`Save failed: ${error.message}`);
    } else {
      onSaved();
    }
  };

  return (
    <Modal title={dept ? 'Edit Department' : 'Add Department'} onClose={onClose}>
      <div className="space-y-3">
        <Field label="Name" value={form.name} onChange={v => setForm({ ...form, name: v })} />
        <Field label="Slug (optional)" value={form.slug} onChange={v => setForm({ ...form, slug: v })} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Icon (Lucide name)" value={form.icon} onChange={v => setForm({ ...form, icon: v })} />
          <Field label="Display Order" type="number" value={String(form.display_order)} onChange={v => setForm({ ...form, display_order: parseInt(v) || 0 })} />
        </div>
        <TextArea label="Description" value={form.description} onChange={v => setForm({ ...form, description: v })} rows={3} />
        <button onClick={handleSave} disabled={saving} className="btn-primary w-full disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Department'}
        </button>
      </div>
    </Modal>
  );
}

function PageContentForm({ page, onClose, onSaved, onError }: { page: PageContent | null; onClose: () => void; onSaved: () => void; onError: (msg: string) => void }) {
  const [form, setForm] = useState({
    page_key: page?.page_key || 'home',
    section_key: page?.section_key || 'section',
    title: page?.title || '',
    subtitle: page?.subtitle || '',
    body: page?.body || '',
    image_url: page?.image_url || '',
    display_order: page?.display_order || 0,
    is_active: page?.is_active ?? true,
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!form.page_key || !form.section_key) {
      onError('Please fill in page key and section key.');
      return;
    }
    setSaving(true);
    const { error } = page
      ? await supabase.from('page_content').update(form).eq('id', page.id)
      : await supabase.from('page_content').insert(form);
    setSaving(false);
    if (error) {
      onError(`Save failed: ${error.message}`);
    } else {
      onSaved();
    }
  };

  return (
    <Modal title={page ? 'Edit Content Block' : 'Add Content Block'} onClose={onClose}>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-[#4B5578] mb-1 block">Page</label>
            <select value={form.page_key} onChange={e => setForm({ ...form, page_key: e.target.value })} className="input-field text-sm py-2">
              <option value="home">Home</option>
              <option value="about">About</option>
              <option value="careers">Careers</option>
              <option value="departments">Departments</option>
              <option value="benefits">Benefits</option>
              <option value="growth">Growth</option>
              <option value="learning">Learning</option>
              <option value="life">Life</option>
              <option value="leadership">Leadership</option>
              <option value="stories">Stories</option>
              <option value="events">Events</option>
              <option value="contact">Contact</option>
            </select>
          </div>
          <Field label="Section Key" value={form.section_key} onChange={v => setForm({ ...form, section_key: v })} />
        </div>
        <Field label="Title" value={form.title} onChange={v => setForm({ ...form, title: v })} />
        <Field label="Subtitle" value={form.subtitle} onChange={v => setForm({ ...form, subtitle: v })} />
        <TextArea label="Body Content" value={form.body} onChange={v => setForm({ ...form, body: v })} rows={5} />
        <MediaPicker label="Image (optional)" value={form.image_url} onChange={v => setForm({ ...form, image_url: v })} />
        <Field label="Display Order" type="number" value={String(form.display_order)} onChange={v => setForm({ ...form, display_order: parseInt(v) || 0 })} />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} />
          Active
        </label>
        <button onClick={handleSave} disabled={saving} className="btn-primary w-full disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Content Block'}
        </button>
      </div>
    </Modal>
  );
}

function MediaUploadForm({ onClose, onSaved, onError }: { onClose: () => void; onSaved: () => void; onError: (msg: string) => void }) {
  const [name, setName] = useState('');
  const [altText, setAltText] = useState('');
  const [category, setCategory] = useState('General');
  const [imageUrl, setImageUrl] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!imageUrl || !name) {
      onError('Please upload an image and provide a name.');
      return;
    }
    setSaving(true);
    const { error } = await supabase.from('media_assets').insert({
      name,
      image_url: imageUrl,
      alt_text: altText,
      category,
      display_order: 0,
      is_active: true,
    });
    setSaving(false);
    if (error) {
      onError(`Save failed: ${error.message}`);
    } else {
      onSaved();
    }
  };

  return (
    <Modal title="Upload Media Asset" onClose={onClose}>
      <div className="space-y-3">
        <Field label="Name" value={name} onChange={setName} />
        <Field label="Alt Text" value={altText} onChange={setAltText} />
        <div>
          <label className="text-xs font-medium text-[#4B5578] mb-1 block">Category</label>
          <select value={category} onChange={e => setCategory(e.target.value)} className="input-field text-sm py-2">
            <option>General</option>
            <option>Events</option>
            <option>Stories</option>
            <option>Leadership</option>
            <option>Social</option>
            <option>Culture</option>
            <option>Office</option>
          </select>
        </div>
        <MediaPicker label="Image" value={imageUrl} onChange={setImageUrl} />
        <button onClick={handleSave} disabled={saving || !imageUrl || !name} className="btn-primary w-full disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Media Asset'}
        </button>
      </div>
    </Modal>
  );
}

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#EEF1FF]"><X size={20} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="text-xs font-medium text-[#4B5578] mb-1 block">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} className="input-field text-sm py-2" />
    </div>
  );
}

function TextArea({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      <label className="text-xs font-medium text-[#4B5578] mb-1 block">{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} className="input-field text-sm py-2 resize-none" />
    </div>
  );
}
