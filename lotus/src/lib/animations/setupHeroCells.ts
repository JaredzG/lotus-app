import { gsap } from "gsap";

const setupHeroCells = (): void => {
  const cells = gsap.utils.toArray<HTMLElement>(".cell");
  const heroes = gsap.utils.toArray<HTMLElement>(".hero");
  const images = gsap.utils.toArray<HTMLElement>(".heroImage");

  gsap.set(cells, {
    opacity: 100,
  });

  gsap.set(heroes, {
    scaleX: 0,
    scaleY: 0,
  });

  gsap.set(images, {
    opacity: 100,
  });
};

export default setupHeroCells;
