import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-16 md:py-20 border-t border-wheat/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <p className="font-serif text-2xl font-semibold text-ocean tracking-wider mb-4">UMBRELLA</p>
            <p className="text-earth text-sm font-light leading-relaxed max-w-xs">
              Projet de surveillance et de protection <br />de la biodiversité des Seychelles.<br />
              Financé par le FEM et l&apos;UNEP.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {/* Facebook */}
              <a href="#" className="w-9 h-9 rounded-full border border-wheat/50 flex items-center justify-center text-earth hover:text-ocean hover:border-sage/50 transition-all duration-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" className="w-9 h-9 rounded-full border border-wheat/50 flex items-center justify-center text-earth hover:text-ocean hover:border-sage/50 transition-all duration-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
              </a>
              {/* Twitter / X */}
              <a href="#" className="w-9 h-9 rounded-full border border-wheat/50 flex items-center justify-center text-earth hover:text-ocean hover:border-sage/50 transition-all duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-ocean font-medium mb-5">Navigation</p>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm text-earth font-light hover:text-ocean transition-colors">Accueil</Link></li>
              <li><Link to="/a-propos" className="text-sm text-earth font-light hover:text-ocean transition-colors">À Propos</Link></li>
              <li><Link to="/partenaires" className="text-sm text-earth font-light hover:text-ocean transition-colors">Partenaires</Link></li>
            </ul>
          </div>

          {/* Programmes */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-ocean font-medium mb-5">Programmes</p>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-earth font-light hover:text-ocean transition-colors">Zone Côtier</a></li>
              <li><a href="#" className="text-sm text-earth font-light hover:text-ocean transition-colors">Zone Terrestre</a></li>
              <li><a href="#" className="text-sm text-earth font-light hover:text-ocean transition-colors">Zone Marine</a></li>
              <li><a href="#" className="text-sm text-earth font-light hover:text-ocean transition-colors">Données Ouvertes</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-ocean font-medium mb-5">Contact</p>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-earth font-light hover:text-ocean transition-colors">admin@umbrella.sc</a></li>
              <li><a href="#" className="text-sm text-earth font-light hover:text-ocean transition-colors">Victoria, Mahé</a></li>
              <li><a href="#" className="text-sm text-earth font-light hover:text-ocean transition-colors">Seychelles</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="divider mt-14 mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-earth/50 font-light">&copy; 2025 UMBRELLA Seychelles. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[11px] text-earth/50 font-light hover:text-ocean transition-colors">Confidentialité</a>
            <a href="#" className="text-[11px] text-earth/50 font-light hover:text-ocean transition-colors">Conditions</a>
            <a href="#" className="text-[11px] text-earth/50 font-light hover:text-ocean transition-colors">Accessibilité</a>
          </div>
          <div className="flex items-center gap-2 text-earth/40">
            <Globe size={12} />
            <select className="bg-transparent text-[11px] font-light outline-none cursor-pointer text-earth/50">
              <option>FR</option>
              <option>EN</option>
              <option>CR</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
}
