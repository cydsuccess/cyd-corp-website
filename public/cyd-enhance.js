
/**
 * CYD Corp — Glow CTA + Pro Overview Animation (v2)
 * Keeps everything else unchanged.
 * - Applies the user's conic-gradient glow border logic to the "Work with us" button.
 * - Adds a professional fade/float/tilt + subtle gradient edge to the "Automation Overview" block.
 * No framework imports; pure CSS/JS, injected at runtime.
 */
(function () {
  const css = `
  /* ====== CTA Glow Border (based on user's CSS, adapted to CYD palette) ====== */
  .cyd-cta-wrap {
    position: relative;
    display: inline-block;
    border-radius: 12px;
    /* ensure the wrapper fits button tightly */
  }
  .cyd-cta-target {
    position: relative;
    z-index: 2;
    border-radius: 10px; /* inner radius */
    isolation: isolate;
    transform: translateZ(0);
  }

  /* Two-layer effect: glow (blurred) + crisp border, both spinning conic gradients */
  .cyd-cta-wrap::before,
  .cyd-cta-wrap::after {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: 14px;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-image: conic-gradient(
      rgba(0,0,0,0),
      #22d3ee,
      #1976ed,
      #3b82f6,
      rgba(0,0,0,0) 25%
    );
    animation: cyd-cta-rotate 4s linear infinite;
    z-index: 0;
    pointer-events: none;
  }
  /* Glow layer */
  .cyd-cta-wrap::before {
    filter: blur(20px);
    opacity: 0.9;
  }
  /* Crisp edge */
  .cyd-cta-wrap::after {
    filter: none;
    opacity: .85;
  }

  /* Inner mask to create a border look */
  .cyd-cta-target::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 10px;
    background: radial-gradient(60% 80% at 50% 50%, rgba(34,211,238,.06), rgba(14,165,233,.04) 40%, transparent 70%),
                rgba(255,255,255,0.02);
    z-index: -1;
  }

  /* Hover lift (kept subtle; Tailwind may already move it) */
  .cyd-cta-target:hover { transform: translateY(-1px); }

  @keyframes cyd-cta-rotate {
    to { transform: rotate(1turn); }
  }

  /* ====== Automation Overview Pro Motion ====== */
  .cyd-overview-pro {
    position: relative;
    animation: cyd-fade-up 600ms cubic-bezier(.2,.8,.2,1) both;
    will-change: transform, opacity;
  }
  .cyd-overview-pro::after {
    /* thin gradient edge like a premium card */
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: 18px;
    background: linear-gradient(135deg, rgba(34,211,238,0.45), rgba(59,130,246,0.35));
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    padding: 1px;
    opacity: .7;
    pointer-events: none;
  }
  .cyd-overview-float {
    animation: cyd-fade-up 600ms cubic-bezier(.2,.8,.2,1) both, cyd-float 9s ease-in-out infinite;
  }

  @keyframes cyd-fade-up {
    0% { opacity: 0; transform: translateY(14px) scale(.995); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes cyd-float {
    0% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
    100% { transform: translateY(0); }
  }
  `;

  // Inject CSS
  const style = document.createElement('style');
  style.setAttribute('data-cyd', 'glow-overview-v2');
  style.textContent = css;
  document.head.appendChild(style);

  // Utilities
  const textOf = (el) => (el.textContent || '').toLowerCase().replace(/\s+/g,' ').trim();

  // Wrap "Work with us" button with glow structure
  function enhanceCTA() {
    const candidates = Array.from(document.querySelectorAll('a,button'));
    for (const el of candidates) {
      const t = textOf(el);
      if (!t.includes('work with us')) continue;

      // Skip if already wrapped
      if (el.closest('.cyd-cta-wrap')) continue;

      // Wrap
      const wrap = document.createElement('span');
      wrap.className = 'cyd-cta-wrap';
      el.classList.add('cyd-cta-target');

      const parent = el.parentNode;
      if (!parent) continue;
      parent.insertBefore(wrap, el);
      wrap.appendChild(el);
    }
  }

  // Find Automation Overview card/container and add motion classes
  function findOverview() {
    let el = document.querySelector('#automation-overview, .automation-overview, [data-automation-overview]');
    if (el) return el;
    // Fallback: heading scan
    for (const h of document.querySelectorAll('h1,h2,h3,h4,h5')) {
      const txt = textOf(h);
      if (txt.includes('automation overview')) {
        return h.closest('section,article,div') || h.parentElement;
      }
    }
    return null;
  }

  function enhanceOverview() {
    const el = findOverview();
    if (!el) return;
    if (!el.classList.contains('cyd-overview-pro')) {
      el.classList.add('cyd-overview-pro', 'cyd-overview-float');
      // Subtle pointer tilt
      let rect;
      function onMove(e) {
        if (!rect) rect = el.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        const px = (mx / rect.width - 0.5);
        const py = (my / rect.height - 0.5);
        el.style.transform = `perspective(900px) rotateX(${(-py*2.2).toFixed(2)}deg) rotateY(${(px*2.6).toFixed(2)}deg)`;
      }
      function onLeave() {
        el.style.transform = "";
        rect = null;
      }
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
    }
  }

  function run() {
    enhanceCTA();
    enhanceOverview();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
  // Re-apply after dynamic renders
  setTimeout(run, 250);
  setTimeout(run, 1200);
  const mo = new MutationObserver(run);
  mo.observe(document.documentElement, { childList: true, subtree: true });
})();
