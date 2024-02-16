import { gsap } from "gsap";

const heroes = gsap.utils.toArray<HTMLElement>(".hero");

const slideInHeroes = gsap
  .timeline({
    paused: true,
    delay: 2,
  })
  .to(heroes, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ease: "expo.inOut",
    duration: 1.5,
  });

export default slideInHeroes;
