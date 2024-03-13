"use client";

import { type DataType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { type ItemFilterType, type HeroFilterType } from "@/lib/zod";

const Filter = ({
  dataType,
  category,
  criteria,
  display,
  filters,
  onFilterClick,
}: {
  dataType: DataType;
  category: string;
  criteria: string | null;
  display: string | null;
  filters: HeroFilterType[] | ItemFilterType[];
  onFilterClick: (
    category: HeroFilterType["category"] | ItemFilterType["category"],
    criteria: HeroFilterType["criteria"] | ItemFilterType["display"]
  ) => void | ((category: ItemFilterType["category"]) => void);
}) => {
  return (
    <li
      className={cn(
        "text-white font-medium px-2 py-1 rounded-lg cursor-pointer select-none transition-bg hover:bg-gray-700",
        filters.some((filter) => {
          if (filter.category === category) {
            if (dataType === "Heroes") return filter.criteria === criteria;
            return true;
          }
          return false;
        })
          ? "bg-gradient-to-r from-red-500 to-yellow-500 text-black"
          : ""
      )}
      onClick={() =>
        dataType === "Heroes"
          ? onFilterClick(category, criteria)
          : onFilterClick(category, display)
      }
    >
      {dataType === "Heroes" ? criteria : display}
    </li>
  );
};

export default Filter;
