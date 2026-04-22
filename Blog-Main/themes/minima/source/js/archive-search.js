const initArchiveSearch = () => {
  const input = document.getElementById('archive-search-input');

  if (!input) {
    return;
  }

  const items = document.querySelectorAll('.archive-item');
  const groups = document.querySelectorAll('.archive-group');

  const syncGroups = () => {
    groups.forEach((group) => {
      const visibleItems = Array.from(group.querySelectorAll('.archive-item')).filter(
        (item) => item.style.display !== 'none'
      );
      group.style.display = visibleItems.length ? '' : 'none';
    });
  };

  input.addEventListener('input', () => {
    const keyword = (input.value || '').trim().toLowerCase();

    items.forEach((item) => {
      const text = item.getAttribute('data-search') || '';
      item.style.display = !keyword || text.includes(keyword) ? '' : 'none';
    });

    syncGroups();
  });

  syncGroups();
};

document.addEventListener('DOMContentLoaded', initArchiveSearch);
document.addEventListener('op:page-ready', initArchiveSearch);
