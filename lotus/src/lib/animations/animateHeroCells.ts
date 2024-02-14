import setupHeroCells from "./setupHeroCells";
import slideInHeroCells from "./slideInHeroCells";
import slideUpHeroCellFilters from "./slideUpHeroCellFilters";

const animateHeroCells = (): void => {
  setupHeroCells();
  slideInHeroCells();
  slideUpHeroCellFilters();
};

export default animateHeroCells;
