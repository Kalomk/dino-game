import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomPropert.js";

let ground = document.querySelectorAll("[data-ground]");
const SPEED = 0.05;
export function setupGround() {
  setCustomProperty(ground[0], "--left", 0);
  setCustomProperty(ground[1], "--left", 300);
}
export function updateGround(delta, speedScale) {
  ground.forEach((ground) => {
    incrementCustomProperty(ground, "--left", SPEED * delta * speedScale * -1);
    if (getCustomProperty(ground, "--left") <= -300) {
      incrementCustomProperty(ground, "--left", 600);
    }
  });
}
