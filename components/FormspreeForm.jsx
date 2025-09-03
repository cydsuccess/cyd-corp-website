// components/FormspreeForm.jsx
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FormspreeForm({ endpoint = "https://formspree.io/f/mdklwpon", compact = false }) {
  const [status, setStatus] = React.useState("idle");
  const [error, setError] = React.useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        formEl.reset();
      } else {
        const data = await res.json().catch(() => ({}));
        const msg = data?.errors?.[0]?.message || data?.message || "Couldn’t send. Please try again.";
        setError(msg);
        setStatus("error");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-4 text-left">
      {/* Hidden helpers */}
      <input type="hidden" name="_subject" value="New CYD Lead" />
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

      <input
        name="name"
        placeholder="Your name"
        required
        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-neutral-500 focus:border-cyan-400/50"
      />

      <input
        name="email"
        type="email"
        placeholder="Email (or Telegram handle)"
        required
        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-neutral-500 focus:border-cyan-400/50"
      />

      {!compact && (
        <textarea
          name="message"
          placeholder="What do you want to automate?"
          className="min-h-[120px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-neutral-500 focus:border-cyan-400/50"
        />
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center rounded-2xl bg-cyan-500/90 px-5 py-3 text-sm font-semibold tracking-wide text-black shadow-lg transition hover:translate-y-[-1px] hover:bg-cyan-400 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send request"}
      </button>

      {/* Animated status messages */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="text-cyan-300 font-semibold"
          >
            You’re all good! We’ll contact you ASAP 🚀
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="text-red-400"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
