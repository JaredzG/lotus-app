import { useGSAP } from "@gsap/react";
import { cn, initLenisAndGSAP, makeCardScrollAnimations } from "@/lib/utils";
import { useRef, type CSSProperties } from "react";

initLenisAndGSAP();

const cardArray = [...Array(244).keys()];
const cardPositions = cardArray.map(
  (key, idx) => `calc(90dvh + ${idx} * 80dvh)`
);

const TestComp = ({
  direction,
}: {
  direction: "left" | "right";
}): JSX.Element => {
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    cardRefs.current.forEach((card) => {
      makeCardScrollAnimations(card, direction);
    });
  }, []);

  return (
    <>
      {cardArray.map((element, idx) => (
        <section
          key={++idx}
          style={
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            {
              "--customHeight": cardPositions[idx],
            } as CSSProperties
          }
          ref={(card: HTMLDivElement) => {
            cardRefs.current.push(card);
          }}
          className={cn(
            `h-[80dvh] w-[80dvw] absolute top-[var(--customHeight)] bg-fuchsia-600 border-4 border-solid border-black flex justify-center items-center text-white text-7xl font-bold snap-center`
          )}
        >
          {++idx}
        </section>
      ))}
    </>
  );
};

export default TestComp;
