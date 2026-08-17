import { useState, useEffect, Fragment } from 'react';
import { Search, User, ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';

function useCountdown(targetTime) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(targetTime - now, 0);
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  };
}

function pad(n) { return String(n).padStart(2, '0'); }

const FINALISTS = [
  { key: 'A', artist: 'SOFÍA REYES', name: 'STATIC' },
  { key: 'B', artist: 'MATEO DUARTE', name: 'DRIFT' },
  { key: 'C', artist: 'LUNA ITO', name: 'ECHO' },
];

const STRINGS = {
  es: {
    nav: [
      { label: 'INICIO', id: 'home' },
      { label: 'CÁPSULA 001', id: 'capsule' },
      { label: 'VOTÁ AHORA', id: 'vote', cta: true },
      { label: 'TIENDA PTB', id: 'merch' },
      { label: 'CONVOCATORIA', id: 'open-call' },
      { label: 'NOSOTROS', id: 'about' },
    ],
    steps: [
      { n: '01', title: 'VOS ELEGÍS EL CONCEPTO.', body: 'Cada cápsula arranca con una votación abierta a toda la comunidad.' },
      { n: '02', title: 'LOS ARTISTAS CREAN.', body: 'Diseñadores presentan propuestas privadas a partir del concepto ganador.' },
      { n: '03', title: 'VOS VOTÁS.', body: 'La comunidad elige, entre tres finalistas, cuál se convierte en realidad.' },
      { n: '04', title: 'LO HACEMOS REALIDAD.', body: 'PTB produce la colección ganadora y abre el drop limitado.' },
    ],
    products: [
      { name: 'REMERA PTB OVERSIZED', price: '$45', art: 'tee-oversized' },
      { name: 'REMERA PTB REGULAR', price: '$40', art: 'tee-regular' },
      { name: 'GORRA PTB', price: '$32', art: 'cap' },
      { name: 'MEDIAS PTB', price: '$18', art: 'socks' },
    ],
    footerCols: [
      { title: 'TIENDA', links: ['Tienda', 'Cápsulas', 'Merch'] },
      { title: 'COMUNIDAD', links: ['Votá Ahora', 'Convocatoria', 'Artistas', 'Archivo'] },
      { title: 'INFO', links: ['Nosotros', 'Preguntas Frecuentes', 'Envíos', 'Cambios'] },
      { title: 'LEGAL', links: ['Términos y Condiciones', 'Política de Privacidad', 'Términos de Convocatoria'] },
    ],
    heroEyebrow: 'CÁPSULA 001 · FASE 03 / VOTACIÓN FINAL',
    heroH1: ['LA MARCA', 'LA CREÁS', 'VOS.'],
    heroSub: 'Los artistas crean. Vos decidís. Nosotros lo hacemos realidad.',
    ctaExplore: 'VER CÁPSULA 001',
    ctaVote: 'VOTÁ AHORA',
    tickerTitle: 'VOTACIÓN EN VIVO',
    tickerLive: 'AL AIRE',
    tickerVotes: 'VOTOS HASTA AHORA',
    tickerResults: 'RESULTADOS',
    tickerHidden: 'OCULTOS HASTA EL CIERRE',
    howEyebrow: 'CÓMO FUNCIONA PTB',
    howTitle: 'De la idea de la comunidad al producto final.',
    capsuleEyebrow: 'CÁPSULA ACTUAL',
    capsuleTitle: 'PTB CÁPSULA 001',
    capsuleLabel: 'CÁPSULA 001',
    capsuleParticipants: '18.291 PERSONAS PARTICIPARON.',
    capsuleCta: 'VER CÁPSULA',
    voteEyebrow: 'LA VOTACIÓN ESTÁ ABIERTA',
    voteTitle: 'Elegí qué diseño se convierte en CÁPSULA 001.',
    votedSuffix: 'PERSONAS YA VOTARON',
    voteSelectPrompt: 'SELECCIONÁ UN FINALISTA',
    voteForPrefix: 'VOTAR POR',
    coreTitle: 'Piezas permanentes. Puerta de entrada a la comunidad.',
    coreCta: 'COMPRAR PTB',
    communityEyebrow: 'COMUNIDAD',
    communityTitle: ['PTB NO ES UNA AUDIENCIA.', 'ES UNA COMUNIDAD.'],
    nlEyebrow: 'SUMATE A PTB',
    nlTitle: 'Sé parte de la próxima decisión.',
    nlBody: 'Enterate primero de cada votación, convocatoria y lanzamiento.',
    nlPlaceholder: 'TU EMAIL',
    nlButton: 'SUMARME',
    nlConfirm: 'YA ESTÁS ADENTRO. BIENVENIDO A PTB.',
    footerTagline: 'LA MARCA LA CREÁS VOS.',
    copyright: '© 2026 PTB. TODOS LOS DERECHOS RESERVADOS.',
    ariaSearch: 'Buscar', ariaAccount: 'Cuenta', ariaCart: 'Carrito', ariaMenu: 'Menú', ariaClose: 'Cerrar',
    localeCode: 'es-AR',
  },
  en: {
    nav: [
      { label: 'HOME', id: 'home' },
      { label: 'CAPSULE 001', id: 'capsule' },
      { label: 'VOTE NOW', id: 'vote', cta: true },
      { label: 'PTB MERCH', id: 'merch' },
      { label: 'OPEN CALL', id: 'open-call' },
      { label: 'ABOUT', id: 'about' },
    ],
    steps: [
      { n: '01', title: 'YOU CHOOSE THE CONCEPT.', body: 'Each capsule starts with a vote open to the whole community.' },
      { n: '02', title: 'ARTISTS CREATE.', body: 'Designers submit private proposals based on the winning concept.' },
      { n: '03', title: 'YOU VOTE.', body: 'The community chooses, among three finalists, which one becomes real.' },
      { n: '04', title: 'WE MAKE IT REAL.', body: 'PTB produces the winning collection and opens the limited drop.' },
    ],
    products: [
      { name: 'PTB OVERSIZED TEE', price: '$45', art: 'tee-oversized' },
      { name: 'PTB REGULAR TEE', price: '$40', art: 'tee-regular' },
      { name: 'PTB CAP', price: '$32', art: 'cap' },
      { name: 'PTB SOCKS', price: '$18', art: 'socks' },
    ],
    footerCols: [
      { title: 'SHOP', links: ['Shop', 'Capsules', 'Merch'] },
      { title: 'COMMUNITY', links: ['Vote Now', 'Open Call', 'Artists', 'Archive'] },
      { title: 'INFO', links: ['About', 'FAQ', 'Shipping', 'Returns'] },
      { title: 'LEGAL', links: ['Terms & Conditions', 'Privacy Policy', 'Open Call Terms'] },
    ],
    heroEyebrow: 'CAPSULE 001 · PHASE 03 / FINAL VOTE',
    heroH1: ['YOU CREATE', 'THE BRAND.'],
    heroSub: 'Artists create. You decide. We make it real.',
    ctaExplore: 'EXPLORE CAPSULE 001',
    ctaVote: 'VOTE NOW',
    tickerTitle: 'LIVE VOTE',
    tickerLive: 'ON AIR',
    tickerVotes: 'VOTES SO FAR',
    tickerResults: 'RESULTS',
    tickerHidden: 'HIDDEN UNTIL CLOSE',
    howEyebrow: 'HOW PTB WORKS',
    howTitle: "From the community's idea to the final product.",
    capsuleEyebrow: 'CURRENT CAPSULE',
    capsuleTitle: 'PTB CAPSULE 001',
    capsuleLabel: 'CAPSULE 001',
    capsuleParticipants: '18,291 PEOPLE PARTICIPATED.',
    capsuleCta: 'VIEW CAPSULE',
    voteEyebrow: 'THE VOTE IS OPEN',
    voteTitle: 'Choose which design becomes CAPSULE 001.',
    votedSuffix: 'PEOPLE HAVE VOTED',
    voteSelectPrompt: 'SELECT A FINALIST',
    voteForPrefix: 'VOTE FOR',
    coreTitle: 'Permanent pieces. The entry point to the community.',
    coreCta: 'SHOP PTB',
    communityEyebrow: 'COMMUNITY',
    communityTitle: ['PTB IS NOT AN AUDIENCE.', "IT'S A COMMUNITY."],
    nlEyebrow: 'JOIN PTB',
    nlTitle: 'Be part of the next decision.',
    nlBody: 'Be the first to know about every vote, open call and drop.',
    nlPlaceholder: 'YOUR EMAIL',
    nlButton: 'JOIN',
    nlConfirm: "YOU'RE IN. WELCOME TO PTB.",
    footerTagline: 'YOU CREATE THE BRAND.',
    copyright: '© 2026 PTB. ALL RIGHTS RESERVED.',
    ariaSearch: 'Search', ariaAccount: 'Account', ariaCart: 'Cart', ariaMenu: 'Menu', ariaClose: 'Close',
    localeCode: 'en-US',
  },
};

function ProductArt({ type }) {
  const stroke = 'rgba(242,240,234,0.45)';
  const mark = (x, y, size = 12) => (
    <text x={x} y={y} textAnchor="middle" fill="var(--accent)" fontFamily="'JetBrains Mono',monospace" fontWeight="600" fontSize={size} letterSpacing="1">PTB</text>
  );
  if (type === 'tee-oversized') {
    return (
      <svg viewBox="0 0 160 180" width="62%" style={{ overflow: 'visible' }}>
        <path d="M55,20 C65,14 95,14 105,20 L128,26 L152,54 L132,68 L108,50 L112,168 L48,168 L52,50 L28,68 L8,54 L32,26 Z" fill="none" stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
        {mark(80, 108)}
      </svg>
    );
  }
  if (type === 'tee-regular') {
    return (
      <svg viewBox="0 0 160 180" width="56%" style={{ overflow: 'visible' }}>
        <path d="M60,20 C68,15 92,15 100,20 L116,24 L136,46 L118,58 L102,44 L106,168 L54,168 L58,44 L42,58 L24,46 L44,24 Z" fill="none" stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
        {mark(80, 100)}
      </svg>
    );
  }
  if (type === 'cap') {
    return (
      <svg viewBox="0 0 160 140" width="64%" style={{ overflow: 'visible' }}>
        <path d="M25,88 Q35,22 82,20 Q128,22 138,85 Q82,102 25,88 Z" fill="none" stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
        <path d="M28,82 Q0,86 4,98 Q8,106 48,92 Z" fill="none" stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
        <circle cx="82" cy="20" r="4" fill={stroke} />
        {mark(84, 60, 11)}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 160 180" width="50%" style={{ overflow: 'visible' }}>
      <path d="M55,15 L105,15 L105,95 L145,105 Q158,112 152,128 L120,148 Q108,152 100,140 L95,100 L55,100 Z" fill="none" stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
      <line x1="58" y1="26" x2="102" y2="26" stroke={stroke} strokeWidth="2" />
      <line x1="58" y1="33" x2="102" y2="33" stroke={stroke} strokeWidth="2" />
      <line x1="58" y1="40" x2="102" y2="40" stroke={stroke} strokeWidth="2" />
      {mark(80, 60, 10)}
    </svg>
  );
}

function FlagAR({ size = 18 }) {
  return (
    <svg width={size} height={size * 0.67} viewBox="0 0 30 20" aria-hidden="true">
      <rect width="30" height="20" fill="#74ACDF" />
      <rect y="6.5" width="30" height="7" fill="#F6F6F6" />
      <circle cx="15" cy="10" r="2.3" fill="#F6B40E" stroke="#85340A" strokeWidth="0.4" />
    </svg>
  );
}

function FlagUS({ size = 18 }) {
  const stripeH = 20 / 13;
  return (
    <svg width={size} height={size * 0.67} viewBox="0 0 30 20" aria-hidden="true">
      <rect width="30" height="20" fill="#B22234" />
      {[1, 3, 5, 7, 9, 11].map(i => <rect key={i} y={i * stripeH} width="30" height={stripeH} fill="#FFFFFF" />)}
      <rect width="13" height={stripeH * 7} fill="#3C3B6E" />
    </svg>
  );
}

export default function PTBHome() {
  const [lang, setLang] = useState('es');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selected, setSelected] = useState(null);
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const [voteCount, setVoteCount] = useState(12492);
  const [target] = useState(() => Date.now() + (2 * 86400000 + 14 * 3600000 + 32 * 60000));
  const { d, h, m, s } = useCountdown(target);
  const t = STRINGS[lang];
  const votes = voteCount.toLocaleString(t.localeCode);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (Math.random() > 0.6) setVoteCount(v => v + 1);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const handleJoin = (e) => {
    e.preventDefault();
    if (email.includes('@')) setJoined(true);
  };

  return (
    <div className="ptb-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@700;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

        .ptb-root {
          --black:#080808; --white:#f2f0ea; --graphite:#161615; --steel:#3a3a37; --ash:#8c8c85; --accent:#ff4fb0;
          background:var(--black); color:var(--white);
          font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;
          min-height:100vh; position:relative; overflow-x:hidden;
        }
        .ptb-root a:focus-visible, .ptb-root button:focus-visible, .ptb-root input:focus-visible {
          outline:2px solid var(--accent); outline-offset:2px;
        }
        @media (prefers-reduced-motion: reduce) {
          .ptb-root *, .ptb-root *::before, .ptb-root *::after {
            animation-duration:0.01ms !important; animation-iteration-count:1 !important; transition-duration:0.01ms !important;
          }
        }

        .ptb-display{ font-family:'Unbounded',sans-serif; font-weight:900; line-height:0.98; letter-spacing:-0.01em; }
        .ptb-mono{ font-family:'JetBrains Mono',monospace; letter-spacing:0.03em; }

        .ptb-grid-bg{
          background-image:
            linear-gradient(to right, rgba(242,240,234,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(242,240,234,0.05) 1px, transparent 1px);
          background-size:56px 56px;
        }

        .ptb-lang-bar{ display:flex; justify-content:flex-end; align-items:center; gap:4px; padding:8px 24px; border-bottom:1px solid rgba(242,240,234,.08); }
        .ptb-lang-btn{ display:flex; align-items:center; gap:6px; background:none; border:none; color:var(--ash); cursor:pointer; padding:4px 8px; opacity:.5; transition:opacity .2s; font-family:'JetBrains Mono',monospace; font-size:.68rem; letter-spacing:.05em; }
        .ptb-lang-btn.active{ opacity:1; color:var(--white); }
        .ptb-lang-btn:hover{ opacity:.85; }
        .ptb-lang-btn svg{ display:block; border-radius:2px; }

        .ptb-header{ position:sticky; top:0; z-index:50; display:flex; align-items:center; justify-content:space-between; padding:18px 24px; transition:all .3s ease; border-bottom:1px solid transparent; }
        .ptb-header.scrolled{ background:rgba(8,8,8,.86); backdrop-filter:blur(10px); border-bottom-color:rgba(242,240,234,.08); }
        .ptb-logo{ font-family:'Unbounded',sans-serif; font-weight:900; font-size:1.25rem; letter-spacing:.02em; }
        .ptb-nav{ display:none; gap:28px; align-items:center; }
        @media(min-width:900px){ .ptb-nav{ display:flex; } }
        .ptb-nav-link{ font-size:.72rem; letter-spacing:.1em; color:var(--ash); text-decoration:none; background:none; border:none; cursor:pointer; padding:6px 0; transition:color .2s; }
        .ptb-nav-link:hover{ color:var(--white); }
        .ptb-nav-link.cta{ color:var(--accent); font-weight:700; }
        .ptb-icons{ display:flex; gap:18px; align-items:center; }
        .ptb-icon-btn{ background:none; border:none; color:var(--white); cursor:pointer; padding:4px; display:flex; }
        .ptb-menu-toggle{ display:flex; }
        @media(min-width:900px){ .ptb-menu-toggle{ display:none; } }

        .ptb-mobile-menu{ position:fixed; inset:0; background:var(--black); z-index:100; display:flex; flex-direction:column; justify-content:center; padding:32px; gap:20px; }
        .ptb-mobile-link{ font-family:'Unbounded',sans-serif; font-weight:900; font-size:1.9rem; color:var(--white); text-decoration:none; }

        .ptb-hero{ min-height:92vh; display:flex; align-items:center; padding:100px 24px 64px; }
        .ptb-hero-inner{ display:grid; grid-template-columns:1fr; gap:48px; width:100%; max-width:1240px; margin:0 auto; align-items:end; }
        @media(min-width:960px){ .ptb-hero-inner{ grid-template-columns:1.3fr 0.9fr; align-items:center; } }
        .ptb-eyebrow{ display:flex; align-items:center; gap:10px; font-size:.68rem; color:var(--ash); margin-bottom:28px; }
        .ptb-dot{ width:6px; height:6px; border-radius:50%; background:var(--accent); animation:pulse 1.8s infinite; flex:none; }
        @keyframes pulse{ 0%,100%{opacity:1;} 50%{opacity:.25;} }
        .ptb-hero h1{ font-size:clamp(2.6rem,7.2vw,5.6rem); margin:0 0 28px; max-width:16ch; }
        .ptb-hero .sub{ color:var(--ash); font-size:clamp(.85rem,1.3vw,1rem); letter-spacing:.06em; text-transform:uppercase; max-width:38ch; margin-bottom:36px; }
        .ptb-cta-row{ display:flex; gap:14px; flex-wrap:wrap; }
        .ptb-btn{ font-family:'Inter',sans-serif; font-size:.78rem; letter-spacing:.09em; padding:15px 26px; display:inline-flex; align-items:center; gap:8px; cursor:pointer; transition:all .25s ease; text-decoration:none; border-radius:1px; }
        .ptb-btn-primary{ background:var(--accent); color:var(--black); border:1px solid var(--accent); font-weight:600; }
        .ptb-btn-primary:hover{ background:transparent; color:var(--accent); }
        .ptb-btn-outline{ background:transparent; color:var(--white); border:1px solid rgba(242,240,234,.28); }
        .ptb-btn-outline:hover{ border-color:var(--white); }
        .ptb-btn:disabled{ opacity:.35; cursor:not-allowed; }

        .ptb-ticker{ border:1px solid rgba(242,240,234,.14); background:rgba(242,240,234,.02); padding:22px; }
        .ptb-ticker-head{ display:flex; justify-content:space-between; align-items:baseline; margin-bottom:16px; padding-bottom:16px; border-bottom:1px solid rgba(242,240,234,.1); }
        .ptb-ticker-title{ font-size:.68rem; color:var(--ash); }
        .ptb-ticker-live{ font-size:.62rem; color:var(--accent); display:flex; align-items:center; gap:6px; }
        .ptb-ticker-candidates{ display:flex; gap:10px; margin-bottom:18px; }
        .ptb-ticker-candidate{ flex:1; text-align:center; border:1px solid rgba(242,240,234,.12); padding:10px 4px; font-family:'Unbounded',sans-serif; font-weight:900; font-size:1.1rem; color:var(--ash); }
        .ptb-ticker-row{ display:flex; justify-content:space-between; font-size:.72rem; color:var(--ash); margin-bottom:8px; }
        .ptb-ticker-row b{ color:var(--white); font-family:'JetBrains Mono',monospace; font-weight:500; }
        .ptb-ticker-cd{ display:flex; gap:6px; margin-top:14px; }
        .ptb-ticker-cd span{ font-family:'JetBrains Mono',monospace; font-size:.85rem; background:rgba(242,240,234,.06); padding:6px 8px; }

        .ptb-section{ padding:88px 24px; border-top:1px solid rgba(242,240,234,.08); max-width:1240px; margin:0 auto; }
        .ptb-eyebrow-line{ display:flex; align-items:center; gap:10px; font-size:.68rem; letter-spacing:.14em; color:var(--ash); margin-bottom:18px; }
        .ptb-eyebrow-line::before{ content:''; width:22px; height:1px; background:var(--accent); }
        .ptb-section h2{ font-size:clamp(1.7rem,3.6vw,2.7rem); margin:0 0 56px; max-width:22ch; }

        .ptb-steps{ display:grid; grid-template-columns:1fr; gap:1px; background:rgba(242,240,234,.08); }
        @media(min-width:820px){ .ptb-steps{ grid-template-columns:repeat(4,1fr); } }
        .ptb-step{ background:var(--black); padding:28px 22px; }
        .ptb-step .num{ font-family:'JetBrains Mono',monospace; font-size:.8rem; color:var(--accent); margin-bottom:20px; }
        .ptb-step .stitle{ font-size:.95rem; font-weight:600; margin-bottom:10px; letter-spacing:.01em; }
        .ptb-step .sbody{ font-size:.8rem; color:var(--ash); line-height:1.55; }

        .ptb-capsule-card{ display:grid; grid-template-columns:1fr; gap:32px; border:1px solid rgba(242,240,234,.1); padding:36px; align-items:center; }
        @media(min-width:820px){ .ptb-capsule-card{ grid-template-columns:0.8fr 1fr; } }
        .ptb-capsule-visual{ aspect-ratio:4/5; background:var(--graphite); display:flex; align-items:center; justify-content:center; border:1px solid rgba(242,240,234,.08); }
        .ptb-capsule-visual span{ font-family:'Unbounded',sans-serif; font-weight:900; font-size:3.4rem; color:rgba(242,240,234,.12); }

        .ptb-vote-meta{ display:flex; flex-wrap:wrap; gap:16px; align-items:center; justify-content:space-between; margin-bottom:36px; }
        .ptb-vote-grid{ display:grid; grid-template-columns:1fr; gap:18px; }
        @media(min-width:820px){ .ptb-vote-grid{ grid-template-columns:repeat(3,1fr); } }
        .ptb-vote-card{ width:100%; display:block; text-align:left; border:1px solid rgba(242,240,234,.12); cursor:pointer; transition:border-color .25s, transform .25s; background:var(--graphite); padding:0; color:var(--white); font-family:inherit; }
        .ptb-vote-card:hover, .ptb-vote-card.selected{ border-color:var(--accent); transform:translateY(-3px); }
        .ptb-vote-visual{ aspect-ratio:1; display:flex; align-items:center; justify-content:center; border-bottom:1px solid rgba(242,240,234,.1); }
        .ptb-vote-visual span{ font-family:'Unbounded',sans-serif; font-weight:900; font-size:2.6rem; color:rgba(242,240,234,.12); }
        .ptb-vote-info{ padding:18px; }
        .ptb-vote-key{ font-family:'JetBrains Mono',monospace; color:var(--accent); font-size:1rem; margin-bottom:8px; }
        .ptb-vote-artist{ font-size:.85rem; font-weight:600; }
        .ptb-vote-name{ font-size:.75rem; color:var(--ash); margin-top:2px; }

        .ptb-core-grid{ display:grid; grid-template-columns:repeat(2,1fr); gap:1px; background:rgba(242,240,234,.08); }
        @media(min-width:820px){ .ptb-core-grid{ grid-template-columns:repeat(4,1fr); } }
        .ptb-product-card{ background:var(--black); padding:22px; cursor:pointer; }
        .ptb-product-visual{ aspect-ratio:3/4; background:var(--graphite); margin-bottom:16px; display:flex; align-items:center; justify-content:center; transition:opacity .3s; }
        .ptb-product-card:hover .ptb-product-visual{ opacity:.7; }
        .ptb-product-name{ font-size:.8rem; margin-bottom:4px; }
        .ptb-product-price{ font-size:.78rem; color:var(--ash); font-family:'JetBrains Mono',monospace; }

        .ptb-community-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:6px; margin-top:40px; }
        @media(min-width:820px){ .ptb-community-grid{ grid-template-columns:repeat(6,1fr); } }
        .ptb-ugc-tile{ aspect-ratio:1; background:var(--graphite); border:1px solid rgba(242,240,234,.06); }

        .ptb-newsletter{ text-align:center; padding:110px 24px; max-width:640px; margin:0 auto; }
        .ptb-newsletter h2{ font-size:clamp(1.9rem,4.6vw,3rem); margin:16px 0 12px; }
        .ptb-newsletter p{ color:var(--ash); margin-bottom:36px; font-size:.9rem; }
        .ptb-nl-form{ display:flex; border:1px solid rgba(242,240,234,.22); max-width:420px; margin:0 auto; }
        .ptb-nl-form input{ flex:1; background:transparent; border:none; padding:15px 16px; color:var(--white); font-size:.85rem; font-family:'Inter',sans-serif; }
        .ptb-nl-form button{ background:var(--accent); color:var(--black); border:none; padding:0 22px; font-weight:600; font-size:.72rem; letter-spacing:.08em; cursor:pointer; }

        .ptb-footer{ padding:70px 24px 28px; border-top:1px solid rgba(242,240,234,.08); max-width:1240px; margin:0 auto; }
        .ptb-footer-grid{ display:grid; grid-template-columns:1fr; gap:36px; margin-bottom:56px; }
        @media(min-width:820px){ .ptb-footer-grid{ grid-template-columns:1.6fr repeat(4,1fr); } }
        .ptb-footer-col h4{ font-size:.68rem; letter-spacing:.1em; color:var(--ash); margin-bottom:14px; }
        .ptb-footer-col a{ display:block; font-size:.82rem; color:var(--white); text-decoration:none; margin-bottom:9px; opacity:.85; }
        .ptb-footer-col a:hover{ opacity:1; color:var(--accent); }
        .ptb-footer-bottom{ display:flex; flex-wrap:wrap; justify-content:space-between; gap:14px; font-size:.68rem; color:var(--ash); font-family:'JetBrains Mono',monospace; padding-top:24px; border-top:1px solid rgba(242,240,234,.06); }
        .ptb-footer-bottom a{ color:var(--ash); text-decoration:none; }
        .ptb-footer-bottom a:hover{ color:var(--white); }
      `}</style>

      <div className="ptb-lang-bar">
        <button className={`ptb-lang-btn ${lang === 'es' ? 'active' : ''}`} onClick={() => setLang('es')} aria-pressed={lang === 'es'}>
          <FlagAR size={18} /><span>ES</span>
        </button>
        <button className={`ptb-lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')} aria-pressed={lang === 'en'}>
          <FlagUS size={18} /><span>EN</span>
        </button>
      </div>

      <header className={`ptb-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="ptb-logo">PTB</div>
        <nav className="ptb-nav">
          {t.nav.map(l => (
            <a key={l.id} href={`#${l.id}`} className={`ptb-nav-link ${l.cta ? 'cta' : ''}`}>{l.label}</a>
          ))}
        </nav>
        <div className="ptb-icons">
          <button className="ptb-icon-btn" aria-label={t.ariaSearch}><Search size={17} /></button>
          <button className="ptb-icon-btn" aria-label={t.ariaAccount}><User size={17} /></button>
          <button className="ptb-icon-btn" aria-label={t.ariaCart}><ShoppingBag size={17} /></button>
          <button className="ptb-icon-btn ptb-menu-toggle" aria-label={t.ariaMenu} onClick={() => setMenuOpen(true)}><Menu size={20} /></button>
        </div>
      </header>

      {menuOpen && (
        <div className="ptb-mobile-menu">
          <button className="ptb-icon-btn" style={{ position: 'absolute', top: 24, right: 24 }} onClick={() => setMenuOpen(false)} aria-label={t.ariaClose}><X size={26} /></button>
          {t.nav.map(l => (
            <a key={l.id} href={`#${l.id}`} className="ptb-mobile-link" onClick={() => setMenuOpen(false)} style={l.cta ? { color: 'var(--accent)' } : undefined}>{l.label}</a>
          ))}
        </div>
      )}

      <section id="home" className="ptb-hero ptb-grid-bg">
        <div className="ptb-hero-inner">
          <div>
            <div className="ptb-eyebrow">
              <span className="ptb-dot" />
              <span className="ptb-mono">{t.heroEyebrow}</span>
            </div>
            <h1 className="ptb-display">
              {t.heroH1.map((line, i) => (
                <Fragment key={i}>{line}{i < t.heroH1.length - 1 && <br />}</Fragment>
              ))}
            </h1>
            <p className="sub">{t.heroSub}</p>
            <div className="ptb-cta-row">
              <a href="#capsule" className="ptb-btn ptb-btn-primary">{t.ctaExplore} <ArrowUpRight size={15} /></a>
              <a href="#vote" className="ptb-btn ptb-btn-outline">{t.ctaVote}</a>
            </div>
          </div>

          <div className="ptb-ticker">
            <div className="ptb-ticker-head">
              <span className="ptb-ticker-title ptb-mono">{t.tickerTitle}</span>
              <span className="ptb-ticker-live ptb-mono"><span className="ptb-dot" /> {t.tickerLive}</span>
            </div>
            <div className="ptb-ticker-candidates">
              {FINALISTS.map(f => <div key={f.key} className="ptb-ticker-candidate">{f.key}</div>)}
            </div>
            <div className="ptb-ticker-row"><span>{t.tickerVotes}</span><b>{votes}</b></div>
            <div className="ptb-ticker-row"><span>{t.tickerResults}</span><b>{t.tickerHidden}</b></div>
            <div className="ptb-ticker-cd">
              <span>{pad(d)}D</span><span>{pad(h)}H</span><span>{pad(m)}M</span><span>{pad(s)}S</span>
            </div>
          </div>
        </div>
      </section>

      <section className="ptb-section">
        <div className="ptb-eyebrow-line">{t.howEyebrow}</div>
        <h2 className="ptb-display">{t.howTitle}</h2>
        <div className="ptb-steps">
          {t.steps.map(st => (
            <div key={st.n} className="ptb-step">
              <div className="num">{st.n}</div>
              <div className="stitle">{st.title}</div>
              <div className="sbody">{st.body}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="capsule" className="ptb-section">
        <div className="ptb-eyebrow-line">{t.capsuleEyebrow}</div>
        <h2 className="ptb-display">{t.capsuleTitle}</h2>
        <div className="ptb-capsule-card">
          <div className="ptb-capsule-visual"><span>001</span></div>
          <div>
            <div className="ptb-mono" style={{ fontSize: '.7rem', color: 'var(--ash)', marginBottom: 14 }}>{t.capsuleLabel}</div>
            <div className="ptb-display" style={{ fontSize: '2.6rem', marginBottom: 22 }}>CHAOS</div>
            <p className="ptb-mono" style={{ color: 'var(--ash)', fontSize: '.8rem', marginBottom: 30 }}>{t.capsuleParticipants}</p>
            <a href="#capsule" className="ptb-btn ptb-btn-outline">{t.capsuleCta} <ArrowUpRight size={15} /></a>
          </div>
        </div>
      </section>

      <section id="vote" className="ptb-section">
        <div className="ptb-eyebrow-line">{t.voteEyebrow}</div>
        <h2 className="ptb-display">{t.voteTitle}</h2>
        <div className="ptb-vote-meta">
          <div className="ptb-mono" style={{ fontSize: '.75rem', color: 'var(--ash)' }}>{votes} {t.votedSuffix}</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[['D', d], ['H', h], ['M', m], ['S', s]].map(([label, val]) => (
              <span key={label} className="ptb-mono" style={{ fontSize: '.75rem', background: 'rgba(242,240,234,.06)', padding: '6px 9px' }}>{pad(val)}{label}</span>
            ))}
          </div>
        </div>
        <div className="ptb-vote-grid">
          {FINALISTS.map(f => (
            <button key={f.key} className={`ptb-vote-card ${selected === f.key ? 'selected' : ''}`} onClick={() => setSelected(f.key)}>
              <div className="ptb-vote-visual"><span>{f.key}</span></div>
              <div className="ptb-vote-info">
                <div className="ptb-vote-key">{f.key}</div>
                <div className="ptb-vote-artist">{f.artist}</div>
                <div className="ptb-vote-name">"{f.name}"</div>
              </div>
            </button>
          ))}
        </div>
        <div style={{ marginTop: 28 }}>
          <button className="ptb-btn ptb-btn-primary" disabled={!selected}>
            {selected ? `${t.voteForPrefix} ${selected}` : t.voteSelectPrompt}
          </button>
        </div>
      </section>

      <section id="merch" className="ptb-section">
        <div className="ptb-eyebrow-line">PTB CORE</div>
        <h2 className="ptb-display">{t.coreTitle}</h2>
        <div className="ptb-core-grid">
          {t.products.map(p => (
            <div key={p.name} className="ptb-product-card">
              <div className="ptb-product-visual"><ProductArt type={p.art} /></div>
              <div className="ptb-product-name">{p.name}</div>
              <div className="ptb-product-price">{p.price}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 36 }}>
          <a href="#merch" className="ptb-btn ptb-btn-outline">{t.coreCta} <ArrowUpRight size={15} /></a>
        </div>
      </section>

      <section id="open-call" className="ptb-section">
        <div className="ptb-eyebrow-line">{t.communityEyebrow}</div>
        <h2 className="ptb-display">
          {t.communityTitle.map((line, i) => (
            <Fragment key={i}>{line}{i < t.communityTitle.length - 1 && <br />}</Fragment>
          ))}
        </h2>
        <div className="ptb-community-grid">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="ptb-ugc-tile" />)}
        </div>
      </section>

      <section id="about" className="ptb-newsletter">
        <div className="ptb-mono" style={{ fontSize: '.7rem', color: 'var(--ash)' }}>{t.nlEyebrow}</div>
        <h2 className="ptb-display">{t.nlTitle}</h2>
        <p>{t.nlBody}</p>
        {!joined ? (
          <form className="ptb-nl-form" onSubmit={handleJoin}>
            <input type="email" placeholder={t.nlPlaceholder} value={email} onChange={e => setEmail(e.target.value)} required />
            <button type="submit">{t.nlButton}</button>
          </form>
        ) : (
          <div className="ptb-mono" style={{ color: 'var(--accent)', fontSize: '.85rem' }}>{t.nlConfirm}</div>
        )}
      </section>

      <footer className="ptb-footer">
        <div className="ptb-footer-grid">
          <div>
            <div className="ptb-logo" style={{ marginBottom: 16 }}>PTB</div>
            <p style={{ color: 'var(--ash)', fontSize: '.8rem', maxWidth: '26ch' }}>{t.footerTagline}</p>
          </div>
          {t.footerCols.map(col => (
            <div key={col.title} className="ptb-footer-col">
              <h4>{col.title}</h4>
              {col.links.map(l => <a key={l} href="#">{l}</a>)}
            </div>
          ))}
        </div>
        <div className="ptb-footer-bottom">
          <span>{t.copyright}</span>
          <div style={{ display: 'flex', gap: 18 }}>
            <a href="#">INSTAGRAM</a>
            <a href="#">TIKTOK</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
