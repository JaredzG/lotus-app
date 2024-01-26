import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

const initLenisAndGSAP = (): void => {
  const lenis = new Lenis();

  gsap.registerPlugin(ScrollTrigger);

  gsap.config({ nullTargetWarn: false });

  // eslint-disable-next-line @typescript-eslint/unbound-method
  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time: number) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
};

const makeCardScrollAnimations = (
  card: Element | string,
  direction: "left" | "right"
): void => {
  const directionValues = {
    left: {
      begin: "40dvw",
      end: "-10dvw",
    },
    right: {
      begin: "-40dvw",
      end: "10dvw",
    },
  };

  const { begin, end } = directionValues[direction];

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: card,
      start: "top+=12.5% bottom",
      end: "bottom-=12.5% top",
      scrub: true,
      markers: false,
    },
  });
  tl.fromTo(
    card,
    {
      x: begin,
      ease: "power1.inOut",
    },
    {
      x: end,
      ease: "power1.inOut",
    }
  ).to(card, {
    x: begin,
    ease: "power1.inOut",
  });
};

export { cn, makeCardScrollAnimations, initLenisAndGSAP };
