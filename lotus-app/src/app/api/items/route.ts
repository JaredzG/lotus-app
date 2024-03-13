import { asc, eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/lib/db";
import { item } from "@/../drizzle/schema";
import { Item, type ItemType } from "@/lib/zod";
import { itemType, itemClassification } from "@/../drizzle/schema";

const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const itemEntries = await db
    .select({
      name: item.name,
      type: item.type,
      classification: item.classification,
      hasStats: item.hasStats,
      hasAbilities: item.hasAbilities,
      hasPrices: item.hasPrices,
      isComponent: item.isComponent,
      hasComponents: item.hasComponents,
      hasRecipe: item.hasRecipe,
      imageKey: item.imageKey,
    })
    .from(item)
    .orderBy(asc(item.name));

  const validItems: ItemType[] = [];

  for (const item of itemEntries) {
    if (Item.safeParse(item).success) {
      validItems.push(item as ItemType);
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
    default:
      data["Items"] = validItems;
  }

  return NextResponse.json(data);
};

export { GET };
