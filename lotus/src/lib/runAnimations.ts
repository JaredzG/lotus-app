/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { gsap } from "gsap";
import { initLenisAndGSAP } from "./utils";

initLenisAndGSAP();

const cells = gsap.utils.toArray<HTMLElement>(".cell");
const heroes = gsap.utils.toArray<HTMLElement>(".hero");
const filters = gsap.utils.toArray<HTMLElement>(".imageFilter");
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

const imageExpand = gsap.to(heroes, {
  scaleX: 1,
  scaleY: 1,
  stagger: 0.1,
  ease: "expo.inOut",
  duration: 1,
});

imageExpand.delay(2);

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
