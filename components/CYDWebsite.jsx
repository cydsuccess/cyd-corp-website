
import React, { useState } from "react";
import { motion } from "framer-motion";
import Modal from "./Modal";
import NeonButton from "./NeonButton";
import TechBackground from "./TechBackground";

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Glow = ({ className = "" }) => (
  <div className={`pointer-events-none absolute inset-0 opacity-40 blur-3xl ${className}`} />
);

export default function CYDWebsite() {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", contact: "", message: "" });

  const logoUrl = process.env.NEXT_PUBLIC_LOGO_URL || "/cyd-icon.png";

  async function submitLead(e){
    e?.preventDefault();
    setSending(true); setError(""); setDone(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) {
        if (data.fallback && data.to) {
          window.location.href = `mailto:${data.to}?subject=CYD Inquiry from ${encodeURIComponent(form.name)}&body=${encodeURIComponent((form.message||'') + "\nContact: " + form.contact)}`;
        }
        setDone(true);
        setForm({ name: "", contact: "", message: "" });
      } else {
        setError(data.error || "Failed to send");
      }
    } catch (e) {
      setError("Failed to send");
    } finally {
      setSending(false);
    }
  }

  const fadeIn = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <div className="min-h-screen scroll-smooth bg-neutral-950 text-neutral-100 antialiased relative">
      <TechBackground />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(30,58,138,0.25),transparent_60%),radial-gradient(ellipse_at_bottom,_rgba(6,182,212,0.2),transparent_60%)]" aria-hidden />

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-neutral-950/70 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="CYD Icon" className="h-9 w-9 rounded-xl object-cover bg-white" />
            <span className="hidden text-sm text-neutral-400 sm:block">AI Automation Agency</span>
          </div>
          <nav className="hidden items-center gap-2 md:flex">
            <NeonButton as="a" href="#services" className="bg-transparent text-neutral-300 hover:text-white">{'Services'}</NeonButton>
            <NeonButton as="a" href="#how" className="bg-transparent text-neutral-300 hover:text-white">{'How it works'}</NeonButton>
            <NeonButton as="a" href="#cases" className="bg-transparent text-neutral-300 hover:text-white">{'Case studies'}</NeonButton>
            <NeonButton as="a" href="#about" className="bg-transparent text-neutral-300 hover:text-white">{'About'}</NeonButton>
            <NeonButton className="bg-cyan-500/90 text-black" onClick={()=>setOpen(true)}>Work with us</NeonButton>
          </nav>
        </Container>
      </header>

      {/* HERO */}
      <section id="hero" className="relative overflow-hidden">
        <Glow className="bg-cyan-500/10" />
        <Container className="relative grid gap-10 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-6 inline-flex items-center gap-4">
              <img src={logoUrl} alt="CYD" className="h-12 w-12 rounded-2xl border border-cyan-400/30 bg-white/5 object-cover" />
              <div className="h-8 w-px bg-white/10" />
              <p className="text-sm font-semibold tracking-widest text-cyan-300">CHASE YOUR DREAMS</p>
            </div>
            <h1 className="text-4xl font-black leading-[1.1] sm:text-5xl md:text-6xl">
              Automating your future with <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-sky-500 bg-clip-text text-transparent">AI + n8n</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-neutral-300">
              CYD Corp designs, builds, and maintains automation that saves time and unlocks growth: chatbots, ops workflows, and data pipelines—powered by n8n and cutting-edge AI.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <NeonButton className="bg-cyan-500/90 text-black" onClick={()=>setOpen(true)}>{sending ? "Submitting..." : "Get a free audit"}</NeonButton>
              <NeonButton as="a" href="#services" className="border border-cyan-400/30 bg-white/5 text-cyan-200/90">See services</NeonButton>
            </div>
            <p className="mt-4 text-xs uppercase tracking-widest text-neutral-400">Knowledge + Experience = CYD Foundation</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl animate-glowpulse">
              <div className="rounded-2xl border border-white/10 bg-neutral-900 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-sm font-semibold text-neutral-300">Automation Overview</div>
                  <div className="text-xs text-neutral-400">n8n • OpenAI • Slack • Notion</div>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {["Leads → CRM", "Support Bot", "Daily Reports"].map((label, i) => (
                    <motion.div key={label} variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true }}
                      className="rounded-xl border border-white/10 bg-neutral-800/60 p-4">
                      <div className="text-xs text-neutral-400">Workflow</div>
                      <div className="text-sm font-semibold">{label}</div>
                      <div className="mt-3 h-2 w-full rounded bg-neutral-700">
                        <div className="h-2 rounded bg-cyan-400/80" style={{ width: `${70 + i*8}%` }} />
                      </div>
                    </motion.div>
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
            <NeonButton as="a" href="#contact" className="text-cyan-300 border border-cyan-400/30 bg-white/5">Need something custom?</NeonButton>
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
              <motion.div key={c.title} variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
                className="group relative rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-cyan-400/40 hover:bg-white/10">
                <div className="absolute inset-0 -z-10 rounded-3xl opacity-0 blur-2xl transition group-hover:opacity-40" style={{ background: "radial-gradient(circle at 30% 20%, rgba(34,211,238,0.25), transparent 40%)" }} />
                <div className="text-xs font-semibold tracking-widest text-cyan-300">{c.tag}</div>
                <h3 className="mt-2 text-xl font-bold">{c.title}</h3>
                <p className="mt-2 text-sm text-neutral-300">{c.desc}</p>
              </motion.div>
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
            ].map((s, i) => (
              <motion.div key={s.step} variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true }}
                transition={{ delay: i*0.05 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="text-sm font-black text-cyan-300">{s.step}</div>
                <h3 className="mt-2 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-neutral-300">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CASE STUDIES */}
      <section id="cases" className="py-20">
        <Container>
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-3xl font-black md:text-4xl">Case studies</h2>
            <NeonButton as="a" href="#contact" className="text-cyan-300 border border-cyan-400/30 bg-white/5">Share yours →</NeonButton>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Automated social posts", img: "/case-social.svg" },
              { title: "Lead gen chatbot", img: "/case-chatbot.svg" },
              { title: "AI email assistant", img: "/case-email.svg" },
            ].map((card) => (
              <motion.div key={card.title} whileHover={{ y: -2 }} className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                <div className="h-40 overflow-hidden">
                  <img src={card.img} alt={card.title} className="h-40 w-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p className="mt-1 text-sm text-neutral-300">Outcome-focused write‑up coming soon.</p>
                </div>
              </motion.div>
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
            <p className="mt-3 text-neutral-300">
              Tell us what you want to automate. We’ll send a quick plan and a fixed‑price quote. Prefer email?{" "}
              <a href="mailto:cydsuccess@gmail.com" className="text-cyan-300 underline">cydsuccess@gmail.com</a>
            </p>
            <form className="mt-8 grid gap-4 text-left" onSubmit={submitLead}>
              <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-neutral-500 focus:border-cyan-400/50"
                placeholder="Your name" required value={form.name} onChange={e=>setForm({...form, name: e.target.value})}/>
              <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-neutral-500 focus:border-cyan-400/50"
                placeholder="Email or Telegram" required value={form.contact} onChange={e=>setForm({...form, contact: e.target.value})}/>
              <textarea className="min-h-[120px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-neutral-500 focus:border-cyan-400/50"
                placeholder="What do you want to automate?" value={form.message} onChange={e=>setForm({...form, message: e.target.value})}/>
              <div className="flex items-center justify-center gap-3">
                <NeonButton className="bg-cyan-500/90 text-black">{sending ? "Sending..." : "Send request"}</NeonButton>
                <NeonButton as="a" href="#hero" className="border border-cyan-400/30 bg-white/5 text-cyan-200/90">Back to top</NeonButton>
              </div>
              {done && <p className="text-sm text-green-400">Thanks! We received your request.</p>}
              {error && <p className="text-sm text-red-400">{error}</p>}
            </form>
          </div>
        </Container>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10">
        <Container className="flex flex-col items-center justify-between gap-6 text-sm text-neutral-400 md:flex-row">
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="CYD" className="h-8 w-8 rounded-lg object-cover bg-white" />
            <span>© {new Date().getFullYear()} CYD Corp – Chase Your Dreams</span>
          </div>
          <div className="flex items-center gap-2">
            <NeonButton as="a" href="#services" className="bg-transparent text-neutral-300 hover:text-white">Services</NeonButton>
            <NeonButton as="a" href="#how" className="bg-transparent text-neutral-300 hover:text-white">Process</NeonButton>
            <NeonButton as="a" href="#cases" className="bg-transparent text-neutral-300 hover:text-white">Case studies</NeonButton>
            <NeonButton as="a" href="#contact" className="bg-transparent text-neutral-300 hover:text-white">Contact</NeonButton>
          </div>
        </Container>
      </footer>

      {/* WORK WITH US MODAL */}
      <Modal open={open} onClose={()=>setOpen(false)} title="Work with us">
        <form className="grid gap-3" onSubmit={submitLead}>
          <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-neutral-500 focus:border-cyan-400/50"
            placeholder="Your name" required value={form.name} onChange={e=>setForm({...form, name: e.target.value})}/>
          <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-neutral-500 focus:border-cyan-400/50"
            placeholder="Email or Telegram" required value={form.contact} onChange={e=>setForm({...form, contact: e.target.value})}/>
          <textarea className="min-h-[90px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-neutral-500 focus:border-cyan-400/50"
            placeholder="What do you want to automate? (optional)" value={form.message} onChange={e=>setForm({...form, message: e.target.value})}/>
          <div className="flex items-center gap-3">
            <NeonButton className="bg-cyan-500/90 text-black" >{sending ? "Sending..." : "Submit"}</NeonButton>
            {done && <span className="text-green-400 text-sm">Sent!</span>}
            {error && <span className="text-red-400 text-sm">{error}</span>}
          </div>
          <p className="mt-1 text-xs text-neutral-400">Or email us directly: <a className="text-cyan-300 underline" href="mailto:cydsuccess@gmail.com">cydsuccess@gmail.com</a></p>
        </form>
      </Modal>
    </div>
  );
}
