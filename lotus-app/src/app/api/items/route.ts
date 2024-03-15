import { asc, eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/lib/db";
import { item, itemPrice } from "@/../drizzle/schema";
import { Item, type ItemType } from "@/lib/zod";
import { itemType, itemClassification } from "@/../drizzle/schema";

const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const itemEntries = await db
    .select({
      name: item.name,
      type: item.type,
      classification: item.classification,
      priceType: itemPrice.type,
      priceAmount: itemPrice.amount,
      priceUnit: itemPrice.unit,
      hasStats: item.hasStats,
      hasAbilities: item.hasAbilities,
      hasPrices: item.hasPrices,
      isComponent: item.isComponent,
      hasComponents: item.hasComponents,
      hasRecipe: item.hasRecipe,
      imageKey: item.imageKey,
    })
    .from(item)
    .leftJoin(itemPrice, eq(item.id, itemPrice.itemId))
    .orderBy(asc(item.name), asc(itemPrice.type), asc(itemPrice.amount));

  const items: Record<string, any> = {};

  for (const item of itemEntries) {
    if (items[item.name!] === undefined) {
      items[item.name!] = {
        name: item.name,
        type: item.type,
        classification: item.classification,
        prices: item.priceType
          ? [
              {
                type: item.priceType,
                amount: item.priceAmount,
                unit: item.priceUnit,
              },
            ]
          : null,
        hasStats: item.hasStats,
        hasAbilities: item.hasAbilities,
        hasPrices: item.hasPrices,
        isComponent: item.isComponent,
        hasComponents: item.hasComponents,
        hasRecipe: item.hasRecipe,
        imageKey: item.imageKey,
      };
    } else {
      if (item.priceType !== null)
        items[item.name!].prices.push({
          type: item.priceType,
          amount: item.priceAmount,
          unit: item.priceUnit,
        });
    }
  }

  const validItems: ItemType[] = [];

  for (const item in items) {
    if (Item.safeParse(items[item]).success) {
      validItems.push(items[item] as ItemType);
    } else {
      console.log(items[item]);
    }
  }

  const data: Record<string, Array<ItemType>> = {};

  switch (searchParams.get("order")) {
    case "Type":
      for (const value of itemType.enumValues) {
        data[value] = validItems.filter(
          (item: ItemType) => item.type === value
        );
      }
      break;
    case "Classification":
      for (const value of itemClassification.enumValues) {
        data[value] = validItems.filter(
          (item: ItemType) => item.classification === value
        );
      }
      break;
    case "Increasing Purchase Price":
      data["Items"] = validItems.sort((itemA, itemB) => {
        const itemAPrices = itemA.prices;
        const itemBPrices = itemB.prices;
        if (itemAPrices === null)
          if (itemBPrices === null)
            return (itemA.name as any) - (itemB.name as any);
          else return -1;
        else if (itemBPrices === null) return 1;
        else
          return (
            parseInt(itemAPrices[0].amount!) - parseInt(itemBPrices[0].amount!)
          );
      });
      break;
    case "Decreasing Purchase Price":
      data["Items"] = validItems.sort((itemA, itemB) => {
        const itemAPrices = itemA.prices;
        const itemBPrices = itemB.prices;
        if (itemBPrices === null)
          if (itemAPrices === null)
            return (itemB.name as any) - (itemA.name as any);
          else return -1;
        else if (itemAPrices === null) return 1;
        else
          return (
            parseInt(itemBPrices[0].amount!) - parseInt(itemAPrices[0].amount!)
          );
      });
      break;
    case "Increasing Sell Value":
      data["Items"] = validItems.sort((itemA, itemB) => {
        const itemAPrices = itemA.prices;
        const itemBPrices = itemB.prices;
        if (itemAPrices === null)
          if (itemBPrices === null)
            return (itemA.name as any) - (itemB.name as any);
          else return -1;
        else if (itemBPrices === null) return 1;
        else {
          if (itemAPrices[1].amount === null)
            if (itemBPrices[1].amount === null)
              return (itemA.name as any) - (itemB.name as any);
            else return -1;
          else if (itemBPrices[1].amount === null) return 1;
          else
            return (
              parseFloat(itemAPrices[1].amount) -
              parseFloat(itemBPrices[1].amount)
            );
        }
      });
      break;
    case "Decreasing Sell Value":
      data["Items"] = validItems.sort((itemA, itemB) => {
        const itemAPrices = itemA.prices;
        const itemBPrices = itemB.prices;
        if (itemBPrices === null)
          if (itemAPrices === null)
            return (itemB.name as any) - (itemA.name as any);
          else return -1;
        else if (itemAPrices === null) return 1;
        else {
          if (itemBPrices[1].amount === null)
            if (itemAPrices[1].amount === null)
              return (itemB.name as any) - (itemA.name as any);
            else return -1;
          else if (itemAPrices[1].amount === null) return 1;
          else
            return (
              parseFloat(itemBPrices[1].amount) -
              parseFloat(itemAPrices[1].amount)
            );
        }
      });
      break;
    default:
      data["Items"] = validItems;
  }

  return NextResponse.json(data);
};

export { GET };
