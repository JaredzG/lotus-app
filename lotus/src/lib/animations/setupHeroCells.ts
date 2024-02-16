import { gsap } from "gsap";
import animateHeroFilters from "./animateHeroFilters";

const cells = gsap.utils.toArray<HTMLElement>(".cell");

const setupHeroCells = gsap.timeline().set(cells, {
  opacity: 100,
  border: "2px solid white",
});

animateHeroFilters();

export default setupHeroCells;
