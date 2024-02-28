import { asc, eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/lib/db";
import { hero, heroRole } from "@/../drizzle/schema";
import { HeroCard, type HeroCardType } from "@/lib/zod";

const GET = async (request: NextRequest) => {
  const heroEntries = await db
    .select({
      alias: hero.alias,
      primaryAttribute: hero.primaryAttribute,
      attackType: hero.attackType,
      roleType: heroRole.type,
      complexity: hero.complexity,
      primaryImageKey: hero.primaryImageKey,
    })
    .from(hero)
    .innerJoin(heroRole, eq(hero.id, heroRole.heroId))
    .orderBy(asc(hero.alias), asc(heroRole.type));

  const heroes: Record<string, any> = {};

  heroEntries.forEach((hero) => {
    if (heroes[hero.alias!] === undefined) {
      heroes[hero.alias!] = {
        alias: hero.alias,
        primaryAttribute: hero.primaryAttribute,
        attackType: hero.attackType,
        roles: [hero.roleType],
        complexity: hero.complexity,
        primaryImageKey: hero.primaryImageKey,
      };
    } else {
      heroes[hero.alias!].roles.push(hero.roleType);
    }
  });

  const data: HeroCardType[] = [];

  for (const hero in heroes) {
    if (HeroCard.safeParse(heroes[hero]).success) {
      data.push(heroes[hero] as HeroCardType);
    }
  }

  return NextResponse.json({ data });
};

export { GET };
