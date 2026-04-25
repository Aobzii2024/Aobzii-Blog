const initThemeToggle = () => {
  const toggle = document.getElementById('themeToggle');

  if (!toggle) {
    return;
  }

  if (toggle.dataset.bound === '1') {
    return;
  }

  const setDarkMode = (isDark) => {
    document.documentElement.classList.toggle('darkmode', isDark);
    document.body.classList.toggle('darkmode', isDark);
    toggle.textContent = isDark ? 'Light' : 'Dark';
    toggle.setAttribute('aria-pressed', String(isDark));

    if (isDark) {
      localStorage.setItem('preferredTheme', 'dark');
    } else {
      localStorage.removeItem('preferredTheme');
    }
  };

  toggle.addEventListener('click', () => {
    setDarkMode(!document.documentElement.classList.contains('darkmode'));
  });
  toggle.dataset.bound = '1';

  setDarkMode(localStorage.getItem('preferredTheme') === 'dark');
};

document.addEventListener('DOMContentLoaded', initThemeToggle);
document.addEventListener('op:page-ready', initThemeToggle);
