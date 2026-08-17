import { useState, useEffect } from 'react';
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

const NAV_LINKS = [
  { label: 'HOME', id: 'home' },
  { label: 'CAPSULE 001', id: 'capsule' },
  { label: 'VOTE NOW', id: 'vote', cta: true },
  { label: 'PTB MERCH', id: 'merch' },
  { label: 'OPEN CALL', id: 'open-call' },
  { label: 'ABOUT', id: 'about' },
];

const STEPS = [
  { n: '01', title: 'YOU CHOOSE THE CONCEPT.', body: 'Cada cápsula arranca con una votación abierta a toda la comunidad.' },
  { n: '02', title: 'ARTISTS CREATE.', body: 'Diseñadores presentan propuestas privadas a partir del concepto ganador.' },
  { n: '03', title: 'YOU VOTE.', body: 'La comunidad elige, entre tres finalistas, cuál se convierte en realidad.' },
  { n: '04', title: 'WE MAKE IT REAL.', body: 'PTB produce la colección ganadora y abre el drop limitado.' },
];

const FINALISTS = [
  { key: 'A', artist: 'SOFÍA REYES', name: 'STATIC' },
  { key: 'B', artist: 'MATEO DUARTE', name: 'DRIFT' },
  { key: 'C', artist: 'LUNA ITO', name: 'ECHO' },
];

const CORE_PRODUCTS = [
  { name: 'PTB OVERSIZED TEE', price: '$45' },
  { name: 'PTB REGULAR TEE', price: '$40' },
  { name: 'PTB CAP', price: '$32' },
  { name: 'PTB SOCKS', price: '$18' },
];

const FOOTER_COLS = [
  { title: 'SHOP', links: ['Shop', 'Capsules', 'Merch'] },
  { title: 'COMMUNITY', links: ['Vote Now', 'Open Call', 'Artists', 'Archive'] },
  { title: 'INFO', links: ['About', 'FAQ', 'Shipping', 'Returns'] },
  { title: 'LEGAL', links: ['Terms & Conditions', 'Privacy Policy', 'Open Call Terms'] },
];

export default function PTBHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selected, setSelected] = useState(null);
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const [voteCount, setVoteCount] = useState(12492);
  const [target] = useState(() => Date.now() + (2 * 86400000 + 14 * 3600000 + 32 * 60000));
  const { d, h, m, s } = useCountdown(target);

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
        .ptb-hero h1{ font-size:clamp(2.6rem,7.2vw,5.6rem); margin:0 0 28px; max-width:14ch; }
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
        .ptb-product-visual span{ font-family:'JetBrains Mono',monospace; font-size:.62rem; color:var(--ash); letter-spacing:.08em; }
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

      <header className={`ptb-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="ptb-logo">PTB</div>
        <nav className="ptb-nav">
          {NAV_LINKS.map(l => (
            <a key={l.id} href={`#${l.id}`} className={`ptb-nav-link ${l.cta ? 'cta' : ''}`}>{l.label}</a>
          ))}
        </nav>
        <div className="ptb-icons">
          <button className="ptb-icon-btn" aria-label="Buscar"><Search size={17} /></button>
          <button className="ptb-icon-btn" aria-label="Cuenta"><User size={17} /></button>
          <button className="ptb-icon-btn" aria-label="Carrito"><ShoppingBag size={17} /></button>
          <button className="ptb-icon-btn ptb-menu-toggle" aria-label="Menú" onClick={() => setMenuOpen(true)}><Menu size={20} /></button>
        </div>
      </header>

      {menuOpen && (
        <div className="ptb-mobile-menu">
          <button className="ptb-icon-btn" style={{ position: 'absolute', top: 24, right: 24 }} onClick={() => setMenuOpen(false)} aria-label="Cerrar"><X size={26} /></button>
          {NAV_LINKS.map(l => (
            <a key={l.id} href={`#${l.id}`} className="ptb-mobile-link" onClick={() => setMenuOpen(false)} style={l.cta ? { color: 'var(--accent)' } : undefined}>{l.label}</a>
          ))}
        </div>
      )}

      <section id="home" className="ptb-hero ptb-grid-bg">
        <div className="ptb-hero-inner">
          <div>
            <div className="ptb-eyebrow">
              <span className="ptb-dot" />
              <span className="ptb-mono">CAPSULE 001 · PHASE 03 / FINAL VOTE</span>
            </div>
            <h1 className="ptb-display">LA MARCA<br />LA CREÁS<br />VOS.</h1>
            <p className="sub">Artists create. You decide. We make it real.</p>
            <div className="ptb-cta-row">
              <a href="#capsule" className="ptb-btn ptb-btn-primary">EXPLORE CAPSULE 001 <ArrowUpRight size={15} /></a>
              <a href="#vote" className="ptb-btn ptb-btn-outline">VOTE NOW</a>
            </div>
          </div>

          <div className="ptb-ticker">
            <div className="ptb-ticker-head">
              <span className="ptb-ticker-title ptb-mono">LIVE VOTE</span>
              <span className="ptb-ticker-live ptb-mono"><span className="ptb-dot" /> ON AIR</span>
            </div>
            <div className="ptb-ticker-candidates">
              {FINALISTS.map(f => <div key={f.key} className="ptb-ticker-candidate">{f.key}</div>)}
            </div>
            <div className="ptb-ticker-row"><span>VOTES SO FAR</span><b>{voteCount.toLocaleString('en-US')}</b></div>
            <div className="ptb-ticker-row"><span>RESULTS</span><b>HIDDEN UNTIL CLOSE</b></div>
            <div className="ptb-ticker-cd">
              <span>{pad(d)}D</span><span>{pad(h)}H</span><span>{pad(m)}M</span><span>{pad(s)}S</span>
            </div>
          </div>
        </div>
      </section>

      <section className="ptb-section">
        <div className="ptb-eyebrow-line">HOW PTB WORKS</div>
        <h2 className="ptb-display">De la idea de la comunidad al producto final.</h2>
        <div className="ptb-steps">
          {STEPS.map(s => (
            <div key={s.n} className="ptb-step">
              <div className="num">{s.n}</div>
              <div className="stitle">{s.title}</div>
              <div className="sbody">{s.body}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="capsule" className="ptb-section">
        <div className="ptb-eyebrow-line">CURRENT CAPSULE</div>
        <h2 className="ptb-display">PTB CAPSULE 001</h2>
        <div className="ptb-capsule-card">
          <div className="ptb-capsule-visual"><span>001</span></div>
          <div>
            <div className="ptb-mono" style={{ fontSize: '.7rem', color: 'var(--ash)', marginBottom: 14 }}>CAPSULE 001</div>
            <div className="ptb-display" style={{ fontSize: '2.6rem', marginBottom: 22 }}>CHAOS</div>
            <p className="ptb-mono" style={{ color: 'var(--ash)', fontSize: '.8rem', marginBottom: 30 }}>18,291 PEOPLE PARTICIPATED.</p>
            <a href="#capsule" className="ptb-btn ptb-btn-outline">VIEW CAPSULE <ArrowUpRight size={15} /></a>
          </div>
        </div>
      </section>

      <section id="vote" className="ptb-section">
        <div className="ptb-eyebrow-line">THE VOTE IS OPEN</div>
        <h2 className="ptb-display">Elegí qué diseño se convierte en CAPSULE 001.</h2>
        <div className="ptb-vote-meta">
          <div className="ptb-mono" style={{ fontSize: '.75rem', color: 'var(--ash)' }}>{voteCount.toLocaleString('en-US')} PEOPLE HAVE VOTED</div>
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
            {selected ? `VOTE FOR ${selected}` : 'SELECCIONÁ UN FINALISTA'}
          </button>
        </div>
      </section>

      <section id="merch" className="ptb-section">
        <div className="ptb-eyebrow-line">PTB CORE</div>
        <h2 className="ptb-display">Piezas permanentes. Puerta de entrada a la comunidad.</h2>
        <div className="ptb-core-grid">
          {CORE_PRODUCTS.map(p => (
            <div key={p.name} className="ptb-product-card">
              <div className="ptb-product-visual"><span>IMG</span></div>
              <div className="ptb-product-name">{p.name}</div>
              <div className="ptb-product-price">{p.price}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 36 }}>
          <a href="#merch" className="ptb-btn ptb-btn-outline">SHOP PTB <ArrowUpRight size={15} /></a>
        </div>
      </section>

      <section id="open-call" className="ptb-section">
        <div className="ptb-eyebrow-line">COMMUNITY</div>
        <h2 className="ptb-display">PTB IS NOT AN AUDIENCE.<br />IT'S A COMMUNITY.</h2>
        <div className="ptb-community-grid">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="ptb-ugc-tile" />)}
        </div>
      </section>

      <section id="about" className="ptb-newsletter">
        <div className="ptb-mono" style={{ fontSize: '.7rem', color: 'var(--ash)' }}>JOIN PTB</div>
        <h2 className="ptb-display">Be part of the next decision.</h2>
        <p>Enterate primero de cada votación, open call y drop.</p>
        {!joined ? (
          <form className="ptb-nl-form" onSubmit={handleJoin}>
            <input type="email" placeholder="TU EMAIL" value={email} onChange={e => setEmail(e.target.value)} required />
            <button type="submit">JOIN</button>
          </form>
        ) : (
          <div className="ptb-mono" style={{ color: 'var(--accent)', fontSize: '.85rem' }}>YOU'RE IN. WELCOME TO PTB.</div>
        )}
      </section>

      <footer className="ptb-footer">
        <div className="ptb-footer-grid">
          <div>
            <div className="ptb-logo" style={{ marginBottom: 16 }}>PTB</div>
            <p style={{ color: 'var(--ash)', fontSize: '.8rem', maxWidth: '26ch' }}>LA MARCA LA CREÁS VOS.</p>
          </div>
          {FOOTER_COLS.map(col => (
            <div key={col.title} className="ptb-footer-col">
              <h4>{col.title}</h4>
              {col.links.map(l => <a key={l} href="#">{l}</a>)}
            </div>
          ))}
        </div>
        <div className="ptb-footer-bottom">
          <span>© 2026 PTB. ALL RIGHTS RESERVED.</span>
          <div style={{ display: 'flex', gap: 18 }}>
            <a href="#">INSTAGRAM</a>
            <a href="#">TIKTOK</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
