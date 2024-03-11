"use client";
import { useState } from "react";
import {
  useGetHeroesQuery,
  useLazyGetHeroesQuery
} from "@/features/api/apiSlice";
import { cn } from "@/lib/utils";
import { FilterType } from "@/lib/zod";
import HeroOrderCategoryBar from "@/components/heroes/HeroOrderCategoryBar";
import HeroFilterCategoryBar from "@/components/heroes/HeroFilterCategoryBar";
import HeroFetchLoading from "@/components/heroes/HeroFetchLoading";
import HeroGridsContainer from "@/components/heroes/HeroGridsContainer";

const orderCategories = [
  "None",
  "Primary Attribute",
  "Attack Type",
  "Role",
  "Complexity"
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
    "Initiator"
  ],
  complexity: ["Simple", "Moderate", "Complex"]
};

const HeroesPage = () => {
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
      <HeroOrderCategoryBar
        orderCategories={orderCategories}
        order={order}
        onOrderClick={onOrderClick}
      />
      {result.status !== "uninitialized"
        ? (result.isFetching && <HeroFetchLoading />) ||
          (!result.isFetching && (
            <HeroGridsContainer result={result} filters={filters} />
          ))
        : (initialResult.isFetching && <HeroFetchLoading />) ||
          (!initialResult.isFetching && (
            <HeroGridsContainer result={initialResult} filters={filters} />
          ))}
      <HeroFilterCategoryBar
        filterCategories={filterCategories}
        filters={filters}
        onFilterClick={onFilterClick}
      />
    </main>
  );
};

export default HeroesPage;
