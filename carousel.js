document.addEventListener("DOMContentLoaded", () => {
  // ========================
  // Carousel + Lightbox Logic
  // ========================
  const carousel = document.querySelector(".carousel");
  const leftBtn = document.querySelector(".carousel-btn.left");
  const rightBtn = document.querySelector(".carousel-btn.right");

  if (carousel) {
    // --- Arrow buttons ---
    if (leftBtn) {
      leftBtn.addEventListener("click", () => {
        carousel.scrollBy({ left: -400, behavior: "smooth" });
      });
    }

    if (rightBtn) {
      rightBtn.addEventListener("click", () => {
        carousel.scrollBy({ left: 400, behavior: "smooth" });
      });
    }

    // --- Drag / Swipe ---
    let isDown = false, startX, scrollLeft;

    carousel.addEventListener("mousedown", e => {
      isDown = true;
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
      carousel.classList.add("dragging");
    });

    carousel.addEventListener("mouseleave", () => {
      isDown = false;
      carousel.classList.remove("dragging");
    });

    carousel.addEventListener("mouseup", () => {
      isDown = false;
      carousel.classList.remove("dragging");
    });

    carousel.addEventListener("mousemove", e => {
      if (!isDown) return;
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1.5;
      carousel.scrollLeft = scrollLeft - walk;
    });

    carousel.addEventListener("touchstart", e => {
      startX = e.touches[0].pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener("touchmove", e => {
      const x = e.touches[0].pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1.5;
      carousel.scrollLeft = scrollLeft - walk;
    });

    // --- Lightbox ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const closeBtn = document.querySelector('.lightbox .close');

    if (lightbox && lightboxImg && closeBtn) {
      document.querySelectorAll('.carousel img').forEach(img => {
        img.addEventListener('click', () => {
          lightboxImg.src = img.src;
          lightbox.classList.add('active');
        });
      });

      closeBtn.addEventListener('click', () => lightbox.classList.remove('active'));
      lightbox.addEventListener('click', e => {
        if (e.target === lightbox) lightbox.classList.remove('active');
      });
    }
  }

  // ========================
  // Dark Mode Toggle Logic
  // ========================
  const toggle = document.getElementById('darkModeToggle');
  if (!toggle) return; // skip if not present on page

  // Apply saved preference
  if (localStorage.getItem('dark-mode') === 'enabled') {
    document.body.classList.add('dark-mode');
    toggle.textContent = "☀️";
  } else {
    toggle.textContent = "🌙";
  }

  // Click handler
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('dark-mode', 'enabled');
      toggle.textContent = "☀️";
    } else {
      localStorage.setItem('dark-mode', 'disabled');
      toggle.textContent = "🌙";
    }
  });
});
