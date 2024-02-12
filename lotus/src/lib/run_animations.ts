/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { gsap } from "gsap";
import { initLenisAndGSAP } from "./utils.js";

initLenisAndGSAP();

const heroes = gsap.utils.toArray(".hero");
const filters = gsap.utils.toArray(".imageFilter");
const filterTexts = gsap.utils.toArray(".filterText");
const images = gsap.utils.toArray(".heroImage");

heroes.forEach((hero) => {
  gsap.set(hero, {
    scaleX: 0,
    scaleY: 0,
  });
});

const imageExpand = gsap.to(heroes, {
  scaleX: 1,
  scaleY: 1,
  stagger: 0.1,
  ease: "expo.inOut",
  duration: 1,
});

imageExpand.delay(2);

gsap.set(filterTexts, {
  scale: 0,
});

filters.forEach((filter, idx) => {
  const tl = gsap.timeline({
    defaults: {
      ease: "expo.inOut",
      duration: 0.5,
    },
  });

  tl.to(filter, {
    backdropFilter: "blur(10px)",
    boxShadow: "inset 0  0 25px 25px rgba(0,  0,  0,  0.5)",
  })
    .to(
      filterTexts[idx],
      {
        scale: 1,
        left: "50%",
        xPercent: -50,
      },
      "<"
    )
    .to(
      images[idx],
      {
        scale: "+=0.1",
      },
      "<"
    );

  tl.pause();

  filter.addEventListener("mouseenter", () => {
    tl.play();
  });

  filter.addEventListener("mouseleave", () => {
    tl.reverse();
  });
});
