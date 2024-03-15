"use client";
import { useState } from "react";
import {
  useGetItemsQuery,
  useLazyGetItemsQuery,
} from "@/features/api/apiSlice";
import { cn } from "@/lib/utils";
import { type ItemFilterType } from "@/lib/zod";
import OrderBar from "@/components/grid/OrderBar";
import FilterBar from "@/components/grid/FilterBar";
import Fetching from "@/components/grid/Fetching";
import GridsContainer from "@/components/grid/GridsContainer";

const orderCategories = {
  None: "None",
  Type: "Type",
  Classification: "Classification",
  [`${String.fromCodePoint(0x2b06)} Purchase ${String.fromCodePoint(0x1f4b0)}`]:
    "Increasing Purchase Price",
  [`${String.fromCodePoint(0x2b07)} Purchase ${String.fromCodePoint(0x1f4b0)}`]:
    "Decreasing Purchase Price",
  [`${String.fromCodePoint(0x2b06)} Sell ${String.fromCodePoint(0x1f4b0)}`]:
    "Increasing Sell Value",
  [`${String.fromCodePoint(0x2b07)} Sell ${String.fromCodePoint(0x1f4b0)}`]:
    "Decreasing Sell Value",
};

const filterCategories: Record<
  ItemFilterType["category"],
  ItemFilterType["criteria"][]
> = {
  type: ["Basic", "Upgrade", "Neutral"],
  classification: [
    "Consumables",
    "Attributes",
    "Equipment",
    "Miscellaneous",
    "Secret",
    "Accessories",
    "Support",
    "Magical",
    "Armor",
    "Weapons",
    "Artifacts",
    "Tier 1",
    "Tier 2",
    "Tier 3",
    "Tier 4",
    "Tier 5",
  ],
  hasStats: ["Has Stats"],
  hasAbilities: ["Has Abilities"],
  hasPrices: ["Has Prices"],
  isComponent: ["Is Component"],
  hasComponents: ["Has Components"],
  hasRecipe: ["Has Recipe"],
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
    criteria: ItemFilterType["criteria"]
  ) => {
    if (
      !filters.some(
        (filter) => filter.category === category && filter.criteria === criteria
      )
    )
      setFilters([...filters, { category, criteria }]);
    else setFilters(filters.filter((filter) => filter.criteria !== criteria));
  };

  console.log(initialResult.data);

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
