import gsap from "gsap";

const animateHeroFilters = (): void => {
  const filters = gsap.utils.toArray<HTMLElement>(".heroFilter");
  const images = gsap.utils.toArray<HTMLElement>(".heroImage");

  filters.forEach((filter, idx) => {
    const filterContent = filter.querySelector(".filterContent");

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
        filterContent,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.5,
        },
        "<-0.1"
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

export default animateHeroFilters;
