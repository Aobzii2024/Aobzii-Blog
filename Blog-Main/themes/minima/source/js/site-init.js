const runSiteEnhancements = () => {
  const bindNavigationFeedback = () => {
    if (window.__opNavigationFeedbackBound) {
      return;
    }

    window.__opNavigationFeedbackBound = true;

    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[href]');
      if (!link || link.target === '_blank' || link.hasAttribute('download')) {
        return;
      }

      const url = new URL(link.href, window.location.href);
      const isSameOrigin = url.origin === window.location.origin;
      const isSamePageHash =
        url.pathname === window.location.pathname &&
        url.search === window.location.search &&
        url.hash;

      if (!isSameOrigin || isSamePageHash) {
        return;
      }

      document.documentElement.classList.add('is-navigating');
      window.setTimeout(() => {
        document.documentElement.classList.remove('is-navigating');
      }, 180);
    });

    window.addEventListener('pageshow', () => {
      document.documentElement.classList.remove('is-navigating');
    });
  };

  bindNavigationFeedback();

  const normalizeDisplayMathBlocks = () => {
    const paragraphs = document.querySelectorAll('.markdown-content p');

    paragraphs.forEach((paragraph) => {
      const raw = (paragraph.textContent || '').trim();
      const isDisplayMath = raw.startsWith('$$') && raw.endsWith('$$') && raw.length > 4;

      if (!isDisplayMath) {
        return;
      }

      const block = document.createElement('div');
      block.textContent = raw;
      paragraph.replaceWith(block);
    });
  };

  normalizeDisplayMathBlocks();

  const hasMath = Array.from(document.querySelectorAll('.markdown-content p, .markdown-content div')).some(
    (node) => {
      const text = (node.textContent || '').trim();
      return text.includes('$$') || /\$[^\n]+\$/.test(text);
    }
  );

  if (!hasMath) {
    return;
  }

  const typesetMath = () => {
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise();
    }
  };

  const loadMathJax = () => {
    if (window.MathJax && window.MathJax.typesetPromise) {
      typesetMath();
      return;
    }

    if (document.querySelector('script[data-mathjax-loader]')) {
      return;
    }

    const script = document.createElement('script');
    script.src = '/js/tex-svg.js';
    script.defer = true;
    script.dataset.mathjaxLoader = '1';
    script.addEventListener('load', typesetMath, { once: true });
    document.head.appendChild(script);
  };

  if (window.MathJax && window.MathJax.startup && window.MathJax.startup.promise) {
    window.MathJax.startup.promise.then(typesetMath);
  } else {
    loadMathJax();
  }
};

document.addEventListener('DOMContentLoaded', runSiteEnhancements);
document.addEventListener('op:page-ready', runSiteEnhancements);
