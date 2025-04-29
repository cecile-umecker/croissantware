const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const chars = "01";
const charArray = chars.split("");
const fontSize = 14;
const columns = Math.floor(canvas.width / fontSize);
let drops = new Array(columns).fill(1);

let croissantMode = false;

// Ta forme de croissant très simple pour commencer
const croissantShape = [
  "                   1111                   ",
  "                   1111                   ",
  "                 11111111                 ",
  "                 11111111                 ",
  "                1111111111                ",
  "                1111111111                ",
  "           1111 1111111111 1111           ",
  "           1111 1111111111 1111           ",
  "         1111111 11111111 1111111         ",
  "         1111111 11111111 1111111         ",
  "     1111 1111111 111111 1111111 1111     ",
  "     1111 1111111 111111 1111111 1111     ",
  "   11111111 1111111 11 1111111 11111111   ",
  "   11111111 1111111 11 1111111 11111111   ",
  "  111111111 11 111111111111 11 111111111  ",
  "  111111111 11 111111111111 11 111111111  ",
  " 11111111 1 111 1111111111 111 1 11111111 ",
  " 11111111 1 111 1111111111 111 1 11111111 ",
  "  11111111   111 11111111 111   11111111  ",
  "  11111111   111 11111111 111   11111111  ",
  "    1111111       111111      1111111     ",
  "    1111111       111111      1111111     ",
  "        1111                 1111         ",  
  "        1111                 1111         "
];

// Stockage des lettres figées dans la zone du croissant
let frozenLetters = [];

function initFrozenLetters() {
  const rows = Math.floor(canvas.height / fontSize);
  const cols = Math.floor(canvas.width / fontSize);
  frozenLetters = Array.from({ length: rows }, () => Array(cols).fill(null));
}

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0F0";
  ctx.font = fontSize + "px monospace";

  const offsetX = Math.floor((canvas.width / fontSize - croissantShape[0].length) / 2);
  const offsetY = Math.floor((canvas.height / fontSize - croissantShape.length) / 2);

  for (let i = 0; i < drops.length; i++) {
    let x = i;
    let y = drops[i];

    if (y * fontSize < canvas.height) {
      // Si y est hors canvas, on ne dessine pas
      const text = charArray[Math.floor(Math.random() * charArray.length)];
      ctx.fillText(text, x * fontSize, y * fontSize);

      if (croissantMode) {
        // Vérifie si on est dans la forme du croissant
        const cx = x - offsetX;
        const cy = y - offsetY;
        if (
          cy >= 0 && cy < croissantShape.length &&
          cx >= 0 && cx < croissantShape[cy].length &&
          croissantShape[cy][cx] === '1'
        ) {
          // Fige la lettre si pas encore figee
          if (!frozenLetters[cy + offsetY][cx + offsetX]) {
            frozenLetters[cy + offsetY][cx + offsetX] = text;
          }
        }
      }
    }

    // Probabilité de reset aléatoire quand tombe en bas
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }

  // Dessine les lettres figées
  for (let y = 0; y < frozenLetters.length; y++) {
    for (let x = 0; x < frozenLetters[y].length; x++) {
      if (frozenLetters[y][x]) {
        ctx.fillText(frozenLetters[y][x], x * fontSize, y * fontSize);
      }
    }
  }
}

setInterval(draw, 60);

// Passage en mode croissant après 5 secondes
setTimeout(() => {
  croissantMode = true;
}, 5000);

// Initialisation au début
initFrozenLetters();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initFrozenLetters(); // Important pour resize propre
});

setTimeout(() => {
  document.getElementById('message').style.opacity = 1;
}, 6000);

