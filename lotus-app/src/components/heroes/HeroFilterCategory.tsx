import { cn } from "@/lib/utils";
import { type FilterType } from "@/lib/zod";

const HeroFilterCategory = ({
  category,
  criteria,
  filters,
  onFilterClick,
}: {
  category: string;
  criteria: string;
  filters: FilterType[];
  onFilterClick: (
    category: FilterType["category"],
    criteria: FilterType["criteria"]
  ) => void;
}) => {
  return (
    <li
      className={cn(
        "text-white font-medium px-2 py-1 rounded-lg cursor-pointer select-none transition-colors hover:bg-gray-700",
        filters.some(
          (filter: Record<string, string>) =>
            filter.category === category && filter.criteria === criteria
        )
          ? "bg-gradient-to-r from-red-500 to-yellow-500 text-black"
          : ""
      )}
      onClick={() => onFilterClick(category, criteria)}
    >
      {criteria}
    </li>
  );
};

export default HeroFilterCategory;
