import Image from "next/image";
import { cn } from "@/lib/utils";
import { FilterType, HeroType } from "@/lib/zod";

const cf = process.env.NEXT_PUBLIC_CF_DOMAIN;

const HeroGrid = ({
  category,
  filters,
  heroes,
}: {
  category: string;
  filters: FilterType[];
  heroes: HeroType[];
}) => {
  return (
    <div
      className={cn(
        "w-full rounded-lg bg-gradient-to-r from-sky-500 to-fuchsia-500 p-1"
      )}
    >
      <div
        className={cn(
          "rounded-lg bg-gradient-radial from-gray-700 from-20% to-black to-80% bg-fixed p-4"
        )}
      >
        <div
          className={cn(
            "w-min font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500 mb-3 px-3 pb-2"
          )}
        >
          {category}
        </div>
        <div className={cn("flex flex-wrap justify-evenly gap-3")}>
          {heroes?.map((hero) => (
            <div
              key={hero.alias}
              className={cn(
                "h-40 w-40 border-transparent overflow-hidden cursor-pointer hover:scale-110 transition-all flex justify-center items-center"
              )}
            >
              <Image
                src={`${cf}${hero.primaryImageKey}`}
                alt={hero.alias}
                height={640}
                width={360}
                className={cn(
                  filters.length > 0
                    ? filters.every((filter) => {
                        if (filter.category !== "roles")
                          return hero[filter.category] === filter.criteria;
                        else
                          return hero[filter.category].includes(
                            filter.criteria
                          );
                      })
                      ? ""
                      : "grayscale brightness-50"
                    : ""
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroGrid;
