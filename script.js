import { updateGround, setupGround } from "./ground.js";
import { updateDino, setupDino, dinoRect, setDinoLose } from "./dino.js";
import { updateCactus, setupCactus, getCactusRect } from "./cactus.js";
const WORLD__WIDTH = 100;
const WORLD__HEIGHT = 30;
const SPEED__SCALE__INCREASE = 0.00001;

const worldElem = document.querySelector("[data-world]");
const scoreElem = document.querySelector("[data-score]");
const screenElem = document.querySelector("[data-start-screen]");

setPixelToWorldScale();
window.addEventListener("resize", setPixelToWorldScale);
document.addEventListener("keydown", handleSetup, { once: true });
let lastTime;
let speedScale;
let score;
function update(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }
  const delta = time - lastTime;
  updateGround(delta, speedScale);
  updateDino(delta, speedScale);
  updateCactus(delta, speedScale);
  updateSpeedScale(delta);
  updateScore(delta);
  if (checkLose()) return handleLose();
  console.log(delta);
  lastTime = time;
  window.requestAnimationFrame(update);
}
function updateSpeedScale(delta) {
  speedScale += delta * SPEED__SCALE__INCREASE;
}
function checkLose() {
  const dino = dinoRect();
  return getCactusRect().some((rect) => isCollision(rect, dino));
}
function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}
function updateScore(delta) {
  score += delta * 0.01;
  scoreElem.textContent = Math.floor(score);
}
function handleSetup() {
  lastTime = null;
  speedScale = 1;
  score = 0;
  setupGround();
  setupDino();
  setupCactus();
  screenElem.classList.add("hide");
  window.requestAnimationFrame(update);
}
function handleLose() {
  setDinoLose();
  setTimeout(() => {
    document.addEventListener("keydown", handleSetup, { once: true });
    screenElem.classList.remove("hide");
  }, 200);
}
function setPixelToWorldScale() {
  let worldToPixelScale;
  if (window.innerWidth / window.innerHeight < WORLD__WIDTH / WORLD__HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD__WIDTH;
  } else {
    worldToPixelScale = window.innerHeight / WORLD__HEIGHT;
  }

  worldElem.style.width = `${WORLD__WIDTH * worldToPixelScale}px`;
  worldElem.style.height = `${WORLD__HEIGHT * worldToPixelScale}px`;
}
