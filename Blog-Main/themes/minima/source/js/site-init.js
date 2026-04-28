(() => {
  const config = window.__minimaTheme || {};
  const events = config.events || {};

  const runSiteEnhancements = () => {
    document.dispatchEvent(new CustomEvent(events.pageReady || 'op:page-ready'));
  };

  document.addEventListener('DOMContentLoaded', runSiteEnhancements);
})();
