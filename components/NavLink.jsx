// components/NavLink.jsx
import { motion, AnimatePresence } from "framer-motion";
import * as React from "react";

export default function NavLink({ href, children }) {
  const [hover, setHover] = React.useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative inline-block px-1 py-0.5 text-sm text-neutral-300 transition-colors hover:text-white"
    >
      <span>{children}</span>
      <AnimatePresence>
        {hover && (
          <motion.span
            layoutId="nav-underline"
            className="absolute left-0 right-0 -bottom-1 h-[2px] rounded-full bg-cyan-400/80"
            initial={{ opacity: 0, scaleX: 0.5 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0.5 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </AnimatePresence>
    </a>
  );
}
