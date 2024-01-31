import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { initLenisAndGSAP } from "./utils.js";

initLenisAndGSAP();

const labels = gsap.utils.toArray("text");

gsap.set(labels, {
  yPercent: 200,
});

const tl = gsap.timeline({
  defaults: {
    ease: "expo.inOut",
    duration: 2,
  },
});

tl.to("#overlay", {
  opacity: 0,
}).to(
  labels,
  {
    yPercent: 0,
  },
  "<"
);

// gsap
//   .timeline({ defaults: { ease: "elastic", duration: 3 } })
//   .to(".teal-box", {
//     rotation: 315,
//   })
//   .to(".violet-box", {
//     rotation: 315,
//   });

// gsap.set(".loading-text", { xPercent: 50, opacity: 0 });

// gsap
//   .timeline({ defaults: { ease: "power1.inOut", duration: 3 } })
//   .from(".loading-bar", {
//     scaleY: 0,
//   })
//   .to(
//     ".loading-text",
//     {
//       textContent: "100",
//       roundProps: "textContent",

//       bottom: "0%",
//       opacity: 100,
//     },
//     "<"
//   )
//   .to(".loading-text", {
//     rotation: 360,
//     opacity: 0,
//     duration: 3,
//   });

// ScrollTrigger.create({
//   trigger: ".big-container",
//   start: "top top",
//   end: "bottom bottom",
//   pin: ".pinned-container",
//   scrub: true,
//   markers: false,
// });

// const items = gsap.utils.toArray(".container-item");
// const redBoxAnimation = gsap.from(items, {
//   opacity: 0,
//   y: 100,
//   ease: "power1.inOut",
//   stagger: 0.5,
// });

// ScrollTrigger.create({
//   trigger: ".pinned-container",
//   start: "top center",
//   end: "bottom bottom",
//   animation: redBoxAnimation,
//   scrub: false,
//   markers: false,
// });

// const conts = document.querySelectorAll(".cont");
// conts.forEach((cont, idx) => {
//   gsap
//     .timeline({
//       scrollTrigger: {
//         trigger: cont,
//         start: "top top",
//         end: "bottom top",
//         pin: true,
//         pinSpacing: false,
//         scrub: true,
//         markers: false,
//       },
//     })
//     .from(cont, {
//       opacity: 0,
//     })
//     .to(cont, {
//       opacity: 0,
//     });
// });

// const contentContainers = gsap.utils.toArray(".contentContainer");
// const squareContainers = gsap.utils.toArray(".squareContainer");

// contentContainers.forEach((container, idx) => {
//   const tiles = gsap.utils.toArray(
//     ".tile:not(:first-child)",
//     squareContainers[idx]
//   );
//   gsap.set(tiles, {
//     yPercent: 101,
//   });
//   gsap.to(tiles, {
//     scrollTrigger: {
//       trigger: container,
//       start: "clamp(center bottom)",
//       end: "clamp(center center)",
//       scrub: true,
//       markers: true,
//     },
//     yPercent: 0,
//     duration: 1,
//     stagger: 1,
//   });
//   ScrollTrigger.create({
//     trigger: squareContainers[idx],
//     start: "clamp(bottom bottom)",
//     end: "clamp(bottom+=100% top)",
//     pin: true,
//     pinSpacing: false,
//     scrub: true,
//     markers: true,
//   });
//   if (idx < contentContainers.length - 1) {
//     const containerAnimation = gsap.to(squareContainers[idx], {
//       opacity: 0,
//       duration: 0.01,
//       paused: true,
//     });

//     ScrollTrigger.create({
//       trigger: squareContainers[idx],
//       start: "clamp(bottom+=0.1% bottom)",
//       onEnter: () => {
//         containerAnimation.play();
//       },
//       onLeaveBack: () => {
//         containerAnimation.reverse();
//       },
//       markers: true,
//     });
//   }
// });

// gsap.fromTo(
//   ".clipped",
//   {
//     opacity: 0,
//   },
//   {
//     opacity: 1,
//     yPercent: -10,
//   }
// );
