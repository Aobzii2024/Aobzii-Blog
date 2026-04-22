document.addEventListener('DOMContentLoaded', () => {
  if (window.Nanobar) {
    const nanobar = new Nanobar({
      classname: 'nanobar',
      id: 'myNanobar'
    });
    nanobar.go(30);
    nanobar.go(76);
    nanobar.go(100);
  }

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

  const typesetMath = () => {
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise();
    }
  };

  if (window.MathJax && window.MathJax.startup && window.MathJax.startup.promise) {
    window.MathJax.startup.promise.then(typesetMath);
  } else {
    window.addEventListener('load', typesetMath);
  }
});
