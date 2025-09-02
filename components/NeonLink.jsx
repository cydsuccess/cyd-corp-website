import { motion } from "framer-motion";
import clsx from "clsx";

export default function NeonLink({ href, children, className }) {
  return (
    <motion.a
      href={href}
      className={clsx("link-underline inline-flex items-center px-2 py-1 text-sm text-neutral-300 hover:text-white transition", className)}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      {children}
    </motion.a>
  );
}
