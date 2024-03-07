"use client";
import { useState } from "react";
import HeroGrid from "@/components/heroes/HeroGrid";
import {
  useGetHeroesQuery,
  useLazyGetHeroesQuery,
} from "@/features/api/apiSlice";
import { cn } from "@/lib/utils";
import { FilterType } from "@/lib/zod";

const orderCategories = [
  "None",
  "Primary Attribute",
  "Attack Type",
  "Role",
  "Complexity",
];

const filterCategories: Record<
  FilterType["category"],
  FilterType["criteria"][]
> = {
  primaryAttribute: ["Strength", "Agility", "Intelligence", "Universal"],
  attackType: ["Melee", "Ranged"],
  roles: [
    "Carry",
    "Support",
    "Nuker",
    "Disabler",
    "Durable",
    "Escape",
    "Pusher",
    "Initiator",
  ],
  complexity: ["Simple", "Moderate", "Complex"],
};

const Heroes = () => {
  const initialResult = useGetHeroesQuery({ order: null });
  const [trigger, result] = useLazyGetHeroesQuery();

  const [order, setOrder] = useState("None");
  const [filters, setFilters] = useState<FilterType[]>([]);

  const onOrderClick = (order: string) => {
    trigger({ order });
    setOrder(order);
  };

  const onFilterClick = (
    category: FilterType["category"],
    criteria: FilterType["criteria"]
  ) => {
    if (
      !filters.some(
        (filter) => filter.category === category && filter.criteria === criteria
      )
    )
      setFilters([...filters, { category, criteria }]);
    else setFilters(filters.filter((filter) => filter.criteria !== criteria));
  };

  return (
    <main className={cn("relative")}>
      <div className={cn("w-full px-4 py-2 fixed backdrop-blur-lg z-50")}>
        <ul className={cn("flex flex-wrap gap-2")}>
          {orderCategories.map((category) => (
            <li
              key={category}
              className={cn(
                "text-white font-medium px-2 py-1 rounded-lg cursor-pointer select-none",
                order === category
                  ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-black"
                  : ""
              )}
              onClick={() => onOrderClick(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
      {result.status !== "uninitialized"
        ? (result.isFetching && (
            <div
              className={cn(
                "h-dvh w-dvh text-4xl font-bold flex justify-center items-center text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-amber-700"
              )}
            >
              Fetching Heroes...
            </div>
          )) ||
          (!result.isFetching && (
            <div
              className={cn(
                "flex flex-wrap gap-5 p-28 justify-evenly items-start"
              )}
            >
              {Object.keys(result.data).map((category) => (
                <HeroGrid
                  key={category}
                  category={category}
                  filters={filters}
                  heroes={result.data[category]}
                />
              ))}
            </div>
          ))
        : (initialResult.isFetching && (
            <div
              className={cn(
                "h-dvh w-dvh text-4xl font-bold flex justify-center items-center text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-amber-700"
              )}
            >
              Fetching Heroes...
            </div>
          )) ||
          (!initialResult.isFetching && (
            <div
              className={cn(
                "flex flex-wrap gap-5 p-28 justify-evenly items-start"
              )}
            >
              {Object.keys(initialResult.data).map((category) => (
                <HeroGrid
                  key={category}
                  category={category}
                  filters={filters}
                  heroes={initialResult.data[category]}
                />
              ))}
            </div>
          ))}
      <div
        className={cn(
          "w-full px-4 py-2 fixed bottom-0 left-0 backdrop-blur-lg z-50"
        )}
      >
        <ul className={cn("flex flex-wrap gap-2")}>
          {Object.keys(filterCategories).map((category) =>
            filterCategories[category].map((criteria) => (
              <li
                key={criteria}
                className={cn(
                  "text-white font-medium px-2 py-1 rounded-lg cursor-pointer select-none",
                  filters.some(
                    (filter: Record<string, string>) =>
                      filter.category === category &&
                      filter.criteria === criteria
                  )
                    ? "bg-gradient-to-r from-red-600 to-yellow-500 text-black"
                    : ""
                )}
                onClick={() => onFilterClick(category, criteria)}
              >
                {criteria}
              </li>
            ))
          )}
        </ul>
      </div>
    </main>
  );
};

export default Heroes;
