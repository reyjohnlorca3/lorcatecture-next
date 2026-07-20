"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

const services = [
  ["01", "Architectural Design", "From bespoke residences to landmark commercial towers—architecture balancing beauty, function and enduring value."],
  ["02", "Interior Design", "Curated interior environments that extend the architectural vision inward, from material to final detail."],
  ["03", "Master Planning", "Strategic frameworks for communities and districts that respect context and serve future generations."],
  ["04", "Landscape Architecture", "Outdoor environments that extend the life of built spaces, from private gardens to civic landscapes."],
  ["05", "Design Consultancy", "Independent advice on architectural quality, development positioning and design strategy."],
  ["06", "Project Management", "Rigorous oversight from brief to handover, protecting design intent, programme and investment."],
];

const projects = [
  { title: "The Vela Residences", type: "Residential", place: "Bonifacio Global City, Manila", image: "photo-1545324418-cc1a3fa10c00" },
  { title: "Meridian Tower", type: "Commercial", place: "Singapore CBD", image: "photo-1487958449943-2429e8be8625" },
  { title: "Solano Cultural Centre", type: "Cultural", place: "Cebu City", image: "photo-1600607687920-4e2a09cf159d" },
  { title: "Arca District", type: "Mixed-Use", place: "Dubai, UAE", image: "photo-1503174971373-b1f69850bded" },
];

const team = [
  { name: "Rey John Lorca", role: "Founder and CEO", image: "photo-1560250097-0b93528c311a" },
  { name: "Isabela Santos", role: "Design Director", image: "photo-1573496359142-b8d87734a5a2" },
  { name: "Marco Navarro", role: "Principal, Singapore", image: "photo-1472099645785-5658abf4ff4e" },
  { name: "Leila Osman", role: "Principal, Dubai", image: "photo-1594744803329-e58b31de8bf5" },
];

function SectionTitle({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <div className="section-title">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{children}</h2>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitting(true);
    setSubmitError("");

    try {
      const body = new URLSearchParams(
        Array.from(new FormData(form).entries()).map(([key, value]) => [
          key,
          String(value),
        ]),
      ).toString();

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      if (!response.ok) {
        throw new Error("Unable to submit the consultation request.");
      }

      form.reset();
      setSent(true);
    } catch {
      setSubmitError(
        "We couldn't send your request. Please check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <main id="main-content">
      <header className="nav">
        <a className="brand" href="#top" aria-label="Lorcatecture Group home">
          <strong>Lorcatecture<br />Group</strong>
          <span>Architecture · Design · Legacy</span>
        </a>
        <button
          className="menu-button"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          aria-label={menuOpen ? "Close primary navigation" : "Open primary navigation"}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
        <nav id="main-nav" className={menuOpen ? "open" : ""} aria-label="Primary navigation">
          {["About", "Services", "Portfolio", "Team", "Journal", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>
          ))}
        </nav>
        <a className="outline-button nav-cta" href="#contact">Start a conversation</a>
      </header>

      <section className="hero" id="top">
        <Image src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=2000&q=85" alt="" fill priority sizes="100vw" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">Est. 2008 · Manila · Singapore · Dubai</p>
          <h1>Architecture<br />that <em>endures</em><br />generations</h1>
          <p className="hero-tagline">Built Environment · Capital · Assets · Legacy</p>
          <div className="hero-actions">
            <a className="gold-button" href="#portfolio">View our work</a>
            <a className="outline-button" href="#contact">Build your brief</a>
          </div>
        </div>
        <dl className="hero-stats">
          <div><dt>17+</dt><dd>Years</dd></div>
          <div><dt>140</dt><dd>Projects</dd></div>
          <div><dt>3</dt><dd>Studios</dd></div>
        </dl>
      </section>

      <section className="intro section" id="about">
        <div>
          <SectionTitle eyebrow="Who we are">A practice built on <em>conviction</em></SectionTitle>
        </div>
        <div className="intro-copy">
          <p>Lorcatecture Group is a multidisciplinary architecture and design practice with studios in Manila, Singapore and Dubai. For over seventeen years, we have worked with private clients, institutions and property developers to realise spaces of lasting significance.</p>
          <p>We operate at the intersection of design excellence and investment intelligence—understanding that great architecture is not merely aesthetic, but the most enduring form of capital a client can own.</p>
          <blockquote>“We create environments that outlive their architects and define the legacy of those who commission them.”</blockquote>
        </div>
      </section>

      <section className="section services" id="services">
        <SectionTitle eyebrow="What we do">Comprehensive design <em>expertise</em></SectionTitle>
        <div className="service-grid">
          {services.map(([num, title, text]) => (
            <article key={num}>
              <span>{num}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section work" id="portfolio">
        <SectionTitle eyebrow="Selected work">Projects that define <em>communities</em></SectionTitle>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className={index === 0 ? "project featured" : "project"} key={project.title}>
              <Image src={`https://images.unsplash.com/${project.image}?w=1200&q=85`} alt={`${project.title} architectural project`} fill sizes={index === 0 ? "(max-width: 800px) 100vw, 60vw" : "(max-width: 800px) 100vw, 40vw"} />
              <div className="project-overlay">
                <p>{project.type}</p>
                <h3>{project.title}</h3>
                <span>{project.place}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section team" id="team">
        <SectionTitle eyebrow="The team">People behind the <em>practice</em></SectionTitle>
        <div className="team-grid">
          {team.map((person) => (
            <article key={person.name}>
              <div className="portrait">
                <Image src={`https://images.unsplash.com/${person.image}?w=700&q=85`} alt={`${person.name}, ${person.role}`} fill sizes="(max-width: 700px) 100vw, 25vw" />
              </div>
              <h3>{person.name}</h3>
              <p>{person.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="quote">
        <p className="eyebrow">Client voices</p>
        <blockquote>“Lorcatecture didn&apos;t just design our headquarters—they redefined how our company presents itself to the world.”</blockquote>
        <p>Antonio Cruz · Meridian Capital Group</p>
      </section>

      <section className="section journal" id="journal">
        <SectionTitle eyebrow="Journal & insights">Conversations about the <em>built world</em></SectionTitle>
        <div className="journal-grid">
          {[
            ["Urban Design", "Why density, done right, creates stronger communities"],
            ["Investment", "Architecture as asset: how design adds enduring value"],
            ["Practice", "From brief to legacy: inside our design process"],
          ].map(([type, title], index) => (
            <article key={title}>
              <span>{type} · 0{index + 1}</span>
              <h3>{title}</h3>
              <p>Perspectives on architecture, development and the places that shape lasting value.</p>
              <a href="#contact">Discuss this insight →</a>
            </article>
          ))}
        </div>
      </section>

      <section className="contact section" id="contact">
        <div>
          <SectionTitle eyebrow="Begin a conversation">Let&apos;s talk about <em>your project</em></SectionTitle>
          <p>Whether you are at the earliest idea or ready to commission, we welcome conversations with clients committed to design excellence and lasting impact.</p>
          <div className="studio-list">
            <p><strong>Manila</strong><span>Taguig City, Philippines</span></p>
            <p><strong>Singapore</strong><span>Raffles Quay, Singapore</span></p>
            <p><strong>Dubai</strong><span>Dubai Design District, UAE</span></p>
          </div>
        </div>
        {sent ? (
          <div className="success" role="status">
            <span>✦</span>
            <h3>Thank you for reaching out.</h3>
            <p>Your brief has been received. We&apos;ll respond within two business days.</p>
          </div>
        ) : (
          <form
            name="consultation"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="company"
            onSubmit={submit}
            aria-describedby="form-help form-status"
          >
            <input type="hidden" name="form-name" value="consultation" />
            <p className="honeypot" aria-hidden="true">
              <label>Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
            </p>
            <label>Full name<input name="name" autoComplete="name" required /></label>
            <label>Email address<input type="email" name="email" autoComplete="email" required /></label>
            <label>Project type
              <select name="type" defaultValue="" required>
                <option value="" disabled>Select a category</option>
                <option>Residential</option><option>Commercial</option><option>Cultural / Civic</option><option>Mixed-Use</option><option>Interior Design</option>
              </select>
            </label>
            <label>Tell us about your project<textarea name="brief" rows={5} required /></label>
            <button className="gold-button" type="submit" disabled={submitting}>
              {submitting ? "Sending request…" : "Request a consultation"}
            </button>
            <p id="form-status" className="form-status" role="status" aria-live="polite">
              {submitError}
            </p>
            <small id="form-help">We respond to all enquiries within two business days.</small>
          </form>
        )}
      </section>

      <footer>
        <a className="brand" href="#top"><strong>Lorcatecture Group</strong><span>Architecture · Design · Legacy</span></a>
        <p>A multidisciplinary architecture and design practice creating environments of enduring significance.</p>
        <nav aria-label="Footer navigation">
          <a href="#about">About</a><a href="#services">Services</a><a href="#portfolio">Work</a><a href="#contact">Contact</a>
        </nav>
        <p>© {new Date().getFullYear()} Lorcatecture Group. All rights reserved.</p>
      </footer>
      </main>
    </>
  );
}
