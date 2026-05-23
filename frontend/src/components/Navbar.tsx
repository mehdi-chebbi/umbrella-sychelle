import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Lock } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Hide/show navbar on scroll
  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const current = window.scrollY;
      setVisible(current <= 100 || current < lastScroll);
      lastScroll = current;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    if (location.pathname !== '/') return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { to: '/', label: 'ACCUEIL' },
    { to: '/a-propos', label: 'À PROPOS' },
    { to: '/partenaires', label: 'PARTENAIRES' },
    { to: '/geoportail', label: 'GÉOPORTAIL' },
  ];

  return (
    <>
      {/* Floating Pill Navbar */}
      <nav
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          visible ? 'translate-y-0' : '-translate-y-[120px]'
        }`}
      >
        <div className="flex items-center gap-1 bg-ivory/80 backdrop-blur-xl border border-wheat/60 rounded-full px-2 py-1.5 shadow-[0_8px_40px_-12px_rgba(27,107,94,0.1)]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 px-4 py-2">
            <span className="font-serif text-xl font-semibold text-ocean tracking-wider">UMBRELLA</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`nav-link relative text-xs font-medium px-4 py-2 tracking-wide transition-colors ${
                  location.pathname === item.to
                    ? 'text-ocean'
                    : 'text-bark/70 hover:text-ocean'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Login Button */}
          <Link
            to="/admin/connexion"
            className="hidden lg:flex items-center gap-1.5 text-xs font-medium text-bark/60 hover:text-ocean px-3 py-2 tracking-wide transition-colors"
          >
            <Lock size={14} strokeWidth={1.5} />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-sand/50 transition-colors"
            aria-label="Menu"
          >
            <Menu size={20} className="text-bark" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-ivory/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-opacity duration-500 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center rounded-full border border-wheat/60 hover:bg-sand/30 transition-colors"
        >
          <X size={22} className="text-bark" />
        </button>

        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setIsOpen(false)}
            className={`font-serif text-4xl transition-colors capitalize ${
              location.pathname === item.to ? 'text-ocean' : 'text-bark hover:text-ocean'
            }`}
          >
            {item.label.charAt(0) + item.label.slice(1).toLowerCase()}
          </Link>
        ))}

        <Link
          to="/admin/connexion"
          onClick={() => setIsOpen(false)}
          className="mt-4 bg-ocean text-ivory text-sm font-medium px-8 py-3.5 rounded-full hover:bg-reef transition-all tracking-wide flex items-center gap-2"
        >
          <Lock size={14} strokeWidth={1.5} />
          Administration
        </Link>
      </div>
    </>
  );
}
