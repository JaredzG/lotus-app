import { gsap } from "gsap";

const heroes = gsap.utils.toArray<HTMLElement>(".hero");

const slideOutHeroes = gsap
  .timeline({
    paused: true,
  })
  .to(heroes, {
    clipPath: "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)",
    ease: "expo.inOut",
    duration: 1.5,
  })
  .set(heroes, {
    clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
  });
export default slideOutHeroes;
