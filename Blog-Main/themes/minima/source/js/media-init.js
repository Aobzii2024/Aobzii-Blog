(() => {
  const config = window.__minimaTheme || {};
  const selectors = config.selectors || {};
  const events = config.events || {};

  const optimizeImages = () => {
    const images = Array.from(document.querySelectorAll(selectors.image || 'img'));

    images.forEach((image, index) => {
      image.decoding = 'async';

      if (index > 0 && !image.hasAttribute('loading')) {
        image.loading = 'lazy';
      }
    });
  };

  const initMediaEnhancements = () => {
    optimizeImages();
  };

  document.addEventListener('DOMContentLoaded', initMediaEnhancements);
  document.addEventListener(events.pageReady || 'op:page-ready', initMediaEnhancements);
})();
