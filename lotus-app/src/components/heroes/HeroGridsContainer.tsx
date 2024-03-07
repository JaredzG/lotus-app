import { cn } from "@/lib/utils";
import HeroGrid from "./HeroGrid";
import { FilterType } from "@/lib/zod";

const HeroGridsContainer = ({
  result,
  filters,
}: {
  result: any;
  filters: FilterType[];
}) => {
  return (
    <div className={cn("flex flex-wrap gap-5 p-28 justify-evenly items-start")}>
      {Object.keys(result.data).map((category) => (
        <HeroGrid
          key={category}
          category={category}
          filters={filters}
          heroes={result.data[category]}
        />
      ))}
    </div>
  );
};

export default HeroGridsContainer;
