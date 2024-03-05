"use client";
import HeroGrid from "@/components/heroes/HeroGrid";
import {
  useGetHeroesQuery,
  useLazyGetHeroesQuery,
} from "@/features/api/apiSlice";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

const Heroes = () => {
  const initialResult = useGetHeroesQuery({ order: null });
  const [trigger, result] = useLazyGetHeroesQuery();
  const orderCategories = [
    "None",
    "Primary Attribute",
    "Attack Type",
    "Role",
    "Complexity",
  ];

  const categoriesRef = useRef(null);
  const [order, setOrder] = useState("None");

  const getMap = () => {
    if (!categoriesRef.current) categoriesRef.current = new Map();
    return categoriesRef.current;
  };

  const onOrderClick = (order: string) => {
    trigger({ order });
    setOrder(order);
  };

  return (
    <main>
      <div className={cn("w-full px-4 py-2 fixed backdrop-blur-lg")}>
        <ul className={cn("flex")}>
          {orderCategories.map((category: string) => (
            <li
              key={category}
              ref={(node) => {
                const map = getMap();
                if (node) map!.set(category, node);
                else map!.delete(category);
              }}
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
      <div
        className={cn("flex flex-wrap gap-5 p-28 justify-evenly items-start")}
      >
        {result.status !== "uninitialized"
          ? !result.isFetching &&
            Object.keys(result.data).map((category: string) => (
              <HeroGrid
                key={category}
                category={category}
                heroes={result.data[category]}
              />
            ))
          : !initialResult.isFetching &&
            Object.keys(initialResult.data).map((category: string) => (
              <HeroGrid
                key={category}
                category={category}
                heroes={initialResult.data[category]}
              />
            ))}
      </div>
    </main>
  );
};

export default Heroes;
