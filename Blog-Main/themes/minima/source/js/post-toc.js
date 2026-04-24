document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('post-content');
  const toc = document.getElementById('post-toc');
  const nav = document.getElementById('post-toc-nav');

  if (!content || !toc || !nav) {
    return;
  }

  const headings = Array.from(
    content.querySelectorAll('h2[id], h3[id], h4[id], h5[id], h6[id]')
  );

  if (headings.length === 0) {
    return;
  }

  const largeScreenQuery = window.matchMedia('(min-width: 1200px)');

  const fragment = document.createDocumentFragment();

  headings.forEach((heading) => {
    const link = document.createElement('a');

    link.href = `#${heading.id}`;
    link.textContent = heading.textContent.replace(/^#\s*/, '').trim();
    link.dataset.level = heading.tagName.slice(1);
    fragment.appendChild(link);
  });

  nav.appendChild(fragment);
  toc.classList.add('is-ready');

  const syncTocVisibility = () => {
    toc.style.display = largeScreenQuery.matches ? 'block' : '';
  };

  syncTocVisibility();

  if (largeScreenQuery.addEventListener) {
    largeScreenQuery.addEventListener('change', syncTocVisibility);
  } else {
    largeScreenQuery.addListener(syncTocVisibility);
  }
});
