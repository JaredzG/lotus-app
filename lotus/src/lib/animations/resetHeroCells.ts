import { gsap } from "gsap";
import slideOutHeroes from "./slideOutHeroes";
import slideInHeroes from "./slideInHeroes";

const resetHeroes = (): void => {
  gsap
    .timeline({
      paused: true,
    })
    .add(slideOutHeroes.play())
    .add(slideInHeroes.play())
    .play();
};

export default resetHeroes;
