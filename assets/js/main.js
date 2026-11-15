/* Shared navigation for the GCPP45 policy portfolio.
   Supports click/touch, keyboard focus, Escape, and outside-click closing. */
(() => {
  'use strict';

  const dropdowns = Array.from(document.querySelectorAll('.nav-dropdown'));
  const closeAll = (except = null) => {
    dropdowns.forEach((dropdown) => {
      if (dropdown === except) return;
      dropdown.classList.remove('is-open');
      const toggle = dropdown.querySelector('.nav-dropdown-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  };

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const willOpen = !dropdown.classList.contains('is-open');
      closeAll(dropdown);
      dropdown.classList.toggle('is-open', willOpen);
      toggle.setAttribute('aria-expanded', String(willOpen));
    });

    dropdown.addEventListener('focusout', (event) => {
      if (!dropdown.contains(event.relatedTarget)) {
        dropdown.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.nav-dropdown')) closeAll();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const expanded = document.querySelector('.nav-dropdown.is-open .nav-dropdown-toggle');
    closeAll();
    if (expanded) expanded.focus();
  });

  // Indicate the current subpage in the dropdown without altering page content.
  const currentPath = window.location.pathname.replace(/\/+$/, '').split('/').pop() || 'index.html';
  document.querySelectorAll('.dropdown-menu a').forEach((link) => {
    const linkedPage = new URL(link.href).pathname.split('/').pop();
    if (linkedPage === currentPath) {
      link.setAttribute('aria-current', 'page');
    }
  });
})();