/* ──────────── PARTICLES ──────────── */
(function () {
  const c = document.getElementById("particles"),
    ctx = c.getContext("2d");
  let W,
    H,
    pts = [];
  function resize() {
    W = c.width = innerWidth;
    H = c.height = innerHeight;
  }
  resize();
  addEventListener("resize", resize);
  function r(a, b) {
    return a + Math.random() * (b - a);
  }
  class P {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = r(0, W);
      this.y = r(0, H);
      this.rad = r(0.5, 2);
      this.vx = r(-0.3, 0.3);
      this.vy = r(-0.4, -0.1);
      this.a = r(0.1, 0.5);
      this.col = Math.random() > 0.5 ? "255,61,0" : "255,143,0";
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.col},${this.a})`;
      ctx.fill();
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.y < -10 || this.x < -10 || this.x > W + 10) this.reset();
    }
  }
  for (let i = 0; i < 100; i++) pts.push(new P());
  function lines() {
    for (let i = 0; i < pts.length; i++)
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x,
          dy = pts[i].y - pts[j].y,
          d = Math.hypot(dx, dy);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(255,61,0,${0.05 * (1 - d / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
  }
  (function loop() {
    ctx.clearRect(0, 0, W, H);
    lines();
    pts.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(loop);
  })();
})();

/* ──────────── CURSOR GLOW ──────────── */
const glow = document.getElementById("cursor-glow");
addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

/* ──────────── SCROLL REVEAL ──────────── */
const revObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.05 },
);
window.revObs = revObs;
document
  .querySelectorAll(".fade-in,.fade-left,.fade-right")
  .forEach((el) => revObs.observe(el));

/* ──────────── COUNTER ──────────── */
const cntObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && !e.target.dataset.done) {
        e.target.dataset.done = "1";
        const target = +e.target.dataset.target,
          suffix = e.target.dataset.suffix || "",
          dur = 1800,
          t0 = performance.now();
        const sfxClean = suffix.replace(/\d/g, "").replace("K", "");
        const isK = target >= 1000;
        function tick(now) {
          const p = Math.min((now - t0) / dur, 1),
            val = Math.round(target * (1 - Math.pow(1 - p, 3)));
          const disp = isK
            ? (val / 1000).toFixed(val % 1000 === 0 ? 0 : 1)
            : val;
          e.target.innerHTML =
            disp + "<span>" + (isK ? "K" : "") + sfxClean + "</span>";
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }
    });
  },
  { threshold: 0.5 },
);
document.querySelectorAll(".counter").forEach((el) => cntObs.observe(el));

/* ──────────── 3D TILT ──────────── */
document.querySelectorAll(".product-card, .solution-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top - r.height / 2) / r.height) * 10;
    const ry = ((e.clientX - r.left - r.width / 2) / r.width) * -10;
    card.style.transform = `perspective(800px) translateY(-10px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    card.style.transition = "transform .1s ease";
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(800px) translateY(0) rotateX(0) rotateY(0)";
    card.style.transition =
      "transform .5s ease,border-color .35s,box-shadow .35s";
  });
});

/* ──────────── TYPEWRITER BADGE ──────────── */
(function () {
  const el = document.getElementById("typed-badge");
  if (!el) return;
  const texts = [
    "Igniting the Future of Gaming",
    "15+ Years of Burning Passion",
    "Powering Global Gaming Giants",
    "The Hottest iGaming Solutions",
  ];
  let ti = 0,
    ci = 0,
    del = false;
  // rebuild badge with dot + text node
  el.innerHTML = "";
  const dot = Object.assign(document.createElement("span"), {
    style:
      "width:6px;height:6px;border-radius:50%;background:var(--accent);animation:pulse 2s ease infinite;display:inline-block;flex-shrink:0",
  });
  const txt = document.createTextNode("");
  el.appendChild(dot);
  el.appendChild(document.createTextNode("\u00a0"));
  el.appendChild(txt);
  function type() {
    const full = texts[ti];
    if (!del) {
      ci++;
      txt.textContent = full.slice(0, ci);
      if (ci === full.length) {
        del = true;
        setTimeout(type, 2400);
        return;
      }
    } else {
      ci--;
      txt.textContent = full.slice(0, ci);
      if (ci === 0) {
        del = false;
        ti = (ti + 1) % texts.length;
      }
    }
    setTimeout(type, del ? 38 : 68);
  }
  setTimeout(type, 1000);
})();

/* ──────────── NAV SCROLL ──────────── */
const nav = document.querySelector("nav");
addEventListener("scroll", () => {
  if (scrollY > 50) nav.classList.add("scrolled");
  else nav.classList.remove("scrolled");
});

/* ──────────── NAV ACTIVE ──────────── */
const secs = document.querySelectorAll("section[id], div[id]");
const nls = document.querySelectorAll(".navbar-nav .nav-link");
function updateActiveNav() {
  let cur = "";
  secs.forEach((s) => {
    if (scrollY >= s.offsetTop - 150) cur = s.id;
  });

  const path = window.location.pathname;
  const isAboutPage = path.endsWith("about.html");
  const isBlogPage = path.endsWith("blog.html") || path.endsWith("blog-detail.html");

  nls.forEach((a) => {
    const href = a.getAttribute("href");
    a.classList.remove("active");

    if (isAboutPage) {
      if (href === "about.html") {
        a.classList.add("active");
      }
    } else if (isBlogPage) {
      if (href === "blog.html") {
        a.classList.add("active");
      }
    } else {
      if (href === `#${cur}` || href === `index.html#${cur}`) {
        a.classList.add("active");
      }
    }
  });
}
addEventListener("scroll", updateActiveNav);
addEventListener("DOMContentLoaded", updateActiveNav);
updateActiveNav();

/* ──────────── PRODUCT TABS ──────────── */
const tabBtns = document.querySelectorAll(".tab-btn");
const productTiles = document.querySelectorAll(".product-tile");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const target = btn.dataset.tab;
    productTiles.forEach((tile) => {
      if (target === "all" || tile.dataset.category === target) {
        tile.style.display = "flex";
        setTimeout(() => {
          tile.style.opacity = "1";
          tile.style.transform = "translateY(0)";
        }, 10);
      } else {
        tile.style.opacity = "0";
        tile.style.transform = "translateY(20px)";
        setTimeout(() => {
          tile.style.display = "none";
        }, 300);
      }
    });
  });
});

/* ──────────── SECURITY SLIDER ──────────── */
const secSlides = document.querySelectorAll(".sec-slide");
const secPrev = document.querySelector(".sec-btn.prev");
const secNext = document.querySelector(".sec-btn.next");
let currentSecSlide = 0;

function showSecSlide(index) {
  secSlides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) slide.classList.add("active");
  });
}

if (secPrev && secNext) {
  secNext.addEventListener("click", () => {
    currentSecSlide = (currentSecSlide + 1) % secSlides.length;
    showSecSlide(currentSecSlide);
  });

  secPrev.addEventListener("click", () => {
    currentSecSlide =
      (currentSecSlide - 1 + secSlides.length) % secSlides.length;
    showSecSlide(currentSecSlide);
  });
}

/* ──────────── TESTIMONIALS SLIDER (EXECUTIVE FOCUS) ──────────── */
const testiSlides = document.querySelectorAll(".testi-slide");
const testiPrev = document.querySelector(".testi-nav.prev");
const testiNext = document.querySelector(".testi-nav.next");
const testiCurrentNum = document.querySelector(
  ".testi-pagination span:first-child",
);
let currentTestiSlide = 0;

function showTestiSlide(index) {
  testiSlides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) slide.classList.add("active");
  });
  if (testiCurrentNum) {
    testiCurrentNum.textContent = String(index + 1).padStart(2, "0");
  }
}

if (testiPrev && testiNext) {
  testiNext.addEventListener("click", () => {
    currentTestiSlide = (currentTestiSlide + 1) % testiSlides.length;
    showTestiSlide(currentTestiSlide);
  });

  testiPrev.addEventListener("click", () => {
    currentTestiSlide =
      (currentTestiSlide - 1 + testiSlides.length) % testiSlides.length;
    showTestiSlide(currentTestiSlide);
  });
}

/* ──────────── BANNER PARALLAX ZOOM ──────────── */
const bannerVisuals = document.querySelectorAll(".banner-visual");
if (bannerVisuals.length > 0) {
  window.addEventListener("scroll", () => {
    const banner = document.querySelector(".knowledge-banner");
    if (!banner) return;

    const rect = banner.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Check if the banner is in the viewport
    if (rect.top <= windowHeight && rect.bottom >= 0) {
      // Calculate scroll progress (0 when it just enters from bottom, 1 when it leaves at top)
      const scrollProgress =
        (windowHeight - rect.top) / (windowHeight + rect.height);

      // Scale based on scroll amount (from 0.8x up to 1.3x)
      const scaleAmount = 0.8 + scrollProgress * 0.5;

      bannerVisuals.forEach((visual) => {
        if (visual.classList.contains("left")) {
          visual.style.transform = `rotate(-10deg) scale(${scaleAmount})`;
        } else if (visual.classList.contains("right")) {
          visual.style.transform = `rotate(10deg) scale(${scaleAmount})`;
        }
      });
    }
  });
}
