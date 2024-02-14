import { gsap } from "gsap";

const slideInHeroCells = (): void => {
  const heroes = gsap.utils.toArray<HTMLElement>(".hero");

  gsap
    .to(heroes, {
      scaleX: 1,
      scaleY: 1,
      stagger: 0.1,
      ease: "expo.inOut",
      duration: 1,
    })
    .delay(2);
};

export default slideInHeroCells;
