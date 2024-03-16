"use client";

import { type DataType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { type ItemFilterType, type HeroFilterType } from "@/lib/zod";

const Filter = ({
  dataType,
  category,
  criteria,
  filters,
  onFilterClick,
}: {
  dataType: DataType;
  category: string;
  criteria: string | null;
  filters: HeroFilterType[] | ItemFilterType[];
  onFilterClick: (
    category: HeroFilterType["category"] | ItemFilterType["category"],
    criteria: HeroFilterType["criteria"] | ItemFilterType["criteria"]
  ) => void | ((category: ItemFilterType["category"]) => void);
}) => {
  return (
    <li
      className={cn(
        "text-white font-medium px-2 py-1 rounded-lg cursor-pointer select-none transition-bg hover:bg-gray-700",
        filters.some((filter) => {
          if (filter.category === category) {
            return filter.criteria === criteria;
          }
          return false;
        })
          ? "bg-gradient-to-r from-red-500 to-yellow-700"
          : ""
      )}
      onClick={() => onFilterClick(category, criteria)}
    >
      {criteria}
    </li>
  );
};

export default Filter;
