/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        floaty: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-6px)' } },
        glowpulse: { '0%,100%': { boxShadow: '0 0 0px rgba(34,211,238,0.0)' }, '50%': { boxShadow: '0 0 24px rgba(34,211,238,0.35)' } },
        ripple: { '0%': { transform: 'scale(0)', opacity: 0.5 }, '100%': { transform: 'scale(18)', opacity: 0 } },
        toastIn: { '0%': { transform: 'translateY(8px)', opacity: 0 }, '100%': { transform: 'translateY(0)', opacity: 1 } },
        ring: { '0%': { boxShadow: '0 0 0 0 rgba(34,211,238,0.5)' }, '100%': { boxShadow: '0 0 0 24px rgba(34,211,238,0)' } }
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        glowpulse: 'glowpulse 2.5s ease-in-out infinite',
        ripple: 'ripple 700ms ease-out',
        toastIn: 'toastIn .25s ease-out',
        ring: 'ring .6s ease-out'
      }
    }
  },
  plugins: [],
};
