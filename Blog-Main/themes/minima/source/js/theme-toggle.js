(() => {
  const config = window.__minimaTheme || {};
  const selectors = config.selectors || {};
  const events = config.events || {};
  const attributes = config.attributes || {};

  const initThemeToggle = () => {
    const toggle = document.querySelector(selectors.themeToggle || '#themeToggle');

    if (!toggle) {
      return;
    }

    if (toggle.getAttribute(attributes.bound || 'data-bound') === '1') {
      return;
    }

    const setDarkMode = (isDark) => {
      const darkIcon = toggle.getAttribute(attributes.darkIcon || 'data-dark-icon') || 'Dark';
      const lightIcon = toggle.getAttribute(attributes.lightIcon || 'data-light-icon') || 'Light';

      document.documentElement.classList.add('theme-switching');
      document.documentElement.classList.toggle('darkmode', isDark);
      document.body.classList.toggle('darkmode', isDark);
      toggle.textContent = isDark ? lightIcon : darkIcon;
      toggle.setAttribute('aria-pressed', String(isDark));

      if (isDark) {
        localStorage.setItem('preferredTheme', 'dark');
      } else {
        localStorage.removeItem('preferredTheme');
      }

      window.setTimeout(() => {
        document.documentElement.classList.remove('theme-switching');
      }, 260);
    };

    toggle.addEventListener('click', () => {
      setDarkMode(!document.documentElement.classList.contains('darkmode'));
    });
    toggle.setAttribute(attributes.bound || 'data-bound', '1');

    setDarkMode(localStorage.getItem('preferredTheme') === 'dark');
  };

  document.addEventListener('DOMContentLoaded', initThemeToggle);
  document.addEventListener(events.pageReady || 'op:page-ready', initThemeToggle);
})();
