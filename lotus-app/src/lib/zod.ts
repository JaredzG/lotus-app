import { z } from "zod";

import {
  heroAttackType,
  heroComplexity,
  heroPrimaryAttribute,
  heroRoleType,
} from "@/../drizzle/schema";

export const Hero = z
  .object({
    alias: z.string(),
    primaryAttribute: z.enum(heroPrimaryAttribute.enumValues),
    attackType: z.enum(heroAttackType.enumValues),
    roles: z.array(z.enum(heroRoleType.enumValues)),
    complexity: z.enum(heroComplexity.enumValues),
    primaryImageKey: z.string(),
  })
  .required();

export type HeroType = z.infer<typeof Hero>;

export const Filter = z.object({
  category: z.enum(["primaryAttribute", "attackType", "roles", "complexity"]),
  criteria: z.enum([
    ...heroPrimaryAttribute.enumValues,
    ...heroAttackType.enumValues,
    ...heroRoleType.enumValues,
    ...heroComplexity.enumValues,
  ]),
});

export type FilterType = z.infer<typeof Filter>;
