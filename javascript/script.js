window.onload = pageReady;
function pageReady() {
  // desktop menu elements
  const desktopMenuIcon = document.getElementsByClassName(
    "desktopMenuIconContainer",
  );
  const desktopMenuIconsHover = document.getElementsByClassName(
    "desktopMenuIconHoverEffect",
  );
  let desktopIconIndex = null;

  // Desktop menu icon hover effect mouse enter
  Array.from(desktopMenuIcon).forEach((desktopMenuIconContainer, index) => {
    desktopMenuIconContainer.onmouseover = menuIconHoverEffect;
    function menuIconHoverEffect() {
      desktopIconIndex = index;
      desktopMenuIconsHover[desktopIconIndex].style.display = "flex";
    }
  });
  // Desktop menu icon hover effect mouse leave
  Array.from(desktopMenuIcon).forEach((desktopMenuIconContainer, index) => {
    desktopMenuIconContainer.onmouseleave = menuItemMouseLeave;
    function menuItemMouseLeave() {
      desktopIconIndex = index;
      desktopMenuIconsHover[desktopIconIndex].style.display = "none";
    }
  });

  // 🍇

  // profile bio buttons
  const cradledButtons = document.querySelectorAll(".cradled--bubble--btn");
  cradledButtons.forEach((button) => {
    const bloatEffect = button.querySelector(".cradledbubble--bloat--effect");
    const shadow = button.querySelector(".cradled--bubble--btn--shadow");
    const textContainer = button.querySelector(
      ".cradledBubble--txt--nd--icon--container",
    );

    // Store original styles
    const originalStyles = {
      bloatEffect: {
        border: bloatEffect.style.border,
        transform: bloatEffect.style.transform,
      },
      shadow: {
        border: shadow.style.border,
      },
      textContainer: {
        transform: textContainer.style.transform,
        color: textContainer.style.color,
        opacity: textContainer.style.opacity,
      },
    };

    button.addEventListener("mousedown", () => {
      bloatEffect.style.border = "0.001rem solid #676a7291";
      bloatEffect.style.transform = "scaleY(0.98)";
      bloatEffect.style.animation = "quickBounce 0.6s ease-in-out";
      textContainer.style.transform = "translateY(-2px)";
      textContainer.style.color = "rgb(183, 191, 197)";
      textContainer.style.opacity = "100%";
    });

    button.addEventListener("mouseup", () => {
      bloatEffect.style.border = originalStyles.bloatEffect.border;
      bloatEffect.style.transform = originalStyles.bloatEffect.transform;
      shadow.style.border = originalStyles.shadow.border;
      textContainer.style.transform = originalStyles.textContainer.transform;
      textContainer.style.color = originalStyles.textContainer.color;
      textContainer.style.opacity = originalStyles.textContainer.opacity;
    });
  });

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let mouse = {
    x: null,
    y: null,
    radius: 120,
  };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;

      this.baseX = this.x;
      this.baseY = this.y;

      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 0.3; // slower speed
      this.speedY = (Math.random() - 0.5) * 0.3;

      this.type = Math.random() > 0.7 ? "ring" : "dot";
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // bounce at edges
      if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
      if (this.y > canvas.height || this.y < 0) this.speedY *= -1;

      // mouse interaction (gentle)
      if (mouse.x && mouse.y) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          this.x -= dx * 0.01;
          this.y -= dy * 0.01;
        }
      }
    }

    draw() {
      ctx.beginPath();

      if (this.type === "ring") {
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;
        ctx.arc(this.x, this.y, this.size + 4, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        ctx.fillStyle = "white";
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  let particles = [];
  const particleCount = 60;

  function init() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
        let dx = particles[a].x - particles[b].x;
        let dy = particles[a].y - particles[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          ctx.strokeStyle = "rgba(255,255,255,0.1)";
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    connectParticles();

    requestAnimationFrame(animate);
  }

  init();
  animate();
}
