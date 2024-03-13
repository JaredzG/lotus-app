"use client";
import { useState } from "react";
import {
  useGetItemsQuery,
  useLazyGetHeroesQuery,
  useLazyGetItemsQuery,
} from "@/features/api/apiSlice";
import { cn } from "@/lib/utils";
import { type ItemFilterType } from "@/lib/zod";
import OrderBar from "@/components/heroes/OrderBar";
import FilterBar from "@/components/heroes/FilterBar";
import Fetching from "@/components/heroes/Fetching";
import GridsContainer from "@/components/heroes/GridsContainer";

const orderCategories = ["None", "Type", "Classification"];

const filterCategories: Record<
  ItemFilterType["category"],
  ItemFilterType["display"]
> = {
  hasStats: "Has Stats",
  hasAbilities: "Has Abilities",
  hasPrices: "Has Prices",
  isComponent: "Is Component",
  hasComponents: "Has Components",
  hasRecipe: "Has Recipe",
};

const ItemsPage = () => {
  const initialResult = useGetItemsQuery({ order: null });
  const [trigger, result] = useLazyGetItemsQuery();

  const [order, setOrder] = useState("None");
  const [filters, setFilters] = useState<ItemFilterType[]>([]);

  const onOrderClick = (order: string) => {
    trigger({ order });
    setOrder(order);
  };

  const onFilterClick = (
    category: ItemFilterType["category"],
    display: ItemFilterType["display"]
  ) => {
    if (!filters.some((filter) => filter.category === category))
      setFilters([...filters, { category, display }]);
    else setFilters(filters.filter((filter) => filter.category !== category));
  };

  return (
    <main className={cn("relative")}>
      <OrderBar
        orderCategories={orderCategories}
        order={order}
        onOrderClick={onOrderClick}
      />
      {result.status !== "uninitialized"
        ? (result.isFetching && <Fetching dataType="Items" />) ||
          (!result.isFetching && (
            <GridsContainer
              dataType="Items"
              result={result}
              filters={filters}
            />
          ))
        : (initialResult.isFetching && <Fetching dataType="Items" />) ||
          (!initialResult.isFetching && (
            <GridsContainer
              dataType="Items"
              result={initialResult}
              filters={filters}
            />
          ))}
      <FilterBar
        dataType="Items"
        filterCategories={filterCategories}
        filters={filters}
        onFilterClick={onFilterClick}
      />
    </main>
  );
};

export default ItemsPage;
