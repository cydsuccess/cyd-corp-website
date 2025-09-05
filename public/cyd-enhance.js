
/**
 * CYD Corp — Glow CTA + Pro Overview Animation (v2.1, containment fix)
 * - Contains the CTA glow to the button bounds (masked ring, mild blur).
 * - Keeps classy Overview motion; disables tilt on small screens.
 */
(function () {
  const css = `
  /* ===== CTA Glowing Ring (contained) ===== */
  .cyd-cta-wrap{
    position:relative;
    display:inline-block;
    border-radius:12px;
    isolation:isolate;   /* keep pseudo stacking scoped */
  }
  .cyd-cta-target{
    position:relative;
    z-index:2;
    border-radius:10px;
    transform:translateZ(0);
  }
  /* Crisp animated ring (masked so it stays as a border) */
  .cyd-cta-wrap::before{
    content:"";
    position:absolute;
    inset:-1px;                   /* ring thickness start */
    padding:1.5px;                /* ring thickness */
    border-radius:14px;
    background: conic-gradient(
      from 0deg,
      rgba(0,0,0,0) 0deg,
      #22d3ee 60deg,
      #3b82f6 160deg,
      #60a5fa 220deg,
      rgba(0,0,0,0) 320deg
    );
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    animation: cyd-cta-rotate 4s linear infinite;
    opacity:.9;
    pointer-events:none;
    z-index:0;
  }
  /* Soft halo, tightly contained */
  .cyd-cta-wrap::after{
    content:"";
    position:absolute;
    inset:-4px;
    border-radius:16px;
    background: conic-gradient(
      from 0deg,
      rgba(34,211,238,.35),
      rgba(59,130,246,.25),
      rgba(34,211,238,.35)
    );
    -webkit-mask: radial-gradient(closest-side, rgba(0,0,0,.9), transparent 70%);
    filter: blur(8px);
    opacity:.45;
    animation: cyd-cta-rotate 6s linear infinite reverse;
    pointer-events:none;
    z-index:0;
  }
  .cyd-cta-target:hover{ transform: translateY(-1px); }
  @keyframes cyd-cta-rotate { to { transform: rotate(1turn); } }

  /* ===== Automation Overview Motion ===== */
  .cyd-overview-pro{
    position:relative;
    animation: cyd-fade-up 600ms cubic-bezier(.2,.8,.2,1) both;
    will-change: transform, opacity;
  }
  .cyd-overview-pro::after{
    content:"";
    position:absolute;
    inset:-1px;
    border-radius:18px;
    background: linear-gradient(135deg, rgba(34,211,238,.45), rgba(59,130,246,.35));
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    padding:1px;
    opacity:.7;
    pointer-events:none;
  }
  .cyd-overview-float{
    animation: cyd-fade-up 600ms cubic-bezier(.2,.8,.2,1) both, cyd-float 9s ease-in-out infinite;
  }
  @keyframes cyd-fade-up {
    0% { opacity:0; transform: translateY(14px) scale(.995); }
    100%{ opacity:1; transform: translateY(0)  scale(1); }
  }
  @keyframes cyd-float {
    0% { transform: translateY(0); }
    50%{ transform: translateY(-4px); }
    100%{transform: translateY(0); }
  }
  `;

  // Inject CSS once
  if (!document.querySelector('style[data-cyd="glow-overview-v21"]')) {
    const style = document.createElement('style');
    style.setAttribute('data-cyd','glow-overview-v21');
    style.textContent = css;
    document.head.appendChild(style);
  }

  const textOf = (el) => (el.textContent || '').toLowerCase().replace(/\s+/g,' ').trim();

  function enhanceCTA(){
    const nodes = Array.from(document.querySelectorAll('a,button'));
    for (const el of nodes){
      const t = textOf(el);
      if (!t.includes('work with us')) continue;
      if (el.closest('.cyd-cta-wrap')) continue;
      const wrap = document.createElement('span');
      wrap.className = 'cyd-cta-wrap';
      el.classList.add('cyd-cta-target');
      const p = el.parentNode;
      if (!p) continue;
      p.insertBefore(wrap, el);
      wrap.appendChild(el);
    }
  }

  function findOverview(){
    let el = document.querySelector('#automation-overview, .automation-overview, [data-automation-overview]');
    if (el) return el;
    for (const h of document.querySelectorAll('h1,h2,h3,h4,h5')) {
      const txt = textOf(h);
      if (txt.includes('automation overview')) {
        return h.closest('section,article,div') || h.parentElement;
      }
    }
    return null;
  }

  function enhanceOverview(){
    const el = findOverview();
    if (!el) return;
    if (!el.classList.contains('cyd-overview-pro')) {
      el.classList.add('cyd-overview-pro','cyd-overview-float');
      let rect;
      const allowTilt = window.matchMedia('(min-width: 768px)').matches;
      function onMove(e){
        if (!allowTilt) return;
        if (!rect) rect = el.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        const px = (mx/rect.width - .5);
        const py = (my/rect.height - .5);
        el.style.transform = `perspective(900px) rotateX(${(-py*2.0).toFixed(2)}deg) rotateY(${(px*2.4).toFixed(2)}deg)`;
      }
      function onLeave(){ el.style.transform = ''; rect=null; }
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
    }
  }

  function run(){
    enhanceCTA();
    enhanceOverview();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
  setTimeout(run, 300);
  setTimeout(run, 1200);
  const mo = new MutationObserver(run);
  mo.observe(document.documentElement, {childList:true, subtree:true});
})();
