import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomPropert.js";

const SPEED = 0.05,
  CACTUS__INTERVAL__MIN = 500,
  CACRUS__INTERVAL__MAX = 2000;
const worldElem = document.querySelector("[data-world]");

let nextCactusTime;
export function setupCactus() {
  nextCactusTime = CACTUS__INTERVAL__MIN;
  document.querySelectorAll("[data-cactus]").forEach((cactus) => {
    cactus.remove();
  });
}
export function updateCactus(delta, speedScale) {
  document.querySelectorAll("[data-cactus]").forEach((cactus) => {
    incrementCustomProperty(cactus, "--left", SPEED * delta * speedScale * -1);
    if (getCustomProperty(cactus, "--left") <= -100) {
      cactus.remove();
    }
  });
  if (nextCactusTime <= 0) {
    createCactus();
    nextCactusTime =
      randomBetween(CACTUS__INTERVAL__MIN, CACRUS__INTERVAL__MAX) / speedScale;
  }

  nextCactusTime -= delta;
}
export function getCactusRect() {
  return [...document.querySelectorAll("[data-cactus]")].map((cactus) => {
    return cactus.getBoundingClientRect();
  });
}
function createCactus() {
  const cactus = document.createElement("img");
  cactus.dataset.cactus = true;
  cactus.src = "imgs/cactus.png";
  cactus.classList.add("cactus");
  setCustomProperty(cactus, "--left", 100);
  worldElem.append(cactus);
}
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
