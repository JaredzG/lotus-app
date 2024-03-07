import { cn } from "@/lib/utils";
import { type FilterType } from "@/lib/zod";
import HeroFilterCategory from "./HeroFilterCategory";

const HeroFilterCategoryBar = ({
  filterCategories,
  filters,
  onFilterClick,
}: {
  filterCategories: Record<FilterType["category"], FilterType["criteria"][]>;
  filters: FilterType[];
  onFilterClick: (
    category: FilterType["category"],
    criteria: FilterType["criteria"]
  ) => void;
}) => {
  return (
    <div
      className={cn(
        "w-full px-4 py-2 fixed bottom-0 left-0 backdrop-blur-lg z-50"
      )}
    >
      <ul className={cn("flex flex-wrap gap-2")}>
        {Object.keys(filterCategories).map((category: string) =>
          filterCategories[category].map((criteria: string) => (
            <HeroFilterCategory
              key={criteria}
              category={category}
              criteria={criteria}
              filters={filters}
              onFilterClick={onFilterClick}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default HeroFilterCategoryBar;
