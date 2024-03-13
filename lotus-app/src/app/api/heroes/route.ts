import { asc, eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/lib/db";
import { hero, heroRole } from "@/../drizzle/schema";
import { Hero, type HeroType } from "@/lib/zod";
import {
  heroPrimaryAttribute,
  heroAttackType,
  heroRoleType,
  heroComplexity,
} from "@/../drizzle/schema";

const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const heroEntries = await db
    .select({
      alias: hero.alias,
      name: hero.name,
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

  for (const hero of heroEntries) {
    if (heroes[hero.alias!] === undefined) {
      heroes[hero.alias!] = {
        alias: hero.alias,
        name: hero.name,
        primaryAttribute: hero.primaryAttribute,
        attackType: hero.attackType,
        roles: [hero.roleType],
        complexity: hero.complexity,
        primaryImageKey: hero.primaryImageKey,
      };
    } else {
      heroes[hero.alias!].roles.push(hero.roleType);
    }
  }

  const validHeroes: HeroType[] = [];

  for (const hero in heroes) {
    if (Hero.safeParse(heroes[hero]).success) {
      validHeroes.push(heroes[hero] as HeroType);
    }
  }

  const data: Record<string, Array<HeroType>> = {};

  switch (searchParams.get("order")) {
    case "Primary Attribute":
      for (const value of heroPrimaryAttribute.enumValues) {
        data[value] = validHeroes.filter(
          (hero: HeroType) => hero.primaryAttribute === value
        );
      }
      break;
    case "Attack Type":
      for (const value of heroAttackType.enumValues) {
        data[value] = validHeroes.filter(
          (hero: HeroType) => hero.attackType === value
        );
      }
      break;
    case "Role":
      for (const value of heroRoleType.enumValues) {
        data[value] = validHeroes.filter((hero: HeroType) =>
          hero.roles.includes(value)
        );
      }
      break;
    case "Complexity":
      for (const value of heroComplexity.enumValues) {
        data[value] = validHeroes.filter(
          (hero: HeroType) => hero.complexity === value
        );
      }
      break;
    default:
      data["Heroes"] = validHeroes;
  }

  return NextResponse.json(data);
};

export { GET };
