// ===== Theme Toggle =====
const toggleBtn = document.getElementById("themeToggle");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light");
  toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");

  const isLight = document.body.classList.contains("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");

  toggleBtn.textContent = isLight ? "☀️" : "🌙";
});
 //================ Menu Toggle =====// ===== Hamburger Menu Toggle =====
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const menuOverlay = document.getElementById("menuOverlay");

if (menuToggle && mobileMenu && menuOverlay) {
  menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  menuOverlay.classList.toggle("active");
  menuToggle.classList.toggle("active"); // 🔥 bars -> X
});


  // close menu when clicking overlay
  menuOverlay.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    menuOverlay.classList.remove("active");
  });

  // close menu when clicking any link
  mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    menuOverlay.classList.remove("active");
    menuToggle.classList.remove("active");
  });
});

}


// ===== Sound Toggle =====
const soundToggle = document.getElementById("soundToggle");
const lumosSound = document.getElementById("lumosSound");

let soundOn = true;

// load saved preference
const savedSound = localStorage.getItem("soundOn");
if (savedSound !== null) {
  soundOn = savedSound === "true";
}

function updateSoundUI() {
  if (!soundToggle) return;

  soundToggle.textContent = soundOn ? "🔊" : "🔇";
  soundToggle.setAttribute("data-tooltip", soundOn ? "Sound ON" : "Sound OFF");
}

updateSoundUI();

if (soundToggle) {
  soundToggle.addEventListener("click", () => {
    soundOn = !soundOn;
    localStorage.setItem("soundOn", soundOn);
    updateSoundUI();
  });
}


// ===== Contact Form Submission =====
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector("textarea").value;

    const subject = `Portfolio Contact from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

    window.location.href = `mailto:raj.akshat2202@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}


// ===== Scroll Reveal Animation =====
const reveals = document.querySelectorAll(".reveal, .reveal-card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.12 }
);

reveals.forEach((el) => observer.observe(el));


// ===== Stagger reveal for cards =====
const revealCards = document.querySelectorAll(".reveal-card");

revealCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.08}s`;
});


// ===== Lumos Cursor Follow (Smooth Drift) =====
const spotlight = document.querySelector(".spotlight");

let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;

window.addEventListener("mousemove", (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
});

function animateSpotlight() {
  currentX += (targetX - currentX) * 0.12;
  currentY += (targetY - currentY) * 0.12;

  if (spotlight) {
    spotlight.style.left = currentX + "px";
    spotlight.style.top = currentY + "px";
  }

  requestAnimationFrame(animateSpotlight);
}

animateSpotlight();

window.addEventListener("mouseout", () => {
  if (spotlight) spotlight.style.opacity = "0";
});

window.addEventListener("mouseover", () => {
  if (spotlight) spotlight.style.opacity = "0.9";
});


// ===== Sparkles + Sound on Click =====
window.addEventListener("click", (e) => {
  // ✅ Play sound only if sound is ON
  if (soundOn && lumosSound) {
    lumosSound.currentTime = 0;
    lumosSound.volume = 0.35;
    lumosSound.play().catch(() => {});
  }

  // ✅ Sparkles
  const sparkleCount = 10;

  for (let i = 0; i < sparkleCount; i++) {
    const s = document.createElement("span");
    s.classList.add("sparkle");

    s.style.left = `${e.clientX}px`;
    s.style.top = `${e.clientY}px`;

    const angle = Math.random() * Math.PI * 2;
    const distance = 20 + Math.random() * 35;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    s.style.setProperty("--dx", `${dx}px`);
    s.style.setProperty("--dy", `${dy}px`);

    const size = 5 + Math.random() * 7;
    s.style.width = `${size}px`;
    s.style.height = `${size}px`;

    document.body.appendChild(s);

    setTimeout(() => s.remove(), 750);
  }
});
// ===== Clickable Project Cards (Smooth Redirect) =====
document.querySelectorAll(".clickable-card").forEach((card) => {
  card.addEventListener("click", () => {
    const link = card.getAttribute("data-live");
    if (!link) return;

    // tiny delay for click animation feel
    setTimeout(() => {
      window.open(link, "_blank");
    }, 120);
  });
});

// prevent redirect when clicking buttons/links inside card
document.querySelectorAll(".clickable-card a").forEach((link) => {
  link.addEventListener("click", (e) => e.stopPropagation());
});
