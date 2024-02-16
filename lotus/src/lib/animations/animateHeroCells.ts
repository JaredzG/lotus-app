import setupHeroCells from "./setupHeroCells";
import slideInHeroes from "./slideInHeroes";

const animateHeroCells = (): void => {
  setupHeroCells.add(slideInHeroes.play());
};

export default animateHeroCells;
