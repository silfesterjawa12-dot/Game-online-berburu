const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 500;

// Asset gambar
const hunterImg = new Image();
hunterImg.src = "assets/hunter.png";
const targetImg = new Image();
targetImg.src = "assets/target.png";
const branchImg = new Image();
branchImg.src = "assets/branch.png";
const bulletImg = new Image();
bulletImg.src = "assets/bullet.png";

// Posisi & variabel dasar
let hunter = { x: 50, y: 350, width: 80, height: 120 };
let bullets = [];
let targets = [];
let obstacles = [];
let score = 0;

// Input
let keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);
document.addEventListener("click", shoot);

function shoot() {
  bullets.push({ x: hunter.x + hunter.width, y: hunter.y + 40, speed: 6 });
}

// Spawn target
setInterval(() => {
  targets.push({ x: canvas.width, y: Math.random() * 350, width: 60, height: 60 });
}, 2000);

// Spawn rintangan
setInterval(() => {
  obstacles.push({ x: canvas.width, y: 380, width: 60, height: 60 });
}, 4000);

// Update game
function update() {
  // Gerakan pemburu
  if (keys["ArrowUp"] && hunter.y > 0) hunter.y -= 4;
  if (keys["ArrowDown"] && hunter.y < canvas.height - hunter.height) hunter.y += 4;

  // Peluru
  bullets.forEach(b => b.x += b.speed);
  bullets = bullets.filter(b => b.x < canvas.width);

  // Target
  targets.forEach(t => t.x -= 3);
  targets = targets.filter(t => t.x > -60);

  // Rintangan
  obstacles.forEach(o => o.x -= 4);
  obstacles = obstacles.filter(o => o.x > -60);

  // Cek tabrakan
  bullets.forEach((b, bi) => {
    targets.forEach((t, ti) => {
      if (b.x < t.x + t.width && b.x + 20 > t.x && b.y < t.y + t.height && b.y + 20 > t.y) {
        score++;
        bullets.splice(bi, 1);
        targets.splice(ti, 1);
      }
    });
  });
}

// Gambar
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(hunterImg, hunter.x, hunter.y, hunter.width, hunter.height);

  bullets.forEach(b => ctx.drawImage(bulletImg, b.x, b.y, 20, 20));
  targets.forEach(t => ctx.drawImage(targetImg, t.x, t.y, t.width, t.height));
  obstacles.forEach(o => ctx.drawImage(branchImg, o.x, o.y, o.width, o.height));

  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Skor: " + score, 20, 30);
}

// Loop
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}
loop();