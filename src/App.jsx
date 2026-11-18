import { useEffect, useRef, useState } from "react";
import {
  profile, typed, ticket, skills, experience, project, certifications, education,
} from "./data.js";

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Typewriter({ words }) {
  const [text, setText] = useState(words[0]);
  useEffect(() => {
    if (reduced()) return;
    let w = 0, i = 0, del = true, t;
    const tick = () => {
      const word = words[w];
      if (del) { i--; } else { i++; }
      setText(word.slice(0, Math.max(i, 0)));
      let wait = del ? 35 : 80;
      if (!del && i === word.length) { del = true; wait = 1600; }
      else if (del && i <= 0) { del = false; w = (w + 1) % words.length; wait = 300; }
      t = setTimeout(tick, wait);
    };
    i = words[0].length;
    t = setTimeout(tick, 1600);
    return () => clearTimeout(t);
  }, [words]);
  return <span className="typed" aria-label={words.join(", ")}>{text}<i className="caret" aria-hidden="true" /></span>;
}

function CountUp({ to, suffix = "" }) {
  const [n, setN] = useState(reduced() ? to : 0);
  const ref = useRef(null);
  useEffect(() => {
    if (reduced()) return;
    const start = performance.now(), dur = 1400;
    let raf;
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    const t = setTimeout(() => { raf = requestAnimationFrame(step); }, 500);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

const Section = ({ id, title, children }) => (
  <section id={id} className="section" aria-labelledby={`${id}-h`}>
    <h2 id={`${id}-h`}>{title}</h2>
    {children}
  </section>
);

const Role = ({ title, org, dates, points }) => (
  <article className="role">
    <header>
      <h3>{title}</h3>
      <p className="meta">{org}</p>
      <p className="dates">{dates}</p>
    </header>
    <ul>{points.map((p) => <li key={p}>{p}</li>)}</ul>
  </article>
);

const marquee = [...new Set(skills.flatMap((s) => s.items))];

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="bar">
        <a className="brand" href="#top"><b>A</b>relle Sanchez</a>
        <nav aria-label="Main">
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#credentials">Credentials</a>
          <a className="nav-cta" href="#contact">Hire me</a>
        </nav>
      </header>

      <div className="hero-wrap" id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="hello">Hi, I'm</p>
            <h1>{profile.name}</h1>
            <p className="role-line"><Typewriter words={typed} /></p>
            <p className="lede">{profile.summary}</p>
            <div className="actions">
              <a className="btn primary" href={profile.resume} download>Download resume</a>
              <a className="btn ghost" href={`mailto:${profile.email}`}>Email me</a>
            </div>
          </div>

          <div className="hero-side">
            <img className="portrait" src="./arelle.webp" alt="Portrait of Arelle Sanchez" width="800" height="1458" />
          <aside className="ticket" aria-label="Results at Globaltech">
            <div className="ticket-head">
              <span className="mono">{ticket.id}</span>
              <span className="status"><i aria-hidden="true" />Resolved</span>
            </div>
            <dl>
              {ticket.rows.map((r) => (
                <div key={r.label}>
                  <dt>{r.label}</dt>
                  <dd>
                    {r.text ?? <CountUp to={r.num} suffix={r.suffix} />}
                    <small>{r.note}</small>
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="track">
            {[...marquee, ...marquee].map((m, i) => <span key={i}>{m}</span>)}
          </div>
        </div>
      </div>

      <main id="main">
        <Section id="experience" title="Experience">
          <div className="roles">{experience.map((r) => <Role key={r.title} {...r} />)}</div>
          <h3 className="sub">Project</h3>
          <Role {...project} />
        </Section>

        <Section id="skills" title="Skills">
          <div className="skills">
            {skills.map((s) => (
              <div key={s.group} className="skill-card">
                <h3>{s.group}</h3>
                <ul className="chips">{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="credentials" title="Credentials">
          <div className="creds">
            <div className="cred-card">
              <h3>Certifications</h3>
              <ul className="plain">
                {certifications.map((c) => (
                  <li key={c.name}>
                    <strong>{c.name}</strong>
                    <span className="meta">{c.when}</span>
                    {c.link && <a href={c.link} target="_blank" rel="noreferrer">Verify certificate</a>}
                  </li>
                ))}
              </ul>
            </div>
            <div className="cred-card">
              <h3>Education</h3>
              <ul className="plain">
                <li>
                  <strong>{education.degree}</strong>
                  <span className="meta">{education.school}, {education.dates}</span>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        <section id="contact" className="cta" aria-labelledby="contact-h">
          <h2 id="contact-h">Need someone who fixes it and writes it down?</h2>
          <p>Open to help desk, IT support and junior systems administration roles.</p>
          <div className="actions">
            <a className="btn primary" href={`mailto:${profile.email}`}>{profile.email}</a>
            <a className="btn ghost" href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a>
          </div>
          <p className="loc">{profile.location}</p>
        </section>
      </main>

      <footer>© {new Date().getFullYear()} {profile.name}</footer>
    </>
  );
}
