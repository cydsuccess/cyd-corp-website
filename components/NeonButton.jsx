
import { motion } from "framer-motion";
import { useRef } from "react";
import clsx from "clsx";
export default function NeonButton({ children, className, onClick, as = 'button', href }) {
  const ref = useRef(null);
  const handleClick = (e) => {
    const el = ref.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const span = document.createElement('span');
      span.className = 'ripple-span';
      span.style.left = (e.clientX - rect.left) + 'px';
      span.style.top  = (e.clientY - rect.top)  + 'px';
      el.appendChild(span);
      setTimeout(() => span.remove(), 700);
    }
    onClick?.(e);
  };
  const common = clsx("btn-neo inline-flex items-center px-4 py-2 text-sm font-semibold tracking-wide transition will-change-transform", className);
  if (as === 'a' && href) {
    return <motion.a ref={ref} href={href} whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} className={common} onClick={handleClick}>{children}</motion.a>;
  }
  return <motion.button ref={ref} type="button" whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} className={common} onClick={handleClick}>{children}</motion.button>;
}
