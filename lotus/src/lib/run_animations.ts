/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { initLenisAndGSAP } from "./utils.js";

initLenisAndGSAP();

const main = document.querySelector("main");

// const tl = gsap.timeline({
//   scrollTrigger: {
//     trigger: ".contentContainer",
//     end: () => "+=" + main?.offsetHeight,
//     pin: true,
//     scrub: 2,
//     markers: true,
//   },
// });

// tl.to(main, {
//   yPercent: -100,
// });
