const initThemeToggle = () => {
  const darkBtn = document.getElementById('darkBtn');
  const lightBtn = document.getElementById('lightBtn');

  if (!darkBtn || !lightBtn) {
    return;
  }

  if (darkBtn.dataset.bound === '1' && lightBtn.dataset.bound === '1') {
    return;
  }

  const setDarkMode = (isDark) => {
    if (isDark) {
      lightBtn.style.display = 'block';
      darkBtn.style.display = 'none';
      localStorage.setItem('preferredTheme', 'dark');
    } else {
      lightBtn.style.display = 'none';
      darkBtn.style.display = 'block';
      localStorage.removeItem('preferredTheme');
    }

    document.documentElement.classList.toggle('darkmode', isDark);
    document.body.classList.toggle('darkmode', isDark);
  };

  darkBtn.addEventListener('click', () => setDarkMode(true));
  lightBtn.addEventListener('click', () => setDarkMode(false));
  darkBtn.dataset.bound = '1';
  lightBtn.dataset.bound = '1';

  setDarkMode(localStorage.getItem('preferredTheme') === 'dark');
};

document.addEventListener('DOMContentLoaded', initThemeToggle);
document.addEventListener('op:page-ready', initThemeToggle);
