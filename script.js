const projects = {
  doomed: {
    key: "doomed",
    title: "DOOMED 2 DIE",
    role: "Scripter",
    team: "Stud Systems",
    description: "You, and a team of up to 8, against millions of zombies. Good luck. Built scalable wave-based zombie spawning with server-side validation and optimized remote events.",
    banners: [
      "https://tr.rbxcdn.com/180DAY-b8ec704e7a812da919cf9f1f6f1407f9/768/432/Image/Webp/noFilter",
      "https://tr.rbxcdn.com/180DAY-6faf6b5bd5061e0f1a5cf08d09197d6f/768/432/Image/Webp/noFilter",
      "https://tr.rbxcdn.com/180DAY-3cd12b71a8d58d6accd7768fffde1d63/768/432/Image/Webp/noFilter",
      "https://tr.rbxcdn.com/180DAY-93be7d59f25b0f9aefe1b948437b00f4/768/432/Image/Webp/noFilter",
      "https://tr.rbxcdn.com/180DAY-304b6760caa5d19c159c4f874952af4e/768/432/Image/Webp/noFilter"
    ],
    logo: "https://tr.rbxcdn.com/180DAY-1ef35bcb3c6c28de9a01e29af9e2af2e/256/256/Image/Webp/noFilter",
    index: 0, interval: null
  },
  hotel: {
    key: "hotel",
    title: "Hotel Rebuilt",
    role: "Scripter",
    team: "Halo Devs",
    description: "Recreated the iconic hotel environment with improved interactive scripting, event systems, and refined environmental logic to match player expectations.",
    banners: [
      "https://tr.rbxcdn.com/180DAY-531a9d8e235bc78c95f558887eb72372/768/432/Image/Webp/noFilter",
      "https://tr.rbxcdn.com/180DAY-de531fc6fb69c238615a9fafeb4b26ad/768/432/Image/Webp/noFilter"
    ],
    logo: "https://tr.rbxcdn.com/180DAY-66a6919563bfdc6d46be98fecf639deb/512/512/Image/Webp/noFilter",
    index: 0, interval: null
  },
  rooms: {
    key: "rooms",
    title: "Rooms Reimagined",
    role: "Scripter",
    team: "Shopkeepers",
    description: "Reworked and expanded the classic rooms for better navigation, optimized scripting, and subtle visual improvements to deepen immersion and reduce bugs.",
    banners: [
      "https://tr.rbxcdn.com/180DAY-8fcb0fadf47801f3c3458a73f753cf85/768/432/Image/Webp/noFilter",
      "https://tr.rbxcdn.com/180DAY-d8d21a6d63135a5de2c419ea3b7eaf6b/768/432/Image/Webp/noFilter"
    ],
    logo: "https://tr.rbxcdn.com/180DAY-183e95e9e2bbf0c4c20b2fea8a4a2f59/512/512/Image/Webp/noFilter",
    index: 0, interval: null
  },
  protocol: {
    key: "protocol",
    title: "PROTOCOL \\ SEE NO EVIL",
    role: "Scripter",
    team: "Stud Systems",
    description: "Protocol is a work-in-progress systems-heavy title focused on stealth mechanics and server-authoritative interactions.",
    banners: [
      "https://t2.rbxcdn.com/180DAY-67b2be37ae31be00ab1319901b9d8347"
    ],
    logo: "https://t2.rbxcdn.com/180DAY-c241e6748c4c05ea93e73916de6c0cec",
    index: 0, interval: null
  }
};

const namePhrases = ["'s Parable", "is smart", "is Albert Einstein"];
let rotIndex = 0;
const rotEl = document.getElementById("name-rotator");
let rotatorInterval = null;
function rotateName() {
  if (!rotEl) return;
  rotEl.style.opacity = 0;
  rotEl.style.transform = "translateY(6px)";
  setTimeout(() => {
    rotEl.textContent = namePhrases[rotIndex];
    rotEl.style.opacity = 1;
    rotEl.style.transform = "translateY(0)";
    rotIndex = (rotIndex + 1) % namePhrases.length;
  }, 200);
}
function startRotator(){
  rotateName();
  rotatorInterval = setInterval(rotateName, 5000);
}
function stopRotator(){
  if (rotatorInterval) { clearInterval(rotatorInterval); rotatorInterval = null; }
}

const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(ent => {
    if (ent.isIntersecting) ent.target.classList.add("in-view");
  });
}, { threshold: 0.12 });
revealSetup();
function revealSetup(){ reveals.forEach(r => io.observe(r)); }

function crossfadeImage(container, newSrc, classPref = "project-banner") {
  const isModal = classPref === "modal-banner";
  const current = container.querySelector(`img.${classPref}`);
  const overlay = document.createElement("img");
  overlay.className = `${classPref}-overlay`;
  overlay.src = newSrc;
  overlay.alt = current ? current.alt : "";
  overlay.loading = "lazy";
  overlay.style.opacity = 0;
  overlay.style.transition = "opacity .45s ease";
  overlay.style.position = "absolute";
  overlay.style.left = "0";
  overlay.style.top = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.objectFit = isModal ? "contain" : "cover";
  container.appendChild(overlay);
  if (isModal) {
    overlay.onload = () => {
      const naturalW = overlay.naturalWidth || 16;
      const naturalH = overlay.naturalHeight || 9;
      const ratio = naturalH / naturalW;
      const dialog = document.querySelector(".modal-dialog");
      const dialogStyle = window.getComputedStyle(dialog);
      const dialogWidth = dialog.clientWidth - parseFloat(dialogStyle.paddingLeft || 0) - parseFloat(dialogStyle.paddingRight || 0);
      const desiredHeight = Math.min(dialogWidth * ratio, window.innerHeight * 0.72);
      container.style.height = `${Math.round(desiredHeight)}px`;
      void overlay.offsetWidth;
      overlay.style.opacity = 1;
      setTimeout(() => {
        if (current) current.remove();
        overlay.className = classPref;
        overlay.style.objectFit = "contain";
      }, 480);
    };
    if (overlay.complete && overlay.naturalWidth) overlay.onload();
  } else {
    void overlay.offsetWidth;
    overlay.style.opacity = 1;
    setTimeout(() => {
      if (current) current.remove();
      overlay.className = classPref;
      overlay.style.objectFit = "cover";
    }, 480);
  }
}

let lastFocusedBeforeModal = null;
function trapFocus(modalEl) {
  const focusableSelector = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const nodes = Array.from(modalEl.querySelectorAll(focusableSelector)).filter(n => n.offsetParent !== null);
  if (!nodes.length) return () => {};
  const first = nodes[0];
  const last = nodes[nodes.length - 1];
  function onKeyDown(e) {
    if (e.key === "Tab") {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }
  modalEl.addEventListener("keydown", onKeyDown);
  return () => modalEl.removeEventListener("keydown", onKeyDown);
}

document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
    if (savedTheme === "light") themeToggleBtn.classList.add("toggled");
  }
  updateThemeIcon(document.documentElement.getAttribute("data-theme") || "dark");
  startRotator();
  const projectCards = document.querySelectorAll(".project");
  projectCards.forEach(card => {
    const key = card.dataset.key;
    const wrap = card.querySelector(".banner-wrap");
    const p = projects[key];
    if (!p) return;
    p.index = Math.floor(Math.random() * p.banners.length);
    const img = document.createElement("img");
    img.className = "project-banner";
    img.src = p.banners[p.index];
    img.alt = `${p.title} banner`;
    img.loading = "lazy";
    img.style.position = "absolute";
    img.style.left = "0";
    img.style.top = "0";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    wrap.appendChild(img);
    p.interval = setInterval(() => {
      p.index = (p.index + 1) % p.banners.length;
      crossfadeImage(wrap, p.banners[p.index], "project-banner");
      const modal = document.getElementById("project-modal");
      if (modal.classList.contains("show") && modal.dataset.current === key) {
        const modalWrap = document.querySelector(".modal-banner-wrap");
        crossfadeImage(modalWrap, p.banners[p.index], "modal-banner");
      }
    }, 10000);
    card.addEventListener("click", () => openModal(key));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(key); }
    });
  });
  document.getElementById("modal-close").addEventListener("click", closeModal);
  const modalRoot = document.getElementById("project-modal");
  modalRoot.addEventListener("click", (e) => {
    if (e.target === modalRoot) closeModal();
  });
  themeToggleBtn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    if (next === "light") themeToggleBtn.classList.add("toggled");
    else themeToggleBtn.classList.remove("toggled");
    themeToggleBtn.animate([
      { transform: 'rotate(0deg) scale(1)' },
      { transform: 'rotate(12deg) scale(1.06)' },
      { transform: 'rotate(0deg) scale(1)' }
    ], { duration: 420, easing: 'cubic-bezier(.2,.9,.2,.9)' });
    themeToggleBtn.setAttribute("aria-pressed", next === "light" ? "true" : "false");
    updateThemeIcon(next);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const modal = document.getElementById("project-modal");
      if (modal.classList.contains("show")) closeModal();
    }
  });
});

function updateThemeIcon(theme){
  const maskCircle = document.getElementById("mask-circle");
  const rays = document.getElementById("rays");
  const sunCore = document.getElementById("sun-core");
  if (theme === "dark"){
    maskCircle.style.transform = "translateX(5px) scale(1)";
    rays.style.opacity = "0";
    sunCore.style.opacity = "0";
  } else {
    maskCircle.style.transform = "translateX(-4px) scale(1.05)";
    rays.style.opacity = "1";
    sunCore.style.opacity = "1";
  }
}

let focusTrapCleanup = null;
function openModal(key){
  const p = projects[key];
  if (!p) return;
  const modal = document.getElementById("project-modal");
  modal.dataset.current = key;
  document.getElementById("modal-title").textContent = p.title;
  document.getElementById("modal-role").textContent = p.role;
  document.getElementById("modal-team").textContent = p.team;
  let fullDesc = p.description;
  if (key === "doomed") fullDesc += " — BEING REWRITTEN, RELEASING THIS SUMMER.";
  document.getElementById("modal-description").textContent = fullDesc;
  const logo = document.getElementById("modal-logo");
  logo.src = p.logo;
  logo.alt = `${p.title} logo`;
  logo.loading = "lazy";
  const modalWrap = document.querySelector(".modal-banner-wrap");
  modalWrap.querySelectorAll("img").forEach(n => n.remove());
  modalWrap.style.height = `${Math.min(window.innerHeight * 0.4, 420)}px`;
  crossfadeImage(modalWrap, p.banners[p.index], "modal-banner");
  modal.classList.add("show");
  modal.setAttribute("aria-hidden","false");
  lastFocusedBeforeModal = document.activeElement;
  const closeBtn = document.getElementById("modal-close");
  closeBtn.setAttribute("tabindex", "0");
  closeBtn.focus();
  const dialog = document.querySelector(".modal-dialog");
  if (focusTrapCleanup) focusTrapCleanup();
  focusTrapCleanup = trapFocus(dialog);
}

function closeModal(){
  const modal = document.getElementById("project-modal");
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden","true");
  modal.dataset.current = "";
  if (focusTrapCleanup) { focusTrapCleanup(); focusTrapCleanup = null; }
  if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === "function") {
    lastFocusedBeforeModal.focus();
    lastFocusedBeforeModal = null;
  }
}

window.addEventListener("beforeunload", () => {
  Object.values(projects).forEach(p => { if (p.interval) clearInterval(p.interval); });
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) stopRotator();
  else startRotator();
});
