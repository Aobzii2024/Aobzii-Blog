(() => {
  const emitPageReady = () => {
    document.dispatchEvent(new CustomEvent('op:page-ready'));
  };

  const root = document.documentElement;

  const markRendering = () => {
    root.classList.add('is-rendering');
    window.setTimeout(() => {
      root.classList.remove('is-rendering');
    }, 170);
  };

  document.addEventListener('DOMContentLoaded', emitPageReady);
  document.addEventListener('DOMContentLoaded', markRendering);

  if (!window.Swup) {
    return;
  }

  const swup = new window.Swup({
    containers: ['#swup']
  });

  document.addEventListener('swup:page:view', emitPageReady);
  document.addEventListener('swup:content:replace', markRendering);

  window.__opSwup = swup;
})();
