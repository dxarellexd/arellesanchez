import {
  profile, ticket, skills, experience, project, certifications, education,
} from "./data.js";

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
      <p className="meta">{org} <span className="dates">{dates}</span></p>
    </header>
    <ul>{points.map((p) => <li key={p}>{p}</li>)}</ul>
  </article>
);

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="bar">
        <a className="brand" href="#top">Arelle Sanchez</a>
        <nav aria-label="Main">
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#credentials">Credentials</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="main">
        <section id="top" className="hero">
          <div className="hero-copy">
            <p className="role-line">{profile.role}</p>
            <h1>{profile.name}</h1>
            <p className="lede">{profile.summary}</p>
            <p className="lede">{profile.about}</p>
            <div className="actions">
              <a className="btn primary" href={profile.resume} download>Download resume</a>
              <a className="btn" href={`mailto:${profile.email}`}>Email me</a>
            </div>
          </div>

          <aside className="ticket" aria-label="Results at Globaltech">
            <div className="ticket-head">
              <span className="mono">{ticket.id}</span>
              <span className="status">Resolved</span>
            </div>
            <dl>
              {ticket.rows.map((r) => (
                <div key={r.label}>
                  <dt>{r.label}</dt>
                  <dd>{r.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </section>

        <Section id="experience" title="Experience">
          <div className="roles">{experience.map((r) => <Role key={r.title} {...r} />)}</div>
          <h3 className="sub">Project</h3>
          <Role {...project} />
        </Section>

        <Section id="skills" title="Skills">
          <div className="skills">
            {skills.map((s) => (
              <div key={s.group}>
                <h3>{s.group}</h3>
                <ul className="chips">{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="credentials" title="Credentials">
          <div className="creds">
            <div>
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
            <div>
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

        <Section id="contact" title="Contact">
          <p className="lede">Open to help desk, IT support and junior systems administration roles.</p>
          <ul className="plain contact">
            <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
            <li><a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a></li>
            <li>{profile.location}</li>
          </ul>
        </Section>
      </main>

      <footer>© {new Date().getFullYear()} {profile.name}</footer>
    </>
  );
}
