const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

let targetX = Math.random() * (canvas.width - 50);
let targetY = Math.random() * (canvas.height - 50);
let score = 0;

function drawTarget() {
  ctx.beginPath();
  ctx.arc(targetX, targetY, 25, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.stroke();
}

function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Score: " + score, 10, 30);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTarget();
  drawScore();
  requestAnimationFrame(gameLoop);
}

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  const dx = mouseX - targetX;
  const dy = mouseY - targetY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 25) {
    score++;
    targetX = Math.random() * (canvas.width - 50);
    targetY = Math.random() * (canvas.height - 50);
  }
});

gameLoop();
