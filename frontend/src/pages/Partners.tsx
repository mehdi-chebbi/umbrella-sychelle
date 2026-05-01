import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  DollarSign, Globe, Eye, Building2, Landmark, Handshake, MapPin, Leaf,
  TreePine, Fish, Waves, ArrowRight, Shield,
} from 'lucide-react';

/* ─── Reveal wrapper ─── */
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(node); } },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${isVisible ? 'visible' : ''} ${delay ? `reveal-delay-${delay}` : ''} ${className}`}>
      {children}
    </div>
  );
}

/* ─── Types ─── */
type Category = 'all' | 'principal' | 'national';

/* ─── Data ─── */
const categories: { key: Category; label: string }[] = [
  { key: 'all', label: 'Tous' },
  { key: 'principal', label: 'Internationaux' },
  { key: 'national', label: 'Nationaux' },
];

const mainPartners = [
  {
    icon: DollarSign,
    name: 'FEM',
    fullName: "Fonds pour l'Environnement Mondial",
    role: 'Financement',
    description:
      "Le FEM finance les projets de protection de la biodiversité dans les pays en développement. Il soutient le programme UMBRELLA à travers plusieurs cycles de financement.",
    category: 'principal' as Category,
  },
  {
    icon: Globe,
    name: 'PNUE',
    fullName: "Programme des Nations Unies pour l'Environnement",
    role: 'Mise en œuvre',
    description:
      "Le PNUE est l'agence d'exécution du projet, responsable de la coordination globale, du suivi technique et du rapportage auprès des instances internationales.",
    category: 'principal' as Category,
  },
  {
    icon: Eye,
    name: 'CNULCD',
    fullName: 'Convention des Nations Unies sur la Lutte contre la Désertification',
    role: 'Cadre conventionnel',
    description:
      "La CNULCD fournit le cadre international pour les activités de suivi de la dégradation des terres et la promotion de la neutralité en matière de dégradation des terres (NDT).",
    category: 'principal' as Category,
  },
  {
    icon: Landmark,
    name: 'Gouvernement SC',
    fullName: 'Gouvernement des Seychelles',
    role: 'Partenaire national',
    description:
      "Le gouvernement des Seychelles est le point focal national, assurant la coordination inter-institutionnelle et l'intégration des objectifs environnementaux dans les politiques publiques.",
    category: 'principal' as Category,
  },
];

const nationalInstitutions = [
  {
    icon: Shield,
    name: 'MEECC',
    fullName: "Ministère de l'Environnement, de l'Énergie et du Changement Climatique",
    description: 'Coordination nationale des politiques environnementales et du changement climatique.',
    category: 'national' as Category,
  },
  {
    icon: Fish,
    name: 'SFA',
    fullName: 'Seychelles Fishing Authority',
    description: 'Gestion durable des ressources halieutiques et surveillance des zones de pêche.',
    category: 'national' as Category,
  },
  {
    icon: TreePine,
    name: 'SNTC',
    fullName: 'Seychelles National Trust Commission',
    description: 'Gestion des parcs nationaux et des réserves naturelles terrestres et marines.',
    category: 'national' as Category,
  },
  {
    icon: Waves,
    name: 'SPC',
    fullName: 'Seychelles Parks Commission',
    description: 'Protection et gestion des aires marines protégées et de la biodiversité marine.',
    category: 'national' as Category,
  },
  {
    icon: Leaf,
    name: 'GOS-UNDP-GEF',
    fullName: 'GOS-UNDP-GEF Programme Coordination Unit',
    description: 'Coordination des projets financés par le FEM et le PNUD aux Seychelles.',
    category: 'national' as Category,
  },
  {
    icon: MapPin,
    name: 'SCMRT',
    fullName: 'Seychelles Centre for Marine Research and Technology',
    description: 'Recherche marine appliquée et développement technologique pour la conservation.',
    category: 'national' as Category,
  },
  {
    icon: Handshake,
    name: 'ISE',
    fullName: 'Island Conservation Society of the Seychelles',
    description: 'ONG dédiée à la conservation des îles et de la biodiversité insulaire.',
    category: 'national' as Category,
  },
  {
    icon: Building2,
    name: 'UNESCO',
    fullName: 'Commission Nationale des Seychelles pour l\'UNESCO',
    description: 'Gestion des sites du patrimoine mondial et des réserves de biosphère.',
    category: 'national' as Category,
  },
];

/* ─── Page ─── */
export default function Partners() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const showMain = activeCategory === 'all' || activeCategory === 'principal';
  const showNational = activeCategory === 'all' || activeCategory === 'national';

  return (
    <div className="bg-ivory text-bark font-sans antialiased paper-texture">
      <Navbar />

      {/* ═══════ TYPOGRAPHIC HERO ═══════ */}
      <section className="relative pt-40 pb-16 md:pt-48 md:pb-20 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-32 left-0 w-[500px] h-[500px] rounded-full bg-sage/[0.04] blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-ocean/[0.03] blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-ocean border border-ocean/30 rounded-full px-4 py-2 bg-ivory/50 backdrop-blur-sm mb-8">
              <span className="w-1.5 h-1.5 bg-ocean rounded-full" />
              Partenaires
            </span>
          </Reveal>

          <Reveal delay={1}>
            <h1 className="max-w-4xl font-serif text-4xl md:text-6xl lg:text-7xl font-light text-bark leading-[1.1] tracking-tight">
              Une collaboration{' '}
              <span className="text-ocean italic">internationale</span>
              {' '}au service de la nature
            </h1>
          </Reveal>

          <Reveal delay={2}>
            <p className="mt-8 max-w-2xl text-base md:text-lg text-earth font-light leading-relaxed">
              Le programme UMBRELLA réunit des institutions internationales, des agences des Nations Unies et des organisations nationales des Seychelles pour protéger la biodiversité de l&apos;archipel.
            </p>
          </Reveal>

          <Reveal delay={3}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/a-propos"
                className="group flex items-center gap-3 text-sm font-medium text-bark border border-wheat px-8 py-4 rounded-full hover:border-sage hover:text-ocean hover:-translate-y-0.5 transition-all duration-300"
              >
                À Propos du Projet
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ FILTER BAR ═══════ */}
      <section className="border-b border-wheat/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 py-8">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-ocean mb-3">Partenaires</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-bark tracking-tight">
                Les Acteurs du Projet
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.15em] border rounded-full transition-all duration-300 ${
                    activeCategory === cat.key
                      ? 'bg-ocean text-ivory border-ocean'
                      : 'border-wheat text-bark/60 hover:border-ocean/50 hover:text-ocean'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ MAIN PARTNERS ═══════ */}
      {showMain && (
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
            {activeCategory === 'all' && (
              <Reveal className="mb-14">
                <span className="inline-block text-[10px] font-medium uppercase tracking-[0.3em] text-ocean mb-4">Partenaires Internationaux</span>
                <p className="text-earth font-light text-base md:text-lg max-w-xl leading-relaxed">
                  Les institutions internationales qui financent et pilotent le programme à l&apos;échelle mondiale.
                </p>
              </Reveal>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mainPartners.map((partner, i) => {
                const Icon = partner.icon;
                return (
                  <Reveal key={partner.name} delay={Math.min(i + 1, 4)}>
                    <div className="group p-8 rounded-2xl border border-wheat/50 bg-cream/30 hover:bg-cream hover:border-sage/30 transition-all duration-500 h-full">
                      <div className="w-14 h-14 rounded-2xl bg-ocean/[0.07] border border-ocean/10 flex items-center justify-center mb-6 group-hover:bg-ocean/10 group-hover:border-ocean/20 transition-all duration-500">
                        <Icon size={26} className="text-ocean" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-serif text-xl font-medium text-bark mb-1">{partner.name}</h3>
                      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-ocean/70 mb-4">{partner.role}</p>
                      <p className="text-[12px] text-earth/70 mb-3 leading-relaxed">{partner.fullName}</p>
                      <p className="text-sm font-light leading-relaxed text-earth">{partner.description}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════ NATIONAL INSTITUTIONS ═══════ */}
      {showNational && (
        <section className="py-20 md:py-28 bg-cream">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
            {activeCategory === 'all' && (
              <Reveal className="mb-14">
                <span className="inline-block text-[10px] font-medium uppercase tracking-[0.3em] text-ocean mb-4">Institutions Nationales</span>
                <p className="text-earth font-light text-base md:text-lg max-w-xl leading-relaxed">
                  Les organisations seychelloises qui mettent en œuvre le programme sur le terrain.
                </p>
              </Reveal>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {nationalInstitutions.map((inst, i) => {
                const Icon = inst.icon;
                return (
                  <Reveal key={inst.name} delay={Math.min(i + 1, 4)}>
                    <div className="group p-8 rounded-2xl border border-wheat/50 bg-ivory/50 hover:bg-ivory hover:border-sage/30 transition-all duration-500 h-full">
                      <div className="w-14 h-14 rounded-2xl bg-sage/[0.07] border border-sage/10 flex items-center justify-center mb-6 group-hover:bg-sage/10 group-hover:border-sage/20 transition-all duration-500">
                        <Icon size={26} className="text-sage" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-sm font-medium text-bark mb-1">{inst.name}</h3>
                      <p className="text-[11px] text-earth/70 mb-3 leading-relaxed">{inst.fullName}</p>
                      <p className="text-sm font-light leading-relaxed text-earth">{inst.description}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════ PARTNERSHIP MODEL ═══════ */}
      {activeCategory === 'all' && (
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
            <Reveal className="text-center mb-16">
              <span className="inline-block text-[10px] font-medium uppercase tracking-[0.3em] text-ocean mb-6">Modèle de Partenariat</span>
              <h2 className="font-serif text-3xl md:text-5xl font-light text-bark leading-[1.15] tracking-tight max-w-3xl mx-auto">
                De la coordination <br /><span className="italic text-ocean">internationale</span> à l&apos;action locale
              </h2>
            </Reveal>

            <Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {[
                  { level: 'Niveau International', items: ['FEM — Financement', 'PNUE — Exécution', 'CNULCD — Cadre'], color: 'ocean' },
                  { level: 'Niveau Régional', items: ['Coordination régionale', 'Partage de données', 'Formation technique'], color: 'sage' },
                  { level: 'Niveau National', items: ['Ministères', 'Institutions de recherche', 'ONG locales'], color: 'reef' },
                ].map((tier) => (
                  <div key={tier.level} className="p-8 rounded-2xl border border-wheat/50 bg-cream/30 text-center">
                    <div className={`w-3 h-3 rounded-full bg-${tier.color} mx-auto mb-6`} />
                    <h3 className="font-serif text-lg text-bark mb-6">{tier.level}</h3>
                    <ul className="space-y-3">
                      {tier.items.map((item) => (
                        <li key={item} className="text-sm text-earth font-light">{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
