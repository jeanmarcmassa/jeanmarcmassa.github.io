(() => {
  const canvas = document.getElementById('bg');
  const ctx    = canvas.getContext('2d');
  let W, H;

  // ── Config ──────────────────────────────────────────
  const COUNT         = 65;
  const SPEED         = 0.22;
  const CONNECT_DIST  = 120;
  // Particle alpha range (higher = more visible)
  const ALPHA_MIN     = 0.25;
  const ALPHA_MAX     = 0.75;
  // Connection line max alpha
  const LINE_ALPHA    = 0.18;
  // Particle radius range
  const R_MIN         = 0.8;
  const R_MAX         = 2.2;
  const COLOR         = '94,232,200';
  // ────────────────────────────────────────────────────

  const particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function init() {
    particles.length = 0;
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x:     Math.random() * W,
        y:     Math.random() * H,
        r:     Math.random() * (R_MAX - R_MIN) + R_MIN,
        vx:    (Math.random() - 0.5) * SPEED,
        vy:    (Math.random() - 0.5) * SPEED,
        base:  Math.random() * (ALPHA_MAX - ALPHA_MIN) + ALPHA_MIN,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const t = performance.now() * 0.001;

    // Move & draw particles
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      // Pulsing alpha
      const a = p.base * (0.7 + 0.3 * Math.sin(t * 1.2 + p.phase));

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${COLOR},${a})`;
      ctx.fill();
    }

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < CONNECT_DIST) {
          const lineA = LINE_ALPHA * (1 - d / CONNECT_DIST);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${COLOR},${lineA})`;
          ctx.lineWidth   = 0.6;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  // Skip animation when user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
    return;
  }

  window.addEventListener('resize', () => { resize(); init(); });
  resize();
  init();
  draw();
})();
