
/**
 * CYD Corp Enhancements (Pro)
 * - Complex glowing border animation for "Work with us" button
 * - Refined, professional motion for "Automation Overview" block
 * - Modal subtitle copy update
 * Everything else stays untouched.
 */
(function () {
  const css = `
  /* ========= CTA: complex glowing border ========= */
  .cyd-cta-pro {
    position: relative;
    isolation: isolate;
    border-radius: 14px;
    overflow: visible; /* allow glow */
    transform: translateZ(0);
    transition: transform 180ms ease;
  }
  .cyd-cta-pro:hover { transform: translateY(-1px) scale(1.02); }

  /* Animated border ring (conic gradient) */
  .cyd-cta-pro::before {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: inherit;
    background: conic-gradient(
      from 0deg,
      rgba(34,211,238,0.0) 0deg,
      rgba(34,211,238,0.75) 90deg,
      rgba(14,165,233,0.85) 180deg,
      rgba(59,130,246,0.75) 270deg,
      rgba(34,211,238,0.0) 360deg
    );
    animation: cyd-rotate 6s linear infinite;
    z-index: -1;
    -webkit-mask: 
      linear-gradient(#000 0 0) content-box, 
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    padding: 2px;
  }
  /* Soft outer glow */
  .cyd-cta-pro::after {
    content: "";
    position: absolute;
    inset: -8px;
    border-radius: inherit;
    background: radial-gradient(40% 60% at 50% 50%,
      rgba(34,211,238,0.30), rgba(14,165,233,0.10) 40%, transparent 70%);
    filter: blur(10px);
    opacity: 0.7;
    z-index: -2;
    pointer-events: none;
    animation: cyd-breathe 3.2s ease-in-out infinite;
  }

  /* ========= Overview: refined professional motion ========= */
  .cyd-overview-pro {
    position: relative;
    animation: cyd-fade-in-up 620ms cubic-bezier(.2,.8,.2,1) 1 both;
    will-change: transform, box-shadow, opacity;
  }
  .cyd-overview-pro::before {
    /* Decorative gradient edge */
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: 18px;
    background: linear-gradient(135deg, rgba(34,211,238,0.50), rgba(59,130,246,0.35));
    -webkit-mask: 
      linear-gradient(#000 0 0) content-box, 
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    padding: 1px;
    opacity: .65;
    pointer-events: none;
  }
  /* Subtle ambient float */
  .cyd-overview-pro.cyd-float {
    animation: cyd-fade-in-up 620ms cubic-bezier(.2,.8,.2,1) 1 both, 
               cyd-float 9s ease-in-out infinite;
  }

  @keyframes cyd-rotate {
    to { transform: rotate(360deg); }
  }
  @keyframes cyd-breathe {
    0%,100% { opacity: 0.55; filter: blur(8px); }
    50% { opacity: 0.85; filter: blur(12px); }
  }
  @keyframes cyd-float {
    0% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
    100% { transform: translateY(0); }
  }
  @keyframes cyd-fade-in-up {
    0% { opacity: 0; transform: translateY(12px) scale(0.99); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }
  `;

  const style = document.createElement('style');
  style.setAttribute('data-cyd', 'enhance-pro');
  style.textContent = css;
  document.head.appendChild(style);

  // Utility: match text content
  const textOf = (el) => (el.textContent || '').toLowerCase().replace(/\s+/g,' ').trim();

  // Find and tag "Work with us" CTA(s)
  function applyCTA() {
    const nodes = Array.from(document.querySelectorAll('a,button'));
    for (const n of nodes) {
      const t = textOf(n);
      if (t.includes('work with us')) {
        n.classList.add('cyd-cta-pro');
      }
    }
  }

  // Advanced: locate "Automation Overview" block and add class + micro-parallax
  function findOverview() {
    let el = document.querySelector('#automation-overview, .automation-overview, [data-automation-overview]');
    if (el) return el;
    // Fallback via heading
    for (const h of document.querySelectorAll('h1,h2,h3,h4,h5')) {
      const t = textOf(h);
      if (t.includes('automation overview')) {
        return h.closest('section,article,div') || h.parentElement;
      }
    }
    return null;
  }

  function applyOverview() {
    const el = findOverview();
    if (!el) return;
    if (!el.classList.contains('cyd-overview-pro')) {
      el.classList.add('cyd-overview-pro', 'cyd-float');
      // Micro-parallax on hover (professional, subtle)
      let rect;
      function onMove(e) {
        if (!rect) rect = el.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        const px = (mx / rect.width - 0.5);
        const py = (my / rect.height - 0.5);
        el.style.transform = `perspective(800px) rotateX(${(-py*2.2).toFixed(2)}deg) rotateY(${(px*2.6).toFixed(2)}deg)`;
      }
      function onLeave() {
        el.style.transform = "";
        rect = null;
      }
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
    }
  }

  // Replace modal subtitle copy
  function replaceSubtitle() {
    const targets = Array.from(document.querySelectorAll('p,div,span'));
    for (const node of targets) {
      const raw = (node.textContent || '').trim();
      if (!raw) continue;
      if (raw === "Drop your details and we’ll get back within 24 hours." || raw === "Drop your details and we'll get back within 24 hours.") {
        node.textContent = "Tell us what you want and we’ll get back within a few seconds 🚀";
        break;
      }
    }
  }

  function run() {
    applyCTA();
    applyOverview();
    replaceSubtitle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
  // Catch subsequent renders / modal opens
  setTimeout(run, 300);
  setTimeout(run, 1200);
  const mo = new MutationObserver(run);
  mo.observe(document.documentElement, { childList: true, subtree: true });
})();
