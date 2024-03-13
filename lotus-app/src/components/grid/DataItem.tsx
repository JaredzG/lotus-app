"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  type HeroType,
  type HeroFilterType,
  type ItemFilterType,
  type ItemType,
} from "@/lib/zod";
import { type DataType } from "@/lib/types";
import HeroItem from "../heroes/HeroItem";

const cf = process.env.NEXT_PUBLIC_CF_DOMAIN;

const DataItem = ({
  dataType,
  dataItem,
  filters,
}: {
  dataType: DataType;
  dataItem: HeroType | ItemType;
  filters: HeroFilterType[] | ItemFilterType[];
}) => {
  return (
    <div
      className={cn(
        "h-40 w-40 border-transparent overflow-hidden cursor-pointer hover:scale-110 transition-all flex justify-center items-center"
      )}
    >
      {dataType === "Heroes" ? (
        <HeroItem hero={dataItem} filters={filters} />
      ) : (
        <Image
          src={`${cf}${dataItem.imageKey}`}
          alt={dataItem.name}
          height={320}
          width={440}
          className={cn(
            filters.length > 0
              ? filters.every((filter) => dataItem[filter.category])
                ? ""
                : "grayscale brightness-50"
              : ""
          )}
        />
      )}
    </div>
  );
};

export default DataItem;
