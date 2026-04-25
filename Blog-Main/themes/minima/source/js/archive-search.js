const initArchiveSearch = () => {
  const input = document.getElementById('archive-search-input');

  if (!input) {
    return;
  }

  if (input.dataset.bound === '1') {
    return;
  }

  input.dataset.bound = '1';

  const items = Array.from(document.querySelectorAll('.archive-item')).map((item) => ({
    element: item,
    text: item.getAttribute('data-search') || ''
  }));
  const groups = Array.from(document.querySelectorAll('.archive-group'));
  let searchFrame = 0;

  const syncGroups = () => {
    groups.forEach((group) => {
      const visibleItems = Array.from(group.querySelectorAll('.archive-item')).filter(
        (item) => item.style.display !== 'none'
      );
      group.style.display = visibleItems.length ? '' : 'none';
    });
  };

  const filterItems = () => {
    const keyword = (input.value || '').trim().toLowerCase();

    items.forEach(({ element, text }) => {
      element.style.display = !keyword || text.includes(keyword) ? '' : 'none';
    });

    syncGroups();
  };

  input.addEventListener('input', () => {
    if (searchFrame) {
      window.cancelAnimationFrame(searchFrame);
    }

    searchFrame = window.requestAnimationFrame(() => {
      searchFrame = 0;
      filterItems();
    });
  });

  syncGroups();
};

document.addEventListener('DOMContentLoaded', initArchiveSearch);
document.addEventListener('op:page-ready', initArchiveSearch);
