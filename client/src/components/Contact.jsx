import { useState } from 'react';
const API = import.meta.env.VITE_API_URL;
const profiles = [
  { label: 'LeetCode', url: 'https://leetcode.com/u/YOUR_LEETCODE_USERNAME/' },
  { label: 'GitHub', url: 'https://github.com/YOUR_USERNAME' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/YOUR_PROFILE' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: 'idle', text: '' });

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'sending', text: 'Sending…' });
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setStatus({ type: 'ok', text: 'Thanks! Your message was sent.' });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', text: err.message });
    }
  };

  return (
    <section id="contact">
      <h2 className="section-title">Contact</h2>
            <div className="profiles">
        {profiles.map(p => (
          <a key={p.label} className="btn ghost" href={p.url} target="_blank" rel="noreferrer">
            {p.label}
          </a>
        ))}
      </div>
      <form onSubmit={submit} className="form">
        <input name="name" placeholder="Your name" value={form.name} onChange={update} required />
        <input name="email" type="email" placeholder="Your email" value={form.email} onChange={update} required />
        <textarea name="message" rows="5" placeholder="Your message" value={form.message} onChange={update} required />
        <button className="btn" disabled={status.type === 'sending'}>Send message</button>
        {status.text && <p className={`status ${status.type}`}>{status.text}</p>}
      </form>
    </section>
  );
}