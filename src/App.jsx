import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu, X, Dumbbell, Clock, Users, Smartphone, MapPin, Star,
  ChevronDown, ChevronLeft, ChevronRight, Check, Activity,
  Waves, ShieldCheck, Zap, Instagram, Facebook, Youtube, ArrowRight, ArrowUpRight,
  Quote, Heart, ClipboardList, CalendarCheck, PlayCircle, Maximize2,
  Flame, Settings, Target, Home, BarChart3, User, Wifi, BatteryFull, Play
} from "lucide-react";
import heroBgImg from "./assets/img/hero-bg.jpg";

/* ============================================================
   PALETA — para trocar as cores do site inteiro, edite só aqui.
   Tudo no CSS abaixo usa var(--ink), var(--accent) etc,
   então mudar estes 9 valores re-skina o site inteiro.
   Paleta atual: propositalmente suave (tons dessaturados),
   nada de cor "chapada" — os blocos usam gradiente + transparência.
   ============================================================ */
const THEME = {
  ink: "#232527",        // fundo escuro principal (charcoal quente, não preto puro)
  inkSoft: "#2C2E30",    // fundo escuro secundário (cards no dark)
  paper: "#F1EEE9",      // fundo claro principal (off-white quente e suave)
  paperSoft: "#FAF8F5",  // fundo claro secundário
  accent: "#DD744F",     // cor de ação (coral terroso, suave — não neon)
  accentSoft: "#EBA085", // variação clara do accent (gradientes/hover)
  cyan: "#7FB8AC",       // dados / prova social (verde-azulado empoeirado)
  gold: "#D6AA6C",       // plano premium (dourado fosco)
  muted: "#96908A",      // texto secundário
};

/* ------------ fotos reais (Pexels, licença livre p/ uso comercial) ------------ */
const IMG = {
  heroBg: heroBgImg,
  sobre: "https://images.pexels.com/photos/17211446/pexels-photo-17211446/free-photo-of-an-empty-gym.jpeg?w=1200&h=1400&dpr=1",
  musculacao: "https://images.pexels.com/photos/37352354/pexels-photo-37352354/free-photo-of-modern-gym-interior-with-fitness-equipment.jpeg?auto=compress&cs=tinysrgb&w=800",
  funcional: "https://images.pexels.com/photos/27195989/pexels-photo-27195989/free-photo-of-a-gym-room-with-exercise-equipment-and-a-ceiling-light.jpeg?auto=compress&cs=tinysrgb&w=800",
  natacao: "https://images.pexels.com/photos/16318479/pexels-photo-16318479/free-photo-of-man-while-swimming.jpeg?w=800&h=600&dpr=1",
  lutas: "https://images.pexels.com/photos/6699113/pexels-photo-6699113.jpeg?auto=compress&cs=tinysrgb&w=800",
  pilates: "https://images.pexels.com/photos/6111580/pexels-photo-6111580.jpeg?cs=tinysrgb&w=800",
  yoga: "https://images.pexels.com/photos/3822220/pexels-photo-3822220.jpeg?auto=compress&cs=tinysrgb&w=800",
  testi1: "https://images.pexels.com/photos/6111629/pexels-photo-6111629.jpeg?cs=tinysrgb&w=700",
  testi2: "https://images.pexels.com/photos/6111626/pexels-photo-6111626.jpeg?auto=compress&w=700&h=700&dpr=1",
  testi3: "https://images.pexels.com/photos/8436561/pexels-photo-8436561.jpeg?cs=tinysrgb&w=700",
  testi4: "https://images.pexels.com/photos/39190408/pexels-photo-39190408/free-photo-of-group-of-diverse-adults-holding-yoga-mats.jpeg?cs=tinysrgb&w=700",
  gal1: "https://images.pexels.com/photos/37352353/pexels-photo-37352353/free-photo-of-modern-home-gym-with-functional-design-elements.jpeg?auto=compress&cs=tinysrgb&w=700",
  gal2: "https://images.pexels.com/photos/6012017/pexels-photo-6012017.jpeg?cs=tinysrgb&w=700",
  gal3: "https://images.pexels.com/photos/6111621/pexels-photo-6111621.jpeg?cs=tinysrgb&w=700",
  gal4: "https://images.pexels.com/photos/6111627/pexels-photo-6111627.jpeg?cs=tinysrgb&w=700",
  gal5: "https://images.pexels.com/photos/16318441/pexels-photo-16318441/free-photo-of-woman-in-swim-cap-swimming.jpeg?cs=tinysrgb&w=700",
  gal6: "https://images.pexels.com/photos/27195989/pexels-photo-27195989/free-photo-of-a-gym-room-with-exercise-equipment-and-a-ceiling-light.jpeg?auto=compress&cs=tinysrgb&w=700",
};

const NAV_LINKS = [
  { label: "Sobre", href: "#sobre" },
  { label: "Estrutura", href: "#estrutura" },
  { label: "Modalidades", href: "#modalidades" },
  { label: "Planos", href: "#planos" },
  { label: "Unidades", href: "#unidades" },
];

const WHATSAPP_URL = `https://wa.me/5521970089039?text=${encodeURIComponent("Olá! Quero me matricular na Academia.")}`;

const FEATURES = [
  { icon: Clock, title: "Aberta 24 horas", text: "Treine às 5h ou à 1h da manhã. A catraca não fecha nunca." },
  { icon: Users, title: "Professores em quadra", text: "Time de educação física presente em todos os horários de pico, sem hora marcada." },
  { icon: Smartphone, title: "App de treino", text: "Sua ficha, sua evolução e o check-in da unidade direto no celular." },
  { icon: ShieldCheck, title: "Sem fidelidade longa", text: "Contrato mensal de verdade. Cancela quando quiser, sem multa escondida." },
  { icon: Waves, title: "Piscina aquecida", text: "Hidro, natação livre e aula de raiz nas unidades com estrutura aquática." },
  { icon: Zap, title: "Área funcional", text: "Cross training, kettlebell e treino em circuito num espaço só pra isso." },
];

const PROGRAMS = [
  {
    img: IMG.musculacao, tag: "Musculação", title: "Sala de peso livre e máquinas",
    text: "Estrutura completa para hipertrofia, força e reabilitação.",
    desc: "Sala ampla com peso livre, máquinas de última geração e área dedicada a treinos de reabilitação. Professores de educação física acompanham a sala em todos os horários de pico, sem hora marcada, para ajustar carga e corrigir execução.",
    highlights: ["Equipamentos de última geração", "Professor em quadra o dia todo", "Ficha de treino no app"],
  },
  {
    img: IMG.funcional, tag: "Cross Training", title: "Treino funcional em grupo",
    text: "Aulas de alta intensidade guiadas por coach, em turmas pequenas.",
    desc: "Aulas de alta intensidade em turmas pequenas, com kettlebell, cordas, cross training e treino em circuito. Ideal para quem quer resultado rápido e treinar em grupo sem perder o acompanhamento individual do coach.",
    highlights: ["Turmas reduzidas", "Coach do início ao fim da aula", "Variação de treino toda semana"],
  },
  {
    img: IMG.natacao, tag: "Natação", title: "Piscina semi-olímpica",
    text: "Aulas para todas as idades, do zero ao nado competitivo.",
    desc: "Piscina semi-olímpica aquecida, com aulas para todas as idades — do primeiro contato com a água até o nado competitivo. Turmas separadas por nível, com professor especializado na borda em toda aula.",
    highlights: ["Piscina aquecida o ano todo", "Turmas por nível e idade", "Aula experimental gratuita"],
  },
  {
    img: IMG.lutas, tag: "Lutas", title: "Muay thai e jiu-jitsu",
    text: "Tatame próprio com faixas pretas ministrando as aulas.",
    desc: "Tatame próprio para muay thai e jiu-jitsu, com faixas pretas ministrando as aulas para iniciantes e avançados. Equipamento de proteção disponível na unidade para quem está começando.",
    highlights: ["Faixas pretas como instrutores", "Turmas de iniciante e avançado", "Equipamento de proteção disponível"],
  },
  {
    img: IMG.pilates, tag: "Pilates", title: "Pilates com equipamento",
    text: "Reformer e solo, com avaliação postural incluída no plano.",
    desc: "Aulas de pilates no reformer e no solo, com avaliação postural incluída no plano antes da primeira aula. Turmas pequenas para garantir correção individual de postura e respiração.",
    highlights: ["Reformer e solo", "Avaliação postural incluída", "Turmas reduzidas"],
  },
  {
    img: IMG.yoga, tag: "Mente e corpo", title: "Yoga e mobilidade",
    text: "Sala climatizada dedicada a alongamento, yoga e recuperação.",
    desc: "Sala climatizada dedicada a yoga, alongamento e mobilidade, pensada para recuperação entre os treinos de força. Aulas guiadas em ritmo tranquilo, abertas para qualquer nível de experiência.",
    highlights: ["Sala climatizada", "Foco em recuperação e mobilidade", "Aberto a qualquer nível"],
  },
];

const STEPS = [
  { icon: ClipboardList, title: "Escolha seu plano", text: "Base, Plus ou Black — sem taxa de matrícula e sem fidelidade de 12 meses." },
  { icon: CalendarCheck, title: "Agende a avaliação", text: "Um professor mede seu ponto de partida antes do primeiro treino." },
  { icon: PlayCircle, title: "Comece a treinar", text: "Acesso liberado na hora, direto pelo app, em qualquer unidade do plano." },
];

const PLANS = [
  {
    name: "Base",
    tagline: "Pra quem quer só treinar",
    priceMonth: 79.9,
    priceYear: 64.9,
    features: ["Acesso a 1 unidade", "Musculação e cardio", "App de treino", "Avaliação física trimestral"],
    highlight: false,
  },
  {
    name: "Plus",
    tagline: "O mais escolhido daqui",
    priceMonth: 119.9,
    priceYear: 94.9,
    features: ["Acesso a todas as unidades", "Aulas coletivas ilimitadas", "App de treino", "Avaliação física mensal", "1 diária para convidado/mês"],
    highlight: true,
  },
  {
    name: "Black",
    tagline: "Sem limite de horário ou estrutura",
    priceMonth: 169.9,
    priceYear: 139.9,
    features: ["Tudo do plano Plus", "Piscina e área de lutas", "2 sessões de personal/mês", "Nutricionista trimestral", "Convidados ilimitados"],
    highlight: false,
    premium: true,
  },
];

const TESTIMONIALS = [
  { name: "Renata Alves", role: "aluna há 2 anos", img: IMG.testi1, quote: "Troquei três academias até parar aqui. É a primeira vez que consigo manter rotina porque sempre tem professor por perto quando preciso ajustar a carga." },
  { name: "Diego Martins", role: "aluno há 8 meses", img: IMG.testi2, quote: "Entrei sem nunca ter pisado numa academia. Hoje treino sozinho com confiança e o app me ajuda a não perder o fio da meada." },
  { name: "Camila Torres", role: "aluna há 1 ano", img: IMG.testi3, quote: "A piscina aquecida foi o motivo de eu entrar, mas acabei virando fã do pilates. Consigo treinar antes do trabalho, às 5h30, tranquilamente." },
  { name: "Bruno Ferreira", role: "aluno há 3 anos", img: IMG.testi4, quote: "Já morei em três cidades diferentes e sempre teve unidade perto. O plano Black paga a si mesmo só com o personal incluso." },
];

const FAQS = [
  { q: "Tem taxa de matrícula?", a: "Não. O valor mostrado é exatamente o que você paga todo mês, sem taxa de adesão nem de cancelamento." },
  { q: "Posso congelar o plano?", a: "Sim, todos os planos permitem congelamento de até 30 dias por ano, direto pelo app, sem precisar ir até a unidade." },
  { q: "Preciso de atestado médico?", a: "Recomendamos, mas não exigimos para o cadastro. Times de primeiros socorros estão presentes em todas as unidades." },
  { q: "Dá pra treinar em qualquer unidade?", a: "Nos planos Plus e Black sim, acesso livre a qualquer unidade da rede. No plano Base o acesso é fixo em uma unidade escolhida na matrícula." },
  { q: "Tem aula experimental?", a: "Sim, a primeira semana de qualquer modalidade coletiva é gratuita para quem está avaliando a matrícula." },
];

const GALLERY = [
  { img: IMG.gal1, title: "Musculação ao amanhecer", text: "Sala de peso livre já movimentada nas primeiras horas do dia." },
  { img: IMG.gal2, title: "Piscina aberta até tarde", text: "Mergulho pós-treino disponível até o fechamento da unidade." },
  { img: IMG.gal3, title: "Alongamento e mobilidade", text: "Preparação antes do treino de força pesado." },
  { img: IMG.gal4, title: "Recuperação pós-treino", text: "Alongamento guiado para fechar a sessão do dia." },
  { img: IMG.gal5, title: "Natação livre", text: "Piscina aquecida disponível em qualquer horário." },
  { img: IMG.gal6, title: "Estrutura sempre em dia", text: "Equipamentos revisados e testados toda semana." },
];

const APP_WEEK = [
  { d: "Seg", done: true },
  { d: "Ter", done: true },
  { d: "Qua", done: true },
  { d: "Qui", done: true },
  { d: "Sex", today: true },
  { d: "Sáb", done: false },
  { d: "Dom", done: false },
];

/* ---------------- helpers ---------------- */

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function useCountUp(target, decimals = 0, active = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf;
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);
  return value.toFixed(decimals);
}

const fmtMoney = (n) => n.toFixed(2).replace(".", ",");

const NAV_OFFSET = 90;

function scrollToHash(hash) {
  const el = document.querySelector(hash);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;
  window.scrollTo({ top: y, behavior: "smooth" });
}

/* ---------------- small reusable pieces ---------------- */

function SectionHeader({ eyebrow, title, text, light }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`section-head ${visible ? "is-visible" : ""} ${light ? "on-light" : "on-dark"}`}>
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <h2 className="section-title">{title}</h2>
      {text && <p className="section-text">{text}</p>}
    </div>
  );
}

function FeatureCard({ icon: Icon, title, text }) {
  return (
    <motion.div
      className="feature-card"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
    >
      <div className="feature-icon"><Icon size={22} strokeWidth={1.75} /></div>
      <h3>{title}</h3>
      <p>{text}</p>
    </motion.div>
  );
}

function ProgramCard({ program, onOpen }) {
  const { img, tag, title, text } = program;
  return (
    <div className="program-card" onClick={() => onOpen(program)}>
      <img src={img} alt={title} loading="lazy" className="program-card-img" />
      <div className="program-card-scrim" />
      <span className="program-tag">{tag}</span>
      <div className="program-card-content">
        <h3>{title}</h3>
        <p className="program-card-text">{text}</p>
      </div>
      <button
        type="button"
        className="program-card-cta"
        onClick={(e) => { e.stopPropagation(); onOpen(program); }}
        aria-label={`Ver detalhes de ${title}`}
      >
        <ArrowUpRight size={20} strokeWidth={2.25} />
      </button>
    </div>
  );
}

function ProgramModal({ program, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!program) return null;

  return (
    <motion.div
      className="modal-backdrop"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={program.title}
        initial={{ opacity: 0, y: 28, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.96 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.22 }}
      >
        <button className="modal-close" onClick={onClose} aria-label="Fechar">
          <X size={20} />
        </button>
        <div className="modal-media">
          <img src={program.img} alt={program.title} />
          <span className="program-tag">{program.tag}</span>
        </div>
        <div className="modal-body">
          <h3>{program.title}</h3>
          <p className="modal-desc">{program.desc}</p>
          <ul className="modal-highlights">
            {program.highlights.map((h) => (
              <li key={h}><Check size={16} strokeWidth={2.5} /><span>{h}</span></li>
            ))}
          </ul>
          <button className="btn btn-accent modal-cta" onClick={onClose}>
            Quero começar <ArrowRight size={16} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function GalleryCard({ item, index, onOpen }) {
  const { img, title, text } = item;
  return (
    <div className="gallery-card" onClick={() => onOpen(index)}>
      <img src={img} alt={title} loading="lazy" className="gallery-card-img" />
      <div className="gallery-card-scrim" />
      <div className="gallery-card-content">
        <h3>{title}</h3>
        <p className="gallery-card-text">{text}</p>
      </div>
      <button
        type="button"
        className="gallery-card-cta"
        onClick={(e) => { e.stopPropagation(); onOpen(index); }}
        aria-label={`Ampliar foto: ${title}`}
      >
        <Maximize2 size={18} strokeWidth={2.25} />
      </button>
    </div>
  );
}

function GalleryLightbox({ items, index, onClose, onPrev, onNext }) {
  const isOpen = index !== null;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, onPrev, onNext]);

  const item = isOpen ? items[index] : null;

  return (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          className="modal-backdrop"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="lightbox-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={item.title}
            initial={{ opacity: 0, y: 28, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.22 }}
          >
            <button className="modal-close" onClick={onClose} aria-label="Fechar">
              <X size={20} />
            </button>
            <button className="lightbox-arrow lightbox-arrow-prev" onClick={onPrev} aria-label="Foto anterior">
              <ChevronLeft size={22} />
            </button>
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={index}
                src={item.img}
                alt={item.title}
                className="lightbox-img"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
              />
            </AnimatePresence>
            <button className="lightbox-arrow lightbox-arrow-next" onClick={onNext} aria-label="Próxima foto">
              <ChevronRight size={22} />
            </button>
            <div className="lightbox-caption">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StepCard({ icon: Icon, title, text, index }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`step-card ${visible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${(index - 1) * 0.12}s` }}
    >
      <span className="step-ghost-number">{String(index).padStart(2, "0")}</span>
      <div className="step-icon-wrap">
        <span className="step-icon-ring" />
        <span className="step-icon-ring step-icon-ring-delay" />
        <div className="step-icon"><Icon size={22} strokeWidth={1.75} /></div>
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function PlanCard({ plan, billing }) {
  const price = billing === "anual" ? plan.priceYear : plan.priceMonth;
  const baseScale = plan.highlight ? 1.045 : 1;
  return (
    <motion.div
      className={`plan-card ${plan.highlight ? "is-highlight" : ""} ${plan.premium ? "is-premium" : ""}`}
      animate={{ scale: baseScale }}
      whileHover={{ scale: baseScale + 0.02, y: -8 }}
      whileTap={{ scale: baseScale - 0.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {plan.highlight && <span className="plan-badge">Mais escolhido</span>}
      {plan.premium && (
        <span className="plan-badge is-gold">
          <Star size={12} fill="currentColor" strokeWidth={0} /> Sem limites
        </span>
      )}
      <h3 className="plan-name">{plan.name}</h3>
      <p className="plan-tagline">{plan.tagline}</p>
      <div className="plan-price">
        <span className="plan-currency">R$</span>
        <span className="plan-amount">{fmtMoney(price)}</span>
        <span className="plan-period">/mês</span>
      </div>
      {billing === "anual" && <p className="plan-note">cobrado anualmente</p>}
      <ul className="plan-features">
        {plan.features.map((f) => (
          <li key={f}><Check size={16} strokeWidth={2.5} /><span>{f}</span></li>
        ))}
      </ul>
      <button className={`btn ${plan.highlight ? "btn-accent" : plan.premium ? "btn-outline-gold" : "btn-ghost-light"} plan-cta`}>
        Quero esse plano <ArrowRight size={16} />
      </button>
    </motion.div>
  );
}

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className={`faq-item ${isOpen ? "is-open" : ""}`}>
      <button className="faq-question" onClick={onToggle} aria-expanded={isOpen}>
        <span>{item.q}</span>
        <motion.span
          className="faq-chevron"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="faq-answer-wrap"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { type: "spring", duration: 0.55, bounce: 0.22 },
              opacity: { duration: 0.25 },
            }}
          >
            <p className="faq-answer">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- main app ---------------- */

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [billing, setBilling] = useState("mensal");
  const [testiIndex, setTestiIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [heroReady, setHeroReady] = useState(false);
  const [activeProgram, setActiveProgram] = useState(null);
  const [programSlide, setProgramSlide] = useState(0);
  const programsTrackRef = useRef(null);
  const programsPausedRef = useRef(false);
  const [gallerySlide, setGallerySlide] = useState(0);
  const [galleryLightbox, setGalleryLightbox] = useState(null);
  const galleryTrackRef = useRef(null);
  const galleryPausedRef = useRef(false);
  const [statsRef, statsVisible] = useReveal();
  const [sobreRef, sobreVisible] = useReveal();

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setTestiIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const nextTesti = useCallback(() => setTestiIndex((i) => (i + 1) % TESTIMONIALS.length), []);
  const prevTesti = useCallback(() => setTestiIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length), []);

  const handleAnchorClick = useCallback((e, href) => {
    if (!href.startsWith("#") || href === "#") return;
    e.preventDefault();
    setMobileOpen(false);
    scrollToHash(href);
  }, []);

  const scrollTrackTo = (trackRef, i) => {
    const track = trackRef.current;
    const card = track?.children[i];
    if (!track || !card) return;
    const offset = card.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
    track.scrollTo({ left: offset, behavior: "smooth" });
  };

  const goToProgramSlide = useCallback((i) => {
    setProgramSlide(i);
    scrollTrackTo(programsTrackRef, i);
  }, []);
  const stepProgramSlide = useCallback((delta) => {
    setProgramSlide((i) => {
      const next = (i + delta + PROGRAMS.length) % PROGRAMS.length;
      scrollTrackTo(programsTrackRef, next);
      return next;
    });
  }, []);

  const goToGallerySlide = useCallback((i) => {
    setGallerySlide(i);
    scrollTrackTo(galleryTrackRef, i);
  }, []);
  const stepGallerySlide = useCallback((delta) => {
    setGallerySlide((i) => {
      const next = (i + delta + GALLERY.length) % GALLERY.length;
      scrollTrackTo(galleryTrackRef, next);
      return next;
    });
  }, []);

  const prevGalleryPhoto = useCallback(() => {
    setGalleryLightbox((i) => (i - 1 + GALLERY.length) % GALLERY.length);
  }, []);
  const nextGalleryPhoto = useCallback(() => {
    setGalleryLightbox((i) => (i + 1) % GALLERY.length);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (!programsPausedRef.current && activeProgram === null) stepProgramSlide(1);
    }, 5000);
    return () => clearInterval(id);
  }, [stepProgramSlide, activeProgram]);

  useEffect(() => {
    const id = setInterval(() => {
      if (!galleryPausedRef.current && galleryLightbox === null) stepGallerySlide(1);
    }, 5600);
    return () => clearInterval(id);
  }, [stepGallerySlide, galleryLightbox]);

  const cUnidades = useCountUp(12, 0, statsVisible);
  const cAlunos = useCountUp(48, 0, statsVisible);
  const cAulas = useCountUp(180, 0, statsVisible);
  const cNota = useCountUp(4.8, 1, statsVisible);

  const themeVars = {
    "--ink": THEME.ink,
    "--ink-soft": THEME.inkSoft,
    "--paper": THEME.paper,
    "--paper-soft": THEME.paperSoft,
    "--accent": THEME.accent,
    "--accent-soft": THEME.accentSoft,
    "--cyan": THEME.cyan,
    "--gold": THEME.gold,
    "--muted": THEME.muted,
  };

  return (
    <div className="academia-root" style={themeVars}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;800&display=swap');

        html, body { margin: 0; padding: 0; width: 100%; overflow-x: hidden; }
        #root { margin: 0; padding: 0; }

        .academia-root {
          --font-display: 'Anton', 'Arial Narrow', sans-serif;
          --font-body: 'Inter', -apple-system, sans-serif;
          font-family: var(--font-body);
          color: var(--ink);
          background: var(--paper);
          overflow-x: hidden;
          line-height: 1.55;
        }
        .academia-root * { box-sizing: border-box; }
        .academia-root img { max-width: 100%; display: block; }
        .academia-root button { font-family: var(--font-body); cursor: pointer; }
        .academia-root a { text-decoration: none; }
        .academia-root a:not(.btn) { color: inherit; }
        .academia-root ::selection { background: var(--accent); color: white; }

        @media (prefers-reduced-motion: reduce) {
          .academia-root *, .academia-root *::before, .academia-root *::after {
            animation-duration: 0.001ms !important;
            transition-duration: 0.001ms !important;
          }
        }

        .wrap { max-width: 1180px; margin: 0 auto; padding: 0 24px; }

        /* ---------- buttons ---------- */
        .btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 26px; border-radius: 999px; border: none;
          font-weight: 700; font-size: 0.95rem; white-space: nowrap;
          transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease, color 0.18s ease;
        }
        .btn-accent {
          background: linear-gradient(120deg, var(--gold), var(--accent) 70%);
          color: white; box-shadow: 0 10px 28px -12px color-mix(in srgb, var(--accent) 65%, transparent);
        }
        .btn-accent:hover { transform: translateY(-2px); box-shadow: 0 16px 34px -12px color-mix(in srgb, var(--accent) 70%, transparent); }
        .btn-ghost-dark { background: transparent; color: var(--ink); border: 1.5px solid color-mix(in srgb, var(--ink) 20%, transparent); }
        .btn-ghost-dark:hover { border-color: var(--ink); }
        .btn-ghost-light { background: transparent; color: white; border: 1.5px solid rgba(255,255,255,0.3); }
        .btn-ghost-light:hover { border-color: white; background: rgba(255,255,255,0.06); }
        .btn-ghost-oncoral { border-color: rgba(255,255,255,0.5); }
        .btn-ghost-oncoral:hover { border-color: white; background: rgba(255,255,255,0.18); transform: translateY(-2px); }
        .btn-outline-dark { background: transparent; color: var(--ink); border: 1.5px solid color-mix(in srgb, var(--ink) 16%, transparent); }
        .btn-outline-dark:hover { background: var(--ink); color: white; }

        /* ---------- nav ---------- */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 22px 0; transition: padding 0.3s ease, background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          background: linear-gradient(180deg, rgba(15,14,13,0.6) 0%, rgba(15,14,13,0.15) 70%, rgba(15,14,13,0) 100%);
          border-bottom: 1px solid transparent;
        }
        .nav.is-scrolled {
          padding: 13px 0;
          background: color-mix(in srgb, var(--ink) 90%, transparent);
          backdrop-filter: blur(14px);
          box-shadow: 0 10px 30px -14px rgba(0,0,0,0.45);
          border-bottom-color: rgba(255,255,255,0.08);
        }
        .nav-inner { display: flex; align-items: center; justify-content: space-between; }
        .nav .nav-inner .logo { display: flex; align-items: center; gap: 11px; font-family: var(--font-display); font-size: 1.4rem; letter-spacing: 0.8px; color: white; }
        .logo-mark {
          width: 36px; height: 36px; border-radius: 10px;
          background: linear-gradient(140deg, var(--gold), var(--accent) 75%);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.14) inset, 0 6px 14px -6px color-mix(in srgb, var(--accent) 70%, transparent);
        }
        .nav-links { display: flex; align-items: center; gap: 38px; }
        .nav .nav-links a {
          position: relative; color: white; font-weight: 600; font-size: 0.92rem;
          letter-spacing: 0.01em; padding: 6px 0; transition: color 0.2s ease, opacity 0.2s ease;
          text-shadow: 0 1px 3px rgba(0,0,0,0.35);
          opacity: 0.85;
        }
        .nav-links a::after {
          content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 2px;
          background: linear-gradient(90deg, var(--gold), var(--accent));
          border-radius: 2px; transform: scaleX(0); transform-origin: left;
          transition: transform 0.25s ease;
        }
        .nav-links a:hover { opacity: 1; }
        .nav-links a:hover::after { transform: scaleX(1); }
        .nav-right { display: flex; align-items: center; gap: 22px; }
        .nav-right::before {
          content: ''; width: 1px; height: 26px; background: rgba(255,255,255,0.16);
        }
        .nav-right .btn-accent { padding: 12px 24px; font-size: 0.9rem; }
        .nav-burger { display: none; align-items: center; justify-content: center; background: none; border: none; color: white; padding: 4px; line-height: 0; }
        @media (max-width: 900px) {
          .nav-links { display: none; }
          .nav-right .btn { display: none; }
          .nav-right::before { display: none; }
          .nav-burger { display: flex; }
        }

        .mobile-menu {
          position: fixed; inset: 0; z-index: 99; background: var(--ink);
          display: flex; flex-direction: column; justify-content: center; gap: 28px;
          padding: 32px; transform: translateY(-100%); transition: transform 0.35s ease;
        }
        .mobile-menu.is-open { transform: translateY(0); }
        .mobile-menu a { font-family: var(--font-display); font-size: 2rem; color: white; }
        .mobile-menu .btn { margin-top: 12px; align-self: flex-start; }

        /* ---------- hero ---------- */
        .hero {
          position: relative; color: white;
          min-height: 100vh; display: flex; align-items: center;
          padding: 150px 0 130px; overflow: hidden;
        }
        .hero-bg { position: absolute; inset: 0; z-index: 0; }
        .hero-bg img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 10%; filter: saturate(0.9) brightness(0.72) contrast(1.06); }
        @media (max-width: 940px) { .hero-bg img { object-position: 50% 6%; } }
        .hero-bg::after {
          content: ''; position: absolute; inset: 0;
          background:
            linear-gradient(115deg, color-mix(in srgb, var(--ink) 78%, transparent) 0%, color-mix(in srgb, var(--ink) 42%, var(--cyan) 16%) 52%, color-mix(in srgb, var(--ink) 72%, transparent) 100%),
            radial-gradient(ellipse 60% 55% at 10% 0%, color-mix(in srgb, var(--cyan) 24%, transparent), transparent 60%),
            radial-gradient(ellipse 55% 60% at 92% 100%, color-mix(in srgb, var(--gold) 20%, transparent), transparent 55%);
        }
        .hero-grid { position: relative; z-index: 1; width: 100%; display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 40px; align-items: center; }
        @media (max-width: 940px) { .hero-grid { grid-template-columns: 1fr; } }
        .hero-copy { margin-left: -49px; }
        @media (max-width: 940px) { .hero-copy { margin-left: 0; } }

        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 0.8rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 26px;
          opacity: 0; transform: translateY(10px);
        }
        .hero-eyebrow::before { content: ''; width: 26px; height: 1.5px; background: linear-gradient(90deg, var(--gold), transparent); }
        .hero-line {
          font-family: var(--font-display);
          font-size: clamp(2.6rem, 6.2vw, 5.1rem);
          line-height: 0.98; letter-spacing: 0.5px;
          overflow: hidden;
        }
        .hero-line span { display: block; transform: translateY(115%); transition: transform 0.7s cubic-bezier(.16,1,.3,1); }
        .hero.is-ready .hero-eyebrow { opacity: 1; transform: translateY(0); transition: opacity 0.6s ease, transform 0.6s ease; }
        .hero.is-ready .hero-line span { transform: translateY(0); }
        .hero-line:nth-child(1) span { transition-delay: 0.05s; }
        .hero-line.l2 span {
          transition-delay: 0.16s;
          background: linear-gradient(100deg, var(--gold), var(--accent) 75%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .hero-line.l3 span { transition-delay: 0.27s; }

        .hero-sub {
          margin-top: 26px; font-size: 1.08rem; color: rgba(255,255,255,0.75);
          max-width: 460px; opacity: 0; transform: translateY(14px);
        }
        .hero.is-ready .hero-sub { opacity: 1; transform: translateY(0); transition: all 0.6s ease 0.4s; }

        .hero-actions { display: flex; gap: 14px; margin-top: 38px; flex-wrap: wrap; opacity: 0; transform: translateY(14px); }
        .hero.is-ready .hero-actions { opacity: 1; transform: translateY(0); transition: all 0.6s ease 0.5s; }

        .hero-price-card {
          position: relative; z-index: 1; color: var(--ink);
          background: linear-gradient(90deg, var(--gold), var(--accent) 80%) top left / 100% 5px no-repeat,
                      color-mix(in srgb, var(--paper) 97%, transparent);
          border-radius: 22px; padding: 34px 30px; margin-left: auto; max-width: 360px;
          border: 1px solid color-mix(in srgb, var(--gold) 35%, transparent);
          box-shadow: 0 40px 70px -28px rgba(0,0,0,0.6), 0 0 60px -30px color-mix(in srgb, var(--gold) 50%, transparent);
          opacity: 0; transform: translateY(24px);
        }
        @media (max-width: 940px) { .hero-price-card { margin-left: auto; margin-right: auto; } }
        .hero-price-card::before, .hero-price-card::after {
          content: ''; position: absolute; inset: 0; z-index: -1; border-radius: 22px; pointer-events: none;
          border: 1px solid color-mix(in srgb, var(--gold) 25%, transparent);
        }
        .hero-price-card::before { transform: translate(10px, 10px); background: color-mix(in srgb, var(--paper) 30%, transparent); opacity: 0.7; }
        .hero-price-card::after { transform: translate(20px, 20px); background: color-mix(in srgb, var(--paper) 16%, transparent); opacity: 0.45; }
        .hero.is-ready .hero-price-card { opacity: 1; transform: translateY(0); transition: all 0.8s cubic-bezier(.16,1,.3,1) 0.35s; }
        .hero-price-label { font-size: 0.82rem; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; }
        .hero-price-value { font-family: var(--font-display); font-size: 3.4rem; line-height: 1; margin: 8px 0 4px; background: linear-gradient(135deg, var(--ink), color-mix(in srgb, var(--accent) 55%, var(--ink))); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .hero-price-value small { font-size: 1.3rem; font-family: var(--font-body); font-weight: 700; }
        .hero-price-foot { font-size: 0.86rem; color: var(--muted); margin-bottom: 20px; }
        .hero-avatars { display: flex; }
        .hero-avatars img { width: 34px; height: 34px; border-radius: 50%; border: 2.5px solid var(--paper); margin-left: -10px; object-fit: cover; }
        .hero-avatars img:first-child { margin-left: 0; }
        .hero-rating { display: flex; align-items: center; gap: 6px; margin-top: 14px; font-size: 0.86rem; font-weight: 700; }
        .hero-rating .stars { color: var(--gold); display: flex; }

        /* ---------- marquee ---------- */
        .marquee-band { background: linear-gradient(100deg, var(--gold), var(--accent) 80%); color: var(--ink); padding: 18px 0; overflow: hidden; }
        .marquee-track { display: flex; width: max-content; animation: marquee 26s linear infinite; }
        .marquee-track span {
          font-family: var(--font-display); font-size: 1.5rem; padding: 0 28px;
          display: flex; align-items: center; gap: 28px; white-space: nowrap;
        }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        /* ---------- section head ---------- */
        .section-head { max-width: 620px; margin-bottom: 52px; opacity: 0; transform: translateY(18px); transition: all 0.6s ease; }
        .section-head.is-visible { opacity: 1; transform: translateY(0); }
        .section-head.centered { margin-left: auto; margin-right: auto; text-align: center; }
        .section-eyebrow { font-size: 0.82rem; font-weight: 700; color: var(--accent); }
        .section-title { font-family: var(--font-display); font-size: clamp(1.9rem, 3.6vw, 2.7rem); margin: 10px 0 12px; letter-spacing: 0.3px; }
        .section-text { color: var(--muted); font-size: 1.02rem; }
        .on-light .section-text { color: #706A62; }

        /* ---------- sobre ---------- */
        .sobre-section {
          padding: 100px 0;
          background:
            radial-gradient(ellipse 55% 60% at 100% 0%, color-mix(in srgb, var(--gold) 14%, transparent), transparent 60%),
            linear-gradient(160deg, var(--paper-soft), var(--paper));
        }
        .sobre-grid { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 56px; align-items: center; }
        @media (max-width: 860px) { .sobre-grid { grid-template-columns: 1fr; } }
        .sobre-media { position: relative; border-radius: 24px; overflow: hidden; aspect-ratio: 4/5; opacity: 0; transform: translateX(-16px); transition: all 0.7s ease; }
        .sobre-media img { width: 100%; height: 100%; object-fit: cover; filter: saturate(0.92); }
        .sobre-section .sobre-media.is-visible { opacity: 1; transform: translateX(0); }
        .sobre-badge {
          position: absolute; bottom: 20px; left: 20px; right: 20px;
          background: color-mix(in srgb, var(--paper) 94%, transparent); backdrop-filter: blur(8px);
          border-radius: 16px; padding: 16px 18px; display: flex; align-items: center; gap: 12px;
          box-shadow: 0 20px 40px -20px rgba(0,0,0,0.3);
        }
        .sobre-badge .num { font-family: var(--font-display); font-size: 1.6rem; color: var(--accent); }
        .sobre-badge .lbl { font-size: 0.82rem; color: var(--muted); line-height: 1.3; }
        .sobre-text p { color: #6B655D; font-size: 1.02rem; margin: 0 0 16px; max-width: 520px; }
        .sobre-list { list-style: none; padding: 0; margin: 26px 0 0; display: grid; gap: 14px; }
        .sobre-list li { display: flex; gap: 12px; align-items: flex-start; font-size: 0.95rem; color: var(--ink); }
        .sobre-list li svg { color: var(--accent); margin-top: 2px; flex-shrink: 0; }

        /* ---------- features ---------- */
        .features-section {
          padding: 100px 0;
          background:
            radial-gradient(ellipse 50% 55% at 0% 0%, color-mix(in srgb, var(--cyan) 12%, transparent), transparent 60%),
            linear-gradient(170deg, var(--paper), var(--paper-soft));
        }
        .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background: color-mix(in srgb, var(--ink) 7%, transparent); border-radius: 22px; overflow: hidden; }
        @media (max-width: 860px) { .features-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .features-grid { grid-template-columns: 1fr; } }
        .feature-card { background: var(--paper-soft); padding: 34px 28px; transition: background 0.25s ease; }
        .feature-card:hover { background: var(--paper); }
        .feature-icon { width: 46px; height: 46px; border-radius: 13px; background: linear-gradient(140deg, color-mix(in srgb, var(--accent) 16%, transparent), color-mix(in srgb, var(--accent) 4%, transparent)); color: var(--accent); display: flex; align-items: center; justify-content: center; margin-bottom: 18px; }
        .feature-card h3 { font-size: 1.08rem; margin: 0 0 8px; font-weight: 800; }
        .feature-card p { font-size: 0.92rem; color: var(--muted); margin: 0; }

        /* ---------- stats ---------- */
        .stats-section { background: linear-gradient(165deg, var(--ink), var(--ink-soft)); color: white; padding: 80px 0; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; text-align: center; }
        @media (max-width: 760px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
        .stat-num { font-family: var(--font-display); font-size: clamp(2.4rem, 4.5vw, 3.4rem); color: var(--cyan); }
        .stat-label { color: rgba(255,255,255,0.6); font-size: 0.92rem; margin-top: 6px; }

        /* ---------- programs ---------- */
        .programs-section {
          padding: 110px 0;
          background:
            radial-gradient(ellipse 55% 55% at 100% 100%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 60%),
            linear-gradient(160deg, var(--paper), var(--paper-soft));
        }
        .programs-track {
          display: flex; gap: 18px; overflow-x: auto; scroll-snap-type: x proximity;
          padding-bottom: 8px; margin: 0 -4px; padding-left: 4px; padding-right: 4px;
          scrollbar-width: none;
        }
        .programs-track::-webkit-scrollbar { display: none; }

        .program-card {
          position: relative; flex: 0 0 260px; height: 460px;
          border-radius: 26px; overflow: hidden; cursor: pointer; scroll-snap-align: start;
          background: var(--ink);
          transition: flex-basis 0.5s cubic-bezier(.16,1,.3,1), transform 0.4s ease, box-shadow 0.4s ease;
        }
        .program-card:hover, .program-card:focus-within {
          transform: translateY(-6px);
          box-shadow: 0 34px 60px -22px rgba(0,0,0,0.4);
        }
        @media (hover: hover) and (pointer: fine) {
          .program-card:hover, .program-card:focus-within { flex-basis: 400px; }
        }
        .program-card-img {
          position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
          filter: saturate(0.92) contrast(1.03); transition: transform 0.7s ease;
        }
        .program-card:hover .program-card-img { transform: scale(1.08); }
        .program-card-scrim {
          position: absolute; inset: 0;
          background: linear-gradient(0deg, rgba(10,9,8,0.88) 0%, rgba(10,9,8,0.35) 45%, rgba(10,9,8,0.05) 70%);
          transition: background 0.4s ease;
        }
        .program-tag { position: absolute; top: 16px; left: 16px; z-index: 1; background: color-mix(in srgb, var(--ink) 60%, transparent); backdrop-filter: blur(4px); color: white; font-size: 0.76rem; font-weight: 800; padding: 6px 12px; border-radius: 999px; }
        .program-card-content {
          position: absolute; left: 20px; right: 20px; bottom: 20px; z-index: 1; color: white;
          transition: right 0.35s ease;
        }
        .program-card-content h3 {
          font-family: var(--font-display); font-size: 1.3rem; font-weight: 400; letter-spacing: 0.3px;
          margin: 0; line-height: 1.15;
        }
        .program-card-text {
          font-size: 0.88rem; line-height: 1.5; color: rgba(255,255,255,0.85);
          max-height: 0; opacity: 0; margin: 0; overflow: hidden;
          transition: max-height 0.4s ease, opacity 0.35s ease, margin-top 0.4s ease;
        }
        .program-card-cta {
          position: absolute; right: 18px; bottom: 18px; z-index: 2;
          width: 44px; height: 44px; border-radius: 50%; border: none;
          background: white; color: var(--ink); display: flex; align-items: center; justify-content: center;
          box-shadow: 0 10px 24px -8px rgba(0,0,0,0.5);
          transform: scale(0) rotate(-45deg); opacity: 0;
          transition: transform 0.4s cubic-bezier(.34,1.56,.64,1), opacity 0.3s ease, background 0.25s ease, color 0.25s ease;
        }
        .program-card-cta:hover { background: var(--accent); color: white; }

        @media (hover: hover) and (pointer: fine) {
          .program-card:hover .program-card-content, .program-card:focus-within .program-card-content {
            right: 68px;
          }
          .program-card:hover .program-card-text, .program-card:focus-within .program-card-text {
            max-height: 90px; opacity: 1; margin-top: 8px;
          }
          .program-card:hover .program-card-cta, .program-card:focus-within .program-card-cta {
            transform: scale(1) rotate(0); opacity: 1;
          }
        }
        @media (hover: none), (pointer: coarse) {
          .program-card-content { right: 68px; }
          .program-card-text { max-height: 90px; opacity: 1; margin-top: 8px; }
          .program-card-cta { transform: scale(1) rotate(0); opacity: 1; }
        }
        @media (max-width: 700px) {
          .program-card { flex: 0 0 82%; height: 400px; }
        }

        .carousel-controls { display: flex; align-items: center; justify-content: center; gap: 18px; margin-top: 28px; }
        .programs-dots { display: flex; justify-content: center; gap: 8px; }
        .programs-dots button {
          width: 8px; height: 8px; border-radius: 50%; border: none; padding: 0;
          background: color-mix(in srgb, var(--ink) 18%, transparent);
          transition: all 0.25s ease;
        }
        .programs-dots button.is-active { background: var(--accent); width: 22px; border-radius: 4px; }

        /* ---------- program modal ---------- */
        .modal-backdrop {
          position: fixed; inset: 0; z-index: 200; background: rgba(15,14,13,0.7); backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center; padding: 24px;
        }
        .modal-card {
          position: relative;
          background: var(--paper); color: var(--ink); border-radius: 24px; overflow: hidden;
          max-width: 760px; width: 100%; max-height: 88vh; overflow-y: auto;
          display: grid; grid-template-columns: 0.9fr 1.1fr;
          box-shadow: 0 40px 80px -20px rgba(0,0,0,0.5);
        }
        @media (max-width: 700px) { .modal-card { grid-template-columns: 1fr; max-height: 92vh; } }
        .modal-close {
          position: absolute; top: 16px; right: 16px; z-index: 3; width: 38px; height: 38px; border-radius: 50%;
          background: color-mix(in srgb, var(--ink) 70%, transparent); color: white; border: none;
          display: flex; align-items: center; justify-content: center; transition: background 0.2s ease;
        }
        .modal-close:hover { background: var(--ink); }
        .modal-media { position: relative; min-height: 240px; }
        .modal-media img { width: 100%; height: 100%; object-fit: cover; filter: saturate(0.92); }
        .modal-body { padding: 34px 32px; display: flex; flex-direction: column; }
        .modal-body h3 { font-size: 1.4rem; margin: 0 0 14px; font-weight: 800; }
        .modal-desc { color: var(--muted); font-size: 0.98rem; line-height: 1.6; margin: 0 0 22px; }
        .modal-highlights { list-style: none; padding: 0; margin: 0 0 28px; display: grid; gap: 12px; }
        .modal-highlights li { display: flex; align-items: flex-start; gap: 10px; font-size: 0.92rem; }
        .modal-highlights li svg { color: var(--accent); margin-top: 2px; flex-shrink: 0; }
        .modal-cta { justify-content: center; margin-top: auto; }

        /* ---------- steps ---------- */
        .steps-section {
          padding: 100px 0; overflow: hidden;
          background:
            radial-gradient(ellipse 55% 55% at 0% 100%, color-mix(in srgb, var(--gold) 12%, transparent), transparent 60%),
            linear-gradient(170deg, var(--paper-soft), var(--paper));
        }
        .steps-grid { display: flex; align-items: stretch; gap: 6px; }
        @media (max-width: 820px) { .steps-grid { flex-direction: column; gap: 22px; } }

        .step-connector {
          flex-shrink: 0; width: 44px; align-self: center; margin-top: -18px;
          display: flex; align-items: center; justify-content: center;
          color: color-mix(in srgb, var(--accent) 55%, var(--ink) 20%);
        }
        .step-connector svg { animation: step-connector-flow 1.7s ease-in-out infinite; }
        @media (max-width: 820px) { .step-connector { display: none; } }
        @keyframes step-connector-flow {
          0%, 100% { transform: translateX(0); opacity: 0.45; }
          50% { transform: translateX(7px); opacity: 1; }
        }

        .step-card {
          flex: 1; position: relative; isolation: isolate; overflow: hidden;
          background: var(--paper); border-radius: 22px; padding: 34px 28px;
          border: 1.5px solid color-mix(in srgb, var(--ink) 6%, transparent);
          box-shadow: 0 1px 2px rgba(0,0,0,0.03);
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.6s ease, transform 0.5s cubic-bezier(.16,1,.3,1), box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .step-card.is-visible { opacity: 1; transform: translateY(0); }
        .step-card::before {
          content: ''; position: absolute; z-index: -1; top: -55%; right: -25%; width: 220px; height: 220px; border-radius: 50%;
          background: radial-gradient(circle, color-mix(in srgb, var(--accent) 24%, transparent), transparent 70%);
          opacity: 0; transition: opacity 0.4s ease;
        }
        .step-card:hover {
          transform: translateY(-10px);
          border-color: color-mix(in srgb, var(--accent) 38%, transparent);
          box-shadow: 0 32px 55px -26px color-mix(in srgb, var(--accent) 45%, transparent);
        }
        .step-card:hover::before { opacity: 1; }

        .step-ghost-number {
          position: absolute; top: 6px; right: 16px; z-index: -1;
          font-family: var(--font-display); font-size: 3.6rem; line-height: 1; color: transparent;
          -webkit-text-stroke: 1.5px color-mix(in srgb, var(--ink) 12%, transparent);
          transition: -webkit-text-stroke-color 0.35s ease, transform 0.4s ease;
        }
        .step-card:hover .step-ghost-number { -webkit-text-stroke-color: color-mix(in srgb, var(--accent) 55%, transparent); transform: scale(1.08) translateY(-2px); }

        .step-icon-wrap { position: relative; width: 54px; height: 54px; margin-bottom: 22px; }
        .step-icon-ring {
          position: absolute; inset: 0; border-radius: 50%;
          background: color-mix(in srgb, var(--cyan) 22%, transparent);
          animation: step-ring-pulse 2.6s ease-out infinite;
        }
        .step-icon-ring-delay { animation-delay: 1.3s; }
        @keyframes step-ring-pulse {
          0% { transform: scale(0.82); opacity: 0.55; }
          70%, 100% { transform: scale(1.55); opacity: 0; }
        }
        .step-icon {
          position: relative; width: 54px; height: 54px; border-radius: 50%;
          background: linear-gradient(140deg, color-mix(in srgb, var(--cyan) 30%, transparent), color-mix(in srgb, var(--cyan) 10%, transparent));
          color: color-mix(in srgb, var(--cyan) 65%, var(--ink));
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.45s cubic-bezier(.34,1.56,.64,1), background 0.35s ease, color 0.35s ease;
        }
        .step-card:hover .step-icon {
          transform: scale(1.14) rotate(-10deg);
          background: linear-gradient(140deg, var(--gold), var(--accent) 75%);
          color: white;
        }
        .step-card h3 { position: relative; font-size: 1.12rem; margin: 0 0 8px; font-weight: 800; transition: color 0.3s ease; }
        .step-card:hover h3 { color: color-mix(in srgb, var(--accent) 70%, var(--ink)); }
        .step-card p { position: relative; font-size: 0.92rem; color: var(--muted); margin: 0; }

        /* ---------- pricing ---------- */
        .pricing-section {
          padding: 110px 0; color: white;
          background:
            radial-gradient(ellipse 85% 75% at 10% -10%, color-mix(in srgb, var(--cyan) 38%, transparent), transparent 65%),
            radial-gradient(ellipse 80% 80% at 105% 110%, color-mix(in srgb, var(--gold) 42%, transparent), transparent 65%),
            radial-gradient(ellipse 70% 60% at 50% 40%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 70%),
            linear-gradient(160deg, var(--ink) 20%, var(--ink-soft) 100%);
        }
        .pricing-toggle { display: inline-flex; background: color-mix(in srgb, white 6%, transparent); padding: 5px; border-radius: 999px; margin-bottom: 46px; }
        .pricing-toggle button { background: none; border: none; color: rgba(255,255,255,0.6); font-weight: 700; padding: 10px 22px; border-radius: 999px; font-size: 0.9rem; transition: all 0.25s ease; }
        .pricing-toggle button.is-active { background: linear-gradient(120deg, var(--gold), var(--accent) 75%); color: white; }
        .pricing-save { font-size: 0.72rem; background: var(--cyan); color: var(--ink); padding: 2px 7px; border-radius: 6px; margin-left: 6px; font-weight: 800; }

        .plans-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; align-items: stretch; }
        @media (max-width: 900px) { .plans-grid { grid-template-columns: 1fr; max-width: 420px; margin: 0 auto; } }
        .plan-card {
          position: relative;
          background: linear-gradient(160deg, color-mix(in srgb, white 9%, transparent), color-mix(in srgb, white 2%, transparent));
          border-radius: 22px; padding: 38px 32px;
          border: 1px solid rgba(255,255,255,0.14);
          box-shadow: 0 30px 60px -35px rgba(0,0,0,0.7);
          display: flex; flex-direction: column;
        }
        .plan-card.is-highlight {
          background: var(--paper); color: var(--ink); border: none;
          box-shadow: 0 45px 80px -30px rgba(0,0,0,0.55), 0 0 0 1px color-mix(in srgb, var(--accent) 25%, transparent);
          z-index: 2;
        }
        .plan-card.is-premium {
          border: 1px solid color-mix(in srgb, var(--gold) 55%, transparent);
          background: linear-gradient(160deg, color-mix(in srgb, var(--gold) 18%, transparent), color-mix(in srgb, white 3%, transparent));
          box-shadow: 0 30px 70px -35px color-mix(in srgb, var(--gold) 55%, transparent);
        }
        .plan-badge {
          position: absolute; top: -13px; left: 30px;
          display: inline-flex; align-items: center; gap: 5px;
          background: linear-gradient(120deg, var(--gold), var(--accent) 75%);
          color: white; font-size: 0.74rem; font-weight: 800; padding: 5px 14px; border-radius: 999px;
        }
        .plan-badge.is-gold { background: var(--gold); color: var(--ink); }
        .plan-name { font-family: var(--font-display); font-size: 1.6rem; margin: 0 0 4px; }
        .plan-card.is-premium .plan-name { color: var(--gold); }
        .plan-tagline { font-size: 0.88rem; opacity: 0.72; margin: 0 0 24px; }
        .plan-price { display: flex; align-items: baseline; gap: 4px; }
        .plan-currency { font-size: 1rem; font-weight: 700; opacity: 0.7; }
        .plan-amount { font-family: var(--font-display); font-size: 2.8rem; }
        .plan-period { font-size: 0.9rem; opacity: 0.6; }
        .plan-note { font-size: 0.78rem; color: color-mix(in srgb, var(--cyan) 70%, var(--ink)); margin: 4px 0 0; font-weight: 700; }
        .plan-card:not(.is-highlight) .plan-note { color: var(--cyan); }
        .plan-features { list-style: none; padding: 0; margin: 26px 0 32px; display: flex; flex-direction: column; gap: 13px; flex: 1; }
        .plan-features li { display: flex; align-items: center; gap: 10px; font-size: 0.92rem; }
        .plan-features li svg { color: var(--accent); flex-shrink: 0; }
        .plan-card.is-premium .plan-features li svg { color: var(--gold); }
        .plan-cta { width: 100%; justify-content: center; }
        .btn-outline-gold { background: transparent; color: var(--gold); border: 1.5px solid color-mix(in srgb, var(--gold) 55%, transparent); }
        .btn-outline-gold:hover { background: linear-gradient(120deg, var(--gold), var(--accent) 75%); color: white; border-color: transparent; }

        /* ---------- gallery ---------- */
        .gallery-section {
          padding: 100px 0;
          background:
            radial-gradient(ellipse 50% 55% at 100% 0%, color-mix(in srgb, var(--cyan) 12%, transparent), transparent 60%),
            linear-gradient(160deg, var(--paper), var(--paper-soft));
        }
        .gallery-track {
          display: flex; gap: 18px; overflow-x: auto; scroll-snap-type: x proximity;
          padding-bottom: 8px; margin: 0 -4px; padding-left: 4px; padding-right: 4px;
          scrollbar-width: none;
        }
        .gallery-track::-webkit-scrollbar { display: none; }

        .gallery-card {
          position: relative; flex: 0 0 260px; height: 380px;
          border-radius: 26px; overflow: hidden; cursor: pointer; scroll-snap-align: start;
          background: var(--ink);
          transition: flex-basis 0.5s cubic-bezier(.16,1,.3,1), transform 0.4s ease, box-shadow 0.4s ease;
        }
        .gallery-card:hover, .gallery-card:focus-within {
          transform: translateY(-6px);
          box-shadow: 0 34px 60px -22px rgba(0,0,0,0.4);
        }
        @media (hover: hover) and (pointer: fine) {
          .gallery-card:hover, .gallery-card:focus-within { flex-basis: 380px; }
        }
        .gallery-card-img {
          position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
          filter: saturate(0.92) contrast(1.02); transition: transform 0.7s ease;
        }
        .gallery-card:hover .gallery-card-img { transform: scale(1.08); }
        .gallery-card-scrim {
          position: absolute; inset: 0;
          background: linear-gradient(0deg, rgba(10,9,8,0.85) 0%, rgba(10,9,8,0.25) 45%, rgba(10,9,8,0.02) 70%);
        }
        .gallery-card-content {
          position: absolute; left: 20px; right: 20px; bottom: 20px; z-index: 1; color: white;
          transition: right 0.35s ease;
        }
        .gallery-card-content h3 {
          font-family: var(--font-display); font-size: 1.15rem; font-weight: 400; letter-spacing: 0.3px;
          margin: 0; line-height: 1.2;
        }
        .gallery-card-text {
          font-size: 0.86rem; line-height: 1.5; color: rgba(255,255,255,0.85);
          max-height: 0; opacity: 0; margin: 0; overflow: hidden;
          transition: max-height 0.4s ease, opacity 0.35s ease, margin-top 0.4s ease;
        }
        .gallery-card-cta {
          position: absolute; right: 16px; bottom: 16px; z-index: 2;
          width: 40px; height: 40px; border-radius: 50%; border: none;
          background: white; color: var(--ink); display: flex; align-items: center; justify-content: center;
          box-shadow: 0 10px 24px -8px rgba(0,0,0,0.5);
          transform: scale(0); opacity: 0;
          transition: transform 0.4s cubic-bezier(.34,1.56,.64,1), opacity 0.3s ease, background 0.25s ease, color 0.25s ease;
        }
        .gallery-card-cta:hover { background: var(--accent); color: white; }

        @media (hover: hover) and (pointer: fine) {
          .gallery-card:hover .gallery-card-content, .gallery-card:focus-within .gallery-card-content { right: 62px; }
          .gallery-card:hover .gallery-card-text, .gallery-card:focus-within .gallery-card-text {
            max-height: 80px; opacity: 1; margin-top: 6px;
          }
          .gallery-card:hover .gallery-card-cta, .gallery-card:focus-within .gallery-card-cta {
            transform: scale(1); opacity: 1;
          }
        }
        @media (hover: none), (pointer: coarse) {
          .gallery-card-content { right: 62px; }
          .gallery-card-text { max-height: 80px; opacity: 1; margin-top: 6px; }
          .gallery-card-cta { transform: scale(1); opacity: 1; }
        }
        @media (max-width: 700px) {
          .gallery-card { flex: 0 0 78%; height: 340px; }
        }

        /* ---------- lightbox ---------- */
        .lightbox-card {
          position: relative; max-width: 880px; width: 100%; max-height: 88vh;
          display: flex; flex-direction: column; align-items: center;
          animation: modal-pop 0.3s cubic-bezier(.16,1,.3,1);
        }
        .lightbox-img { max-width: 100%; max-height: 68vh; border-radius: 20px; object-fit: contain; box-shadow: 0 40px 80px -20px rgba(0,0,0,0.5); }
        .lightbox-caption { text-align: center; color: white; margin-top: 20px; max-width: 560px; }
        .lightbox-caption h3 { font-family: var(--font-display); font-weight: 400; font-size: 1.3rem; margin: 0 0 6px; }
        .lightbox-caption p { color: rgba(255,255,255,0.7); font-size: 0.92rem; margin: 0; }
        .lightbox-arrow {
          position: absolute; top: 50%; transform: translateY(-50%); z-index: 3;
          width: 46px; height: 46px; border-radius: 50%; border: none;
          background: rgba(255,255,255,0.12); backdrop-filter: blur(6px); color: white;
          display: flex; align-items: center; justify-content: center; transition: background 0.2s ease;
        }
        .lightbox-arrow:hover { background: rgba(255,255,255,0.25); }
        .lightbox-arrow-prev { left: -16px; }
        .lightbox-arrow-next { right: -16px; }
        @media (max-width: 760px) {
          .lightbox-arrow-prev { left: 4px; }
          .lightbox-arrow-next { right: 4px; }
        }

        /* ---------- testimonials ---------- */
        .testi-section {
          padding: 110px 0;
          background:
            radial-gradient(ellipse 55% 55% at 0% 0%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 60%),
            linear-gradient(170deg, var(--paper-soft), var(--paper));
        }
        .testi-wrap {
          position: relative; overflow: hidden;
          display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 50px; align-items: center;
          background: linear-gradient(155deg, var(--paper) 0%, color-mix(in srgb, var(--accent) 6%, var(--paper)) 100%);
          border: 1px solid color-mix(in srgb, var(--ink) 6%, transparent);
          border-radius: 26px; padding: 50px;
          box-shadow: 0 40px 70px -36px rgba(0,0,0,0.22), 0 1px 3px rgba(0,0,0,0.04);
        }
        .testi-wrap::before {
          content: ''; position: absolute; top: -70px; right: -70px; width: 240px; height: 240px; border-radius: 50%;
          background: radial-gradient(circle, color-mix(in srgb, var(--gold) 26%, transparent), transparent 70%);
          pointer-events: none;
        }
        @media (max-width: 800px) { .testi-wrap { grid-template-columns: 1fr; padding: 32px; gap: 28px; } }
        .testi-photo-wrap { position: relative; }
        .testi-photo {
          position: relative; aspect-ratio: 1; border-radius: 20px; overflow: hidden;
          transform: rotate(-2.5deg); border: 6px solid var(--paper);
          box-shadow: 0 30px 50px -22px rgba(0,0,0,0.4);
        }
        .testi-photo img { width: 100%; height: 100%; object-fit: cover; filter: saturate(0.92); }
        .testi-badge {
          position: absolute; bottom: -16px; right: -14px; z-index: 2;
          display: flex; align-items: center; gap: 6px;
          background: var(--ink); color: white; font-weight: 800; font-size: 0.92rem;
          border-radius: 14px; padding: 10px 14px; transform: rotate(3deg);
          box-shadow: 0 18px 30px -14px rgba(0,0,0,0.5);
        }
        .testi-badge .stars { color: var(--gold); display: flex; gap: 1px; }
        .testi-quote-icon-wrap {
          width: 54px; height: 54px; border-radius: 16px; margin-bottom: 18px;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, var(--accent), var(--accent-soft));
          box-shadow: 0 14px 26px -12px color-mix(in srgb, var(--accent) 65%, transparent);
        }
        .testi-quote-icon { color: white; }
        .testi-text { font-size: 1.28rem; font-weight: 600; line-height: 1.45; margin: 0 0 22px; }
        .testi-name { font-weight: 800; }
        .testi-role { color: var(--muted); font-size: 0.88rem; }
        .testi-controls { display: flex; align-items: center; gap: 18px; margin-top: 28px; }
        .testi-arrow { width: 42px; height: 42px; border-radius: 50%; border: 1.5px solid color-mix(in srgb, var(--ink) 16%, transparent); background: none; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease; flex-shrink: 0; }
        .testi-arrow:hover { background: var(--ink); color: white; border-color: var(--ink); transform: scale(1.06); }
        .testi-dots { display: flex; gap: 10px; }
        .testi-dot {
          width: 40px; height: 40px; border-radius: 50%; overflow: hidden; padding: 0;
          background: none; border: 2.5px solid transparent; opacity: 0.5;
          transition: all 0.25s ease;
        }
        .testi-dot img { width: 100%; height: 100%; object-fit: cover; }
        .testi-dot:hover { opacity: 0.85; }
        .testi-dot.is-active { opacity: 1; border-color: var(--accent); transform: scale(1.1); }

        /* ---------- app cta ---------- */
        .appcta-section { background: linear-gradient(120deg, var(--accent), var(--accent) 70%, var(--gold)); color: white; padding: 90px 0; }
        .appcta-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 40px; align-items: center; }
        @media (max-width: 860px) { .appcta-grid { grid-template-columns: 1fr; text-align: center; } }
        .appcta-grid h2 { font-family: var(--font-display); font-size: clamp(1.9rem, 3.6vw, 2.6rem); margin: 0 0 16px; }
        .appcta-grid p { opacity: 0.92; max-width: 460px; margin: 0 0 28px; }
        @media (max-width: 860px) { .appcta-grid p { margin-left: auto; margin-right: auto; } }
        .appcta-actions { display: flex; gap: 14px; flex-wrap: wrap; }
        @media (max-width: 860px) { .appcta-actions { justify-content: center; } }
        .appcta-visual {
          justify-self: center; width: 250px; aspect-ratio: 9/18.5; background: var(--ink);
          border-radius: 36px; border: 7px solid var(--ink); position: relative;
          box-shadow: 0 30px 60px -15px rgba(0,0,0,0.4);
        }
        .app-screen {
          position: absolute; inset: 0; border-radius: 29px; overflow: hidden;
          background: linear-gradient(170deg, var(--ink-soft), var(--ink) 55%);
          padding: 14px 14px 10px; color: white; display: flex; flex-direction: column;
          font-family: var(--font-body);
        }
        .app-statusbar { display: flex; justify-content: space-between; align-items: center; font-size: 0.62rem; font-weight: 700; margin-bottom: 12px; }
        .app-statusbar-icons { display: flex; align-items: center; gap: 4px; opacity: 0.9; }
        .app-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .app-header-brand { display: flex; align-items: center; gap: 5px; font-family: var(--font-display); font-size: 0.82rem; letter-spacing: 0.2px; color: var(--accent-soft); }
        .app-header-settings { opacity: 0.6; }
        .app-greeting { font-size: 0.88rem; font-weight: 800; margin: 0; }
        .app-greeting-sub { font-size: 0.58rem; color: rgba(255,255,255,0.55); margin: 2px 0 10px; }
        .app-streak-card {
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px;
          padding: 9px 10px; display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 10px;
        }
        .app-streak-label { display: flex; align-items: center; gap: 4px; font-size: 0.5rem; color: rgba(255,255,255,0.6); font-weight: 700; }
        .app-streak-num { font-family: var(--font-display); font-size: 1.05rem; margin: 2px 0; }
        .app-streak-sub { font-size: 0.48rem; color: rgba(255,255,255,0.5); }
        .app-streak-ring {
          flex-shrink: 0; width: 36px; height: 36px; border-radius: 50%;
          background: conic-gradient(var(--accent) 360deg, rgba(255,255,255,0.12) 0deg);
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1px;
          color: var(--accent);
        }
        .app-streak-ring span { font-size: 0.4rem; font-weight: 800; color: white; }
        .app-cta-btn {
          display: flex; align-items: center; justify-content: center; gap: 6px; width: 100%;
          background: linear-gradient(120deg, var(--gold), var(--accent) 70%); color: var(--ink);
          border: none; border-radius: 10px; padding: 8px 0; font-weight: 800; font-size: 0.62rem;
          margin-bottom: 10px;
        }
        .app-week { display: flex; justify-content: space-between; gap: 3px; margin-bottom: auto; }
        .app-week-day { display: flex; flex-direction: column; align-items: center; gap: 3px; }
        .app-week-dot {
          width: 16px; height: 16px; border-radius: 50%; border: 1.5px solid rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center; color: white;
        }
        .app-week-day.is-done .app-week-dot { background: #4ADE80; border-color: #4ADE80; }
        .app-week-day.is-today .app-week-dot { border-color: var(--accent); border-width: 2px; }
        .app-week-label { font-size: 0.4rem; color: rgba(255,255,255,0.5); }
        .app-week-day.is-today .app-week-label { color: var(--accent); font-weight: 800; }
        .app-tabbar {
          display: flex; justify-content: space-around; align-items: center;
          border-top: 1px solid rgba(255,255,255,0.08); padding-top: 8px; margin-top: 10px; color: rgba(255,255,255,0.35);
        }
        .app-tabbar .is-active { color: var(--accent); }

        /* ---------- faq ---------- */
        .faq-section {
          padding: 110px 0;
          background:
            radial-gradient(ellipse 55% 55% at 100% 100%, color-mix(in srgb, var(--gold) 12%, transparent), transparent 60%),
            linear-gradient(160deg, var(--paper), var(--paper-soft));
        }
        .faq-list { max-width: 720px; margin: 0 auto; }
        .faq-item { border-bottom: 1px solid color-mix(in srgb, var(--ink) 10%, transparent); }
        .faq-question { width: 100%; background: none; border: none; display: flex; justify-content: space-between; align-items: center; padding: 22px 4px; font-size: 1.05rem; font-weight: 700; text-align: left; color: var(--ink); }
        .faq-chevron { display: flex; flex-shrink: 0; }
        .faq-answer-wrap { overflow: hidden; }
        .faq-answer { margin: 0; padding: 0 40px 20px 0; color: var(--muted); font-size: 0.95rem; line-height: 1.6; }

        /* ---------- final cta ---------- */
        .final-cta {
          color: white; padding: 100px 0; text-align: center;
          background:
            radial-gradient(ellipse 60% 70% at 50% 0%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 65%),
            linear-gradient(165deg, var(--ink), var(--ink-soft));
        }
        .final-cta h2 { font-family: var(--font-display); font-size: clamp(2.2rem, 5vw, 3.6rem); margin: 0 0 20px; }
        .final-cta p { color: rgba(255,255,255,0.6); max-width: 480px; margin: 0 auto 34px; }

        /* ---------- footer ---------- */
        .footer {
          color: rgba(255,255,255,0.72); padding: 60px 0 30px;
          background: linear-gradient(180deg, var(--ink-soft), var(--ink));
        }
        .footer-grid { display: grid; grid-template-columns: 1.3fr repeat(3, 1fr); gap: 40px; margin-bottom: 40px; }
        @media (max-width: 760px) { .footer-grid { grid-template-columns: repeat(2, 1fr); } }
        .footer-logo { font-family: var(--font-display); font-size: 1.4rem; color: white; margin-bottom: 12px; }
        .footer-col h4 { color: white; font-size: 0.88rem; margin: 0 0 16px; }
        .footer-col ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; font-size: 0.9rem; }
        .footer-col a:hover { color: white; }
        .footer-social { display: flex; gap: 10px; margin-top: 18px; }
        .footer-social a { width: 36px; height: 36px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.14); display: flex; align-items: center; justify-content: center; transition: all 0.2s ease; }
        .footer-social a:hover { background: var(--accent); border-color: var(--accent); }
        .footer-bottom { padding-top: 24px; display: flex; justify-content: space-between; font-size: 0.82rem; flex-wrap: wrap; gap: 10px; }

        /* ---------- sticky mobile cta ---------- */
        .sticky-cta { position: fixed; bottom: 0; left: 0; right: 0; z-index: 90; background: var(--ink); padding: 14px 20px; display: none; align-items: center; justify-content: space-between; gap: 14px; transform: translateY(100%); transition: transform 0.3s ease; box-shadow: 0 -12px 30px rgba(0,0,0,0.25); }
        .sticky-cta.is-visible { transform: translateY(0); }
        .sticky-cta span { color: white; font-size: 0.86rem; font-weight: 700; }
        @media (max-width: 700px) { .sticky-cta { display: flex; } }
      `}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled ? "is-scrolled" : ""}`}>
        <div className="wrap nav-inner">
          <a
            href="#"
            className="logo"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="logo-mark"><Dumbbell size={18} color="white" strokeWidth={2.3} /></span>
            ACADEMIA
          </a>
          <div className="nav-links">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={(e) => handleAnchorClick(e, l.href)}>{l.label}</a>
            ))}
          </div>
          <div className="nav-right">
            <a className="btn btn-accent" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Matricule-se</a>
          </div>
          <button className="nav-burger" onClick={() => setMobileOpen(true)} aria-label="Abrir menu">
            <Menu size={26} />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? "is-open" : ""}`}>
        <button className="nav-burger" style={{ position: "absolute", top: 24, right: 24 }} onClick={() => setMobileOpen(false)} aria-label="Fechar menu">
          <X size={28} color="white" />
        </button>
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={(e) => handleAnchorClick(e, l.href)}>{l.label}</a>
        ))}
        <a className="btn btn-accent" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Matricule-se</a>
      </div>

      {/* HERO */}
      <header className={`hero ${heroReady ? "is-ready" : ""}`}>
        <div className="hero-bg"><img src={IMG.heroBg} alt="" /></div>
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <span className="hero-eyebrow">12 unidades · aberto agora</span>
            <h1>
              <div className="hero-line l1"><span>FORÇA</span></div>
              <div className="hero-line l2"><span>NÃO SE PEDE.</span></div>
              <div className="hero-line l3"><span>SE CONQUISTA.</span></div>
            </h1>
            <p className="hero-sub">
              Musculação, cross training, natação e lutas na mesma matrícula. Professor em quadra em todos os horários, 24 horas por dia.
            </p>
            <div className="hero-actions">
              <button className="btn btn-accent">Quero treinar <ArrowRight size={16} /></button>
              <button className="btn btn-ghost-light">Conhecer unidades</button>
            </div>
          </div>

          <div className="hero-price-card">
            <span className="hero-price-label">Plano de entrada a partir de</span>
            <div className="hero-price-value">R$79<small>,90/mês</small></div>
            <p className="hero-price-foot">sem taxa de matrícula esta semana</p>
            <div className="hero-avatars">
              <img src={IMG.testi1} alt="" />
              <img src={IMG.testi2} alt="" />
              <img src={IMG.testi3} alt="" />
              <img src={IMG.testi4} alt="" />
            </div>
            <div className="hero-rating">
              <span className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}
              </span>
              4.8 · +48 mil alunos ativos
            </div>
          </div>
        </div>
      </header>

      {/* MARQUEE */}
      <div className="marquee-band">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              <span><Dumbbell size={20} /> MUSCULAÇÃO</span>
              <span><Activity size={20} /> CROSS TRAINING</span>
              <span><Waves size={20} /> NATAÇÃO</span>
              <span><Heart size={20} /> PILATES</span>
              <span><Zap size={20} /> LUTAS</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* SOBRE */}
      <section className="sobre-section" id="sobre">
        <div className="wrap sobre-grid">
          <div ref={sobreRef} className={`sobre-media ${sobreVisible ? "is-visible" : ""}`}>
            <img src={IMG.sobre} alt="Estrutura interna de uma unidade da Academia" />
            <div className="sobre-badge">
              <span className="num">12</span>
              <span className="lbl">unidades já abertas na região, todas com a mesma estrutura completa</span>
            </div>
          </div>
          <div className="sobre-text">
            <span className="section-eyebrow">Nossa história</span>
            <h2 className="section-title" style={{ marginTop: 10 }}>Nascemos de quem estava cansado de academia pela metade</h2>
            <p>A Academia começou numa unidade só, porque os fundadores estavam cansados de pagar caro por estrutura incompleta: piscina sem professor, sala de musculação sem manutenção, aula lotada demais pra aprender direito.</p>
            <p>Hoje são 12 unidades, mas o critério continua o mesmo antes de abrir uma nova: estrutura completa, professor de verdade em quadra, e contrato sem letra miúda.</p>
            <ul className="sobre-list">
              <li><Check size={18} /> Equipe própria, sem terceirização de professores</li>
              <li><Check size={18} /> Manutenção semanal registrada e auditada</li>
              <li><Check size={18} /> Mesma mensalidade em qualquer unidade do plano</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section" id="estrutura">
        <div className="wrap">
          <SectionHeader
            eyebrow="Por que aqui"
            title="Estrutura pensada pra você não arrumar desculpa"
            text="Nada de fila pra máquina ou academia vazia de professor no horário que você pode treinar."
            light
          />
          <div className="features-grid">
            {FEATURES.map((f) => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section" ref={statsRef}>
        <div className="wrap stats-grid">
          <div><div className="stat-num">{cUnidades}</div><div className="stat-label">unidades na cidade</div></div>
          <div><div className="stat-num">{cAlunos}mil</div><div className="stat-label">alunos ativos</div></div>
          <div><div className="stat-num">{cAulas}+</div><div className="stat-label">aulas por semana</div></div>
          <div><div className="stat-num">{cNota}</div><div className="stat-label">nota média nas lojas de app</div></div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="programs-section" id="modalidades">
        <div className="wrap">
          <SectionHeader
            eyebrow="Modalidades"
            title="Uma matrícula, seis formas de treinar"
            text="Alterne entre musculação, aulas coletivas e treino em grupo sem pagar nada a mais por isso."
            light
          />
          <div
            className="programs-track"
            ref={programsTrackRef}
            onMouseEnter={() => { programsPausedRef.current = true; }}
            onMouseLeave={() => { programsPausedRef.current = false; }}
          >
            {PROGRAMS.map((p) => <ProgramCard key={p.tag} program={p} onOpen={setActiveProgram} />)}
          </div>
          <div className="carousel-controls">
            <button type="button" className="testi-arrow" onClick={() => stepProgramSlide(-1)} aria-label="Modalidade anterior">
              <ChevronLeft size={18} />
            </button>
            <div className="programs-dots">
              {PROGRAMS.map((p, i) => (
                <button
                  key={p.tag}
                  type="button"
                  className={i === programSlide ? "is-active" : ""}
                  onClick={() => goToProgramSlide(i)}
                  aria-label={`Ir para ${p.tag}`}
                />
              ))}
            </div>
            <button type="button" className="testi-arrow" onClick={() => stepProgramSlide(1)} aria-label="Próxima modalidade">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="steps-section">
        <div className="wrap">
          <SectionHeader eyebrow="Como funciona" title="Do cadastro ao primeiro treino, em 3 passos" light />
          <div className="steps-grid">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.title}>
                <StepCard {...s} index={i + 1} />
                {i < STEPS.length - 1 && (
                  <div className="step-connector" aria-hidden="true">
                    <ArrowRight size={22} strokeWidth={2} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing-section" id="planos">
        <div className="wrap">
          <SectionHeader
            eyebrow="Planos"
            title="Escolha como você quer treinar"
            text="Sem fidelidade de 12 meses e sem multa escondida no contrato."
          />
          <div className="pricing-toggle">
            <button className={billing === "mensal" ? "is-active" : ""} onClick={() => setBilling("mensal")}>Mensal</button>
            <button className={billing === "anual" ? "is-active" : ""} onClick={() => setBilling("anual")}>
              Anual <span className="pricing-save">-20%</span>
            </button>
          </div>
          <div className="plans-grid">
            {PLANS.map((p) => <PlanCard key={p.name} plan={p} billing={billing} />)}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery-section">
        <div className="wrap">
          <SectionHeader eyebrow="Por dentro" title="Um dia normal de treino na Academia" light />
          <div
            className="gallery-track"
            ref={galleryTrackRef}
            onMouseEnter={() => { galleryPausedRef.current = true; }}
            onMouseLeave={() => { galleryPausedRef.current = false; }}
          >
            {GALLERY.map((item, i) => (
              <GalleryCard key={item.title} item={item} index={i} onOpen={setGalleryLightbox} />
            ))}
          </div>
          <div className="carousel-controls">
            <button type="button" className="testi-arrow" onClick={() => stepGallerySlide(-1)} aria-label="Foto anterior">
              <ChevronLeft size={18} />
            </button>
            <div className="programs-dots">
              {GALLERY.map((item, i) => (
                <button
                  key={item.title}
                  type="button"
                  className={i === gallerySlide ? "is-active" : ""}
                  onClick={() => goToGallerySlide(i)}
                  aria-label={`Ir para foto ${i + 1}`}
                />
              ))}
            </div>
            <button type="button" className="testi-arrow" onClick={() => stepGallerySlide(1)} aria-label="Próxima foto">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testi-section" id="resultados">
        <div className="wrap">
          <SectionHeader eyebrow="Quem já treina" title="Resultado de quem apareceu todo dia" light />
          <div className="testi-wrap">
            <div className="testi-photo-wrap">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`photo-${testiIndex}`}
                  className="testi-photo"
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 24 }}
                  transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                >
                  <img src={TESTIMONIALS[testiIndex].img} alt={TESTIMONIALS[testiIndex].name} />
                </motion.div>
              </AnimatePresence>
              <div className="testi-badge">
                <span className="stars">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" strokeWidth={0} />)}
                </span>
                5,0
              </div>
            </div>
            <div>
              <div className="testi-quote-icon-wrap">
                <Quote className="testi-quote-icon" size={26} fill="currentColor" strokeWidth={0} />
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`quote-${testiIndex}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                >
                  <p className="testi-text">{TESTIMONIALS[testiIndex].quote}</p>
                  <div className="testi-name">{TESTIMONIALS[testiIndex].name}</div>
                  <div className="testi-role">{TESTIMONIALS[testiIndex].role}</div>
                </motion.div>
              </AnimatePresence>
              <div className="testi-controls">
                <button className="testi-arrow" onClick={prevTesti} aria-label="Depoimento anterior"><ChevronLeft size={18} /></button>
                <div className="testi-dots">
                  {TESTIMONIALS.map((t, i) => (
                    <button key={i} className={`testi-dot ${i === testiIndex ? "is-active" : ""}`} onClick={() => setTestiIndex(i)} aria-label={`Ir para depoimento de ${t.name}`}>
                      <img src={t.img} alt="" />
                    </button>
                  ))}
                </div>
                <button className="testi-arrow" onClick={nextTesti} aria-label="Próximo depoimento"><ChevronRight size={18} /></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APP CTA */}
      <section className="appcta-section">
        <div className="wrap appcta-grid">
          <div>
            <h2>Seu treino, sua evolução, no seu bolso</h2>
            <p>Check-in, ficha de treino, agenda de aula e histórico de frequência direto no app — sem depender da recepção.</p>
            <div className="appcta-actions">
              <button className="btn btn-ghost-light btn-ghost-oncoral">Baixar na App Store</button>
              <button className="btn btn-ghost-light btn-ghost-oncoral">Baixar no Google Play</button>
            </div>
          </div>
          <div className="appcta-visual">
            <div className="app-screen">
              <div className="app-statusbar">
                <span>9:41</span>
                <span className="app-statusbar-icons"><Wifi size={11} strokeWidth={2.5} /><BatteryFull size={13} strokeWidth={2} /></span>
              </div>
              <div className="app-header">
                <span className="app-header-brand"><Dumbbell size={13} strokeWidth={2.5} /> Academia</span>
                <Settings size={14} strokeWidth={2} className="app-header-settings" />
              </div>
              <p className="app-greeting">Bom dia, Maria!</p>
              <p className="app-greeting-sub">Disciplina hoje, resultado amanhã.</p>

              <div className="app-streak-card">
                <div>
                  <span className="app-streak-label"><Flame size={12} strokeWidth={2.5} /> Sequência de treinos</span>
                  <div className="app-streak-num">7 dias</div>
                  <span className="app-streak-sub">Você está mandando bem!</span>
                </div>
                <div className="app-streak-ring">
                  <Flame size={14} strokeWidth={2.5} />
                  <span>7/7</span>
                </div>
              </div>

              <button type="button" className="app-cta-btn">
                <Play size={13} fill="currentColor" strokeWidth={0} /> Iniciar treino <ArrowRight size={13} strokeWidth={2.5} />
              </button>

              <div className="app-week">
                {APP_WEEK.map((day) => (
                  <div key={day.d} className={`app-week-day ${day.today ? "is-today" : ""} ${day.done ? "is-done" : ""}`}>
                    <span className="app-week-dot">{day.done && <Check size={9} strokeWidth={3} />}</span>
                    <span className="app-week-label">{day.d}</span>
                  </div>
                ))}
              </div>

              <div className="app-tabbar">
                <span className="is-active"><Home size={14} strokeWidth={2.25} /></span>
                <span><BarChart3 size={14} strokeWidth={2.25} /></span>
                <span><ClipboardList size={14} strokeWidth={2.25} /></span>
                <span><User size={14} strokeWidth={2.25} /></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="wrap">
          <SectionHeader eyebrow="Dúvidas" title="Antes de fechar a matrícula" light />
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <FaqItem key={f.q} item={f} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta" id="unidades">
        <div className="wrap">
          <h2>Sua próxima versão treina<br />a partir de hoje.</h2>
          <p>Escolha a unidade mais perto de você e comece essa semana, sem taxa de matrícula.</p>
          <button className="btn btn-accent" style={{ padding: "16px 34px" }}>Encontrar unidade mais perto <MapPin size={16} /></button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <div className="footer-logo">ACADEMIA</div>
              <p style={{ fontSize: "0.88rem", maxWidth: 260 }}>Rede de academias com estrutura completa e professor em quadra em todos os horários.</p>
              <div className="footer-social">
                <a href="#" aria-label="Instagram"><Instagram size={16} /></a>
                <a href="#" aria-label="Facebook"><Facebook size={16} /></a>
                <a href="#" aria-label="Youtube"><Youtube size={16} /></a>
              </div>
            </div>
            <div className="footer-col">
              <h4>Academia</h4>
              <ul>
                <li><a href="#sobre" onClick={(e) => handleAnchorClick(e, "#sobre")}>Sobre</a></li>
                <li><a href="#estrutura" onClick={(e) => handleAnchorClick(e, "#estrutura")}>Estrutura</a></li>
                <li><a href="#modalidades" onClick={(e) => handleAnchorClick(e, "#modalidades")}>Modalidades</a></li>
                <li><a href="#planos" onClick={(e) => handleAnchorClick(e, "#planos")}>Planos</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Empresa</h4>
              <ul>
                <li><a href="#">Sobre a Academia</a></li>
                <li><a href="#">Trabalhe conosco</a></li>
                <li><a href="#">Seja um franqueado</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Suporte</h4>
              <ul>
                <li><a href="#">Central de ajuda</a></li>
                <li><a href="#">Fale conosco</a></li>
                <li><a href="#">Política de privacidade</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Academia. Todos os direitos reservados.</span>
            <span>Template de demonstração — marca e dados fictícios.</span>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE CTA */}
      <div className={`sticky-cta ${scrolled ? "is-visible" : ""}`}>
        <span>A partir de R$79,90/mês</span>
        <a className="btn btn-accent" style={{ padding: "10px 18px" }} href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Matricule-se</a>
      </div>

      <AnimatePresence>
        {activeProgram && <ProgramModal key="program-modal" program={activeProgram} onClose={() => setActiveProgram(null)} />}
      </AnimatePresence>
      <GalleryLightbox
        items={GALLERY}
        index={galleryLightbox}
        onClose={() => setGalleryLightbox(null)}
        onPrev={prevGalleryPhoto}
        onNext={nextGalleryPhoto}
      />
    </div>
  );
}
