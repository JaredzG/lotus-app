import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { useRef, type CSSProperties, useState } from "react";

const lenis = new Lenis();

gsap.registerPlugin(ScrollTrigger);

gsap.config({ nullTargetWarn: false });

// eslint-disable-next-line @typescript-eslint/unbound-method
lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

const styles: Record<string, Record<string, string | number>> = {
  Heroes: {
    rectFromToFromX: "40dvw",
    rectFromToToX: "-10dvw",
    rectToX: "40dvw",
    rectStartingPosX: "right-0",
    rectBackgroundColor: "bg-slate-800",
    rectBorderColor: "border-red-400",
    rectNum: 124,
    containerBackgroundColor: "bg-teal-600",
  },
  Items: {
    rectFromToFromX: "-40dvw",
    rectFromToToX: "10dvw",
    rectToX: "-40dvw",
    rectStartingPosX: "left-0",
    rectBackgroundColor: "bg-blue-500",
    rectBorderColor: "border-yellow-500",
    rectNum: 244,
    containerBackgroundColor: "bg-pink-800",
  },
};

export default function Cards(): JSX.Element {
  const [displayType, setDisplayType] = useState("Items");
  const containerRef = useRef<HTMLDivElement>(null);
  const rectsRef = useRef<HTMLDivElement[]>([]);
  const rectsArray = [...Array(styles[displayType].rectNum).keys()].map(
    (rect) => rect + 1
  );
  const containerHeight = `${180 + rectsArray.length * 80}dvh`;
  const rectPosArray = rectsArray.map((val, idx) => `${90 + idx * 80}dvh`);

  useGSAP(
    () => {
      rectsRef.current.forEach((rect) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: rect,
            start: "top+=12.5% bottom",
            end: "bottom-=12.5% top",
            scrub: true,
            markers: false,
          },
        });
        tl.fromTo(
          rect,
          {
            x: styles[displayType].rectFromToFromX,
            ease: "power1.inOut",
          },
          {
            x: styles[displayType].rectFromToToX,
            ease: "power1.inOut",
          }
        ).to(rect, {
          x: styles[displayType].rectToX,
          ease: "power1.inOut",
        });
      });

      const handleDisplaySwitch = (event: MouseEvent): void => {
        if (event.ctrlKey) {
          const updatedDisplayType =
            displayType === "Heroes" ? "Items" : "Heroes";
          setDisplayType(updatedDisplayType);
        }
      };

      window.addEventListener("click", handleDisplaySwitch);

      return () => {
        window.removeEventListener("click", handleDisplaySwitch);
      };
    },
    { dependencies: [displayType], revertOnUpdate: true }
  );

  return (
    <div
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      style={{ "--customHeight": containerHeight } as CSSProperties}
      className={cn(
        `h-[var(--customHeight)] ${styles[displayType].containerBackgroundColor} relative`
      )}
      ref={containerRef}
    >
      {rectsArray.map((rect, idx) => (
        <div
          key={`${idx}`}
          ref={(rect: HTMLDivElement) => rectsRef.current.push(rect)}
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          style={{ "--customHeight": rectPosArray[idx] } as CSSProperties}
          className={cn(
            `h-[80dvh] w-[80dvw] absolute top-[var(--customHeight)] ${styles[displayType].rectStartingPosX} ${styles[displayType].rectBackgroundColor} border-4 border-solid ${styles[displayType].rectBorderColor}`
          )}
        ></div>
      ))}
    </div>
  );
}
