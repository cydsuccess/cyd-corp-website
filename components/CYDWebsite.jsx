import React from "react";
import { motion } from "framer-motion";
import Modal from "./Modal";
import FormspreeForm from "./FormspreeForm";
import NavLink from "./NavLink";

/* ----------------- small helpers kept inline to match your file ----------------- */
const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Glow = ({ className = "" }) => (
  <div className={`pointer-events-none absolute inset-0 opacity-40 blur-3xl ${className}`} />
);

const PrimaryButton = ({ children, href, onClick, className = "" }) => {
  const cls =
    "inline-flex items-center rounded-2xl bg-cyan-500/90 px-5 py-3 text-sm font-semibold tracking-wide text-black shadow-lg transition hover:translate-y-[-1px] hover:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 " +
    className;
  if (onClick) return <button onClick={onClick} className={cls}>{children}</button>;
  return (
    <a href={href || "#contact"} className={cls}>
      {children}
    </a>
  );
};

const SecondaryButton = ({ children, href = "#how", className = "" }) => (
  <a
    href={href}
    className={
      "inline-flex items-center rounded-2xl border border-cyan-400/30 bg-white/5 px-5 py-3 text-sm font-semibold tracking-wide text-cyan-200/90 backdrop-blur transition hover:bg-white/10 " +
      className
    }
  >
    {children}
  </a>
);

/* ---------------------------------- page ---------------------------------- */
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
      <header
        className={`sticky top-0 z-50 border-b border-white/5 bg-neutral-950/70 backdrop-blur transition-shadow ${
          scrolled ? "shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]" : ""
        }`}
      >
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Symbol-only logo */}
            <picture>
              <source srcSet="/icon.svg?v=6" type="image/svg+xml" />
              <img
                src="/favicon-32x32.png"
                alt="CYD Corp"
                width="72"
                height="72"
                className="block w-[72px] h-[72px] shadow-lg shadow-blue-500/40"
              />
            </picture>

            <span className="hidden text-sm text-neutral-400 sm:block">AI Automation Agency</span>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#how">How it works</NavLink>
            <NavLink href="#cases">Case studies</NavLink>
            <NavLink href="#about">About</NavLink>

            {/* Keep your glow content wrapper so the CSS animation picks it up */}
            <PrimaryButton onClick={() => setOpen(true)}>
              <span className="cyd-glow px-6 py-3 inline-block">Work with us</span>
            </PrimaryButton>
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
          {/* LEFT COLUMN */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* Full-text logo row */}
            <div className="mb-6 inline-flex items-center gap-4">
              <picture>
                <source srcSet="/icon.svg?v=6" type="image/svg+xml" />
                <img
                  src="/favicon-32x32.png"
                  alt="CYD"
                  className="h-12 w-12 rounded-2xl border border-cyan-400/30 bg-white/5 p-1"
                />
              </picture>
              <div className="h-8 w-px bg-white/10" />
              <p className="text-sm font-semibold tracking-widest text-cyan-300">CHASE YOUR DREAMS</p>
            </div>

            <h1 className="text-4xl font-black leading-[1.1] sm:text-5xl md:text-6xl">
              Automating your future with{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-sky-500 bg-clip-text text-transparent">
                AI + n8n
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base text-neutral-300">
              CYD Corp designs, builds, and maintains automation that saves time and unlocks growth: chatbots, ops
              workflows, and data pipelines—powered by n8n and cutting-edge AI.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <PrimaryButton onClick={() => setOpen(true)}>Get a free audit</PrimaryButton>
              <SecondaryButton href="#services">See services</SecondaryButton>
            </div>

            <p className="mt-4 text-xs uppercase tracking-widest text-neutral-400">
              Knowledge + Experience = CYD Foundation
            </p>
          </motion.div>

          {/* RIGHT COLUMN (demo panel) */}
          <div className="relative">
            {/* Demo panel with glow + animation */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(34,211,238,0.5)" }}
              className="relative rounded-3xl border border-cyan-500/20 bg-neutral-900/40 p-6 shadow-xl backdrop-blur-xl"
            >
              <div className="rounded-2xl border border-cyan-500/30 bg-neutral-900/70 p-6 shadow-lg shadow-cyan-500/10">
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-sm font-semibold text-cyan-300">Automation Overview</div>
                  <div className="text-xs text-neutral-400">n8n • OpenAI • Slack • Notion</div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {["Leads → CRM", "Support Bot", "Daily Reports"].map((label, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="rounded-lg border border-cyan-400/20 bg-neutral-800/50 p-4"
                    >
                      <div className="text-xs text-neutral-400">Workflow</div>
                      <div className="text-sm font-semibold text-neutral-200">{label}</div>
                      <div className="mt-3 h-2 w-full rounded bg-neutral-700">
                        <motion.div
                          className="h-2 rounded bg-cyan-400/80"
                          initial={{ width: "0%" }}
                          animate={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="rounded-lg border border-cyan-400/20 bg-neutral-800/50 p-4"
                  >
                    <div className="text-xs text-neutral-400">Result</div>
                    <div className="text-sm font-semibold">Time saved this month</div>
                    <div className="mt-3 text-3xl font-black text-cyan-300">142 hrs</div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="rounded-lg border border-cyan-400/20 bg-neutral-800/50 p-4"
                  >
                    <div className="text-xs text-neutral-400">Result</div>
                    <div className="text-sm font-semibold">Revenue impact</div>
                    <div className="mt-3 text-3xl font-black text-cyan-300">+$18,700</div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black">Ready to chase your dreams?</h2>
            <p className="mt-2 text-neutral-300">
              Tell us what you want and we’ll get back within <strong>few seconds</strong> 🚀
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-cyan-400/20 bg-neutral-900/60 p-6">
            {/* Formspree (unchanged wiring) */}
            <FormspreeForm />
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
                alt="CYD"
                width="64"
                height="64"
                className="h-8 w-8 bg-white/10"
              />
            </picture>
            <span>© {new Date().getFullYear()} CYD Corp — Chase Your Dreams</span>
          </div>

          <div className="flex items-center gap-5">
            <a href="mailto:cydsuccess@gmail.com" className="hover:text-white">Email</a>
            <a href="#services" className="hover:text-white">Services</a>
            <a href="#cases" className="hover:text-white">Case studies</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </Container>
      </footer>

      {/* Work with us Modal */}
      <Modal open={open} setOpen={setOpen} title="Work with us" subtitle="Tell us what you want and we’ll get back within few seconds 🚀">
        <FormspreeForm onSuccess={() => setOpen(false)} />
      </Modal>
    </div>
  );
}
