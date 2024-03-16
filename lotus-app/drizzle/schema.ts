import {
  pgTable,
  unique,
  pgEnum,
  serial,
  text,
  boolean,
  foreignKey,
  integer,
  primaryKey,
  numeric,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

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
export const heroAbilityFeatureType = pgEnum("hero_ability_feature_type", [
  "Ability Type",
  "Affected Target",
  "Damage Type",
]);
export const heroAbilityFeatureValue = pgEnum("hero_ability_feature_value", [
  "Active Attack Modifier",
  "Allied Heroes",
  "Allies",
  "Astral Spirit",
  "Aura",
  "Autocast",
  "Boar",
  "Channeled",
  "Enemies",
  "Enemy Heroes",
  "Enemy Units",
  "Familiars",
  "HP Removal",
  "Heroes",
  "Instant Attack",
  "Instant Kill",
  "Magical",
  "No Target",
  "Passive",
  "Physical",
  "Proximity Mine",
  "Pure",
  "Self",
  "Source Type",
  "Target Area",
  "Target Point",
  "Target Unit",
  "The Self",
  "Toggle",
  "Trees",
  "Units",
  "Vector Targeting",
  "Wolves",
]);
export const heroAbilityUpgradeType = pgEnum("hero_ability_upgrade_type", [
  "Shard",
  "Scepter",
]);
export const heroMetaInfoPercentageType = pgEnum(
  "hero_meta_info_percentage_type",
  ["Pick Rate", "Win Rate"]
);
export const heroMetaInfoRank = pgEnum("hero_meta_info_rank", [
  "Herald | Guardian | Crusader",
  "Archon",
  "Legend",
  "Ancient",
  "Divine | Immortal",
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
export const heroTalentType = pgEnum("hero_talent_type", ["X", "Y"]);
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
export const itemAbilityFeatureType = pgEnum("item_ability_feature_type", [
  "Ability Type",
  "Affected Target",
  "Damage Type",
]);
export const itemAbilityFeatureValue = pgEnum("item_ability_feature_value", [
  "Allied Heroes",
  "Allies",
  "Aura",
  "Channeled",
  "Enemies",
  "Enemy Heroes",
  "Enemy Units",
  "Heroes",
  "Hidden",
  "Instant Attack",
  "Instant Kill",
  "Magical",
  "No Target",
  "Passive",
  "Physical",
  "Self",
  "Source Type",
  "Target Area",
  "Target Point",
  "Target Unit",
  "Toggle",
  "Trees",
  "Units",
]);
export const itemComponentLevel = pgEnum("item_component_level", [
  "Buildup",
  "Base",
]);
export const itemComponentPriceUnit = pgEnum("item_component_price_unit", [
  "Gold",
  "Gold per Count",
]);
export const itemMetaInfoPercentageType = pgEnum(
  "item_meta_info_percentage_type",
  ["Usage Rate", "Win Rate"]
);
export const itemPriceType = pgEnum("item_price_type", ["Purchase", "Refund"]);
export const itemPriceUnit = pgEnum("item_price_unit", [
  "Gold",
  "Gold per Count",
]);
export const itemStatEffect = pgEnum("item_stat_effect", [
  "Increase",
  "Decrease",
]);
export const itemStatProperty = pgEnum("item_stat_property", [
  "Agility",
  "All Attributes",
  "AoE Radius",
  "Armor",
  "Attack Damage",
  "Attack Range",
  "Attack Speed",
  "Base Attack Speed",
  "Cast Range",
  "Debuff Duration Amp",
  "Evasion",
  "Gold per Minute",
  "Heal Amp",
  "Health",
  "Health Regen Amp",
  "Health Regeneration",
  "Intelligence",
  "Lifesteal",
  "Lifesteal Amp",
  "Magic Resistance",
  "Main Attribute",
  "Mana",
  "Mana Loss Reduction",
  "Mana Regen Amp",
  "Mana Regeneration",
  "Max HP Health Regen",
  "Move Speed",
  "Night Vision",
  "Other Attributes",
  "Projectile Speed",
  "Slow Resistance",
  "Spell Damage Amp",
  "Spell Lifesteal",
  "Spell Lifesteal Amp",
  "Status Resistance",
  "Strength",
  "Vision",
]);
export const itemStatVariant = pgEnum("item_stat_variant", [
  "Default",
  "Melee",
  "Ranged",
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
    isComponent: boolean("is_component").notNull(),
    hasComponents: boolean("has_components").notNull(),
    hasRecipe: boolean("has_recipe").notNull(),
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
    uses: integer("uses").notNull(),
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

export const heroAbilityFeature = pgTable(
  "hero_ability_feature",
  {
    id: serial("id").notNull(),
    heroAbilityId: integer("hero_ability_id")
      .notNull()
      .references(() => heroAbility.id),
    type: heroAbilityFeatureType("type").notNull(),
    value: heroAbilityFeatureValue("value"),
  },
  (table) => {
    return {
      heroAbilityFeatureHeroAbilityIdTypePk: primaryKey({
        columns: [table.heroAbilityId, table.type],
        name: "hero_ability_feature_hero_ability_id_type_pk",
      }),
      heroAbilityFeatureIdUnique: unique("hero_ability_feature_id_unique").on(
        table.id
      ),
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

export const itemAbility = pgTable(
  "item_ability",
  {
    id: serial("id").notNull(),
    itemId: integer("item_id")
      .notNull()
      .references(() => item.id),
    name: text("name").notNull(),
    description: text("description").notNull(),
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

export const itemAbilityFeature = pgTable(
  "item_ability_feature",
  {
    id: serial("id").notNull(),
    itemAbilityId: integer("item_ability_id")
      .notNull()
      .references(() => itemAbility.id),
    type: itemAbilityFeatureType("type").notNull(),
    value: itemAbilityFeatureValue("value"),
  },
  (table) => {
    return {
      itemAbilityFeatureItemAbilityIdTypePk: primaryKey({
        columns: [table.itemAbilityId, table.type],
        name: "item_ability_feature_item_ability_id_type_pk",
      }),
      itemAbilityFeatureIdUnique: unique("item_ability_feature_id_unique").on(
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
    type: itemMetaInfoPercentageType("type").notNull(),
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

export const heroMetaInfo = pgTable(
  "hero_meta_info",
  {
    id: serial("id").notNull(),
    heroId: integer("hero_id")
      .notNull()
      .references(() => hero.id),
    rank: heroMetaInfoRank("rank").notNull(),
    type: heroMetaInfoPercentageType("type").notNull(),
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
    type: heroTalentType("type").notNull(),
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

export const itemPrice = pgTable(
  "item_price",
  {
    id: serial("id").notNull(),
    itemId: integer("item_id")
      .notNull()
      .references(() => item.id),
    type: itemPriceType("type").notNull(),
    amount: numeric("amount", { precision: 5, scale: 1 }),
    unit: itemPriceUnit("unit"),
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

export const itemStat = pgTable(
  "item_stat",
  {
    id: serial("id").notNull(),
    itemId: integer("item_id")
      .notNull()
      .references(() => item.id),
    property: itemStatProperty("property").notNull(),
    effect: itemStatEffect("effect").notNull(),
    value: text("value").notNull(),
    variant: itemStatVariant("variant").notNull(),
  },
  (table) => {
    return {
      itemStatItemIdPropertyPk: primaryKey({
        columns: [table.itemId, table.property],
        name: "item_stat_item_id_property_pk",
      }),
      itemStatIdUnique: unique("item_stat_id_unique").on(table.id),
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
    amount: integer("amount").notNull(),
    priceAmount: integer("price_amount").notNull(),
    priceUnit: itemComponentPriceUnit("price_unit").notNull(),
    level: itemComponentLevel("level").notNull(),
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
