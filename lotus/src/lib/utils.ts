import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";

const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

const initLenisAndGSAP = (): void => {
  const lenis = new Lenis();

  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

  gsap.config({ nullTargetWarn: false });

  // eslint-disable-next-line @typescript-eslint/unbound-method
  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time: number) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
};

export { cn, initLenisAndGSAP };
