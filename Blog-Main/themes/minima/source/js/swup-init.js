(() => {
  const emitPageReady = () => {
    document.dispatchEvent(new CustomEvent('op:page-ready'));
  };

  document.addEventListener('DOMContentLoaded', emitPageReady);

  if (!window.Swup) {
    return;
  }

  const swup = new window.Swup({
    containers: ['#swup']
  });

  document.addEventListener('swup:page:view', emitPageReady);

  window.__opSwup = swup;
})();
