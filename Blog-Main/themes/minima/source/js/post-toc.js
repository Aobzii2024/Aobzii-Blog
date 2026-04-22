const initPostToc = () => {
  if (!window.matchMedia('(min-width: 1200px)').matches) {
    return;
  }

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

  const fragment = document.createDocumentFragment();

  headings.forEach((heading) => {
    const link = document.createElement('a');

    link.href = `#${heading.id}`;
    link.textContent = heading.textContent.replace(/^#\s*/, '').trim();
    link.dataset.level = heading.tagName.slice(1);
    fragment.appendChild(link);
  });

  nav.appendChild(fragment);
  toc.style.display = 'block';
  toc.classList.add('is-ready');
};

document.addEventListener('DOMContentLoaded', initPostToc);
document.addEventListener('op:page-ready', initPostToc);
