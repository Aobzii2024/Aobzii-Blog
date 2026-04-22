const initMermaidDiagrams = () => {
  if (!window.mermaid) {
    return;
  }

  const mermaidCodeBlocks = Array.from(
    document.querySelectorAll('pre code.language-mermaid, pre code.lang-mermaid')
  );

  const mermaidTextPattern =
    /^\s*(graph|flowchart|sequenceDiagram|classDiagram|stateDiagram|erDiagram|journey|gantt|pie|mindmap|timeline|gitGraph)\b/m;

  const plaintextFigures = Array.from(document.querySelectorAll('figure.highlight.plaintext')).filter(
    (figure) => {
      const code = figure.querySelector('td.code pre');
      return code && mermaidTextPattern.test(code.textContent || '');
    }
  );

  if (!mermaidCodeBlocks.length && !plaintextFigures.length) {
    return;
  }

  window.mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose'
  });

  mermaidCodeBlocks.forEach((block) => {
    const source = block.textContent || '';
    const container = document.createElement('div');

    container.className = 'mermaid';
    container.textContent = source;

    const pre = block.closest('pre');
    if (pre) {
      pre.replaceWith(container);
    } else {
      block.replaceWith(container);
    }
  });

  plaintextFigures.forEach((figure) => {
    const code = figure.querySelector('td.code pre');
    if (!code) {
      return;
    }

    const container = document.createElement('div');
    container.className = 'mermaid';
    container.textContent = code.textContent || '';
    figure.replaceWith(container);
  });

  window.mermaid.run({ querySelector: '.mermaid' }).catch(() => {});
};

document.addEventListener('DOMContentLoaded', initMermaidDiagrams);
document.addEventListener('op:page-ready', initMermaidDiagrams);
