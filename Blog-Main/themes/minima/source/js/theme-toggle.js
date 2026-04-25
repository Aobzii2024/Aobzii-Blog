const initThemeToggle = () => {
  const toggle = document.getElementById('themeToggle');

  if (!toggle) {
    return;
  }

  if (toggle.dataset.bound === '1') {
    return;
  }

  const setDarkMode = (isDark) => {
    const darkIcon = toggle.dataset.darkIcon || 'Dark';
    const lightIcon = toggle.dataset.lightIcon || 'Light';

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
  toggle.dataset.bound = '1';

  setDarkMode(localStorage.getItem('preferredTheme') === 'dark');
};

document.addEventListener('DOMContentLoaded', initThemeToggle);
document.addEventListener('op:page-ready', initThemeToggle);
