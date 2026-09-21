// Inicializar Iconos de Lucide
lucide.createIcons();

// 1. PANTALLA INTRODUCCIÓN Y REPRODUCTOR DE MÚSICA
const introOverlay = document.getElementById('intro');
const openBtn = document.getElementById('openBtn');
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');
const musicStatus = document.getElementById('musicStatus');
let isPlaying = false;

function toggleMusic(play) {
  if (play && !isPlaying) {
    bgMusic.play().then(() => {
      isPlaying = true;
      musicStatus.innerText = "Música: On";
      musicIcon.setAttribute('data-lucide', 'volume-2');
      lucide.createIcons();
    }).catch(err => console.log("Autoplay impedido por el navegador"));
  } else if (!play && isPlaying) {
    bgMusic.pause();
    isPlaying = false;
    musicStatus.innerText = "Música: Off";
    musicIcon.setAttribute('data-lucide', 'music');
    lucide.createIcons();
  }
}

openBtn.addEventListener('click', () => {
  introOverlay.classList.add('hide');
  toggleMusic(true);
  createHeartBurst();
});

musicToggle.addEventListener('click', () => {
  if (isPlaying) {
    toggleMusic(false);
  } else {
    toggleMusic(true);
  }
});

// 2. REVELAR SECRETO MISTERIOSO
const revealBtn = document.getElementById('revealBtn');
const secretBox = document.getElementById('secretBox');

revealBtn.addEventListener('click', () => {
  secretBox.classList.toggle('show');
  if (secretBox.classList.contains('show')) {
    revealBtn.innerText = "Ocultar Sorpresa ♡";
  } else {
    revealBtn.innerText = "Descubrir Sorpresa ♡";
  }
});

// 3. EFECTO DE DESTELLOS ROMÁNTICOS EN EL PUNTERO
document.addEventListener('mousemove', (e) => {
  if (Math.random() > 0.85) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.innerText = Math.random() > 0.5 ? '✦' : '♥';
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    
    const dx = (Math.random() - 0.5) * 60 + 'px';
    const dy = (Math.random() - 0.5) * 60 + 'px';
    sparkle.style.setProperty('--dx', dx);
    sparkle.style.setProperty('--dy', dy);

    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
  }
});

// 4. PÉTALOS DE ROSA CAYENDO
function spawnPetal() {
  const petal = document.createElement('div');
  petal.className = 'rose-petal';
  petal.innerText = Math.random() > 0.4 ? '🌸' : '🌹';
  petal.style.left = Math.random() * 100 + 'vw';
  
  const duration = 6 + Math.random() * 6;
  petal.style.animationDuration = duration + 's';
  petal.style.setProperty('--drift', (Math.random() * 200 - 100) + 'px');

  document.body.appendChild(petal);
  setTimeout(() => petal.remove(), duration * 1000);
}

setInterval(spawnPetal, 1200);

// 5. EXPLOSIÓN DE CORAZONES
function createHeartBurst() {
  for (let i = 0; i < 25; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.className = 'sparkle';
      heart.innerText = '💖';
      heart.style.left = '50vw';
      heart.style.top = '50vh';
      
      const dx = (Math.random() - 0.5) * 300 + 'px';
      const dy = (Math.random() - 0.5) * 300 + 'px';
      heart.style.setProperty('--dx', dx);
      heart.style.setProperty('--dy', dy);

      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1000);
    }, i * 30);
  }
}

// 6. RELOJ REGRESIVO CONFIGURADO A LAS 9:00 PM
function updateCountdown() {
  const now = new Date();
  const targetDate = new Date();
  targetDate.setHours(21, 0, 0, 0);

  if (now.getTime() > targetDate.getTime()) {
    targetDate.setDate(targetDate.getDate() + 1);
  }

  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    document.getElementById('days').innerText = "00";
    document.getElementById('hours').innerText = "00";
    document.getElementById('minutes').innerText = "00";
    document.getElementById('seconds').innerText = "00";
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  document.getElementById('days').innerText = d < 10 ? '0' + d : d;
  document.getElementById('hours').innerText = h < 10 ? '0' + h : h;
  document.getElementById('minutes').innerText = m < 10 ? '0' + m : m;
  document.getElementById('seconds').innerText = s < 10 ? '0' + s : s;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// 7. CANVAS DE PARTÍCULAS
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const particles = Array.from({ length: 45 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  radius: Math.random() * 1.5 + 0.5,
  alpha: Math.random(),
  speed: Math.random() * 0.01 + 0.005
}));

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach(p => {
    p.alpha += p.speed;
    if (p.alpha > 1 || p.alpha < 0) p.speed = -p.speed;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(233, 160, 183, ${Math.abs(p.alpha) * 0.6})`;
    ctx.shadowBlur = 8;
    ctx.shadowColor = "#e9a0b7";
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}
animateParticles();

// 8. SCROLL NAVEGACIÓN
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 150) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});