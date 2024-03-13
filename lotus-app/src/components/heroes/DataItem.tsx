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
        <Image
          src={`${cf}${dataItem.primaryImageKey}`}
          alt={dataItem.alias}
          height={640}
          width={360}
          className={cn(
            filters.length > 0
              ? filters.every((filter) => {
                  if (filter.category !== "roles")
                    return dataItem[filter.category] === filter.criteria;
                  else
                    return dataItem[filter.category].includes(filter.criteria);
                })
                ? ""
                : "grayscale brightness-50"
              : ""
          )}
        />
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
