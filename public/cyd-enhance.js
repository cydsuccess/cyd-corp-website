// /public/cyd-enhance.js

// Apply glow to Work With Us button and float to Automation Overview
document.addEventListener("DOMContentLoaded", () => {
  // Work With Us button
  const workBtnCandidates = Array.from(document.querySelectorAll("a,button"));
  const workBtn = workBtnCandidates.find((el) =>
    (el.textContent || "").toLowerCase().includes("work with us")
  );
  if (workBtn) {
    workBtn.classList.add("cyd-glow");
  }

  // Automation Overview block
  const overview =
    document.querySelector("#automation-overview") ||
    document.querySelector(".automation-overview") ||
    Array.from(document.querySelectorAll("h1,h2,h3,h4,h5")).find((h) =>
      (h.textContent || "").toLowerCase().includes("automation overview")
    )?.closest("section,div,article");
  if (overview) {
    overview.classList.add("cyd-float");
  }
});
