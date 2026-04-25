const runSiteEnhancements = () => {
  const emitPageReady = () => {
    document.dispatchEvent(new CustomEvent('op:page-ready'));
  };

  const bindNavigationFeedback = () => {
    if (window.__opNavigationFeedbackBound) {
      return;
    }

    window.__opNavigationFeedbackBound = true;

    const loadPage = async (url, options = {}) => {
      const currentContent = document.getElementById('page-content');
      if (!currentContent) {
        window.location.href = url.href;
        return;
      }

      document.documentElement.classList.add('is-navigating');

      try {
        const response = await fetch(url.href, {
          headers: { 'X-Requested-With': 'fetch' }
        });

        if (!response.ok) {
          throw new Error('Navigation request failed');
        }

        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const nextContent = doc.getElementById('page-content');

        if (!nextContent) {
          throw new Error('Missing page content');
        }

        document.title = doc.title;
        currentContent.replaceWith(nextContent);
        if (options.replace) {
          window.history.replaceState({}, doc.title, url.href);
        } else {
          window.history.pushState({}, doc.title, url.href);
        }

        window.scrollTo(0, 0);
        emitPageReady();
      } catch (error) {
        window.location.href = url.href;
      } finally {
        window.setTimeout(() => {
          document.documentElement.classList.remove('is-navigating');
        }, 120);
      }
    };

    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[href]');
      if (
        !link ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        link.target === '_blank' ||
        link.hasAttribute('download')
      ) {
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

      event.preventDefault();
      loadPage(url);
    });

    window.addEventListener('popstate', () => {
      loadPage(new URL(window.location.href), { replace: true });
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
