import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Eye, Shield, BookOpen, ArrowRight, TreePine, Waves, Fish,
  BarChart3, FlaskConical, Users, Globe2, Compass, HeartHandshake,
  Landmark, Handshake, MapPin, Leaf,
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

/* ─── Data ─── */
const missionPillars = [
  {
    icon: Eye,
    title: 'Surveillance Environnementale',
    description: 'Collecte et analyse continue des données environnementales à travers l\'archipel. Des capteurs terrestres et marins permettent de suivre en temps réel l\'état de nos écosystèmes uniques — récifs coralliens, forêts tropicales, mangroves et zones côtières.',
  },
  {
    icon: Shield,
    title: 'Conservation & Restauration',
    description: 'Des programmes actifs de protection et de restauration des écosystèmes marins, côtiers et terrestres. De la restauration corallienne au reboisement des mangroves, chaque action vise à préserver le patrimoine naturel des Seychelles pour les générations futures.',
  },
  {
    icon: BookOpen,
    title: 'Éducation & Sensibilisation',
    description: 'Formation des communautés locales et des jeunes générations aux enjeux environnementaux. Des ateliers pédagogiques, des programmes scolaires et des campagnes de sensibilisation pour ancrer durablement la culture du développement durable dans la société seychelloise.',
  },
];

const keyFigures = [
  { value: '115', label: 'Îles de l\'archipel', icon: Waves },
  { value: '50%', label: 'Territoire protégé', icon: Shield },
  { value: '2 500+', label: 'Espèces endémiques', icon: TreePine },
  { value: '45', label: 'Espèces prioritaires', icon: Fish },
];

const approachSteps = [
  {
    num: '01',
    icon: Compass,
    title: 'Évaluation des Écosystèmes',
    desc: 'Inventaires biologiques exhaustifs et cartographie des habitats naturels sur l\'ensemble des îles de l\'archipel. Identification des zones vulnérables et des priorités de conservation.',
  },
  {
    num: '02',
    icon: FlaskConical,
    title: 'Collecte de Données',
    desc: 'Acquisition systématique de données environnementales via des protocoles scientifiques rigoureux. Utilisation de technologies modernes : drones, capteurs IoT, satellites et analyses en laboratoire.',
  },
  {
    num: '03',
    icon: BarChart3,
    title: 'Analyse & Modélisation',
    desc: 'Traitement statistique avancé et modélisation prédictive des tendances environnementales. Systèmes d\'information géographique (SIG) pour la visualisation spatiale des données.',
  },
  {
    num: '04',
    icon: Users,
    title: 'Action Communautaire',
    desc: 'Mise en œuvre de programmes de conservation avec les communautés locales. Formation des pêcheurs, des agriculteurs et des jeunes aux pratiques durables et respectueuses de l\'environnement.',
  },
  {
    num: '05',
    icon: Globe2,
    title: 'Suivi & Partage',
    desc: 'Monitoring à long terme des actions menées et adaptation continue des stratégies. Partage ouvert des données et des résultats avec les partenaires internationaux et la communauté scientifique.',
  },
];

const seychellesContext = [
  {
    title: 'Biodiversité d\'exception',
    text: 'Les Seychelles abritent une biodiversité marine et terrestre parmi les plus riches au monde. Des récifs coralliens préservés aux forêts de coco-de-mer millénaires, chaque île est un écosystème unique.',
  },
  {
    title: 'Menaces croissantes',
    text: 'Le changement climatique, la pollution marine, la surpêche et le développement touristique exercent une pression grandissante sur ces écosystèmes fragiles. La protection urgente est devenue une nécessité.',
  },
  {
    title: 'Engagement international',
    text: 'En tant que signataire de la CDB, de la CNULCD et de la Convention sur le climat, les Seychelles se sont engagées à préserver 30% de leurs eaux territoriales d\'ici 2030.',
  },
];

const methodologyTools = [
  'Télédétection satellitaire',
  'SIG Open Source',
  'Capteurs IoT marins',
  'Drones ecology',
  'Analyses ADN environnemental',
  'Indicateurs biodiversité',
  'Rapportage CNULCD',
];

/* ─── Page ─── */
export default function About() {
  return (
    <div className="bg-ivory text-bark font-sans antialiased paper-texture">
      <Navbar />

      {/* ═══════ TYPOGRAPHIC HERO ═══════ */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-28 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-ocean/[0.03] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-sage/[0.04] blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-ocean border border-ocean/30 rounded-full px-4 py-2 bg-ivory/50 backdrop-blur-sm mb-8">
              <span className="w-1.5 h-1.5 bg-ocean rounded-full" />
              À Propos
            </span>
          </Reveal>

          <Reveal delay={1}>
            <h1 className="max-w-4xl font-serif text-4xl md:text-6xl lg:text-7xl font-light text-bark leading-[1.1] tracking-tight">
              Un projet pour la{' '}
              <span className="text-ocean italic">biodiversité</span>
              {' '}des Seychelles
            </h1>
          </Reveal>

          <Reveal delay={2}>
            <p className="mt-8 max-w-2xl text-base md:text-lg text-earth font-light leading-relaxed">
              UMBRELLA Seychelles est un programme financé par le Fonds pour l&apos;Environnement Mondial (FEM) et mis en œuvre par le Programme des Nations Unies pour l&apos;Environnement (PNUE), dédié à la surveillance et à la protection de la biodiversité unique de l&apos;archipel.
            </p>
          </Reveal>

          <Reveal delay={3}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/partenaires"
                className="group flex items-center gap-3 bg-ocean text-ivory text-sm font-medium px-8 py-4 rounded-full hover:bg-reef hover:-translate-y-0.5 transition-all duration-300 shadow-[0_10px_25px_-5px_rgba(27,107,94,0.3)]"
              >
                Nos Partenaires
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ KEY FIGURES ═══════ */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {keyFigures.map((fig, i) => {
              const Icon = fig.icon;
              return (
                <Reveal key={fig.label} delay={i + 1}>
                  <div className="text-center py-8 border-t border-wheat/50">
                    <Icon size={20} className="text-sage mx-auto mb-4" strokeWidth={1.5} />
                    <p className="font-serif text-4xl md:text-5xl font-light text-ocean">{fig.value}</p>
                    <p className="text-[11px] uppercase tracking-[0.15em] text-earth mt-3 font-medium">{fig.label}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ CONTEXT — SEYCHELLES ═══════ */}
      <section className="py-24 md:py-32 lg:py-40 bg-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <Reveal className="mb-16 md:mb-20">
            <span className="inline-block text-[10px] font-medium uppercase tracking-[0.3em] text-ocean mb-6">Le Contexte</span>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-bark leading-[1.15] tracking-tight max-w-3xl">
              Un archipel <span className="italic text-ocean">unique au monde</span>
            </h2>
          </Reveal>

          <div className="space-y-0">
            {seychellesContext.map((item, i) => (
              <Reveal key={item.title} delay={i + 1}>
                <div className={`py-10 ${i < seychellesContext.length - 1 ? 'border-b border-wheat/50' : ''}`}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
                    <div className="md:col-span-4">
                      <h3 className="font-serif text-2xl text-bark">{item.title}</h3>
                    </div>
                    <div className="md:col-span-8">
                      <p className="text-earth font-light leading-[1.8] text-[15px]">{item.text}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ MISSION ═══════ */}
      <section className="py-24 md:py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <Reveal className="text-center mb-20 md:mb-28">
            <span className="inline-block text-[10px] font-medium uppercase tracking-[0.3em] text-ocean mb-6">Notre Mission</span>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-bark leading-[1.15] tracking-tight max-w-3xl mx-auto">
              Trois piliers pour <br /><span className="italic text-ocean">un objectif commun</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {missionPillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={pillar.title} delay={i + 1} className="group">
                  <div className="p-8 md:p-10 rounded-2xl border border-wheat/50 bg-cream/30 hover:bg-cream hover:border-sage/30 transition-all duration-500 h-full">
                    <div className="w-14 h-14 rounded-2xl bg-ocean/[0.07] border border-ocean/10 flex items-center justify-center mb-8 group-hover:bg-ocean/10 group-hover:border-ocean/20 transition-all duration-500">
                      <Icon size={26} className="text-ocean" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif text-2xl font-medium text-bark mb-4">{pillar.title}</h3>
                    <p className="text-earth font-light leading-[1.8] text-[15px]">{pillar.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ APPROACH / METHODOLOGY ═══════ */}
      <section className="py-24 md:py-32 lg:py-40 bg-bark text-ivory">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <Reveal className="mb-20 md:mb-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <span className="inline-block text-[10px] font-medium uppercase tracking-[0.3em] text-ivory/40 mb-6">Notre Approche</span>
                <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-ivory leading-[1.15] tracking-tight">
                  Méthodologie <br /><span className="italic text-reef">scientifique & participative</span>
                </h2>
              </div>
              <div className="flex items-end">
                <p className="text-ivory/50 font-light text-base md:text-lg leading-[1.85]">
                  Notre approche repose sur des protocoles scientifiques rigoureux combinés à la participation active des communautés locales. Chaque étape du processus est conçue pour garantir la fiabilité des données et l&apos;impact des actions de conservation.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Process Steps */}
          <div className="space-y-0">
            {approachSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.num} delay={i + 1}>
                  <div className={`flex flex-col md:flex-row md:items-start gap-6 md:gap-12 py-8 ${i < approachSteps.length - 1 ? 'border-b border-ivory/10' : ''}`}>
                    <div className="flex items-center gap-4 md:w-48 flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-ocean/20 flex items-center justify-center flex-shrink-0">
                        <span className="font-serif text-lg text-reef font-semibold">{step.num}</span>
                      </div>
                      <Icon size={22} className="text-ivory/40" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-xl text-ivory mb-2">{step.title}</h3>
                      <p className="text-ivory/50 font-light leading-relaxed text-sm">{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Tools */}
          <Reveal className="mt-16">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-ivory/30 mb-6">Outils & Technologies</p>
            <div className="flex flex-wrap gap-3">
              {methodologyTools.map((tool) => (
                <span key={tool} className="px-4 py-2 border border-ivory/15 text-[11px] text-ivory/60 rounded-full hover:bg-ivory/10 hover:border-ivory/30 hover:text-ivory/80 transition-all duration-300 cursor-default">
                  {tool}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-bark leading-[1.15] tracking-tight mb-6">
              Ensemble, protégeons <br /><span className="italic text-ocean">l&apos;archipel</span>
            </h2>
            <p className="text-earth font-light text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10">
              Découvrez nos partenaires et les institutions qui rendent ce projet possible.
            </p>
            <Link
              to="/partenaires"
              className="group inline-flex items-center gap-3 bg-ocean text-ivory text-sm font-medium px-8 py-4 rounded-full hover:bg-reef hover:-translate-y-0.5 transition-all duration-300 shadow-[0_10px_25px_-5px_rgba(27,107,94,0.3)]"
            >
              Découvrir les Partenaires
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
