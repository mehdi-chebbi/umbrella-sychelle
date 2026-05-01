import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Eye, Shield, BookOpen, ArrowRight, ChevronDown, Mouse,
  TreePine, Waves, Fish, BarChart3, FlaskConical, Users,
  Globe2, Compass, HeartHandshake,
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

/* ─── Manifesto line (hero entrance) ─── */
function ManifestoLine({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={ref} className={`manifesto-line ${isVisible ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

/* ─── Data ─── */
const missionPillars = [
  {
    icon: Eye,
    title: 'Surveillance Environnementale',
    description: 'Collecte et analyse continue des données environnementales à travers tout l\'archipel des Seychelles. Des capteurs terrestres et marins nous permettent de suivre en temps réel l\'état de nos écosystèmes uniques.',
  },
  {
    icon: Shield,
    title: 'Conservation & Restauration',
    description: 'Des programmes actifs de protection des écosystèmes marins, côtiers et terrestres. De la restauration corallienne au reboisement des mangroves, chaque action compte pour préserver notre patrimoine naturel.',
  },
  {
    icon: BookOpen,
    title: 'Éducation & Sensibilisation',
    description: 'Former les communautés locales et les jeunes générations aux enjeux environnementaux. Des ateliers, des programmes scolaires et des campagnes de sensibilisation pour ancrer la culture du développement durable.',
  },
];

const initiativeTabs = [
  { key: 'cotier', label: 'Côtier', icon: Waves },
  { key: 'terrestre', label: 'Terrestre', icon: TreePine },
  { key: 'marin', label: 'Marin', icon: Fish },
] as const;

type TabKey = typeof initiativeTabs[number]['key'];

const initiatives: Record<TabKey, { title: string; description: string; image: number }[]> = {
  cotier: [
    { title: 'Suivi des Plages', description: 'Monitoring de l\'érosion côtière et de la qualité des sables blancs de nos plages emblématiques.', image: 3 },
    { title: 'Restauration des Mangroves', description: 'Reboisement et protection des zones de mangroves, véritables nurseries pour la faune marine.', image: 4 },
    { title: 'Qualité de l\'Eau Littorale', description: 'Analyse régulière des eaux côtières pour détecter toute pollution et protéger la biodiversité.', image: 5 },
    { title: 'Gestion Intégrée du Littoral', description: 'Plans de gestion durable des zones côtières alliant développement et préservation.', image: 6 },
  ],
  terrestre: [
    { title: 'Inventaire Forestier', description: 'Cartographie et suivi de la biodiversité forestière endémique, notamment les coco-de-mer et bois de fer.', image: 7 },
    { title: 'Protection des Espèces', description: 'Programmes de sauvegarde des espèces menacées comme le perroquet noir et la tortue géante.', image: 8 },
    { title: 'Corridors Écologiques', description: 'Création et maintien de corridors biologiques pour relier les habitats naturels fragmentés.', image: 9 },
    { title: 'Lutte contre les Invasives', description: 'Éradication des espèces envahissantes qui menacent la flore et la faune endémiques.', image: 10 },
  ],
  marin: [
    { title: 'Suivi des Récifs Coralliens', description: 'Surveillance de l\'état de santé des barrières de corail face au blanchissement et à la pollution.', image: 11 },
    { title: 'Aires Marines Protégées', description: 'Gestion et extension des zones marines protégées pour préserver la richesse de nos eaux.', image: 12 },
    { title: 'Observation des Cétacés', description: 'Suivi des populations de baleines et dauphins dans les eaux seychelloises.', image: 13 },
    { title: 'Pêche Durable', description: 'Accompagnement des communautés de pêcheurs vers des pratiques responsables et respectueuses.', image: 14 },
  ],
};

const approachPillars = [
  { title: 'Recherche Scientifique', desc: 'Protocoles rigoureux et données vérifiables', image: 15 },
  { title: 'Technologies Modernes', desc: 'SIG, drones et capteurs intelligents', image: 16 },
  { title: 'Partenariats Locaux', desc: 'Communautés, institutions et ONG', image: 17 },
  { title: 'Données Ouvertes', desc: 'Transparence totale et partage du savoir', image: 18 },
];

const processSteps = [
  { num: '01', icon: Compass, title: 'Évaluation', desc: 'Analyse initiale des écosystèmes et identification des enjeux' },
  { num: '02', icon: FlaskConical, title: 'Collecte', desc: 'Acquisition des données sur le terrain et en laboratoire' },
  { num: '03', icon: BarChart3, title: 'Analyse', desc: 'Traitement statistique et interprétation des résultats' },
  { num: '04', icon: Users, title: 'Action', desc: 'Mise en œuvre des solutions et programmes de conservation' },
  { num: '05', icon: Globe2, title: 'Suivi', desc: 'Monitoring à long terme et adaptation continue' },
];

const impactStats = [
  { value: '115+', label: 'Îles Suivies' },
  { value: '2M+', label: 'Données Collectées' },
  { value: '45', label: 'Espèces Protégées' },
  { value: '98%', label: 'Couverture Territoire' },
];

/* ─── Page ─── */
export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>('cotier');
  const [heroImgStyle, setHeroImgStyle] = useState<React.CSSProperties>({});

  // Hero parallax
  const handleScroll = useCallback(() => {
    if (window.scrollY < window.innerHeight) {
      setHeroImgStyle({
        transform: `scale(${1 + window.scrollY * 0.0002}) translateY(${window.scrollY * 0.15}px)`,
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="bg-ivory text-bark font-sans antialiased paper-texture">
      <Navbar />

      {/* ═══════ HERO ═══════ */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/seychelles/1.png"
            alt="Côte des Seychelles"
            className="hero-image w-full h-full object-cover"
            style={heroImgStyle}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/80 to-ivory/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-ivory via-transparent to-ivory/30" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-20 md:pt-40 md:pb-28">
          <ManifestoLine className="mb-8">
            <span className="inline-flex items-center gap-2 text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-ocean border border-ocean/30 rounded-full px-4 py-2 bg-ivory/50 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-ocean rounded-full" />
              Projet UMBRELLA — Seychelles
            </span>
          </ManifestoLine>

          <h1 className="max-w-3xl">
            <ManifestoLine>
              <span className="block font-serif text-4xl md:text-6xl lg:text-7xl font-light text-bark leading-[1.1] tracking-tight">
                Protéger la nature
              </span>
            </ManifestoLine>
            <ManifestoLine>
              <span className="block font-serif text-4xl md:text-6xl lg:text-7xl font-light text-bark leading-[1.1] tracking-tight mt-1">
                de l&apos;archipel pour
              </span>
            </ManifestoLine>
            <ManifestoLine>
              <span className="block font-serif text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight mt-1">
                <span className="text-ocean italic">les générations futures.</span>
              </span>
            </ManifestoLine>
          </h1>

          <ManifestoLine className="mt-10 max-w-lg">
            <p className="text-base md:text-lg text-earth font-light leading-relaxed">
              UMBRELLA Seychelles surveille et protège la biodiversité unique de l&apos;archipel. Des forêts tropicales aux récifs coralliens, chaque écosystème compte.
            </p>
          </ManifestoLine>

          <ManifestoLine className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={() => document.getElementById('initiatives')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center gap-3 bg-ocean text-ivory text-sm font-medium px-8 py-4 rounded-full hover:bg-reef hover:-translate-y-0.5 transition-all duration-300 shadow-[0_10px_25px_-5px_rgba(27,107,94,0.3)]"
            >
              Nos Initiatives
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center gap-3 text-sm font-medium text-bark border border-wheat px-8 py-4 rounded-full hover:border-sage hover:text-ocean hover:-translate-y-0.5 transition-all duration-300"
            >
              Notre Mission
              <ChevronDown size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </ManifestoLine>

          <ManifestoLine className="mt-20 hidden md:flex items-center gap-3 text-earth/50">
            <div className="scroll-indicator">
              <Mouse size={18} />
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Découvrir</span>
          </ManifestoLine>
        </div>
      </section>

      {/* ═══════ MISSION ═══════ */}
      <section id="mission" className="py-24 md:py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <Reveal className="text-center mb-20 md:mb-28">
            <span className="inline-block text-[10px] font-medium uppercase tracking-[0.3em] text-ocean mb-6">Notre Mission</span>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-bark leading-[1.15] tracking-tight max-w-3xl mx-auto">
              Surveiller, protéger, restaurer <br /><span className="italic text-ocean">la biodiversité des Seychelles</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {missionPillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={pillar.title} delay={i + 1} className="group text-center md:text-left">
                  <div className="w-16 h-16 rounded-2xl bg-sand/40 border border-wheat/50 flex items-center justify-center mb-8 mx-auto md:mx-0 group-hover:bg-sage/10 group-hover:border-sage/20 transition-all duration-500">
                    <Icon size={28} className="text-sage" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-2xl font-medium text-bark mb-4">{pillar.title}</h3>
                  <p className="text-earth font-light leading-[1.8] text-[15px]">{pillar.description}</p>
                  <div className="mt-6 flex items-center gap-2 text-ocean text-xs font-medium tracking-wide group-hover:gap-3 transition-all">
                    <span>En savoir plus</span>
                    <ArrowRight size={14} />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ INITIATIVES ═══════ */}
      <section id="initiatives" className="py-24 md:py-32 lg:py-40 bg-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <Reveal className="text-center mb-12">
            <span className="inline-block text-[10px] font-medium uppercase tracking-[0.3em] text-ocean mb-6">Nos Initiatives</span>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-bark leading-[1.15] tracking-tight">
              Des actions concrètes pour <br /><span className="italic text-ocean">chaque écosystème</span>
            </h2>
            <p className="mt-6 text-earth font-light text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Côtier, terrestre ou marin — chaque milieu naturel de l&apos;archipel bénéficie de programmes dédiés de surveillance et de conservation.
            </p>
          </Reveal>

          {/* Tabs */}
          <Reveal className="flex justify-center gap-8 md:gap-12 mb-14 border-b border-wheat/50 pb-0">
            {initiativeTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`scenario-tab flex items-center gap-1.5 text-xs md:text-sm font-medium uppercase tracking-[0.15em] border-b-2 pb-4 transition-all duration-300 hover:text-bark ${
                    activeTab === tab.key ? 'active text-ocean' : 'text-bark/40 border-transparent'
                  }`}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              );
            })}
          </Reveal>

          {/* Initiative Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {initiatives[activeTab].map((item, idx) => (
              <Reveal key={`${activeTab}-${item.title}`} delay={idx + 1}>
                <div className="initiative-card group cursor-pointer">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-sand/30 mb-4">
                    <img
                      src={`/images/seychelles/${item.image}.png`}
                      alt={item.title}
                      className="initiative-img w-full h-full object-cover transition-transform duration-700"
                    />
                  </div>
                  <h4 className="initiative-title font-serif text-lg text-bark transition-colors duration-300 mb-2">{item.title}</h4>
                  <p className="text-earth text-sm font-light leading-relaxed">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-14">
            <Link
              to="/partenaires"
              className="group inline-flex items-center gap-3 text-sm font-medium text-ocean border-b border-ocean/30 pb-1 hover:border-ocean transition-all duration-300"
            >
              Voir tous les partenaires
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ═══════ APPROACH ═══════ */}
      <section id="approach" className="py-24 md:py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <Reveal className="mb-20 md:mb-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <span className="inline-block text-[10px] font-medium uppercase tracking-[0.3em] text-ocean mb-6">Notre Approche</span>
                <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-bark leading-[1.15] tracking-tight">
                  Une méthodologie <br /><span className="italic text-ocean">scientifique</span><br />et participative
                </h2>
              </div>
              <div>
                <p className="text-earth font-light text-base md:text-lg leading-[1.85]">
                  Notre approche combine recherche scientifique rigoureuse et participation des communautés locales. Chaque donnée collectée alimente un système d&apos;information géographique qui guide les décisions de conservation à l&apos;échelle nationale.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Approach Pillars */}
          <Reveal className="mb-20">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-ocean mb-10">Nos Piliers</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {approachPillars.map((pillar) => (
                <div key={pillar.title} className="pillar-card group cursor-pointer rounded-2xl overflow-hidden relative aspect-square">
                  <img
                    src={`/images/seychelles/${pillar.image}.png`}
                    alt={pillar.title}
                    className="pillar-img w-full h-full object-cover transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bark/70 via-bark/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="pillar-label text-ivory text-xs font-medium uppercase tracking-[0.15em] transition-all duration-500">{pillar.title}</p>
                    <p className="text-ivory/70 text-[11px] mt-1 font-light">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Process Steps */}
          <Reveal>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-ocean mb-10">Notre Processus</p>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border border-wheat/50 rounded-2xl overflow-hidden bg-cream/50">
              {processSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.num}
                    className={`p-8 md:p-10 text-center group hover:bg-sand/20 transition-colors duration-500 ${
                      i < 4 ? 'border-b md:border-b-0 md:border-r border-wheat/50' : ''
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-ocean/10 flex items-center justify-center mx-auto mb-5">
                      <span className="font-serif text-lg text-ocean font-semibold">{step.num}</span>
                    </div>
                    <Icon size={24} className="text-sage mb-3 mx-auto" strokeWidth={1.5} />
                    <h4 className="font-serif text-lg text-bark mb-2">{step.title}</h4>
                    <p className="text-earth text-xs font-light leading-relaxed">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* Impact Stats */}
          <Reveal className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {impactStats.map((stat) => (
              <div key={stat.label} className="text-center py-8 border-t border-wheat/50">
                <p className="font-serif text-4xl md:text-5xl font-light text-ocean">{stat.value}</p>
                <p className="text-[11px] uppercase tracking-[0.15em] text-earth mt-3 font-medium">{stat.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ═══════ EDITORIAL BREAK ═══════ */}
      <section className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        <img src="/images/seychelles/2.png" alt="Vallée de Mai, Praslin" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-bark/30" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <p className="text-ivory/70 text-[10px] uppercase tracking-[0.3em] font-medium mb-6">Patrimoine Mondial — UNESCO</p>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-ivory leading-[1.1] tracking-tight italic max-w-3xl">
              La Vallée de Mai, <br />joyau vivant de Praslin
            </h2>
            <p className="mt-8 text-ivory/70 font-light text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Sanctuaire du célèbre coco-de-mer et de nombreuses espèces endémiques, ce site classé au patrimoine mondial de l&apos;UNESCO illustre la richesse naturelle que nous nous engageons à protéger.
            </p>
            <Link
              to="/a-propos"
              className="group inline-flex items-center gap-3 mt-10 bg-ivory/15 backdrop-blur-sm text-ivory text-sm font-medium px-8 py-4 rounded-full border border-ivory/25 hover:bg-ivory/25 hover:-translate-y-0.5 transition-all duration-300"
            >
              En savoir plus
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
