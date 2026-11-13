const skills = ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Git & GitHub'];

export default function About() {
  return (
    <section id="about">
      <h2 className="section-title">About</h2>
      <p>
        B.Tech in Information Technology from GCET, Greater Noida (AKTU), graduated
        with First Division with Distinction and Honours. I enjoy building full-stack applications end to end, from designing the
database schema and API to shaping a clean, responsive interface. I've worked
with React, Angular, Spring Boot, FastAPI, and PostgreSQL, and I like projects
where I can see how every layer fits together. Next, I want to go deeper into
system design and AI-powered features, building products that solve real
problems at scale and growing toward engineering roles at product-driven
companies.
      </p>
      <div className="chips">
        {skills.map(s => <span key={s} className="chip">{s}</span>)}
      </div>
    </section>
  );
}