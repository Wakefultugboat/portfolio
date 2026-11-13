import { useEffect, useState } from 'react';
const API = import.meta.env.VITE_API_URL;

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [state, setState] = useState('loading');

  useEffect(() => {
    fetch(`${API}/api/projects`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => { setProjects(data); setState('ready'); })
      .catch(() => setState('error'));
  }, []);

  return (
    <section id="projects">
      <h2 className="section-title">Projects</h2>
      {state === 'loading' && <p className="muted">Loading projects… (the server may take a few seconds to wake up)</p>}
      {state === 'error' && <p className="muted">Couldn't load projects right now. Please refresh.</p>}
      <div className="grid">
        {projects.map(p => (
          <article key={p._id} className="card">
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <div className="chips">
              {p.tech.map(t => <span key={t} className="chip small">{t}</span>)}
            </div>
            <div className="links">
              {p.live && <a href={p.live} target="_blank" rel="noreferrer">Live demo</a>}
              {p.repo && <a href={p.repo} target="_blank" rel="noreferrer">Code</a>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}