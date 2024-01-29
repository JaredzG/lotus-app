import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { initLenisAndGSAP } from "./utils.js";

initLenisAndGSAP();

gsap
  .timeline({ defaults: { ease: "elastic", duration: 3 } })
  .to(".teal-box", {
    rotation: 315,
  })
  .to(".violet-box", {
    rotation: 315,
  });

gsap.set(".loading-text", { xPercent: 50, opacity: 0 });

gsap
  .timeline({ defaults: { ease: "power1.inOut", duration: 3 } })
  .from(".loading-bar", {
    scaleY: 0,
  })
  .to(
    ".loading-text",
    {
      textContent: "100",
      roundProps: "textContent",

      bottom: "0%",
      opacity: 100,
    },
    "<"
  )
  .to(".loading-text", {
    rotation: 360,
    opacity: 0,
    duration: 3,
  });

ScrollTrigger.create({
  trigger: ".big-container",
  start: "top top",
  end: "bottom bottom",
  pin: ".pinned-container",
  scrub: true,
  markers: false,
});

const items = gsap.utils.toArray(".container-item");
const redBoxAnimation = gsap.from(items, {
  opacity: 0,
  y: 100,
  ease: "power1.inOut",
  stagger: 0.5,
});

ScrollTrigger.create({
  trigger: ".pinned-container",
  start: "top center",
  end: "bottom bottom",
  animation: redBoxAnimation,
  scrub: false,
  markers: false,
});

const slides = gsap.utils.toArray(".spacerSlide:not(:first-child)");
gsap.set(slides, { yPercent: 101 });
const slideUp = gsap.to(slides, {
  yPercent: 0,
  duration: 1,
  stagger: 1,
});

ScrollTrigger.create({
  trigger: ".spacerContainer",
  start: "top top",
  end: "bottom bottom",
  pin: ".spacerPin",
  animation: slideUp,
  scrub: true,
  markers: false,
});

const fadeIn = gsap.from(".slideContent", {
  scale: 0,
  duration: 1,
  stagger: 1,
});

ScrollTrigger.create({
  trigger: ".slideContent",
  start: "top bottom",
  end: "bottom top",
  pinnedContainer: ".spacerPin",
  animation: fadeIn,
  scrub: true,
});
