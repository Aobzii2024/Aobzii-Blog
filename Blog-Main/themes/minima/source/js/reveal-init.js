(() => {
  const config = window.__minimaTheme || {};
  const events = config.events || {};

  const revealSelector = [
    '.home-post-row',
    '.daily-card',
    '.archive-item',
    '.post-end-meta',
    '.post-content > *',
    '.page-content > *',
    '.archive-group',
    '.post-header'
  ].join(', ');

  const markRevealItems = () => {
    const nodes = Array.from(document.querySelectorAll(revealSelector));

    nodes.forEach((node, index) => {
      node.classList.add('reveal-item');
      node.style.setProperty('--reveal-delay', `${Math.min(index, 14) * 36}ms`);
    });

    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px'
      }
    );

    nodes.forEach((node) => {
      if (!node.classList.contains('is-visible')) {
        observer.observe(node);
      }
    });
  };

  const initRevealAnimations = () => {
    document.documentElement.classList.add('motion-enabled');
    markRevealItems();
  };

  document.addEventListener('DOMContentLoaded', initRevealAnimations);
  document.addEventListener(events.pageReady || 'op:page-ready', initRevealAnimations);
})();
