import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

const lenis = new Lenis();

gsap.registerPlugin(ScrollTrigger);

lenis.on("scroll", (e: Event) => {
  console.log(e);
});

// eslint-disable-next-line @typescript-eslint/unbound-method
lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

export default function Heroes(): JSX.Element {
  const containersRef = useRef<HTMLDivElement[]>([]);
  const rectsRef = useRef<HTMLDivElement[]>([]);
  const foo = [...Array(3).keys()].map((foo) => foo + 1);
  useEffect(() => {
    containersRef.current.forEach((ref, idx) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containersRef.current[idx],
          start: "top center",
          end: "bottom center",
          scrub: true,
          markers: true,
        },
      });

      tl.to(rectsRef.current[idx], {
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
      }).to(rectsRef.current[idx], {
        top: "0%",
        left: "100%",
        xPercent: 0,
        yPercent: -100,
      });
    });
  }, []);
  return (
    <>
      <div
        className={cn(
          "h-screen w-screen flex justify-center items-center font-bold text-5xl bg-violet-400"
        )}
      ></div>
      {foo.map((foo, idx) => (
        <div
          key={`div${foo}`}
          ref={(foo: HTMLDivElement | null) => containersRef.current.push(foo!)}
          className={cn("h-screen w-screen bg-violet-400 relative")}
        >
          <div
            ref={(foo: HTMLDivElement | null) => rectsRef.current.push(foo!)}
            className={cn(
              "h-5/6 w-5/6 bg-emerald-500 absolute -bottom-full -right-full"
            )}
          ></div>
        </div>
      ))}
      <div
        className={cn(
          "h-screen w-screen flex justify-center items-center font-bold text-5xl bg-violet-400"
        )}
      ></div>
    </>
  );
}
