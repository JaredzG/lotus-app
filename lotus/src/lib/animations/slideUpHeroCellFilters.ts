import gsap from "gsap";

const slideUpHeroCellFilters = (): void => {
  const filters = gsap.utils.toArray<HTMLElement>(".heroFilter");
  const images = gsap.utils.toArray<HTMLElement>(".heroImage");

  filters.forEach((filter, idx) => {
    const heroInfoContainers = gsap.utils.toArray<HTMLElement>(
      ".heroInfoContainer",
      filter
    );

    heroInfoContainers.forEach((container) => {
      gsap.set(container, {
        opacity: 100,
        yPercent: 160,
      });
    });

    const tl = gsap.timeline({
      defaults: {
        ease: "expo.inOut",
        duration: 0.5,
      },
    });

    tl.to(filter, {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      backdropFilter: "blur(10px)",
      boxShadow: "inset 0  0 25px 25px rgba(0,  0,  0,  0.5)",
    })
      .to(
        images[idx],
        {
          scale: "+=0.1",
        },
        "<"
      )
      .to(
        heroInfoContainers,
        {
          yPercent: 0,
          stagger: 0.1,
        },
        "<0.3"
      );

    tl.pause();

    filter.addEventListener("mouseenter", () => {
      tl.play();
    });

    filter.addEventListener("mouseleave", () => {
      tl.reverse();
    });
  });
};

export default slideUpHeroCellFilters;
