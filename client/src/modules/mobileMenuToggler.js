const mobileMenu = document.querySelector('.mobile-menu');
const nav = document.querySelector('nav');
const openIcon = document.querySelector('#open-menu-icon');
const closeIcon = document.querySelector('#close-menu-icon');

mobileMenu.addEventListener('click', () => {
  nav.classList.toggle('hide-menu');
  if (nav.classList.contains('hide-menu')) {
    openIcon.style.display = 'block';
    closeIcon.style.display = 'none';
  } else {
    openIcon.style.display = 'none';
    closeIcon.style.display = 'block';
  }
});
