/**
 * CYD Corp Enhancements
 * - Smooth animation for "Automation Overview" block
 * - Glowing animation for "Work with us" button
 * - Replace modal subtitle copy
 * Everything else untouched.
 */

(function () {
  // Inject CSS for animations
  const css = `
  @keyframes cyd-float {
    0% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
    100% { transform: translateY(0); }
  }
  @keyframes cyd-fade-in-up {
    0% { opacity: 0; transform: translateY(12px) scale(0.99); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes cyd-glow {
    0% { box-shadow: 0 0 0 rgba(0, 0, 0, 0); }
    50% { box-shadow: 0 0 24px rgba(34, 211, 238, 0.45), 0 0 48px rgba(14, 165, 233, 0.25); }
    100% { box-shadow: 0 0 0 rgba(0, 0, 0, 0); }
  }
  .cyd-overview-animated {
    animation: cyd-fade-in-up 600ms ease-out 1 both, cyd-float 8s ease-in-out infinite;
    will-change: transform, opacity;
  }
  .cyd-cta-glow {
    position: relative;
    animation: cyd-glow 2.4s ease-in-out infinite;
    transition: transform 180ms ease;
  }
  .cyd-cta-glow:hover {
    transform: translateY(-1px) scale(1.02);
  }
  `;
  const style = document.createElement('style');
  style.setAttribute('data-cyd', 'enhance');
  style.textContent = css;
  document.head.appendChild(style);

  // Helper: find element by id/data attribute or heading text
  function findAutomationOverview() {
    // By common ids/classes
    let el = document.querySelector('#automation-overview, .automation-overview, [data-automation-overview]');
    if (el) return el;

    // Try headings that contain the exact words
    const headings = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5'));
    for (const h of headings) {
      const t = (h.textContent || '').trim().toLowerCase();
      if (t.includes('automation overview')) {
        // Animate the block containing this heading
        return h.closest('section,div,article') || h.parentElement;
      }
    }
    return null;
  }

  function applyOverviewAnimation() {
    const el = findAutomationOverview();
    if (el && !el.classList.contains('cyd-overview-animated')) {
      el.classList.add('cyd-overview-animated');
    }
  }

  // Apply CTA glow to "Work with us" button(s)
  function applyCTAglow() {
    const candidates = Array.from(document.querySelectorAll('a,button'));
    for (const node of candidates) {
      const txt = (node.textContent || '').toLowerCase().replace(/\s+/g, ' ').trim();
      if (txt.includes('work with us')) {
        node.classList.add('cyd-cta-glow');
      }
    }
  }

  // Replace modal subtitle text
  function replaceModalSubtitle() {
    const targets = Array.from(document.querySelectorAll('p,div,span'));
    for (const node of targets) {
      const t = (node.textContent || '').trim();
      if (!t) continue;
      if (t === "Drop your details and we’ll get back within 24 hours." || t === "Drop your details and we'll get back within 24 hours.") {
        node.textContent = "Tell us what you want and we’ll get back within a few seconds 🚀";
        return;
      }
    }
  }

  function runAll() {
    applyOverviewAnimation();
    applyCTAglow();
    replaceModalSubtitle();
  }

  // Run on ready + after small delay to catch async renders
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAll);
  } else {
    runAll();
  }
  setTimeout(runAll, 300);
  setTimeout(runAll, 1200);

  // Also watch DOM changes (e.g., modal open)
  const mo = new MutationObserver(runAll);
  mo.observe(document.documentElement, { subtree: true, childList: true });
})();
