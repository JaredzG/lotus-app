import { z } from "zod";
import { type SQL, asc, eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/lib/db";
import {
  hero,
  heroAttackType,
  heroComplexity,
  heroPrimaryAttribute,
  heroRole,
  heroRoleType,
} from "@/../drizzle/schema";
import type { PgColumn, PgSelect, PgSelectDynamic } from "drizzle-orm/pg-core";

const GET = async (request: NextRequest) => {
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

  const orderingParams = ["alias"];
  const filteringParams = [
    "alias",
    "primaryAttribute",
    "attackType",
    "role",
    "complexity",
    "secondaryImageKey",
  ];

  const queryParams = getQueryParams(orderingParams, filteringParams);
  const initialQb = db.select(queryParams[1]).from(hero).$dynamic();
  const updatedQb = addJoin(filteringParams.slice(0, -1), initialQb);
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
        roles: [row.role],
        secondaryImageKey: row.secondaryImageKey,
      };
    } else {
      heroes[row.alias!].roles.push(row.role);
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
