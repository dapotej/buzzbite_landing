// Buzzbite — Component Loader
// Fetches nav.html and footer.html and injects them into every page.
// Also handles: active nav state, dropdown behaviour.

(async function () {
  const [navRes, footerRes] = await Promise.all([
    fetch('/nav.html'),
    fetch('/footer.html'),
  ]);
  const [navHTML, footerHTML] = await Promise.all([
    navRes.text(),
    footerRes.text(),
  ]);

  // Strip the HTML comment lines from the fetched fragments
  const clean = str => str.replace(/<!--.*?-->/gs, '').trim();

  // Inject nav
  const navPlaceholder = document.getElementById('nav-placeholder');
  if (navPlaceholder) navPlaceholder.outerHTML = clean(navHTML);

  // Inject footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) footerPlaceholder.outerHTML = clean(footerHTML);

  // ── Active nav link highlighting ──────────────────────────────────────────
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    // Exact match or pathname match (ignore hash)
    const hrefPath = href.split('#')[0];
    if (hrefPath && path.endsWith(hrefPath.replace(/^\//, ''))) {
      a.classList.add('active');
    }
  });

  // ── Services dropdown ─────────────────────────────────────────────────────
  const li = document.querySelector('.nav-links > li:has(.nav-dropdown)');
  if (!li) return;
  let closeTimer;

  const openMenu  = () => { clearTimeout(closeTimer); li.classList.add('open'); };
  const closeMenu = () => { closeTimer = setTimeout(() => li.classList.remove('open'), 150); };

  li.addEventListener('mouseenter', openMenu);
  li.addEventListener('mouseleave', closeMenu);
  li.querySelector('.nav-dropdown').addEventListener('mouseenter', openMenu);
  li.querySelector('.nav-dropdown').addEventListener('mouseleave', closeMenu);
  document.addEventListener('click', e => { if (!li.contains(e.target)) li.classList.remove('open'); });
})();

// ── Scroll reveal ─────────────────────────────────────────────────────────────
const revealObs = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.08 }
);
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── Smooth scroll for in-page anchor links ────────────────────────────────────
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const href = a.getAttribute('href');
  if (!href || href === '#') return;
  const target = document.querySelector(href);
  if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
});
