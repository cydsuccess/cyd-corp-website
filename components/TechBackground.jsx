
import { motion } from "framer-motion";
export default function TechBackground({ className = "" }) {
  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`} aria-hidden>
      <div className="absolute inset-0 opacity-30"
        style={{ background: 'radial-gradient(600px 300px at 10% 10%, rgba(34,211,238,0.18), transparent 60%), radial-gradient(700px 400px at 90% 80%, rgba(6,182,212,0.16), transparent 60%)' }}
      />
      <svg className="absolute -left-24 top-10 h-[140%] w-[140%] opacity-25" viewBox="0 0 1200 800" fill="none">
        <defs>
          <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#22d3ee" stopOpacity="0.8" offset="0%" />
            <stop stopColor="#22d3ee" stopOpacity="0.1" offset="100%" />
          </linearGradient>
        </defs>
        {[...Array(16)].map((_, i) => (
          <motion.path key={i}
            d={`M ${50 + i*70} 0 V 200 q 0 20 20 20 h 120 q 20 0 20 20 v 180 q 0 20 20 20 h 140`}
            stroke="url(#glow)" strokeWidth="1.2" strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.3 }}
            animate={{ pathLength: 1, opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 6 + i*0.2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>
      {[...Array(24)].map((_, i) => (
        <motion.div key={i} className="absolute h-1 w-1 rounded-full"
          style={{ background: 'rgba(34,211,238,0.7)', left: `${(i*37)%100}%`, top: `${(i*17)%100}%` }}
          animate={{ y: [0, -6, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 4 + (i%5), repeat: Infinity, delay: i*0.1 }}
        />
      ))}
    </div>
  );
}
