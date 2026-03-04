window.__loadAcademicNavbar = async function(activeKey) {
  const mount = document.getElementById('navbarMount');
  if (!mount) return;

  const res = await fetch('partials/navbar.html', { cache: 'no-cache' });
  if (!res.ok) throw new Error('Failed to load navbar partial');

  mount.innerHTML = await res.text();

  const links = mount.querySelectorAll('[data-nav-key]');
  links.forEach((link) => {
    link.classList.toggle('active', link.dataset.navKey === activeKey);
  });
};
