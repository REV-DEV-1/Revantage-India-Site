import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { MediaAsset } from '@/types';
import { Upload, Search, X, ImageIcon, Check } from 'lucide-react';

interface MediaPickerProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

export default function MediaPicker({ label, value, onChange }: MediaPickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [uploading, setUploading] = useState(false);

  const loadAssets = async () => {
    setLoading(true);
    const { data } = await supabase.from('media_assets').select('*').order('created_at', { ascending: false });
    if (data) setAssets(data);
    setLoading(false);
  };

  useEffect(() => {
    if (showPicker && assets.length === 0) loadAssets();
  }, [showPicker]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const { error } = await supabase.storage.from('site-media').upload(fileName, file);
    if (!error) {
      const { data } = supabase.storage.from('site-media').getPublicUrl(fileName);
      const { error: dbError } = await supabase.from('media_assets').insert({
        name: file.name.replace(/\.[^.]+$/, ''),
        image_url: data.publicUrl,
        alt_text: file.name.replace(/\.[^.]+$/, ''),
        category: 'General',
        display_order: 0,
        is_active: true,
      });
      if (!dbError) {
        loadAssets();
        onChange(data.publicUrl);
      }
    } else {
      alert('Upload failed. Please try again.');
    }
    setUploading(false);
  };

  const filtered = assets.filter(a =>
    !search ||
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <label className="text-xs font-medium text-[#4B5578] mb-1 block">{label}</label>
      <div className="flex gap-2">
        <input type="text" value={value} onChange={e => onChange(e.target.value)} className="input-field text-sm py-2 flex-1" placeholder="Paste URL or pick from library" />
        <button
          type="button"
          onClick={() => setShowPicker(true)}
          className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#EEF1FF] border border-[#DDE3F5] text-sm font-bold cursor-pointer hover:bg-[#DDE3F5] transition-all whitespace-nowrap"
        >
          <ImageIcon size={16} className="mr-1" /> Pick
        </button>
        <label className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#10159B] text-white text-sm font-bold cursor-pointer hover:bg-[#0D1248] transition-all whitespace-nowrap">
          {uploading ? 'Uploading...' : <><Upload size={16} className="mr-1" /> Upload</>}
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>
      {value && <img src={value} alt="Preview" className="mt-2 w-24 h-24 rounded-lg object-cover" />}

      {showPicker && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowPicker(false)}>
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Media Library — Pick an Image</h2>
              <button onClick={() => setShowPicker(false)} className="p-2 rounded-lg hover:bg-[#EEF1FF]"><X size={20} /></button>
            </div>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7882A5]" size={18} />
              <input
                type="text"
                placeholder="Search by name or category..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-field pl-10"
                autoFocus
              />
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {loading && <p className="col-span-full text-center text-[#7882A5] py-8">Loading...</p>}
              {!loading && filtered.length === 0 && (
                <div className="col-span-full text-center py-8 text-[#7882A5]">
                  <ImageIcon size={40} className="mx-auto mb-2 opacity-30" />
                  <p>No images found. Upload a new one using the Upload button.</p>
                </div>
              )}
              {filtered.map(asset => (
                <button
                  key={asset.id}
                  onClick={() => {
                    onChange(asset.image_url);
                    setShowPicker(false);
                  }}
                  className={`relative rounded-lg overflow-hidden border-2 transition-all hover:border-[#10159B] ${value === asset.image_url ? 'border-[#10159B] ring-2 ring-[#10159B]/20' : 'border-transparent'}`}
                >
                  <img src={asset.image_url} alt={asset.alt_text} className="w-full h-24 object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-2 py-1 truncate">{asset.name}</div>
                  {value === asset.image_url && (
                    <div className="absolute top-1 right-1 bg-[#10159B] text-white rounded-full p-1">
                      <Check size={12} />
                    </div>
                  )}
                </button>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[#DDE3F5]">
              <label className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#10159B] text-white text-sm font-bold cursor-pointer hover:bg-[#0D1248] transition-all">
                {uploading ? 'Uploading...' : <><Upload size={16} className="mr-1" /> Upload New Image</>}
                <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
