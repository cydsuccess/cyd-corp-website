import React from "react";
import { motion } from "framer-motion";
import Modal from "./Modal";
import FormspreeForm from "./FormspreeForm";
import NavLink from "./NavLink";

// --- Helper components ---
const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Glow = ({ className = "" }) => (
  <div className={`pointer-events-none absolute inset-0 opacity-40 blur-3xl ${className}`} />
);

const PrimaryButton = ({ children, href, onClick }) => {
  const cls = "inline-flex items-center rounded-2xl bg-cyan-500/90 px-5 py-3 text-sm font-semibold tracking-wide text-black shadow-lg transition hover:translate-y-[-1px] hover:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70";
  if (onClick) {
    return <button onClick={onClick} className={cls}>{children}</button>;
  }
  return (
    <a href={href || "#contact"} className={cls}>
      {children}
    </a>
  );
};

const SecondaryButton = ({ children, href = "#how" }) => (
  <a
    href={href}
    className="inline-flex items-center rounded-2xl border border-cyan-400/30 bg-white/5 px-5 py-3 text-sm font-semibold tracking-wide text-cyan-200/90 backdrop-blur transition hover:bg-white/10"
  >
    {children}
  </a>
);

export default function CYDWebsite() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen scroll-smooth bg-neutral-950 text-neutral-100 antialiased">
      {/* Soft grid background */}
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(30,58,138,0.35),transparent_60%),radial-gradient(ellipse_at_bottom,_rgba(6,182,212,0.25),transparent_60%)]"
        aria-hidden
      />

      {/* NAVBAR */}
      <header className={`sticky top-0 z-50 border-b border-white/5 bg-neutral-950/70 backdrop-blur transition-shadow ${scrolled ? "shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]" : ""}`}>
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Symbol-only logo */}
           <picture>
  <source srcSet="/icon.svg?v=6" type="image/svg+xml" />
  <img
    src="/favicon-32x32.png"
    alt="CYD"
    width="72"
    height="72"
    className="block h-12 w-12"
  />
</picture>
            <span className="hidden text-sm text-neutral-400 sm:block">AI Automation Agency</span>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#how">How it works</NavLink>
            <NavLink href="#cases">Case studies</NavLink>
            <NavLink href="#about">About</NavLink>
            <PrimaryButton onClick={() => setOpen(true)}>Work with us</PrimaryButton>
          </nav>
        </Container>
      </header>

      {/* HERO */}
      <section id="hero" className="relative overflow-hidden">
        <Glow className="bg-cyan-500/10" />

        {/* Hero floating accent */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"
          animate={{ y: [0, -8, 0], x: [0, 6, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <Container className="relative grid gap-10 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* Full-text logo */}
            <div className="mb-6 inline-flex items-center gap-4">
  <picture>
  <source srcSet="/icon.svg?v=6" type="image/svg+xml" />
  <img
    src="/favicon-32x32.png"
    alt="CYD"
    className="h-24 w-24"
  />
</picture>
  <div className="h-8 w-px bg-white/10" />
  <p className="text-sm font-semibold tracking-widest text-cyan-300">
    CHASE YOUR DREAMS
  </p>
</div>
            <h1 className="text-4xl font-black leading-[1.1] sm:text-5xl md:text-6xl">
              Automating your future with <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-sky-500 bg-clip-text text-transparent">AI + n8n</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-neutral-300">
              CYD Corp designs, builds, and maintains automation that saves time and unlocks growth: chatbots, ops workflows, and data pipelines—powered by n8n and cutting-edge AI.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <PrimaryButton onClick={() => setOpen(true)}>Get a free audit</PrimaryButton>
              <SecondaryButton href="#services">See services</SecondaryButton>
            </div>
            <p className="mt-4 text-xs uppercase tracking-widest text-neutral-400">Knowledge + Experience = CYD Foundation</p>
          </motion.div>

          {/* Demo panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl">
              <div className="ao-panel rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl">
              <div className="rounded-2xl border border-white/10 bg-neutral-900 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-sm font-semibold text-neutral-300">Automation Overview</div>
                  <div className="text-xs text-neutral-400">n8n • OpenAI • Slack • Notion</div>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {["Leads → CRM", "Support Bot", "Daily Reports"].map((label) => (
                    <div key={label} className="rounded-xl border border-white/10 bg-neutral-800/60 p-4">
                      <div className="text-xs text-neutral-400">Workflow</div>
                      <div className="text-sm font-semibold">{label}</div>
                      <div className="mt-3 h-2 w-full rounded bg-neutral-700">
                        <div className="h-2 rounded bg-cyan-400/80" style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-neutral-800/60 p-4">
                    <div className="text-xs text-neutral-400">Result</div>
                    <div className="text-sm font-semibold">Time saved this month</div>
                    <div className="mt-3 text-3xl font-black text-cyan-300">142 hrs</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-neutral-800/60 p-4">
                    <div className="text-xs text-neutral-400">Result</div>
                    <div className="text-sm font-semibold">Revenue impact</div>
                    <div className="mt-3 text-3xl font-black text-cyan-300">+$18,700</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20">
        <Container>
          <div className="mb-10 flex items-end justify-between gap-6">
            <h2 className="text-3xl font-black md:text-4xl">What we build</h2>
            <a href="#contact" className="text-sm text-cyan-300 hover:underline">Need something custom?</a>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "AI Chatbots & Assistants", desc: "Website & support bots that resolve FAQs, qualify leads, and hand off to humans when needed.", tag: "GPT-4/Assistants" },
              { title: "Workflow Automation (n8n)", desc: "Connect tools and automate ops: CRM, email, billing, spreadsheets, webhooks.", tag: "n8n / APIs" },
              { title: "Content & Marketing Automation", desc: "Generate social posts, emails, and reports with approval flows.", tag: "LLMs + Schedulers" },
              { title: "Data & Analytics", desc: "Pull data, summarize with AI, and ship live dashboards.", tag: "ETL + AI" },
              { title: "Custom Integrations", desc: "When Zapier can’t: build robust API bridges & microservices.", tag: "TypeScript / Python" },
              { title: "Automation Care Plan", desc: "Monitoring, error handling, and iterative optimization.", tag: "SLA" },
            ].map((c) => (
              <div key={c.title} className="group relative rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-cyan-400/40 hover:bg-white/10">
                <div className="absolute inset-0 -z-10 rounded-3xl opacity-0 blur-2xl transition group-hover:opacity-40" style={{ background: "radial-gradient(circle at 30% 20%, rgba(34,211,238,0.25), transparent 40%)" }} />
                <div className="text-xs font-semibold tracking-widest text-cyan-300">{c.tag}</div>
                <h3 className="mt-2 text-xl font-bold">{c.title}</h3>
                <p className="mt-2 text-sm text-neutral-300">{c.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="border-y border-white/5 bg-neutral-950/60 py-20">
        <Container>
          <h2 className="mb-10 text-3xl font-black md:text-4xl">How it works</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { step: "01", title: "Free audit", desc: "We map your processes and identify quick wins (1–2 weeks)." },
              { step: "02", title: "Prototype → Proof", desc: "We ship a working n8n workflow and measure impact." },
              { step: "03", title: "Scale & Care", desc: "Harden, monitor, and iterate. Optional retainer for growth." },
            ].map((s) => (
              <div key={s.step} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="text-sm font-black text-cyan-300">{s.step}</div>
                <h3 className="mt-2 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-neutral-300">{s.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CASE STUDIES — restored SVG images */}
      <section id="cases" className="py-20">
        <Container>
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-3xl font-black md:text-4xl">Case studies</h2>
            <a href="#contact" className="text-sm text-cyan-300 hover:underline">Share yours →</a>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Automated social posts", img: "/case-social.svg" },
              { title: "Lead gen chatbot", img: "/case-chatbot.svg" },
              { title: "AI email assistant", img: "/case-email.svg" },
            ].map((c) => (
              <a key={c.title} href="#contact" className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                <img src={c.img} alt={c.title} className="h-44 w-full object-cover opacity-95 transition group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 to-transparent" />
                <div className="p-6">
                  <h3 className="text-lg font-semibold">{c.title}</h3>
                  <p className="mt-1 text-sm text-neutral-300">Outcome-focused write‑up coming soon.</p>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-y border-white/5 bg-neutral-950/60 py-20">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-black md:text-4xl">Knowledge + Experience = Foundation</h2>
              <p className="mt-4 text-neutral-300">
                Built by David, CYD Corp starts lean and learns fast. We combine rigorous experimentation with battle‑tested patterns to deliver automations that actually stick—and scale.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-neutral-300">
                <li>• Open-source first: n8n at the core</li>
                <li>• Privacy‑minded, security‑aware implementations</li>
                <li>• Clear docs and handover for every workflow</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { k: "Workflows shipped", v: "25+" },
                  { k: "Avg. time saved / mo", v: "120h" },
                  { k: "Satisfaction", v: "100%" },
                ].map((stat) => (
                  <div key={stat.k} className="rounded-2xl border border-white/10 bg-neutral-900 p-4">
                    <div className="text-xs text-neutral-400">{stat.k}</div>
                    <div className="mt-1 text-2xl font-black text-cyan-300">{stat.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black md:text-4xl">Ready to chase your dreams?</h2>
            <p className="mt-3 text-neutral-300">Tell us what you want to automate. We’ll send a quick plan and a fixed‑price quote.</p>

            {/* Formspree AJAX form */}
            <FormspreeForm endpoint="https://formspree.io/f/mdklwpon" />
          </div>
        </Container>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10">
        <Container className="flex flex-col items-center justify-between gap-6 text-sm text-neutral-400 md:flex-row">
          <div className="flex items-center gap-3">
           <picture>
  <source srcSet="/icon.svg?v=6" type="image/svg+xml" />
  <img
    src="/favicon-32x32.png"
    alt="CYD Corp"
    width="64"
    height="64"
    className="h-16 w-16"
  />
</picture>
            <span>© {new Date().getFullYear()} CYD Corp – Chase Your Dreams</span>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a href="mailto:cydsuccess@gmail.com" className="hover:text-white">cydsuccess@gmail.com</a>
            <a href="#services" className="hover:text-white">Services</a>
            <a href="#how" className="hover:text-white">Process</a>
            <a href="#cases" className="hover:text-white">Case studies</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </Container>
      </footer>

      {/* Work with us Modal (now includes message field) */}
      <Modal open={open} onClose={() => setOpen(false)} title="Work with us">
        <p className="text-sm text-neutral-300">
          Drop your details and we’ll get back within 24 hours.
        </p>
        {/* Use full form (not compact) so it includes "What do you want to automate?" */}
        <FormspreeForm endpoint="https://formspree.io/f/mdklwpon" />
      </Modal>
    </div>
  );
}
