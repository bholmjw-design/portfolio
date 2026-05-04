// Loader
window.addEventListener('load', () => {
  setTimeout(() => document.querySelector('.loader').classList.add('hide'), 1500);
});

// Hamburger
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a => 
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// Reveal on scroll
const reveals = document.querySelectorAll('section');
reveals.forEach(s => s.classList.add('reveal'));
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); });
}, { threshold: 0.15 });
reveals.forEach(s => observer.observe(s));

// Particles
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let w, h, particles;
function resize() { w = canvas.width = innerWidth; h = canvas.height = innerHeight; }
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() {
    this.x = Math.random()*w; this.y = Math.random()*h;
    this.vx = (Math.random()-.5)*.3; this.vy = (Math.random()-.5)*.3;
    this.r = Math.random()*1.5 + .3;
    this.alpha = Math.random()*.5 + .1;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if(this.x<0||this.x>w) this.vx*=-1;
    if(this.y<0||this.y>h) this.vy*=-1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
    ctx.fillStyle = `rgba(212,163,115,${this.alpha})`;
    ctx.fill();
  }
}
particles = Array.from({length: 80}, () => new Particle());
function animate() {
  ctx.clearRect(0,0,w,h);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}
animate();
