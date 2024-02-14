import {
  pgTable,
  unique,
  pgEnum,
  serial,
  text,
  boolean,
  integer,
  primaryKey,
  numeric,
} from "drizzle-orm/pg-core";

export const keyStatus = pgEnum("key_status", [
  "default",
  "valid",
  "invalid",
  "expired",
]);
export const keyType = pgEnum("key_type", [
  "aead-ietf",
  "aead-det",
  "hmacsha512",
  "hmacsha256",
  "auth",
  "shorthash",
  "generichash",
  "kdf",
  "secretbox",
  "secretstream",
  "stream_xchacha20",
]);
export const factorType = pgEnum("factor_type", ["totp", "webauthn"]);
export const factorStatus = pgEnum("factor_status", ["unverified", "verified"]);
export const aalLevel = pgEnum("aal_level", ["aal1", "aal2", "aal3"]);
export const codeChallengeMethod = pgEnum("code_challenge_method", [
  "s256",
  "plain",
]);
export const heroAttackType = pgEnum("hero_attack_type", ["Melee", "Ranged"]);
export const heroComplexity = pgEnum("hero_complexity", [
  "Simple",
  "Moderate",
  "Complex",
]);
export const heroPrimaryAttribute = pgEnum("hero_primary_attribute", [
  "Strength",
  "Agility",
  "Intelligence",
  "Universal",
]);
export const heroAbilityUpgradeType = pgEnum("hero_ability_upgrade_type", [
  "Shard Upgrade",
  "Scepter Upgrade",
]);
export const heroMetaInfoRank = pgEnum("hero_meta_info_rank", [
  "Herald / Guardian / Crusader",
  "Archon",
  "Legend",
  "Ancient",
  "Divine / Immortal",
]);
export const heroMetaInfoType = pgEnum("hero_meta_info_type", [
  "Pick Percentage",
  "Win Percentage",
]);
export const heroRoleType = pgEnum("hero_role_type", [
  "Carry",
  "Support",
  "Nuker",
  "Disabler",
  "Durable",
  "Escape",
  "Pusher",
  "Initiator",
]);
export const heroTalentLevel = pgEnum("hero_talent_level", [
  "Novice",
  "Intermediate",
  "Advanced",
  "Expert",
]);
export const itemClassification = pgEnum("item_classification", [
  "Consumables",
  "Attributes",
  "Equipment",
  "Miscellaneous",
  "Secret",
  "Accessories",
  "Support",
  "Magical",
  "Armor",
  "Weapons",
  "Artifacts",
  "Tier 1",
  "Tier 2",
  "Tier 3",
  "Tier 4",
  "Tier 5",
]);
export const itemType = pgEnum("item_type", ["Basic", "Upgrade", "Neutral"]);
export const itemMetaInfoType = pgEnum("item_meta_info_type", [
  "Use Percentage",
  "Win Percentage",
]);
export const itemPriceType = pgEnum("item_price_type", [
  "Purchase Price",
  "Sell Price",
]);

export const hero = pgTable(
  "hero",
  {
    id: serial("id").notNull(),
    name: text("name").primaryKey().notNull(),
    alias: text("alias"),
    biography: text("biography").notNull(),
    identity: text("identity").notNull(),
    description: text("description").notNull(),
    complexity: heroComplexity("complexity").notNull(),
    attackType: heroAttackType("attack_type").notNull(),
    primaryAttribute: heroPrimaryAttribute("primary_attribute").notNull(),
    primaryImageKey: text("primary_image_key"),
    secondaryImageKey: text("secondary_image_key"),
  },
  (table) => {
    return {
      heroIdUnique: unique("hero_id_unique").on(table.id),
      heroAliasUnique: unique("hero_alias_unique").on(table.alias),
      heroPrimaryImageKeyUnique: unique("hero_primary_image_key_unique").on(
        table.primaryImageKey
      ),
      heroSecondaryImageKeyUnique: unique("hero_secondary_image_key_unique").on(
        table.secondaryImageKey
      ),
    };
  }
);

export const item = pgTable(
  "item",
  {
    id: serial("id").notNull(),
    name: text("name").primaryKey().notNull(),
    lore: text("lore"),
    type: itemType("type").notNull(),
    classification: itemClassification("classification").notNull(),
    hasStats: boolean("has_stats").notNull(),
    hasAbilities: boolean("has_abilities").notNull(),
    hasPrices: boolean("has_prices").notNull(),
    hasComponents: boolean("has_components").notNull(),
    imageKey: text("image_key"),
  },
  (table) => {
    return {
      itemIdUnique: unique("item_id_unique").on(table.id),
      itemImageKeyUnique: unique("item_image_key_unique").on(table.imageKey),
    };
  }
);

export const itemMetaInfo = pgTable(
  "item_meta_info",
  {
    id: serial("id").notNull(),
    itemId: integer("item_id")
      .primaryKey()
      .notNull()
      .references(() => item.id),
    uses: text("uses").notNull(),
  },
  (table) => {
    return {
      itemMetaInfoIdUnique: unique("item_meta_info_id_unique").on(table.id),
    };
  }
);

export const heroRole = pgTable(
  "hero_role",
  {
    id: serial("id").notNull(),
    heroId: integer("hero_id")
      .notNull()
      .references(() => hero.id),
    type: heroRoleType("type").notNull(),
  },
  (table) => {
    return {
      heroRoleHeroIdTypePk: primaryKey({
        columns: [table.heroId, table.type],
        name: "hero_role_hero_id_type_pk",
      }),
      heroRoleIdUnique: unique("hero_role_id_unique").on(table.id),
    };
  }
);

export const itemStat = pgTable(
  "item_stat",
  {
    id: serial("id").notNull(),
    itemId: integer("item_id")
      .notNull()
      .references(() => item.id),
    effect: text("effect").notNull(),
  },
  (table) => {
    return {
      itemStatItemIdEffectPk: primaryKey({
        columns: [table.itemId, table.effect],
        name: "item_stat_item_id_effect_pk",
      }),
      itemStatIdUnique: unique("item_stat_id_unique").on(table.id),
    };
  }
);

export const heroAbilityUpgrade = pgTable(
  "hero_ability_upgrade",
  {
    id: serial("id").notNull(),
    abilityId: integer("ability_id")
      .notNull()
      .references(() => heroAbility.id),
    type: heroAbilityUpgradeType("type").notNull(),
    description: text("description").notNull(),
  },
  (table) => {
    return {
      heroAbilityUpgradeAbilityIdTypePk: primaryKey({
        columns: [table.abilityId, table.type],
        name: "hero_ability_upgrade_ability_id_type_pk",
      }),
      heroAbilityUpgradeIdUnique: unique("hero_ability_upgrade_id_unique").on(
        table.id
      ),
    };
  }
);

export const itemMetaInfoPercentage = pgTable(
  "item_meta_info_percentage",
  {
    id: serial("id").notNull(),
    itemMetaInfoId: integer("item_meta_info_id")
      .notNull()
      .references(() => itemMetaInfo.id),
    type: itemMetaInfoType("type").notNull(),
    percentage: numeric("percentage", { precision: 4, scale: 2 }),
  },
  (table) => {
    return {
      itemMetaInfoPercentageItemMetaInfoIdTypePk: primaryKey({
        columns: [table.itemMetaInfoId, table.type],
        name: "item_meta_info_percentage_item_meta_info_id_type_pk",
      }),
      itemMetaInfoPercentageIdUnique: unique(
        "item_meta_info_percentage_id_unique"
      ).on(table.id),
    };
  }
);

export const itemPrice = pgTable(
  "item_price",
  {
    id: serial("id").notNull(),
    itemId: integer("item_id")
      .notNull()
      .references(() => item.id),
    type: itemPriceType("type").notNull(),
    amount: text("amount").notNull(),
  },
  (table) => {
    return {
      itemPriceItemIdTypePk: primaryKey({
        columns: [table.itemId, table.type],
        name: "item_price_item_id_type_pk",
      }),
      itemPriceIdUnique: unique("item_price_id_unique").on(table.id),
    };
  }
);

export const heroMetaInfo = pgTable(
  "hero_meta_info",
  {
    id: serial("id").notNull(),
    heroId: integer("hero_id")
      .notNull()
      .references(() => hero.id),
    rank: heroMetaInfoRank("rank").notNull(),
    type: heroMetaInfoType("type").notNull(),
    percentage: numeric("percentage", { precision: 4, scale: 2 }).notNull(),
  },
  (table) => {
    return {
      heroMetaInfoHeroIdRankTypePk: primaryKey({
        columns: [table.heroId, table.rank, table.type],
        name: "hero_meta_info_hero_id_rank_type_pk",
      }),
      heroMetaInfoIdUnique: unique("hero_meta_info_id_unique").on(table.id),
    };
  }
);

export const heroTalent = pgTable(
  "hero_talent",
  {
    id: serial("id").notNull(),
    heroId: integer("hero_id")
      .notNull()
      .references(() => hero.id),
    level: heroTalentLevel("level").notNull(),
    type: text("type").notNull(),
    effect: text("effect").notNull(),
  },
  (table) => {
    return {
      heroTalentHeroIdLevelTypePk: primaryKey({
        columns: [table.heroId, table.level, table.type],
        name: "hero_talent_hero_id_level_type_pk",
      }),
      heroTalentIdUnique: unique("hero_talent_id_unique").on(table.id),
    };
  }
);

export const itemComponent = pgTable(
  "item_component",
  {
    id: serial("id").notNull(),
    itemId: integer("item_id")
      .notNull()
      .references(() => item.id),
    name: text("name").notNull(),
    amount: text("amount").notNull(),
    price: text("price").notNull(),
  },
  (table) => {
    return {
      itemComponentItemIdNamePk: primaryKey({
        columns: [table.itemId, table.name],
        name: "item_component_item_id_name_pk",
      }),
      itemComponentIdUnique: unique("item_component_id_unique").on(table.id),
    };
  }
);

export const itemAbility = pgTable(
  "item_ability",
  {
    id: serial("id").notNull(),
    itemId: integer("item_id")
      .notNull()
      .references(() => item.id),
    name: text("name").notNull(),
    description: text("description").notNull(),
    abilityType: text("ability_type").notNull(),
    affectedTarget: text("affected_target"),
    damageType: text("damage_type"),
  },
  (table) => {
    return {
      itemAbilityItemIdNamePk: primaryKey({
        columns: [table.itemId, table.name],
        name: "item_ability_item_id_name_pk",
      }),
      itemAbilityIdUnique: unique("item_ability_id_unique").on(table.id),
    };
  }
);

export const heroAbility = pgTable(
  "hero_ability",
  {
    id: serial("id").notNull(),
    heroId: integer("hero_id")
      .notNull()
      .references(() => hero.id),
    name: text("name").notNull(),
    lore: text("lore"),
    description: text("description").notNull(),
    abilityType: text("ability_type").notNull(),
    affectedTarget: text("affected_target"),
    damageType: text("damage_type"),
    hasShardUpgrade: boolean("has_shard_upgrade").notNull(),
    hasScepterUpgrade: boolean("has_scepter_upgrade").notNull(),
    imageKey: text("image_key"),
  },
  (table) => {
    return {
      heroAbilityHeroIdNamePk: primaryKey({
        columns: [table.heroId, table.name],
        name: "hero_ability_hero_id_name_pk",
      }),
      heroAbilityIdUnique: unique("hero_ability_id_unique").on(table.id),
      heroAbilityImageKeyUnique: unique("hero_ability_image_key_unique").on(
        table.imageKey
      ),
    };
  }
);
