// components/NeonLink.jsx
import { motion } from "framer-motion";
import Link from "next/link";

export default function NeonLink({ href, children }) {
  return (
    <Link href={href} passHref>
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative text-neutral-300 hover:text-white px-1"
      >
        {children}
        <motion.span
          layoutId="underline"
          className="absolute left-0 -bottom-1 h-[2px] w-full bg-cyan-400 rounded-full"
        />
      </motion.a>
    </Link>
  );
}
