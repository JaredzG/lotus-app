import { z } from "zod";
import { asc, eq } from "drizzle-orm";
import type { APIRoute } from "astro";
import { db } from "../../../db/db";
import {
  hero,
  heroAttackType,
  heroComplexity,
  heroPrimaryAttribute,
  heroRole,
  heroRoleType,
} from "../../../../drizzle/schema";

const HeroCard = z
  .object({
    alias: z.string(),
    primaryAttribute: z.enum(heroPrimaryAttribute.enumValues),
    attackType: z.enum(heroAttackType.enumValues),
    roles: z.array(z.enum(heroRoleType.enumValues)),
    complexity: z.enum(heroComplexity.enumValues),
    secondaryImageKey: z.string(),
  })
  .required();

type HeroCardType = z.infer<typeof HeroCard>;

const GET: APIRoute = async ({ params, request }) => {
  const rows = await db
    .select({
      alias: hero.alias,
      primaryAttribute: hero.primaryAttribute,
      attackType: hero.attackType,
      roleType: heroRole.type,
      complexity: hero.complexity,
      secondaryImageKey: hero.secondaryImageKey,
    })
    .from(hero)
    .innerJoin(heroRole, eq(hero.id, heroRole.heroId))
    .orderBy(asc(hero.alias));

  const heroes: Record<string, any> = {};

  rows.forEach((row) => {
    if (heroes[row.alias!] === undefined) {
      heroes[row.alias!] = {
        alias: row.alias,
        complexity: row.complexity,
        attackType: row.attackType,
        primaryAttribute: row.primaryAttribute,
        secondaryImageKey: row.secondaryImageKey,
        roles: [row.roleType],
      };
    } else {
      heroes[row.alias!].roles.push(row.roleType);
    }
  });

  const response: HeroCardType[] = [];

  for (const hero in heroes) {
    if (HeroCard.safeParse(heroes[hero]).success) {
      response.push(heroes[hero] as HeroCardType);
    }
  }

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export { GET, type HeroCardType };
