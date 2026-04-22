document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('page-loader');
  if (!loader) {
    return;
  }

  const FAST_HIDE_DELAY = 70;
  const CLICK_SHOW_DELAY = 220;
  const FORCE_HIDE_TIMEOUT = 1500;
  let isHidden = false;
  let pendingShowTimer = null;

  const hideLoader = () => {
    if (isHidden) {
      return;
    }

    isHidden = true;

    if (pendingShowTimer) {
      window.clearTimeout(pendingShowTimer);
      pendingShowTimer = null;
    }

    loader.classList.add('is-hidden');
    window.setTimeout(() => {
      loader.remove();
    }, FAST_HIDE_DELAY);
  };

  const showLoader = () => {
    loader.classList.remove('is-hidden');
  };

  const clickableSelector = [
    'a[href]:not([href^="#"]):not([target="_blank"])',
    'a.interactive-link',
    '.archive-switch-link',
    '.pagination a',
    '.post-toc-nav a'
  ].join(',');

  document.addEventListener('click', (event) => {
    const target = event.target.closest(clickableSelector);
    if (!target) {
      return;
    }

    const href = target.getAttribute('href') || '';
    if (!href || href.startsWith('#') || target.hasAttribute('download')) {
      return;
    }

    const targetUrl = new URL(href, window.location.href);
    const isSamePage =
      targetUrl.pathname === window.location.pathname &&
      targetUrl.search === window.location.search &&
      targetUrl.hash;

    if (isSamePage) {
      return;
    }

    if (pendingShowTimer) {
      window.clearTimeout(pendingShowTimer);
    }

    pendingShowTimer = window.setTimeout(showLoader, CLICK_SHOW_DELAY);
  });

  window.addEventListener('pageshow', hideLoader, { once: true });

  hideLoader();

  window.setTimeout(hideLoader, FORCE_HIDE_TIMEOUT);
});
