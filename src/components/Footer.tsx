import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Facebook, Instagram, MapPin, Mail } from 'lucide-react';
import Logo from '@/components/Logo';

const footerLinks = {
  Company: [
    { label: 'Our India Story', path: '/about' },
    { label: 'Life at Revantage', path: '/life' },
    { label: 'Leadership', path: '/leadership' },
    { label: 'Events & Culture', path: '/events' },
  ],
  Careers: [
    { label: 'Open Positions', path: '/careers' },
    { label: 'Departments', path: '/departments' },
    { label: 'Learning & Development', path: '/learning' },
    { label: 'Career Growth', path: '/growth' },
  ],
  People: [
    { label: 'Employee Stories', path: '/stories' },
    { label: 'Benefits', path: '/benefits' },
    { label: 'Contact', path: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', path: '/' },
    { label: 'Terms of Use', path: '/' },
    { label: 'Admin Login', path: '/login' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0D1248] pt-16 pb-8">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <div className="mb-4">
              <Logo className="!bg-white border-white/20" />
            </div>
            <p className="text-sm text-[#B7C0E5] leading-relaxed mb-4 max-w-xs">
              Revantage Systems India Pvt Ltd — where healthcare RCM meets human potential.
              Building careers, not just teams.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#B7C0E5] hover:text-[#2DCB3B] hover:bg-white/10 transition-all" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#B7C0E5] hover:text-[#2DCB3B] hover:bg-white/10 transition-all" aria-label="Twitter">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#B7C0E5] hover:text-[#2DCB3B] hover:bg-white/10 transition-all" aria-label="Facebook">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#B7C0E5] hover:text-[#2DCB3B] hover:bg-white/10 transition-all" aria-label="Instagram">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-bold text-white mb-3 uppercase tracking-wider">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-[#B7C0E5] hover:text-[#2DCB3B] hover:underline transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#7882A5]">
            © {new Date().getFullYear()} Revantage Systems India Pvt Ltd. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-[#7882A5]">
            <span className="flex items-center gap-1"><MapPin size={12} /> Chennai · Hyderabad</span>
            <span className="flex items-center gap-1"><Mail size={12} /> careers@revantage.in</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
