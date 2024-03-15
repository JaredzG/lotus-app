import { z } from "zod";

import {
  heroAttackType,
  heroComplexity,
  heroPrimaryAttribute,
  heroRoleType,
  itemType,
  itemClassification,
} from "@/../drizzle/schema";

export const Hero = z
  .object({
    alias: z.string(),
    name: z.string(),
    primaryAttribute: z.enum(heroPrimaryAttribute.enumValues),
    attackType: z.enum(heroAttackType.enumValues),
    roles: z.array(z.enum(heroRoleType.enumValues)),
    complexity: z.enum(heroComplexity.enumValues),
    primaryImageKey: z.string(),
  })
  .required();

export type HeroType = z.infer<typeof Hero>;

export const HeroFilter = z.object({
  category: z.enum(["primaryAttribute", "attackType", "roles", "complexity"]),
  criteria: z.enum([
    ...heroPrimaryAttribute.enumValues,
    ...heroAttackType.enumValues,
    ...heroRoleType.enumValues,
    ...heroComplexity.enumValues,
  ]),
});

export type HeroFilterType = z.infer<typeof HeroFilter>;

export const Item = z
  .object({
    name: z.string(),
    type: z.enum(itemType.enumValues),
    classification: z.enum(itemClassification.enumValues),
    prices: z
      .array(
        z.object({
          type: z.string().nullable(),
          amount: z.string().nullable(),
          unit: z.string().nullable(),
        })
      )
      .nullable(),
    hasStats: z.boolean(),
    hasAbilities: z.boolean(),
    hasPrices: z.boolean(),
    isComponent: z.boolean(),
    hasComponents: z.boolean(),
    hasRecipe: z.boolean(),
    imageKey: z.string(),
  })
  .required();

export type ItemType = z.infer<typeof Item>;

export const ItemFilter = z.object({
  category: z.enum([
    "type",
    "classification",
    "hasStats",
    "hasAbilities",
    "hasPrices",
    "isComponent",
    "hasComponents",
    "hasRecipe",
  ]),
  criteria: z.enum([
    ...itemType.enumValues,
    ...itemClassification.enumValues,
    "Has Stats",
    "Has Abilities",
    "Has Prices",
    "Is Component",
    "Has Components",
    "Has Recipe",
  ]),
});

export type ItemFilterType = z.infer<typeof ItemFilter>;
