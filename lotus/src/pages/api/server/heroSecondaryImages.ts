import { z } from "zod";
import { asc } from "drizzle-orm";
import type { APIRoute } from "astro";
import { db } from "../../../db/db";
import { hero } from "../../../../drizzle/schema";

const HeroCard = z
  .object({
    alias: z.string(),
    complexity: z.string(),
    attackType: z.string(),
    primaryAttribute: z.string(),
    secondaryImageKey: z.string(),
  })
  .required();

type HeroCardType = z.infer<typeof HeroCard>;

const GET: APIRoute = async ({ params, request }) => {
  const heroes = await db
    .select({
      alias: hero.alias,
      attackType: hero.attackType,
      complexity: hero.complexity,
      primaryAttribute: hero.primaryAttribute,
      secondaryImageKey: hero.secondaryImageKey,
    })
    .from(hero)
    .orderBy(asc(hero.alias));

  const response = heroes.filter((hero) => HeroCard.safeParse(hero).success);

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export { GET, type HeroCardType };
