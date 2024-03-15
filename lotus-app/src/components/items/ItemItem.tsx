"use client";

import Image from "next/image";
import Link from "next/link";
import { type ItemFilterType, type ItemType } from "@/lib/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { cn } from "@/lib/utils";

const cf = process.env.NEXT_PUBLIC_CF_DOMAIN;

const ItemItem = ({
  item,
  filters,
}: {
  item: ItemType;
  filters: ItemFilterType[];
}) => {
  const itemPurchasePrice = item.prices
    ? parseFloat(item.prices[0].amount!)
    : null;
  const itemSellPrice =
    item.prices !== null
      ? item.prices[1].amount !== null
        ? parseFloat(item.prices[1].amount)
        : null
      : null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {item && (
          <Image
            src={`${cf}${item.imageKey}`}
            alt={item.name}
            height={320}
            width={440}
            className={cn(
              filters.length > 0
                ? filters.every(
                    (filter) =>
                      item[filter.category] === true ||
                      item[filter.category] === filter.criteria
                  )
                  ? ""
                  : "grayscale brightness-50"
                : ""
            )}
          />
        )}
      </DialogTrigger>
      <DialogContent className={cn("bg-gray-600/90 border-0")}>
        <DialogHeader>
          <Image
            src={`${cf}${item.imageKey}`}
            alt={item.name}
            height={320}
            width={440}
            className={cn("w-1/2 aspect-auto")}
          />
          <DialogTitle className={cn("text-white")}>{item.name}</DialogTitle>
          <DialogDescription>
            {item.prices ? (
              <div className={cn("flex gap-3")}>
                <span className={cn("text-yellow-500")}>
                  Purchase Cost:&nbsp;
                  <span className={cn("font-semibold text-white")}>
                    {itemPurchasePrice !== null &&
                      `${itemPurchasePrice.toString()} ${item.prices[0].unit}`}
                  </span>
                </span>
                <span className={cn("text-yellow-500")}>
                  Sell Value:&nbsp;
                  <span className={cn("font-semibold text-white")}>
                    {itemSellPrice !== null ? (
                      itemSellPrice === Math.floor(itemSellPrice) ? (
                        `${itemSellPrice.toString()} ${item.prices[1].unit}`
                      ) : (
                        `${item.prices[1].amount} ${item.prices[1].unit}`
                      )
                    ) : (
                      <span
                        className={cn("text-white font-semibold")}
                      >{`${String.fromCodePoint(0x274c)} Sellable`}</span>
                    )}
                  </span>
                </span>
              </div>
            ) : (
              <div className={cn("flex gap-3")}>
                <span
                  className={cn("text-white font-semibold")}
                >{`${String.fromCodePoint(0x274c)} Purchasable`}</span>
                <span
                  className={cn("text-white font-semibold")}
                >{`${String.fromCodePoint(0x274c)} Sellable`}</span>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <div
          className={cn(
            "h-48 w-full flex flex-col justify-between items-start"
          )}
        >
          {Object.keys(item).map((property) => {
            if (property === "type")
              return (
                <p
                  key={`${item.name} ${property}`}
                  className={cn("text-gray-200")}
                >
                  Type:&nbsp;
                  <span className={cn("font-semibold text-white")}>
                    {item.type}
                  </span>
                </p>
              );
            else if (property === "classification")
              return (
                <p
                  key={`${item.name} ${property}`}
                  className={cn("text-gray-200")}
                >
                  Classification:&nbsp;
                  <span className={cn("font-semibold text-white")}>
                    {item.classification}
                  </span>
                </p>
              );
            else if (property === "hasStats") {
              return (
                <p
                  key={`${item.name} ${property}`}
                  className={cn("font-semibold text-white")}
                >
                  {item[property] === true ? (
                    <span className={cn("text-green-500")}>Has</span>
                  ) : (
                    <span className={cn("text-red-400")}>Does not have</span>
                  )}
                  &nbsp;Stats
                </p>
              );
            } else if (property === "hasAbilities") {
              return (
                <p
                  key={`${item.name} ${property}`}
                  className={cn("font-semibold text-white")}
                >
                  {item[property] === true ? (
                    <span className={cn("text-green-500")}>Has</span>
                  ) : (
                    <span className={cn("text-red-400")}>Does not have</span>
                  )}
                  &nbsp;Abilities
                </p>
              );
            } else if (property === "isComponent") {
              return (
                <p
                  key={`${item.name} ${property}`}
                  className={cn("font-semibold text-white")}
                >
                  {item[property] === true ? (
                    <span className={cn("text-green-500")}>Is</span>
                  ) : (
                    <span className={cn("text-red-400")}>Is not</span>
                  )}
                  &nbsp;Component
                </p>
              );
            } else if (property === "hasComponents") {
              return (
                <p
                  key={`${item.name} ${property}`}
                  className={cn("font-semibold text-white")}
                >
                  {item[property] === true ? (
                    <span className={cn("text-green-500")}>Has</span>
                  ) : (
                    <span className={cn("text-red-400")}>Does not have</span>
                  )}
                  &nbsp;Components
                </p>
              );
            } else if (property === "hasRecipe") {
              return (
                <p
                  key={`${item.name} ${property}`}
                  className={cn("font-semibold text-white")}
                >
                  {item[property] === true ? (
                    <span className={cn("text-green-500")}>Has</span>
                  ) : (
                    <span className={cn("text-red-400")}>Does not have</span>
                  )}
                  &nbsp;Recipe
                </p>
              );
            }
          })}
        </div>
        <DialogFooter>
          <Link
            href="#"
            className={cn(
              "hover:bg-gray-500/60 rounded-lg p-2 transition-colors text-gray-200 hover:text-black"
            )}
          >
            Learn more about&nbsp;
            <span className={cn("font-semibold text-white")}>{item.name}</span>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ItemItem;
