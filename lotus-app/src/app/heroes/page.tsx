"use client";
import { useState } from "react";
import {
  useGetHeroesQuery,
  useLazyGetHeroesQuery,
} from "@/features/api/apiSlice";
import { cn } from "@/lib/utils";
import { type HeroFilterType } from "@/lib/zod";
import OrderBar from "@/components/grid/OrderBar";
import FilterBar from "@/components/grid/FilterBar";
import Fetching from "@/components/grid/Fetching";
import GridsContainer from "@/components/grid/GridsContainer";

const orderCategories = [
  "None",
  "Primary Attribute",
  "Attack Type",
  "Role",
  "Complexity",
];

const filterCategories: Record<
  HeroFilterType["category"],
  HeroFilterType["criteria"][]
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

const HeroesPage = () => {
  const initialResult = useGetHeroesQuery({ order: null });
  const [trigger, result] = useLazyGetHeroesQuery();

  const [order, setOrder] = useState("None");
  const [filters, setFilters] = useState<HeroFilterType[]>([]);

  const onOrderClick = (order: string) => {
    trigger({ order });
    setOrder(order);
  };

  const onFilterClick = (
    category: HeroFilterType["category"],
    criteria: HeroFilterType["criteria"]
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
      <OrderBar
        orderCategories={orderCategories}
        order={order}
        onOrderClick={onOrderClick}
      />
      {result.status !== "uninitialized"
        ? (result.isFetching && <Fetching dataType="Heroes" />) ||
          (!result.isFetching && (
            <GridsContainer
              dataType="Heroes"
              result={result}
              filters={filters}
            />
          ))
        : (initialResult.isFetching && <Fetching dataType="Heroes" />) ||
          (!initialResult.isFetching && (
            <GridsContainer
              dataType="Heroes"
              result={initialResult}
              filters={filters}
            />
          ))}
      <FilterBar
        dataType="Heroes"
        filterCategories={filterCategories}
        filters={filters}
        onFilterClick={onFilterClick}
      />
    </main>
  );
};

export default HeroesPage;
