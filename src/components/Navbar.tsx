import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/Logo';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Life', path: '/life' },
  { label: 'Departments', path: '/departments' },
  { label: 'Careers', path: '/careers' },
  { label: 'Learning', path: '/learning' },
  { label: 'Stories', path: '/stories' },
  { label: 'Events', path: '/events' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? 'bg-[#F3FFF4] bg-blur border-b border-[#2DCB3B]/20'
            : 'bg-[#F3FFF4]'
        }`}
      >
        <nav className="container-wide flex items-center justify-center h-20 py-3 relative">
          <Link to="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80 absolute left-0">
            <Logo />
          </Link>

          <div className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`text-sm font-semibold transition-colors text-center ${
                  location.pathname === link.path
                    ? 'text-[#10159B]'
                    : 'text-[#101A4A] hover:text-[#10159B]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block absolute right-0">
            <Link
              to="/careers"
              className="btn-primary text-sm py-2 px-5"
            >
              Join Us
            </Link>
          </div>

          <button
            className="lg:hidden text-[#101A4A] absolute right-0"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 top-20 z-40 bg-[#F3FFF4] lg:hidden animate-fade-in-up overflow-y-auto">
          <div className="flex flex-col px-6 py-8 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`text-lg font-semibold py-3 border-b border-[#2DCB3B]/10 ${
                  location.pathname === link.path ? 'text-[#10159B]' : 'text-[#101A4A]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/careers" className="btn-primary mt-6">
              Join Us
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
