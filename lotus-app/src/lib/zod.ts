import { z } from "zod";

import {
  heroAttackType,
  heroComplexity,
  heroPrimaryAttribute,
  heroRoleType,
} from "@/../drizzle/schema";

export const HeroCard = z
  .object({
    alias: z.string(),
    primaryAttribute: z.enum(heroPrimaryAttribute.enumValues),
    attackType: z.enum(heroAttackType.enumValues),
    roles: z.array(z.enum(heroRoleType.enumValues)),
    complexity: z.enum(heroComplexity.enumValues),
    primaryImageKey: z.string(),
  })
  .required();

export type HeroCardType = z.infer<typeof HeroCard>;
