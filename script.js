const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

const fadeUpElements = document.querySelectorAll(".fade-up");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initDots();
});

const rootStyles = getComputedStyle(document.documentElement);
const colors = [
  rootStyles.getPropertyValue("--secondary-color").trim(),
  rootStyles.getPropertyValue("--teriary-color").trim(),
];

const dots = [];
const numDots = 100;

class Dot {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 1;
    this.speedX = (Math.random() - 0.5) * 2;
    this.speedY = (Math.random() - 0.5) * 2;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

function initDots() {
  dots.length = 0;
  for (let i = 0; i < numDots; i++) {
    dots.push(new Dot());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dots.forEach((dot) => {
    dot.update();
    dot.draw();
  });
  requestAnimationFrame(animate);
}

fadeUpElements.forEach((element) => {
  const randomDelay = Math.random() * 0.5;
  element.style.transitionDelay = `${randomDelay}s`;
});

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

initDots();
animate();

window.addEventListener("scroll", () => {
  fadeUpElements.forEach((element) => {
    if (isInViewport(element)) {
      element.classList.add("animate");
    } else {
      element.classList.remove("animate");
    }
  });
});

fadeUpElements.forEach((element) => {
  if (isInViewport(element)) {
    element.classList.add("animate");
  }
});

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;
  const scrollBar = document.getElementById("scrollBar");
  scrollBar.style.height = scrollPercent + "%";
});

const preview = document.querySelector(".preview");
const experiences = document.querySelectorAll(".experience");

experiences.forEach((experience) => {
  experience.addEventListener("mouseenter", () => {
    const previewBackground = experience.getAttribute("data-preview");
    preview.style.backgroundImage = previewBackground;
  });

  experience.addEventListener("mouseleave", () => {
    preview.style.backgroundImage = "";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const introElement = document.querySelector(".intro");
  const introText = introElement.childNodes[0].textContent.trim();
  const spanElement = introElement.querySelector("span");
  introElement.textContent = "";

  setTimeout(() => {
    let index = 0;

    const typeEffect = () => {
      if (index < introText.length) {
        introElement.textContent = introText.slice(0, index + 1);
        if (spanElement) introElement.appendChild(spanElement);
        index++;
        setTimeout(typeEffect, 20);
      }
    };

    typeEffect();
  }, 1000);
});
