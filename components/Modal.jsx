
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
export default function Modal({ open, onClose, children, title = "Work with us" }) {
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[100] grid place-items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div role="dialog" aria-modal="true"
            className="relative z-[101] w-full max-w-md rounded-3xl border border-white/10 bg-neutral-900 p-6 shadow-2xl"
            initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
            <div className="mb-3 text-lg font-bold">{title}</div>
            {children}
            <button onClick={onClose} className="mt-4 text-sm text-neutral-400 hover:text-white">Close</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
