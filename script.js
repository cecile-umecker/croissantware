const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const chars = "01";
const charArray = chars.split("");
const fontSize = 14;
const columns = Math.floor(canvas.width / fontSize);
const drops = new Array(columns).fill(1);

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0F0";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = charArray[Math.floor(Math.random() * charArray.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(draw, 60);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const fullText = `Votre PC est victime du CroissantWare.

Veuillez apporter des viennoiseries à vos collègues.


Protégez votre machine, verrouillez votre session !`;

setTimeout(() => {
  const messageContainer = document.getElementById('message');
  const typedText = document.getElementById('typed-text');
  messageContainer.style.opacity = 1;

  let index = 0;

  function type() {
    if (index < fullText.length) {
      typedText.textContent += fullText[index];
      index++;
      setTimeout(type, 60);
    }
  }

  type();
}, 5000);
