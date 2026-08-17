import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

const adminStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@700;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
  .admin-root { --black:#080808; --white:#f2f0ea; --graphite:#161615; --ash:#8c8c85; --accent:#ff4fb0;
    background:var(--black); color:var(--white); min-height:100vh; font-family:'Inter',sans-serif; }
  .admin-root a:focus-visible, .admin-root button:focus-visible, .admin-root input:focus-visible, .admin-root textarea:focus-visible {
    outline:2px solid var(--accent); outline-offset:2px; }
  .admin-login { max-width:340px; margin:0 auto; padding-top:18vh; text-align:center; }
  .admin-logo { font-family:'Unbounded',sans-serif; font-weight:900; font-size:1.4rem; letter-spacing:.03em; margin-bottom:6px; }
  .admin-login h1 { font-size:.75rem; color:var(--ash); font-weight:500; margin:0 0 32px; text-transform:uppercase; letter-spacing:.15em; }
  .admin-login form { display:flex; flex-direction:column; gap:12px; }
  .admin-login input { background:var(--graphite); border:1px solid rgba(242,240,234,.15); color:var(--white); padding:13px 14px; font-size:.9rem; border-radius:2px; font-family:'Inter',sans-serif; }
  .admin-login button { background:var(--accent); color:var(--black); border:none; padding:13px; font-weight:600; font-size:.8rem; letter-spacing:.05em; cursor:pointer; border-radius:2px; margin-top:8px; }
  .admin-login button:disabled { opacity:.5; cursor:not-allowed; }
  .admin-error { color:var(--accent); font-size:.78rem; text-align:left; }
  .admin-header { display:flex; justify-content:space-between; align-items:center; padding:18px 24px; border-bottom:1px solid rgba(242,240,234,.1); }
  .admin-link, .admin-link-btn { color:var(--ash); font-size:.75rem; text-decoration:none; background:none; border:none; cursor:pointer; letter-spacing:.03em; }
  .admin-link:hover, .admin-link-btn:hover { color:var(--white); }
  .admin-saved { color:var(--accent); font-size:.75rem; font-family:'JetBrains Mono',monospace; }
  .admin-tabs { display:flex; gap:4px; padding:16px 24px 0; border-bottom:1px solid rgba(242,240,234,.1); overflow-x:auto; }
  .admin-tabs button { background:none; border:none; color:var(--ash); padding:10px 16px; font-size:.78rem; cursor:pointer; border-bottom:2px solid transparent; white-space:nowrap; }
  .admin-tabs button.active { color:var(--white); border-bottom-color:var(--accent); }
  .admin-main { padding:32px 24px 64px; max-width:960px; margin:0 auto; }
  .admin-grid { display:grid; grid-template-columns:1fr; gap:20px; }
  @media(min-width:700px) { .admin-grid { grid-template-columns:1fr 1fr; } }
  .admin-card { background:var(--graphite); border:1px solid rgba(242,240,234,.08); border-radius:4px; padding:20px; display:flex; flex-direction:column; gap:14px; }
  .admin-field { display:flex; flex-direction:column; gap:6px; }
  .admin-field label { font-size:.7rem; color:var(--ash); letter-spacing:.04em; }
  .admin-field input, .admin-field textarea { background:var(--black); border:1px solid rgba(242,240,234,.15); color:var(--white); padding:10px 12px; font-size:.85rem; border-radius:2px; font-family:'Inter',sans-serif; }
  .admin-field textarea { min-height:56px; resize:vertical; }
  .admin-image-row { display:flex; align-items:center; gap:14px; }
  .admin-image-preview { width:64px; height:64px; background:var(--black); border:1px solid rgba(242,240,234,.1); display:flex; align-items:center; justify-content:center; overflow:hidden; flex:none; border-radius:2px; }
  .admin-image-preview img { width:100%; height:100%; object-fit:cover; }
  .admin-image-preview span { font-size:.55rem; color:var(--ash); text-align:center; padding:4px; }
  .admin-upload-btn { background:none; border:1px solid rgba(242,240,234,.2); color:var(--white); padding:8px 14px; font-size:.72rem; cursor:pointer; border-radius:2px; display:inline-block; }
  .admin-upload-btn:hover { border-color:var(--accent); }
  .admin-save-btn { background:var(--accent); color:var(--black); border:none; padding:11px 20px; font-weight:600; font-size:.78rem; cursor:pointer; border-radius:2px; align-self:flex-start; }
  .admin-save-btn:disabled { opacity:.5; cursor:not-allowed; }
  .admin-loading { padding:80px 24px; text-align:center; color:var(--ash); font-size:.85rem; }
`;

function ImageField({ label, url, onFileSelected, uploading }) {
  const inputId = 'img-' + label.replace(/\s+/g, '-');
  return (
    <div className="admin-field">
      <label>{label}</label>
      <div className="admin-image-row">
        <div className="admin-image-preview">
          {url ? <img src={url} alt="" /> : <span>Sin imagen</span>}
        </div>
        <label htmlFor={inputId} className="admin-upload-btn">
          {uploading ? 'Subiendo…' : 'Subir imagen'}
          <input
            id={inputId}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => e.target.files[0] && onFileSelected(e.target.files[0])}
          />
        </label>
      </div>
    </div>
  );
}

function ProductEditor({ product, onChange, onSave, onUpload, saving }) {
  const [uploading, setUploading] = useState(false);

  async function handleFile(file) {
    setUploading(true);
    try {
      const url = await onUpload(file);
      onChange({ ...product, image_url: url });
    } catch {
      alert('No se pudo subir la imagen.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="admin-card">
      <ImageField label={product.name_es} url={product.image_url} onFileSelected={handleFile} uploading={uploading} />
      <div className="admin-field">
        <label>Nombre (ES)</label>
        <input value={product.name_es} onChange={(e) => onChange({ ...product, name_es: e.target.value })} />
      </div>
      <div className="admin-field">
        <label>Nombre (EN)</label>
        <input value={product.name_en} onChange={(e) => onChange({ ...product, name_en: e.target.value })} />
      </div>
      <div className="admin-field">
        <label>Precio</label>
        <input value={product.price} onChange={(e) => onChange({ ...product, price: e.target.value })} />
      </div>
      <button className="admin-save-btn" onClick={onSave} disabled={saving}>Guardar</button>
    </div>
  );
}

function CapsuleEditor({ capsule, onChange, onSave, onUpload, saving }) {
  const [uploading, setUploading] = useState(false);

  async function handleFile(file) {
    setUploading(true);
    try {
      const url = await onUpload(file);
      onChange({ ...capsule, image_url: url });
    } catch {
      alert('No se pudo subir la imagen.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="admin-card" style={{ maxWidth: 480 }}>
      <ImageField label="Imagen de la cápsula" url={capsule.image_url} onFileSelected={handleFile} uploading={uploading} />
      <div className="admin-field">
        <label>Nombre de la cápsula</label>
        <input value={capsule.name} onChange={(e) => onChange({ ...capsule, name: e.target.value })} />
      </div>
      <div className="admin-field">
        <label>Fase actual (ES)</label>
        <input value={capsule.phase_es} onChange={(e) => onChange({ ...capsule, phase_es: e.target.value })} />
      </div>
      <div className="admin-field">
        <label>Fase actual (EN)</label>
        <input value={capsule.phase_en} onChange={(e) => onChange({ ...capsule, phase_en: e.target.value })} />
      </div>
      <div className="admin-field">
        <label>Participantes</label>
        <input type="number" value={capsule.participants} onChange={(e) => onChange({ ...capsule, participants: Number(e.target.value) })} />
      </div>
      <button className="admin-save-btn" onClick={onSave} disabled={saving}>Guardar</button>
    </div>
  );
}

function HeroEditor({ hero, onChange, onSave, saving }) {
  return (
    <div className="admin-card" style={{ maxWidth: 480 }}>
      <div className="admin-field">
        <label>Título del hero (ES)</label>
        <textarea value={hero.title_es} onChange={(e) => onChange({ ...hero, title_es: e.target.value })} />
      </div>
      <div className="admin-field">
        <label>Título del hero (EN)</label>
        <textarea value={hero.title_en} onChange={(e) => onChange({ ...hero, title_en: e.target.value })} />
      </div>
      <div className="admin-field">
        <label>Bajada (ES)</label>
        <textarea value={hero.subtitle_es} onChange={(e) => onChange({ ...hero, subtitle_es: e.target.value })} />
      </div>
      <div className="admin-field">
        <label>Bajada (EN)</label>
        <textarea value={hero.subtitle_en} onChange={(e) => onChange({ ...hero, subtitle_en: e.target.value })} />
      </div>
      <button className="admin-save-btn" onClick={onSave} disabled={saving}>Guardar</button>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError('Email o contraseña incorrectos.');
  }

  return (
    <div className="admin-root">
      <style>{adminStyles}</style>
      <div className="admin-login">
        <div className="admin-logo">PTB</div>
        <h1>Admin</h1>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="username" />
          <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
          {error && <div className="admin-error">{error}</div>}
          <button type="submit" disabled={loading}>{loading ? 'Ingresando…' : 'Ingresar'}</button>
        </form>
      </div>
    </div>
  );
}

function Dashboard() {
  const [tab, setTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [capsule, setCapsule] = useState(null);
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  useEffect(() => { loadAll(); }, []);

  async function loadAll() {
    setLoading(true);
    const [{ data: p }, { data: c }, { data: h }] = await Promise.all([
      supabase.from('ptb_products').select('*').order('sort_order'),
      supabase.from('ptb_capsule').select('*').eq('id', 1).single(),
      supabase.from('ptb_hero_content').select('*').eq('id', 1).single(),
    ]);
    setProducts(p || []);
    setCapsule(c);
    setHero(h);
    setLoading(false);
  }

  async function uploadImage(file) {
    const ext = file.name.split('.').pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from('ptb-images').upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from('ptb-images').getPublicUrl(path);
    return data.publicUrl;
  }

  function flashSaved() {
    setSavedMsg('Guardado ✓');
    setTimeout(() => setSavedMsg(''), 2000);
  }

  async function saveProduct(index) {
    setSaving(true);
    const p = products[index];
    await supabase.from('ptb_products').update({
      name_es: p.name_es, name_en: p.name_en, price: p.price, image_url: p.image_url,
    }).eq('id', p.id);
    setSaving(false);
    flashSaved();
  }

  async function saveCapsule() {
    setSaving(true);
    await supabase.from('ptb_capsule').update(capsule).eq('id', 1);
    setSaving(false);
    flashSaved();
  }

  async function saveHero() {
    setSaving(true);
    await supabase.from('ptb_hero_content').update(hero).eq('id', 1);
    setSaving(false);
    flashSaved();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  if (loading) {
    return (
      <div className="admin-root">
        <style>{adminStyles}</style>
        <div className="admin-loading">Cargando…</div>
      </div>
    );
  }

  return (
    <div className="admin-root">
      <style>{adminStyles}</style>
      <header className="admin-header">
        <div className="admin-logo">PTB ADMIN</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          {savedMsg && <span className="admin-saved">{savedMsg}</span>}
          <a href="/" className="admin-link">Ver sitio</a>
          <button onClick={handleLogout} className="admin-link-btn">Salir</button>
        </div>
      </header>
      <nav className="admin-tabs">
        <button className={tab === 'products' ? 'active' : ''} onClick={() => setTab('products')}>PTB Core</button>
        <button className={tab === 'capsule' ? 'active' : ''} onClick={() => setTab('capsule')}>Cápsula</button>
        <button className={tab === 'hero' ? 'active' : ''} onClick={() => setTab('hero')}>Hero</button>
      </nav>
      <main className="admin-main">
        {tab === 'products' && (
          <div className="admin-grid">
            {products.map((p, i) => (
              <ProductEditor
                key={p.id}
                product={p}
                onChange={(np) => { const copy = [...products]; copy[i] = np; setProducts(copy); }}
                onSave={() => saveProduct(i)}
                onUpload={uploadImage}
                saving={saving}
              />
            ))}
          </div>
        )}
        {tab === 'capsule' && capsule && (
          <CapsuleEditor capsule={capsule} onChange={setCapsule} onSave={saveCapsule} onUpload={uploadImage} saving={saving} />
        )}
        {tab === 'hero' && hero && (
          <HeroEditor hero={hero} onChange={setHero} onSave={saveHero} saving={saving} />
        )}
      </main>
    </div>
  );
}

export default function Admin() {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => listener.subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return (
      <div className="admin-root">
        <style>{adminStyles}</style>
        <div className="admin-loading">Cargando…</div>
      </div>
    );
  }

  return session ? <Dashboard /> : <LoginForm />;
}
