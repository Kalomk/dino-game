import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomPropert.js";

const dinoElem = document.querySelector("[data-dino]");
const JUMP__SPEED = 0.45,
  GRAVITY = 0.0015,
  DINO__FRAME__COUNT = 2,
  DINO__FRAME__TIME = 100;

let isJumping;
let dinoFr;
let currentFrTime;
let yVelocity;
export function setupDino() {
  isJumping = false;
  dinoFr = 0;
  currentFrTime = 0;
  yVelocity = 0;
  setCustomProperty(dinoElem, "--bottom", 0);
  document.removeEventListener("keydown", onJump);
  document.addEventListener("keydown", onJump);
}
export function dinoRect() {
  return dinoElem.getBoundingClientRect();
}
export function updateDino(delta, speedScale) {
  dinoRun(delta, speedScale);
  dinoJump(delta);
}
export function setDinoLose() {
  dinoElem.src = "imgs/dino-lose.png";
}
function dinoRun(delta, speedScale) {
  if (isJumping) {
    dinoElem.src = `imgs/dino-stationary.png`;
    return;
  }
  if (currentFrTime >= DINO__FRAME__TIME) {
    dinoFr = (dinoFr + 1) % DINO__FRAME__COUNT;
    dinoElem.src = `imgs/dino-run-${dinoFr}.png`;
    currentFrTime -= DINO__FRAME__TIME;
  }
  currentFrTime += delta * speedScale;
}

function dinoJump(delta) {
  if (!isJumping) return;
  incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta);
  if (getCustomProperty(dinoElem, "--bottom") <= 0) {
    setCustomProperty(dinoElem, "--bottom", 0);
    isJumping = false;
  }
  yVelocity -= GRAVITY * delta;
}

function onJump(e) {
  if (e.code !== "Space" || isJumping) return;
  isJumping = true;
  yVelocity = JUMP__SPEED;
}
