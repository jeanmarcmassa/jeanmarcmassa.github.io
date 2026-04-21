
const cursor = document.getElementById('cursor');
let mx = window.innerWidth / 2, my = window.innerHeight / 2;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

document.querySelectorAll('a').forEach(a => {
  a.addEventListener('mouseenter', () => {
    cursor.classList.add('transitioning', 'on-link');
  });
  a.addEventListener('mouseleave', () => {
    cursor.classList.add('transitioning');
    cursor.classList.remove('on-link');
    setTimeout(() => cursor.classList.remove('transitioning'), 150);
  });
});
