document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('page-loader');
  if (!loader) {
    return;
  }

  const hideLoader = () => {
    loader.classList.add('is-hidden');
    window.setTimeout(() => {
      loader.remove();
    }, 300);
  };

  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader, { once: true });
  }

  window.setTimeout(hideLoader, 2200);
});
