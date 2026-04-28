(() => {
  const config = window.__minimaTheme || {};
  const selectors = config.selectors || {};
  const events = config.events || {};

  const normalizeDisplayMathBlocks = () => {
    const paragraphs = document.querySelectorAll(selectors.markdownParagraph || '.markdown-content p');

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

  const hasMathContent = () => Array.from(
    document.querySelectorAll(selectors.markdownMathNode || '.markdown-content p, .markdown-content div')
  ).some((node) => {
    const text = (node.textContent || '').trim();
    return text.includes('$$') || /\$[^\n]+\$/.test(text);
  });

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

  const initMathEnhancements = () => {
    normalizeDisplayMathBlocks();

    if (!hasMathContent()) {
      return;
    }

    if (window.MathJax && window.MathJax.startup && window.MathJax.startup.promise) {
      window.MathJax.startup.promise.then(typesetMath);
    } else {
      loadMathJax();
    }
  };

  document.addEventListener('DOMContentLoaded', initMathEnhancements);
  document.addEventListener(events.pageReady || 'op:page-ready', initMathEnhancements);
})();
