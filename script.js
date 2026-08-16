/* =========================================================
   UNDANGAN DIGITAL 3D - script.js
   ---------------------------------------------------------
   CARA MENGEDIT DATA: ubah saja object CONFIG di bawah ini.
   ========================================================= */

const CONFIG = {
  // ----- Nama mempelai -----
  bride: 'Alex Pratama',            // nama mempelai pria
  groom: 'Rara Setiawati',          // nama mempelai wanita
  monogram: 'AR',                   // inisial untuk loading & amplop
  parents: 'Keluarga Besar Pratama & Keluarga Besar Setiawati',

  // ----- Tanggal & waktu acara -----
  weddingDate: '2026-12-12T08:00:00',   // format ISO: YYYY-MM-DDTHH:mm:ss
  events: [
    {
      type: 'Akad Nikah',
      date: '12 Desember 2026',
      time: '08.00 - 10.00 WIB',
      place: 'Masjid Agung Al-Falah',
      address: 'Jl. Merdeka No. 12, Jakarta',
      maps: 'https://maps.google.com/?q=Masjid+Agung+Al-Falah+Jakarta'
    },
    {
      type: 'Resepsi',
      date: '12 Desember 2026',
      time: '11.00 - 14.00 WIB',
      place: 'Hotel Grand Palace Ballroom',
      address: 'Jl. Sudirman Kav. 88, Jakarta',
      maps: 'https://maps.google.com/?q=Hotel+Grand+Palace+Jakarta'
    }
  ],

  // ----- Quote / ayat -----
  quote: '"Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang."',
  quoteSource: 'QS. Ar-Rum: 21',

  // ----- Cerita cinta (timeline) -----
  story: [
    { date: 'Juni 2020', title: 'Pertama Bertemu', desc: 'Kami bertemu di sebuah acara kampus dan terhubung melalui obrolan kecil yang ternyata mengubah segalanya.', photo: 'assets/foto%20pertama%20x%20ketemu/Foto%20Pernikahan%20(4).png' },
    { date: 'Januari 2022', title: 'Menjalin Hubungan', desc: 'Seiring waktu, pertemanan kami tumbuh menjadi cinta yang tulus dan saling mendukung.', photo: 'assets/foto%20menjalani%20hubungan/Foto%20Pernikahan%20(3).png' },
    { date: 'Agustus 2025', title: 'Lamaran', desc: 'Dengan restu kedua keluarga, kami melangkah ke jenjang yang lebih serius dalam sebuah momen yang tak terlupakan.', photo: 'assets/foto%20galeri/Foto%20Pernikahan.png' },
    { date: 'Desember 2026', title: 'Menikah', desc: 'Akhirnya, kami mengucapkan janji suci di hadapan keluarga dan sahabat tercinta.', photo: 'assets/foto%20galeri/Foto%20Pernikahan%20(1).png' }
  ],

  // ----- Foto galeri -----
  // Ganti dengan foto asli Anda, contoh: 'assets/photo-1.jpg'
  gallery: [
    'assets/foto galeri/Foto Pernikahan (1).png',
    'assets/foto galeri/Foto Pernikahan (2).png',
    'assets/foto galeri/Foto Pernikahan.png',
    'assets/foto galeri/Foto Pernikahan (1).png',
    'assets/foto galeri/Foto Pernikahan (2).png',
    'assets/foto galeri/Foto Pernikahan.png'
  ],

  // ----- Rekening / e-wallet -----
  gifts: [
    { type: 'Bank BCA', bank: 'BCA', account: '888888', holder: 'Alex Pratama' },
    { type: 'E-Wallet', bank: 'OVO / DANA', account: '888888', holder: 'Rara Setiawati' }
  ],

  // ----- Ucapan tamu (ditampilkan sebagai marquee) -----
  wishes: [
    { name: 'Keluarga H. Ahmad', msg: 'Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.' },
    { name: 'Sari & Budi', msg: 'Selamat menempuh hidup baru, bahagia selalu!' },
    { name: 'Keluarga Besar Wijaya', msg: 'Barakallahu lakuma wa baraka alaikuma.' }
  ],

  // ----- Musik latar -----
  music: 'assets/music.mp3'
};

/* =========================================================
   UTILITAS
   ========================================================= */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const isTouch = () => window.matchMedia('(hover: none)').matches;
const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Ambil nama tamu dari URL, contoh: ?to=Nama+Tamu
function getGuestName(param = 'to', fallback = 'Bapak/Ibu/Saudara/i') {
  const params = new URLSearchParams(window.location.search);
  return params.get(param) || fallback;
}

/* =========================================================
   CUSTOM CURSOR + GLOW TRAIL (desktop)
   ========================================================= */
function initCursor() {
  if (isTouch()) return;
  const dot = $('#cursor-dot');
  const ring = $('#cursor-ring');
  const glow = $('#cursor-glow');
  let mx = -100, my = -100, rx = -100, ry = -100, gx = -100, gy = -100;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
  });

  (function loop() {
    rx += (mx - rx) * 0.2;
    ry += (my - ry) * 0.2;
    gx += (mx - gx) * 0.08;
    gy += (my - gy) * 0.08;
    dot.style.transform = `translate3d(${mx}px,${my}px,0) translate(-50%,-50%)`;
    ring.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;
    glow.style.transform = `translate3d(${gx}px,${gy}px,0)`;
    requestAnimationFrame(loop);
  })();

  const hoverSel = 'a, button, .g-card, .event-card, .gift-card, .flip, .envelope-cover, .envelope, .tilt-frame, .wish-item';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverSel)) ring.classList.add('hovering');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverSel)) ring.classList.remove('hovering');
  });
}

/* =========================================================
   COVER AMPLOP UNDANGAN - pembuka
   Klik amplop/segel/bukti -> amplop terbuka, kartu keluar,
   lalu konten utama tampil.
   ========================================================= */
function initEnvelopeCover() {
  const cover = $('#envelope-cover');
  const isReduced = prefersReduced();
  const guest = getGuestName('to', 'Bapak/Ibu/Saudara/i');
  const d = new Date(CONFIG.weddingDate);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dateStr = `${dd} . ${mm} . ${d.getFullYear()}`;

  $('#env-card-name').textContent = `${CONFIG.bride} & ${CONFIG.groom}`;
  $('#env-card-date').textContent = dateStr;
  $('#env-guest').textContent = guest;

  // kartu undangan fly-in (disiapkan tersembunyi)
  $('#env-card-fly-name').textContent = `${CONFIG.bride} & ${CONFIG.groom}`;
  $('#env-card-fly-date').textContent = dateStr;
  $('#env-card-fly-guest').innerHTML = `Untuk <b>${guest}</b>`;
  gsap.set('#env-card-fly', {
    xPercent: -50, yPercent: 55, scale: .5, opacity: 0,
    rotationY: -24, transformPerspective: 900
  });

  // entrance elegan
  gsap.from('.env-content > *', {
    y: 30, opacity: 0, duration: .8, stagger: .12, ease: 'power3.out', delay: .2
  });
  gsap.from('.env-back', { scale: .9, opacity: 0, duration: .7, delay: .15, ease: 'power2.out' });

  // kemiringan 3D mengikuti kursor (desktop)
  const env = $('#envelope');
  const BASE_X = 8, BASE_Y = -12;
  gsap.set(env, { rotateX: BASE_X, rotateY: BASE_Y });
  if (!isTouch() && !prefersReduced()) {
    cover.addEventListener('mousemove', (e) => {
      const r = cover.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - .5;
      const ny = (e.clientY - r.top) / r.height - .5;
      gsap.to(env, {
        rotateX: BASE_X - ny * 16,
        rotateY: BASE_Y + nx * 20,
        duration: .6, ease: 'power2.out', overwrite: 'auto'
      });
    });
    cover.addEventListener('mouseleave', () => {
      gsap.to(env, { rotateX: BASE_X, rotateY: BASE_Y, duration: .9, ease: 'power2.out' });
    });
  }

  function revealMain() {
    document.body.classList.remove('no-scroll');
    $('#main').classList.remove('hidden');
    startMusic();
    window.dispatchEvent(new Event('resize'));
    initScrollAnimations();
    if (window.ScrollTrigger) {
      setTimeout(() => ScrollTrigger.refresh(), 250);
      setTimeout(() => ScrollTrigger.refresh(), 900);
    }
  }

  function openEnvelope() {
    if (cover.classList.contains('opening')) return;
    cover.classList.add('opening');

    if (isReduced) {
      revealMain();
      cover.style.display = 'none';
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
    tl.to('.env-seal-l', { x: -70, rotateZ: -30, opacity: 0, duration: .55, ease: 'power2.in' }, 0)
      .to('.env-seal-r', { x: 70, rotateZ: 30, opacity: 0, duration: .55, ease: 'power2.in' }, 0)
      .to('.env-flap', { rotateX: -180, duration: .8 }, '-=.2')
      .to('.env-card', { yPercent: -150, z: -8, scale: 1.05, duration: .7, ease: 'power3.out' }, '-=.35')
      .to('.env-guest, #btn-env', { opacity: 0, y: -10, duration: .3 }, '-=.55')
      .to('.env-kicker, .env-hint', { opacity: 0, duration: .3 }, '-=.55')
      .to('.env-float', { scale: .82, opacity: .35, duration: .5, ease: 'power2.out' }, '-=.25');

    // parallax: buket bunga recede ~1.15x lebih cepat dari amplop saat terbuka
      // (.env-float mengecil ke .82; bunga efektif ≈ .82 × .967 ≈ .793)
      const flora = document.querySelector('.env-flora');
      if (flora) {
        flora.style.animation = 'none';
        tl.to(flora,
          { scale: .967, opacity: .18, duration: .55, ease: 'power2.out' },
          '-=.25');
      }

    // ledakan partikel emas + kartu undangan terbang masuk (fly-in)
    tl.call(() => { if (envBurst) envBurst.burst(); })
      .fromTo('#env-card-fly',
        { xPercent: -50, yPercent: 55, scale: .5, opacity: 0, rotationY: -24 },
        { xPercent: -50, yPercent: -50, scale: 1, opacity: 1, rotationY: 0, duration: 1.15, ease: 'back.out(1.5)' },
        '-=.1');

    tl.to(cover, {
      opacity: 0,
      scale: 1.04,
      duration: .6,
      ease: 'power2.inOut',
      delay: .8,
      onStart: revealMain,
      onComplete() {
        cover.style.display = 'none';
        if (envBurst) envBurst.stop();
      }
    });
  }

  $('#btn-env').addEventListener('click', openEnvelope);
  cover.addEventListener('click', (e) => {
    if (!e.target.closest('#btn-env')) openEnvelope();
  });
}

/* =========================================================
   PARTIKEL KELOPAK BUNGA (canvas 2D)
   Kelopak merah marun & krem melayang turun saat amplop terbuka.
   ========================================================= */
let envBurst = null;

function initEnvBurst() {
  if (prefersReduced()) return null;
  const cover = $('#envelope-cover');
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  Object.assign(canvas.style, {
    position: 'absolute', inset: '0', width: '100%', height: '100%',
    pointerEvents: 'none', zIndex: '8'
  });
  cover.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  let W = 0, H = 0;

  function resize() {
    W = cover.clientWidth;
    H = cover.clientHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  const PETAL_COLORS = ['#6b1226', '#8a1c33', '#4a0d1d', '#f3e9d8', '#e8dcc9', '#c9b48f'];
  let petals = [], running = false, rafId = null;

  function burst() {
    petals = [];
    const cx = W / 2, cy = H / 2;
    const n = 80;
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 1.4 + Math.random() * 4;
      petals.push({
        x: cx, y: cy,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp - 2.2,
        size: 8 + Math.random() * 9,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - .5) * .24,
        sway: .6 + Math.random() * 1.3,
        phase: Math.random() * Math.PI * 2,
        color: PETAL_COLORS[(Math.random() * PETAL_COLORS.length) | 0],
        alpha: .75 + Math.random() * .25
      });
    }
    if (!running) { running = true; rafId = requestAnimationFrame(tick); }
  }

  function tick() {
    rafId = requestAnimationFrame(tick);
    ctx.clearRect(0, 0, W, H);
    for (let i = petals.length - 1; i >= 0; i--) {
      const p = petals[i];
      p.vy += 0.11;
      p.vx *= 0.99;
      p.x += p.vx + Math.sin(p.y * 0.015 + p.phase) * p.sway;
      p.y += p.vy;
      p.rot += p.vr;
      if (p.y > H + 30) { petals.splice(i, 1); continue; }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size / 2, p.size / 3, 0, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(-p.size * 0.12, -p.size * 0.12, p.size * 0.18, p.size * 0.1, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,.26)';
      ctx.fill();
      ctx.restore();
    }
    ctx.globalAlpha = 1;
    if (petals.length === 0) { running = false; }
  }

  function stop() { if (rafId) cancelAnimationFrame(rafId); running = false; }

  return { burst, stop };
}

/* =========================================================
   MUSIC PLAYER (VINYL)
   ========================================================= */
let audio = null;
let musicStarted = false;

function initMusic() {
  audio = new Audio(CONFIG.music);
  audio.loop = true;
  const btn = $('#music-btn');
  btn.addEventListener('click', toggleMusic);
  btn.style.display = 'none';
}

function startMusic() {
  if (musicStarted || !audio) return;
  musicStarted = true;
  const btn = $('#music-btn');
  btn.style.display = 'flex';
  gsap.fromTo(btn, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.6)' });
  toggleMusic();
}

function toggleMusic() {
  const btn = $('#music-btn');
  if (audio.paused) {
    audio.play().catch(() => {});
    btn.classList.add('playing');
  } else {
    audio.pause();
    btn.classList.remove('playing');
  }
}

/* =========================================================
   AMBIENT PARTICLES - debu emas di SELURUH halaman (canvas 2D)
   ========================================================= */
function initAmbientParticles() {
  if (prefersReduced()) return;
  const canvas = $('#ambient-canvas');
  const ctx = canvas.getContext('2d');
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  let W, H, parts = [];

  const sprite = document.createElement('canvas');
  sprite.width = sprite.height = 64;
  const sctx = sprite.getContext('2d');
  const grad = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,244,200,1)');
  grad.addColorStop(0.35, 'rgba(230,201,111,.6)');
  grad.addColorStop(1, 'rgba(212,175,55,0)');
  sctx.fillStyle = grad;
  sctx.fillRect(0, 0, 64, 64);

  function build() {
    const n = isTouch() ? 26 : 52;
    parts = [];
    for (let i = 0; i < n; i++) {
      parts.push({
        baseX: Math.random() * W,
        y: Math.random() * H,
        r: DPR * (0.6 + Math.random() * 1.5),
        vy: DPR * (0.12 + Math.random() * 0.35),
        a: 0.12 + Math.random() * 0.4,
        ph: Math.random() * Math.PI * 2,
        sp: 0.4 + Math.random() * 1.2,
        pz: 6 + Math.random() * 26
      });
    }
  }

  function resize() {
    W = canvas.width = innerWidth * DPR;
    H = canvas.height = innerHeight * DPR;
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    build();
  }

  let mx = 0, my = 0;
  window.addEventListener('mousemove', (e) => {
    mx = (e.clientX - innerWidth / 2) / innerWidth;
    my = (e.clientY - innerHeight / 2) / innerHeight;
  });
  window.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    mx = (t.clientX - innerWidth / 2) / innerWidth;
    my = (t.clientY - innerHeight / 2) / innerHeight;
  }, { passive: true });

  function tick() {
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';
    for (const p of parts) {
      p.y -= p.vy;
      p.ph += 0.012 * p.sp;
      if (p.y < -30) { p.y = H + 30; p.baseX = Math.random() * W; }
      const drawX = p.baseX + mx * p.pz * DPR;
      const drawY = p.y + my * p.pz * DPR;
      const pulse = 0.55 + 0.45 * Math.sin(p.ph);
      ctx.globalAlpha = p.a * pulse;
      const s = p.r * 6;
      ctx.drawImage(sprite, drawX - s / 2, drawY - s / 2, s, s);
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  }

  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(tick);
}

/* =========================================================
   THREE.JS - PARTIKEL EMAS (hero background)
   ========================================================= */
function initParticles() {
  if (prefersReduced()) return;
  const canvas = $('#hero-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 1, 1000);
  camera.position.z = 8;

  const count = isTouch() ? 140 : 240;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const golds = [new THREE.Color(0xd4af37), new THREE.Color(0xe6c96f), new THREE.Color(0xf6e6a8)];
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 18;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    const c = golds[Math.floor(Math.random() * golds.length)];
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.12,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const pts = new THREE.Points(geo, mat);
  scene.add(pts);

  function onResize() {
    if (canvas.clientWidth === 0 || canvas.clientHeight === 0) return;
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  onResize();
  window.addEventListener('resize', onResize);

  let frames = 0, lastFPS = performance.now();
  (function animate() {
    requestAnimationFrame(animate);
    pts.rotation.y += 0.0008;
    pts.rotation.x += 0.0003;
    renderer.render(scene, camera);
    frames++;
    if (performance.now() - lastFPS > 2000) {
      const fps = frames / 2;
      frames = 0; lastFPS = performance.now();
      if (fps < 30 && mat.size > 0.06) mat.size -= 0.02;
    }
  })();
}

/* =========================================================
   TITLE REVEAL (per kata, blur-to-focus) + ORNAMENT LINE
   ========================================================= */
function initTitleReveals() {
  $$('.section-title').forEach((title) => {
    const text = title.textContent.trim();
    title.textContent = '';
    title.innerHTML = text.split(' ')
      .map((w) => `<span class="st-word"><span class="st-word-inner">${w}</span></span>`)
      .join(' ');
    const ornament = document.createElement('div');
    ornament.className = 'title-ornament';
    ornament.innerHTML = '<span class="to-line"></span><span class="to-diamond">&#9670;</span><span class="to-line"></span>';
    title.after(ornament);

    const inner = $$('.st-word-inner', title);
    gsap.fromTo(inner,
      { yPercent: 130, opacity: 0, filter: 'blur(8px)' },
      {
        yPercent: 0, opacity: 1, filter: 'blur(0px)',
        duration: 1, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: title, start: 'top 85%' }
      }
    );
    gsap.fromTo(ornament,
      { opacity: 0, scale: 0.6 },
      {
        opacity: 1, scale: 1, duration: 0.8, delay: 0.3, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: title, start: 'top 85%' }
      }
    );
  });
}

/* =========================================================
   TIMELINE PROGRESS (garis terisi + dot menyala)
   ========================================================= */
function initTimeline() {
  const tl = $('#timeline');
  if (!tl) return;
  const progress = document.createElement('div');
  progress.className = 'timeline-progress';
  tl.prepend(progress);

  gsap.fromTo(progress, { scaleY: 0 }, {
    scaleY: 1, ease: 'none',
    scrollTrigger: { trigger: tl, start: 'top 70%', end: 'bottom 45%', scrub: 0.6 }
  });

  $$('.tl-item', tl).forEach((item) => {
    const dot = $('.tl-dot', item);
    ScrollTrigger.create({
      trigger: item, start: 'top 72%', end: 'top 30%', scrub: true,
      onUpdate(self) {
        if (self.progress > 0.5) dot.classList.add('lit');
        else dot.classList.remove('lit');
      }
    });
  });
}

/* =========================================================
   SCROLL ANIMATIONS - GSAP + ScrollTrigger (core)
   ========================================================= */
let scrollAnimReady = false;

function initScrollAnimations() {
  // WAJIB dipanggil setelah #main terlihat (layout nyata), jika tidak
  // ScrollTrigger akan terukur di posisi 0 dan animasi langsung terpicu diam-diam.
  if (scrollAnimReady) return;
  scrollAnimReady = true;
  window.__scrollAnimReady = true;
  gsap.registerPlugin(ScrollTrigger);

  // Hero masuk
  gsap.from('.hero-content > *', {
    y: 40, opacity: 0, duration: 1, stagger: 0.18, ease: 'power3.out',
    scrollTrigger: { trigger: '#hero', start: 'top top' }
  });

  // Reveal umum: opacity + translateY + scale, dengan stagger
  gsap.set('.reveal', { opacity: 0, y: 40, scale: 0.9 });
  ScrollTrigger.batch('.reveal', {
    start: 'top 88%',
    onEnter: (batch) => gsap.to(batch, {
      opacity: 1, y: 0, scale: 1,
      duration: 1, ease: 'power3.out', stagger: 0.12, overwrite: true
    })
  });

  // Timeline items (masuk berurutan)
  gsap.set('.tl-item', { opacity: 0, y: 50 });
  ScrollTrigger.batch('.tl-item', {
    start: 'top 90%',
    onEnter: (batch) => gsap.to(batch, {
      opacity: 1, y: 0,
      duration: 1, ease: 'power3.out', stagger: 0.15, overwrite: true
    })
  });

  // Foto cerita: reveal wipe (tirai) + zoom 110% -> 100%
  $$('.photo-frame-inner').forEach((frame) => {
    gsap.fromTo(frame,
      { clipPath: 'inset(100% 0 0 0)', scale: 1.12 },
      {
        clipPath: 'inset(0% 0 0 0)', scale: 1,
        duration: 1.15, ease: 'power3.inOut',
        scrollTrigger: { trigger: frame, start: 'top 88%' }
      }
    );
  });

  // Foto galeri: reveal wipe pada inner (transform coverflow di parent)
  $$('.g-card-inner').forEach((inner) => {
    gsap.fromTo(inner,
      { clipPath: 'inset(100% 0 0 0)' },
      {
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.1, ease: 'power3.inOut',
        scrollTrigger: { trigger: inner, start: 'top 90%' }
      }
    );
  });

  // Efek light-sweep sekali saat section masuk
  $$('.section').forEach((sec) => {
    const sweep = document.createElement('div');
    sweep.className = 'section-sweep';
    sec.prepend(sweep);
    ScrollTrigger.create({
      trigger: sec, start: 'top 60%',
      onEnter() {
        sweep.classList.remove('run');
        void sweep.offsetWidth; // restart animasi
        sweep.classList.add('run');
      }
    });
  });

  initTitleReveals();
  initTimeline();
}

/* =========================================================
   TYPEWRITER QUOTE
   ========================================================= */
function initTypewriter() {
  const el = $('#quote-text');
  const src = $('#quote-source');
  src.textContent = CONFIG.quoteSource;
  const text = CONFIG.quote;
  let i = 0;
  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      obs.disconnect();
      const timer = setInterval(() => {
        el.textContent = text.slice(0, ++i);
        if (i >= text.length) clearInterval(timer);
      }, 35);
    }
  }, { threshold: 0.4 });
  obs.observe(el);
}

/* =========================================================
   COUNTDOWN FLIP CARD 3D
   ========================================================= */
function initCountdown() {
  const date = new Date(CONFIG.weddingDate).getTime();
  const daysEl = $('#cd-days'), hoursEl = $('#cd-hours'),
        minsEl = $('#cd-minutes'), secsEl = $('#cd-seconds');
  const els = { d: daysEl, h: hoursEl, m: minsEl, s: secsEl };

  function update() {
    const now = new Date().getTime();
    let diff = date - now;
    if (diff < 0) diff = 0;
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    setNum(els.d, d); setNum(els.h, h); setNum(els.m, m); setNum(els.s, s);
  }

  function setNum(el, val) {
    const str = String(val).padStart(2, '0');
    if (el.textContent !== str) {
      el.classList.add('flip-anim');
      setTimeout(() => { el.textContent = str; }, 200);
      setTimeout(() => el.classList.remove('flip-anim'), 600);
    }
  }
  update();
  setInterval(update, 1000);
}

/* =========================================================
   TIMELINE (OUR STORY) - bikin item + corner flourish
   ========================================================= */
function initStory() {
  const wrap = $('#timeline');
  CONFIG.story.forEach((s, i) => {
    const item = document.createElement('div');
    item.className = 'tl-item';
    item.innerHTML = `
      <span class="tl-dot"></span>
      <p class="tl-date">${s.date}</p>
      <h3 class="tl-title">${s.title}</h3>
      <p class="tl-desc">${s.desc}</p>
      <div class="tilt-frame">
        <i class="corner tl"></i><i class="corner tr"></i><i class="corner bl"></i><i class="corner br"></i>
        ${s.photo
          ? `<div class="photo-frame-inner"><img src="${s.photo}" alt="${s.title}" loading="lazy"></div>`
          : `<div class="photo-frame-inner tl-photo-ph"><span class="tl-ph-num">Foto ${i + 1}</span><span class="tl-ph-hint">Ganti dengan foto Anda</span></div>`}
      </div>
    `;
    wrap.appendChild(item);
  });
  initTilt();
}

/* TILT 3D mengikuti mouse/hover (framing foto) */
function initTilt() {
  $$('.tilt-frame').forEach((frame) => {
    frame.addEventListener('mousemove', (e) => {
      const r = frame.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      frame.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 16}deg)`;
    });
    frame.addEventListener('mouseleave', () => {
      frame.style.transform = 'rotateY(0) rotateX(0)';
    });
  });
}

/* =========================================================
   GALERI - TRUE 3D COVERFLOW + lightbox
   ========================================================= */
function initGallery() {
  const wrap = $('#gallery-carousel');

  CONFIG.gallery.forEach((src, i) => {
    const card = document.createElement('div');
    card.className = 'g-card';
    card.innerHTML = `
      <i class="corner tl"></i><i class="corner tr"></i><i class="corner bl"></i><i class="corner br"></i>
      <div class="g-card-inner"><img src="${src}" alt="Galeri ${i + 1}" loading="lazy"></div>
    `;
    card.addEventListener('click', () => {
      $('#lb-img').src = src;
      $('#lightbox').classList.add('show');
      document.body.style.overflow = 'hidden';
    });
    wrap.appendChild(card);
  });

  initCoverflow();

  $('.lb-close').addEventListener('click', closeLightbox);
  $('#lightbox').addEventListener('click', (e) => { if (e.target.id === 'lightbox') closeLightbox(); });
  function closeLightbox() {
    $('#lightbox').classList.remove('show');
    document.body.style.overflow = '';
  }
}

/* Coverflow: card tengah besar & tegak, card samping mengecil & miring */
function initCoverflow() {
  const wrap = $('#gallery-carousel');
  const cards = $$('.g-card', wrap);
  if (!cards.length) return;

  function setPad() {
    const first = cards[0].getBoundingClientRect();
    const cardW = first.width;
    const pad = Math.max(20, (wrap.clientWidth - cardW) / 2);
    wrap.style.setProperty('--pad', pad + 'px');
  }

  let raf = null;
  function layout() {
    const wrapRect = wrap.getBoundingClientRect();
    const center = wrap.scrollLeft + wrap.clientWidth / 2;
    const max = wrap.clientWidth * 0.72;

    cards.forEach((c) => {
      const cRect = c.getBoundingClientRect();
      const cardCenter = cRect.left - wrapRect.left + cRect.width / 2;
      const off = cardCenter - wrap.clientWidth / 2;
      const p = Math.min(Math.abs(off) / max, 1);
      const scale = 1 - p * 0.28;
      const rotY = off < 0 ? -p * 38 : p * 38;
      const opacity = 1 - p * 0.65;
      const z = Math.round((1 - p) * 100);
      gsap.set(c, {
        scale, rotateY: rotY, opacity,
        zIndex: z,
        transformPerspective: 900,
        force3D: true
      });
    });
  }

  wrap.addEventListener('scroll', () => {
    if (raf) return;
    raf = requestAnimationFrame(() => { raf = null; layout(); });
  }, { passive: true });

  window.addEventListener('resize', () => { setPad(); layout(); });
  setPad();
  layout();
}

/* =========================================================
   DETAIL ACARA - card glassmorphism + ikon line-art
   ========================================================= */
const SVG = {
  rings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="9" cy="13" r="5"/><circle cx="15" cy="13" r="5"/><path d="M12 8.5l4-3"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 21s-6.5-5.4-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.6 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.3"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9h18M8 2.5V6M16 2.5V6"/><path d="M8 13h2M8 17h2M14 13h2M14 17h2"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2"/></svg>',
  gift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3.5" y="8" width="17" height="12" rx="1.5"/><path d="M3.5 12h17M12 8v12"/><path d="M12 8s-4-1-4-3c0-1.5 1.5-2.5 3-1.5C12 4.5 12 8 12 8zm0 0s4-1 4-3c0-1.5-1.5-2.5-3-1.5C12 4.5 12 8 12 8z"/></svg>',
  bank: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 9l9-5 9 5M5 9v9M10 9v9M14 9v9M19 9v9M3 20h18"/></svg>'
};

function initEvents() {
  const wrap = $('#event-cards');
  CONFIG.events.forEach((ev) => {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
      <div class="ev-face front">
        <div class="ev-top-icon">${SVG.rings}</div>
        <p class="ev-type">${ev.type}</p>
        <div class="ev-row">${SVG.calendar}<span class="ev-date">${ev.date}</span></div>
        <div class="ev-row">${SVG.clock}<span>${ev.time}</span></div>
        <div class="ev-row">${SVG.pin}<span>${ev.place}</span></div>
        <p class="ev-hint">Arahkan kursor / ketuk untuk detail</p>
      </div>
      <div class="ev-face back">
        <div class="ev-top-icon">${SVG.pin}</div>
        <p class="ev-type">Alamat Acara</p>
        <div class="ev-row"><span class="ev-address">${ev.address}</span></div>
        <a class="ev-map-btn" href="${ev.maps}" target="_blank" rel="noopener">Lihat Lokasi</a>
      </div>
    `;
    wrap.appendChild(card);

    // di HP tidak ada hover: ketuk untuk membalik kartu
    card.addEventListener('click', () => {
      if (isTouch()) card.classList.toggle('flipped');
    });
  });
}

/* =========================================================
   AMPLOP DIGITAL / HADIAH
   ========================================================= */
function initGifts() {
  const wrap = $('#gift-cards');
  CONFIG.gifts.forEach((g) => {
    const card = document.createElement('div');
    card.className = 'gift-card';
    const isWallet = g.type.toLowerCase().includes('wallet');
    card.innerHTML = `
      <div class="gift-icon">${isWallet ? SVG.gift : SVG.bank}</div>
      <p class="gift-type">${g.type}</p>
      <p class="gift-bank">${g.bank}</p>
      <p class="gift-account">${g.account}</p>
      <p class="gift-name">a.n. ${g.holder}</p>
      <button class="copy-btn">Salin Nomor</button>
    `;
    const btn = card.querySelector('.copy-btn');
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(g.account);
        btn.textContent = 'Tersalin!';
      } catch {
        const ta = document.createElement('textarea');
        ta.value = g.account;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        btn.textContent = 'Tersalin!';
      }
      setTimeout(() => { btn.textContent = 'Salin Nomor'; }, 2000);
    });
    wrap.appendChild(card);
  });
}

/* =========================================================
   RSVP & UCAPAN
   ========================================================= */
function initRSVP() {
  const track = document.createElement('div');
  track.className = 'wishes-track';
  const all = [...CONFIG.wishes, ...CONFIG.wishes];
  all.forEach((w) => {
    const item = document.createElement('span');
    item.className = 'wish-item';
    item.innerHTML = `<span class="wish-name">${w.name}</span><br><span class="wish-msg">${w.msg}</span>`;
    track.appendChild(item);
  });
  $('#wishes-marquee').appendChild(track);

  $('#rsvp-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#rsvp-name').value.trim();
    const attend = $('#rsvp-attend').value;
    const msg = $('#rsvp-message').value.trim() || 'Turut berbahagia atas pernikahan kalian!';
    const item = document.createElement('span');
    item.className = 'wish-item';
    item.innerHTML = `<span class="wish-name">${name}</span><br><span class="wish-msg">${msg} ${attend === 'hadir' ? '(Hadir)' : '(Berhalangan)'}</span>`;
    track.appendChild(item);
    const btn = e.target.querySelector('button');
    btn.textContent = 'Terima kasih!';
    setTimeout(() => btn.textContent = 'Kirim Ucapan', 2500);
    e.target.reset();
  });
}

/* =========================================================
   CONFETTI EMAS 3D (closing)
   ========================================================= */
function initConfetti() {
  if (prefersReduced()) return;
  const canvas = $('#confetti-canvas');
  const ctx = canvas.getContext('2d');
  let parts = [], running = false;
  const colors = ['#d4af37', '#e6c96f', '#f6e6a8', '#b8860b', '#fff8dc'];

  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function spawn() {
    for (let i = 0; i < 80; i++) {
      parts.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * 100,
        r: 2 + Math.random() * 5,
        vy: 1 + Math.random() * 2.5,
        vx: -1 + Math.random() * 2,
        rot: Math.random() * 360,
        vr: -3 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    parts.forEach((p) => {
      p.y += p.vy;
      p.x += p.vx + Math.sin(p.y * 0.02) * 0.6;
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
      ctx.restore();
    });
    parts = parts.filter((p) => p.y < canvas.height + 30);
    if (parts.length < 60) spawn();
    if (running) requestAnimationFrame(frame);
  }

  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !running) {
      running = true;
      spawn();
      requestAnimationFrame(frame);
    }
  }, { threshold: 0.3 });
  obs.observe(canvas);
}

/* =========================================================
   INIT
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('no-scroll');

  initCursor();
  initAmbientParticles();
  initEnvelopeCover();
  envBurst = initEnvBurst();
  initMusic();
  initParticles();
  initTypewriter();
  initCountdown();

  // Bangun konten dinamis dulu
  initStory();
  initGallery();
  initEvents();
  initGifts();
  initRSVP();
  initConfetti();
  // initScrollAnimations() dipanggil saat amplop dibuka (lihat initEnvelopeCover).

  // isi nama mempelai & teks statis dari CONFIG
  $$('.name-bride').forEach((el) => (el.textContent = CONFIG.bride));
  $$('.name-groom').forEach((el) => (el.textContent = CONFIG.groom));
  $$('.hero-parents').forEach((el) => (el.textContent = `Putra-putri dari ${CONFIG.parents}`));
  $$('.closing-couple').forEach((el) => (el.textContent = `${CONFIG.bride} & ${CONFIG.groom}`));
  document.title = `Undangan Pernikahan ${CONFIG.bride} & ${CONFIG.groom}`;

  // refresh ScrollTrigger setelah gambar lazy dimuat & layout stabil
  window.addEventListener('load', () => {
    if (window.ScrollTrigger) {
      setTimeout(() => ScrollTrigger.refresh(), 200);
      setTimeout(() => ScrollTrigger.refresh(), 1200);
    }
  });
});
