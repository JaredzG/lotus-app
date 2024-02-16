import { z } from "zod";
import { type SQL, asc, eq } from "drizzle-orm";
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
import type { PgColumn, PgSelect, PgSelectDynamic } from "drizzle-orm/pg-core";

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

const addJoin = <T extends PgSelect>(
  columns: string[],
  qb: T
): T | PgSelectDynamic<any> => {
  if (columns.includes("role")) {
    return qb.innerJoin(heroRole, eq(hero.id, heroRole.heroId)).$dynamic();
  }

  return qb;
};

const orderingColumns: Record<string, SQL<unknown>> = {
  alias: asc(hero.alias),
  primaryAttribute: asc(hero.primaryAttribute),
  attackType: asc(hero.attackType),
  role: asc(heroRole.type),
  complexity: asc(hero.complexity),
};

const filteringColumns: Record<string, PgColumn> = {
  alias: hero.alias,
  primaryAttribute: hero.primaryAttribute,
  attackType: hero.attackType,
  role: heroRole.type,
  complexity: hero.complexity,
  secondaryImageKey: hero.secondaryImageKey,
};

const getQueryParams = (ordering: string[], filtering: string[]): any => {
  const targetOrderingColumns: Array<SQL<unknown>> = [];
  const targetFilteringColumns: Record<string, PgColumn> = {};

  for (const column of ordering) {
    targetOrderingColumns.push(orderingColumns[column]);
  }

  for (const column of filtering) {
    targetFilteringColumns[column] = filteringColumns[column];
  }

  return [targetOrderingColumns, targetFilteringColumns];
};

const GET: APIRoute = async ({ params, request }) => {
  const selectedColumns = [
    "alias",
    "primaryAttribute",
    "attackType",
    "role",
    "complexity",
    "secondaryImageKey",
  ];

  const queryParams = getQueryParams(["alias"], selectedColumns);
  const qb = db.select(queryParams[1]).from(hero).$dynamic();
  const updatedQb = addJoin(selectedColumns.slice(0, -1), qb);
  const finalQb = updatedQb.orderBy(...queryParams[0]);
  const rows = await finalQb;

  const heroes: Record<string, any> = {};

  rows.forEach((row: any) => {
    if (heroes[row.alias!] === undefined) {
      heroes[row.alias!] = {
        alias: row.alias,
        complexity: row.complexity,
        attackType: row.attackType,
        primaryAttribute: row.primaryAttribute,
        secondaryImageKey: row.secondaryImageKey,
        roles: [row.role],
      };
    } else {
      heroes[row.alias!].roles.push(row.role);
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
