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
import ItemItem from "../items/ItemItem";

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
        "h-min w-40 border-transparent overflow-hidden cursor-pointer hover:scale-110 transition-all flex justify-center items-center"
      )}
    >
      {dataType === "Heroes" ? (
        <HeroItem hero={dataItem} filters={filters} />
      ) : (
        <ItemItem item={dataItem} filters={filters} />
      )}
    </div>
  );
};

export default DataItem;
