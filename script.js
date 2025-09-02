/* =========================
   INTRO PAGE
   ========================= */
function goToValentine() {
  const card = document.querySelector('.card--envelope');
  card.classList.add('animate-flap');

  setTimeout(() => {
    document.body.classList.add("fade-out");
    setTimeout(() => {
      window.location.href = "intro.html";
    }, 800);
  }, 1000);
}

/* =========================
   MAIN PAGE
   ========================= */
function sayYes() {
  const card = document.querySelector('.card');
  card.style.transition = "transform 0.3s ease";
  card.style.transform = "scale(1.05)";

  setTimeout(() => {
    document.body.classList.add("fade-out");
    setTimeout(() => {
      window.location.href = "final.html";
    }, 800);
  }, 300);
}

function moveNo() {
  const noBtn = document.getElementById("noBtn");
  const card = noBtn.closest('.card');
  const cardRect = card.getBoundingClientRect();

  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;

  const maxX = cardRect.width - btnWidth - 10;
  const maxY = cardRect.height - btnHeight - 10;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

/* =========================
   CORAÇÕES NO BACKGROUND
   ========================= */
const canvas = document.getElementById('confettiCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  class Heart {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height - canvas.height;
      this.size = Math.random() * 12 + 8;
      this.speedY = Math.random() * 1.5 + 1;
      this.color = Math.random() > 0.5 ? '#f06292' : '#ff4081';
      this.angle = Math.random() * Math.PI * 2;
      this.rotationSpeed = Math.random() * 0.05 - 0.025;
    }

    drawHeart(ctx, x, y, size) {
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(x, y + topCurveHeight);
      ctx.bezierCurveTo(
        x + size / 2, y - size / 2 + topCurveHeight,
        x + size, y + size / 3,
        x, y + size
      );
      ctx.bezierCurveTo(
        x - size, y + size / 3,
        x - size / 2, y - size / 2 + topCurveHeight,
        x, y + topCurveHeight
      );
      ctx.closePath();
      ctx.fill();
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.fillStyle = this.color;
      this.drawHeart(ctx, 0, 0, this.size);
      ctx.restore();
    }

    update() {
      this.y += this.speedY;
      this.angle += this.rotationSpeed;
      if (this.y > canvas.height + this.size) {
        this.reset();
        this.y = -this.size;
      }
    }
  }

  const hearts = [];
  for (let i = 0; i < 80; i++) hearts.push(new Heart());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(h => { h.update(); h.draw(); });
    requestAnimationFrame(animate);
  }

  animate();
}
