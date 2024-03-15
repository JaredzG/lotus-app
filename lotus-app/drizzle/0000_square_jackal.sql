-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
DO $$ BEGIN
 CREATE TYPE "key_status" AS ENUM('default', 'valid', 'invalid', 'expired');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "key_type" AS ENUM('aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_type" AS ENUM('totp', 'webauthn');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_status" AS ENUM('unverified', 'verified');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "aal_level" AS ENUM('aal1', 'aal2', 'aal3');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "code_challenge_method" AS ENUM('s256', 'plain');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "hero_attack_type" AS ENUM('Melee', 'Ranged');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "hero_complexity" AS ENUM('Simple', 'Moderate', 'Complex');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "hero_primary_attribute" AS ENUM('Strength', 'Agility', 'Intelligence', 'Universal');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "hero_ability_feature_type" AS ENUM('Ability Type', 'Affected Target', 'Damage Type');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "hero_ability_feature_value" AS ENUM('Active Attack Modifier', 'Allied Heroes', 'Allies', 'Astral Spirit', 'Aura', 'Autocast', 'Boar', 'Channeled', 'Enemies', 'Enemy Heroes', 'Enemy Units', 'Familiars', 'HP Removal', 'Heroes', 'Instant Attack', 'Instant Kill', 'Magical', 'No Target', 'Passive', 'Physical', 'Proximity Mine', 'Pure', 'Self', 'Source Type', 'Target Area', 'Target Point', 'Target Unit', 'The Self', 'Toggle', 'Trees', 'Units', 'Vector Targeting', 'Wolves');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "hero_ability_upgrade_type" AS ENUM('Shard Upgrade', 'Scepter Upgrade');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "hero_meta_info_percentage_type" AS ENUM('Pick Percentage', 'Win Percentage');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "hero_meta_info_rank" AS ENUM('Herald | Guardian | Crusader', 'Archon', 'Legend', 'Ancient', 'Divine | Immortal');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "hero_role_type" AS ENUM('Carry', 'Support', 'Nuker', 'Disabler', 'Durable', 'Escape', 'Pusher', 'Initiator');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "hero_talent_level" AS ENUM('Novice', 'Intermediate', 'Advanced', 'Expert');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "hero_talent_type" AS ENUM('X', 'Y');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "item_classification" AS ENUM('Consumables', 'Attributes', 'Equipment', 'Miscellaneous', 'Secret', 'Accessories', 'Support', 'Magical', 'Armor', 'Weapons', 'Artifacts', 'Tier 1', 'Tier 2', 'Tier 3', 'Tier 4', 'Tier 5');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "item_type" AS ENUM('Basic', 'Upgrade', 'Neutral');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "item_ability_feature_type" AS ENUM('Ability Type', 'Affected Target', 'Damage Type');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "item_ability_feature_value" AS ENUM('Allied Heroes', 'Allies', 'Aura', 'Channeled', 'Enemies', 'Enemy Heroes', 'Enemy Units', 'Heroes', 'Hidden', 'Instant Attack', 'Instant Kill', 'Magical', 'No Target', 'Passive', 'Physical', 'Self', 'Source Type', 'Target Area', 'Target Point', 'Target Unit', 'Toggle', 'Trees', 'Units');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "item_component_level" AS ENUM('Buildup', 'Base');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "item_component_price_unit" AS ENUM('Gold', 'Gold per Count');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "item_meta_info_percentage_type" AS ENUM('Use Percentage', 'Win Percentage');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "item_price_type" AS ENUM('Purchase Price', 'Sell Price');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "item_price_unit" AS ENUM('Gold', 'Gold per Count');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "item_stat_effect" AS ENUM('Increase', 'Decrease');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "item_stat_property" AS ENUM('Agility', 'All Attributes', 'AoE Radius', 'Armor', 'Attack Damage', 'Attack Range', 'Attack Speed', 'Base Attack Speed', 'Cast Range', 'Debuff Duration Amp', 'Evasion', 'Gold per Minute', 'Heal Amp', 'Health', 'Health Regen Amp', 'Health Regeneration', 'Intelligence', 'Lifesteal', 'Lifesteal Amp', 'Magic Resistance', 'Main Attribute', 'Mana', 'Mana Loss Reduction', 'Mana Regen Amp', 'Mana Regeneration', 'Max HP Health Regen', 'Move Speed', 'Night Vision', 'Other Attributes', 'Projectile Speed', 'Slow Resistance', 'Spell Damage Amp', 'Spell Lifesteal', 'Spell Lifesteal Amp', 'Status Resistance', 'Strength', 'Vision');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "item_stat_variant" AS ENUM('Default', 'Melee', 'Ranged');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hero" (
	"id" serial NOT NULL,
	"name" text PRIMARY KEY NOT NULL,
	"alias" text,
	"biography" text NOT NULL,
	"identity" text NOT NULL,
	"description" text NOT NULL,
	"complexity" "hero_complexity" NOT NULL,
	"attack_type" "hero_attack_type" NOT NULL,
	"primary_attribute" "hero_primary_attribute" NOT NULL,
	"primary_image_key" text,
	"secondary_image_key" text,
	CONSTRAINT "hero_id_unique" UNIQUE("id"),
	CONSTRAINT "hero_alias_unique" UNIQUE("alias"),
	CONSTRAINT "hero_primary_image_key_unique" UNIQUE("primary_image_key"),
	CONSTRAINT "hero_secondary_image_key_unique" UNIQUE("secondary_image_key")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "item" (
	"id" serial NOT NULL,
	"name" text PRIMARY KEY NOT NULL,
	"lore" text,
	"type" "item_type" NOT NULL,
	"classification" "item_classification" NOT NULL,
	"has_stats" boolean NOT NULL,
	"has_abilities" boolean NOT NULL,
	"has_prices" boolean NOT NULL,
	"is_component" boolean NOT NULL,
	"has_components" boolean NOT NULL,
	"has_recipe" boolean NOT NULL,
	"image_key" text,
	CONSTRAINT "item_id_unique" UNIQUE("id"),
	CONSTRAINT "item_image_key_unique" UNIQUE("image_key")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "item_meta_info" (
	"id" serial NOT NULL,
	"item_id" integer PRIMARY KEY NOT NULL,
	"uses" integer NOT NULL,
	CONSTRAINT "item_meta_info_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hero_role" (
	"id" serial NOT NULL,
	"hero_id" integer NOT NULL,
	"type" "hero_role_type" NOT NULL,
	CONSTRAINT "hero_role_hero_id_type_pk" PRIMARY KEY("hero_id","type"),
	CONSTRAINT "hero_role_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hero_ability_feature" (
	"id" serial NOT NULL,
	"hero_ability_id" integer NOT NULL,
	"type" "hero_ability_feature_type" NOT NULL,
	"value" "hero_ability_feature_value",
	CONSTRAINT "hero_ability_feature_hero_ability_id_type_pk" PRIMARY KEY("hero_ability_id","type"),
	CONSTRAINT "hero_ability_feature_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hero_ability_upgrade" (
	"id" serial NOT NULL,
	"ability_id" integer NOT NULL,
	"type" "hero_ability_upgrade_type" NOT NULL,
	"description" text NOT NULL,
	CONSTRAINT "hero_ability_upgrade_ability_id_type_pk" PRIMARY KEY("ability_id","type"),
	CONSTRAINT "hero_ability_upgrade_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "item_ability" (
	"id" serial NOT NULL,
	"item_id" integer NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	CONSTRAINT "item_ability_item_id_name_pk" PRIMARY KEY("item_id","name"),
	CONSTRAINT "item_ability_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "item_ability_feature" (
	"id" serial NOT NULL,
	"item_ability_id" integer NOT NULL,
	"type" "item_ability_feature_type" NOT NULL,
	"value" "item_ability_feature_value",
	CONSTRAINT "item_ability_feature_item_ability_id_type_pk" PRIMARY KEY("item_ability_id","type"),
	CONSTRAINT "item_ability_feature_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "item_meta_info_percentage" (
	"id" serial NOT NULL,
	"item_meta_info_id" integer NOT NULL,
	"type" "item_meta_info_percentage_type" NOT NULL,
	"percentage" numeric(4, 2),
	CONSTRAINT "item_meta_info_percentage_item_meta_info_id_type_pk" PRIMARY KEY("item_meta_info_id","type"),
	CONSTRAINT "item_meta_info_percentage_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "item_price" (
	"id" serial NOT NULL,
	"item_id" integer NOT NULL,
	"type" "item_price_type" NOT NULL,
	"amount" numeric(5, 1),
	"unit" "item_price_unit",
	CONSTRAINT "item_price_item_id_type_pk" PRIMARY KEY("item_id","type"),
	CONSTRAINT "item_price_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hero_meta_info" (
	"id" serial NOT NULL,
	"hero_id" integer NOT NULL,
	"rank" "hero_meta_info_rank" NOT NULL,
	"type" "hero_meta_info_percentage_type" NOT NULL,
	"percentage" numeric(4, 2) NOT NULL,
	CONSTRAINT "hero_meta_info_hero_id_rank_type_pk" PRIMARY KEY("hero_id","rank","type"),
	CONSTRAINT "hero_meta_info_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hero_talent" (
	"id" serial NOT NULL,
	"hero_id" integer NOT NULL,
	"level" "hero_talent_level" NOT NULL,
	"type" "hero_talent_type" NOT NULL,
	"effect" text NOT NULL,
	CONSTRAINT "hero_talent_hero_id_level_type_pk" PRIMARY KEY("hero_id","level","type"),
	CONSTRAINT "hero_talent_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "item_stat" (
	"id" serial NOT NULL,
	"item_id" integer NOT NULL,
	"property" "item_stat_property" NOT NULL,
	"effect" "item_stat_effect" NOT NULL,
	"value" text NOT NULL,
	"variant" "item_stat_variant" NOT NULL,
	CONSTRAINT "item_stat_item_id_property_pk" PRIMARY KEY("item_id","property"),
	CONSTRAINT "item_stat_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "item_component" (
	"id" serial NOT NULL,
	"item_id" integer NOT NULL,
	"name" text NOT NULL,
	"amount" integer NOT NULL,
	"price_amount" integer NOT NULL,
	"price_unit" "item_component_price_unit" NOT NULL,
	"level" "item_component_level" NOT NULL,
	CONSTRAINT "item_component_item_id_name_pk" PRIMARY KEY("item_id","name"),
	CONSTRAINT "item_component_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hero_ability" (
	"id" serial NOT NULL,
	"hero_id" integer NOT NULL,
	"name" text NOT NULL,
	"lore" text,
	"description" text NOT NULL,
	"has_shard_upgrade" boolean NOT NULL,
	"has_scepter_upgrade" boolean NOT NULL,
	"image_key" text,
	CONSTRAINT "hero_ability_hero_id_name_pk" PRIMARY KEY("hero_id","name"),
	CONSTRAINT "hero_ability_id_unique" UNIQUE("id"),
	CONSTRAINT "hero_ability_image_key_unique" UNIQUE("image_key")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_meta_info" ADD CONSTRAINT "item_meta_info_item_id_item_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."item"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hero_role" ADD CONSTRAINT "hero_role_hero_id_hero_id_fk" FOREIGN KEY ("hero_id") REFERENCES "public"."hero"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hero_ability_feature" ADD CONSTRAINT "hero_ability_feature_hero_ability_id_hero_ability_id_fk" FOREIGN KEY ("hero_ability_id") REFERENCES "public"."hero_ability"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hero_ability_upgrade" ADD CONSTRAINT "hero_ability_upgrade_ability_id_hero_ability_id_fk" FOREIGN KEY ("ability_id") REFERENCES "public"."hero_ability"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_ability" ADD CONSTRAINT "item_ability_item_id_item_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."item"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_ability_feature" ADD CONSTRAINT "item_ability_feature_item_ability_id_item_ability_id_fk" FOREIGN KEY ("item_ability_id") REFERENCES "public"."item_ability"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_meta_info_percentage" ADD CONSTRAINT "item_meta_info_percentage_item_meta_info_id_item_meta_info_id_f" FOREIGN KEY ("item_meta_info_id") REFERENCES "public"."item_meta_info"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_price" ADD CONSTRAINT "item_price_item_id_item_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."item"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hero_meta_info" ADD CONSTRAINT "hero_meta_info_hero_id_hero_id_fk" FOREIGN KEY ("hero_id") REFERENCES "public"."hero"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hero_talent" ADD CONSTRAINT "hero_talent_hero_id_hero_id_fk" FOREIGN KEY ("hero_id") REFERENCES "public"."hero"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_stat" ADD CONSTRAINT "item_stat_item_id_item_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."item"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_component" ADD CONSTRAINT "item_component_item_id_item_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."item"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hero_ability" ADD CONSTRAINT "hero_ability_hero_id_hero_id_fk" FOREIGN KEY ("hero_id") REFERENCES "public"."hero"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/