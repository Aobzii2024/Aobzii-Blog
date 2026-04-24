document.addEventListener('DOMContentLoaded', () => {
  if (window.Nanobar) {
    const nanobar = new Nanobar({
      classname: 'nanobar',
      id: 'myNanobar'
    });
    nanobar.go(30);
    nanobar.go(76);
    nanobar.go(100);
  }
});
