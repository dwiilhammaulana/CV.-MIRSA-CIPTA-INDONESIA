/* ═══════════════════════════════════════
   CV. Mirsa Cipta Indonesia — main.js
   Shared across all pages
═══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Nav scroll effect ── */
  const nav = document.getElementById('nav');
  if (nav) {
    if (!nav.classList.contains('always-dark')) {
      window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
      });
    }
  }

  /* ── Hamburger & Mobile Menu ── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (hamburger && mobileMenu) {
    // Buat overlay secara dinamis jika belum ada
    let overlay = document.querySelector('.mobile-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'mobile-overlay';
      document.body.appendChild(overlay);
    }

    function toggleMenu() {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      overlay.classList.toggle('visible');
      // Mencegah scroll saat menu terbuka
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    }

    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('open')) toggleMenu();
      });
    });
  }

  /* ── Reveal on scroll ── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
        } else {
          // Hilangkan agar animasi berulang saat scroll balik
          entry.target.classList.remove('visible');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => obs.observe(el));
  }

  /* ── Tabs ── */
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById('tab-' + btn.dataset.tab);
      if (target) {
        target.classList.add('active');
        target.querySelectorAll('.reveal').forEach(el => {
          el.classList.remove('visible');
          setTimeout(() => el.classList.add('visible'), 80);
        });
      }
    });
  });

  /* ── Back to top ── */
  const backTop = document.getElementById('backTop');
  if (backTop) {
    window.addEventListener('scroll', () => backTop.classList.toggle('visible', window.scrollY > 400));
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── Contact form → WhatsApp ── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nama       = document.getElementById('nama').value;
      const perusahaan = document.getElementById('perusahaan').value;
      const telp       = document.getElementById('telp').value;
      const pesan      = document.getElementById('pesan').value;
      const text = encodeURIComponent(
        `Halo CV. Mirsa Cipta Indonesia,\n\nSaya *${nama}*${perusahaan ? ' dari *' + perusahaan + '*' : ''} ingin menanyakan:\n\n${pesan}\n\nNomor saya: ${telp}`
      );
      window.open(`https://wa.me/6287808174747?text=${text}`, '_blank');
    });
  }

  /* ── Set active nav link ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .mobile-link').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ── Hero Slider (auto 4 detik) ── */
  const slides   = document.querySelectorAll('.hero__slide');
  const dots     = document.querySelectorAll('.hero__dot');
  const prevBtn  = document.getElementById('heroPrev');
  const nextBtn  = document.getElementById('heroNext');

  if (slides.length > 0) {
    let current = 0;
    let timer   = null;

    function goTo(idx) {
      slides[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = (idx + slides.length) % slides.length;
      slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
    }

    function startAuto() {
      timer = setInterval(() => goTo(current + 1), 4000);
    }

    function resetAuto() {
      clearInterval(timer);
      startAuto();
    }

    startAuto();

    if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        goTo(parseInt(dot.dataset.index));
        resetAuto();
      });
    });

    const heroEl = document.getElementById('hero');
    if (heroEl) {
      heroEl.addEventListener('mouseenter', () => clearInterval(timer));
      heroEl.addEventListener('mouseleave', () => startAuto());
    }
  }

  /* ── Typing Effect ── */
  const typingElements = document.querySelectorAll('.typing-effect');
  if (typingElements.length) {
    const typingObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target;
        if (entry.isIntersecting) {
          if (el.dataset.isTyping === "true") return;
          
          const text = el.getAttribute('data-text') || el.innerText;
          el.innerText = '';
          el.classList.add('typing-text');
          el.dataset.isTyping = "true";
          
          let i = 0;
          const speed = 75; // sedikit dipercepat untuk pengalaman scroll yang lebih baik
          
          function type() {
            if (i < text.length) {
              const char = text.charAt(i);
              el.innerText += char;
              i++;
              el.typingTimeout = setTimeout(type, speed);
            } else {
              el.dataset.isTyping = "false";
            }
          }
          
          type();
        } else {
          // Reset saat keluar viewport agar bisa berulang
          clearTimeout(el.typingTimeout);
          el.innerText = '';
          el.dataset.isTyping = "false";
        }
      });
    }, { threshold: 0.1 });
    
    typingElements.forEach(el => {
      if (!el.getAttribute('data-text')) {
        el.setAttribute('data-text', el.innerText);
      }
      el.innerText = '';
      typingObserver.observe(el);
    });
  }

  /* ── Counter Animation ── */
  const counterElements = document.querySelectorAll('.stat-num');
  if (counterElements.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target;
        if (entry.isIntersecting) {
          if (el.dataset.isCounting === "true") return;
          
          const target = parseFloat(el.getAttribute('data-target') || el.innerText.replace(/[^0-9.]/g, ''));
          const suffix = el.getAttribute('data-suffix') || el.innerText.replace(/[0-9.]/g, '');
          
          // Simpan target & suffix jika belum ada
          if (!el.getAttribute('data-target')) el.setAttribute('data-target', target);
          if (!el.getAttribute('data-suffix')) el.setAttribute('data-suffix', suffix);

          const duration = 1500;
          const startTime = performance.now();
          el.dataset.isCounting = "true";
          
          function updateCounter(currentTime) {
            if (el.dataset.isCounting !== "true") return;

            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = progress * (2 - progress);
            
            const currentValue = Math.floor(easeProgress * target);
            el.innerText = currentValue + suffix;
            
            if (progress < 1) {
              el.counterRAF = requestAnimationFrame(updateCounter);
            } else {
              el.innerText = target + suffix;
              el.dataset.isCounting = "false";
            }
          }
          
          el.counterRAF = requestAnimationFrame(updateCounter);
        } else {
          // Reset saat keluar viewport agar bisa berulang
          cancelAnimationFrame(el.counterRAF);
          el.dataset.isCounting = "false";
          const suffix = el.getAttribute('data-suffix') || '';
          el.innerText = '0' + suffix;
        }
      });
    }, { threshold: 0.1 });
    
    counterElements.forEach(el => {
      // Simpan nilai awal dan suffix
      const initialText = el.innerText;
      const target = parseFloat(initialText.replace(/[^0-9.]/g, ''));
      const suffix = initialText.replace(/[0-9.]/g, '');
      el.setAttribute('data-target', target);
      el.setAttribute('data-suffix', suffix);
      el.innerText = '0' + suffix; // Inisialisasi ke 0
      counterObserver.observe(el);
    });
  }

});