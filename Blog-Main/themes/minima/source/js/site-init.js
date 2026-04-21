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
