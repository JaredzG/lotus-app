import { asc, eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/lib/db";
import { hero, heroRole } from "@/../drizzle/schema";
import { Hero, type HeroType } from "@/lib/zod";

const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
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

  const validHeroes: HeroType[] = [];

  for (const hero in heroes) {
    if (Hero.safeParse(heroes[hero]).success) {
      validHeroes.push(heroes[hero] as HeroType);
    }
  }

  const data: Record<string, Array<HeroType>> = {};

  switch (searchParams.get("order")) {
    case "Primary Attribute":
      data["Strength"] = validHeroes.filter(
        (hero: HeroType) => hero.primaryAttribute === "Strength"
      );
      data["Agility"] = validHeroes.filter(
        (hero: HeroType) => hero.primaryAttribute === "Agility"
      );
      data["Intelligence"] = validHeroes.filter(
        (hero: HeroType) => hero.primaryAttribute === "Intelligence"
      );
      data["Universal"] = validHeroes.filter(
        (hero: HeroType) => hero.primaryAttribute === "Universal"
      );
      break;
    case "Attack Type":
      data["Melee"] = validHeroes.filter(
        (hero: HeroType) => hero.attackType === "Melee"
      );
      data["Ranged"] = validHeroes.filter(
        (hero: HeroType) => hero.attackType === "Ranged"
      );
      break;
    case "Role":
      data["Carry"] = validHeroes.filter((hero: HeroType) =>
        hero.roles.includes("Carry")
      );
      data["Support"] = validHeroes.filter((hero: HeroType) =>
        hero.roles.includes("Support")
      );
      data["Nuker"] = validHeroes.filter((hero: HeroType) =>
        hero.roles.includes("Nuker")
      );
      data["Disabler"] = validHeroes.filter((hero: HeroType) =>
        hero.roles.includes("Disabler")
      );
      data["Durable"] = validHeroes.filter((hero: HeroType) =>
        hero.roles.includes("Durable")
      );
      data["Escape"] = validHeroes.filter((hero: HeroType) =>
        hero.roles.includes("Escape")
      );
      data["Pusher"] = validHeroes.filter((hero: HeroType) =>
        hero.roles.includes("Pusher")
      );
      data["Initiator"] = validHeroes.filter((hero: HeroType) =>
        hero.roles.includes("Initiator")
      );
      break;
    case "Complexity":
      data["Simple"] = validHeroes.filter(
        (hero: HeroType) => hero.complexity === "Simple"
      );
      data["Moderate"] = validHeroes.filter(
        (hero: HeroType) => hero.complexity === "Moderate"
      );
      data["Complex"] = validHeroes.filter(
        (hero: HeroType) => hero.complexity === "Complex"
      );
      break;
    default:
      data["Heroes"] = validHeroes;
  }

  return NextResponse.json(data);
};

export { GET };
