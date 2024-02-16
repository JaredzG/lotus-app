import { useStore } from "@nanostores/react";
import { $ordering } from "../../stores/heroStores";
import { cn } from "../../lib/utils";
import { Skeleton } from "../ui/skeleton";
import {
  GET,
  type HeroCardType,
} from "../../pages/api/server/heroSecondaryImages";
import meleeIcon from "../../assets/attackTypes/melee.png";
import rangedIcon from "../../assets/attackTypes/ranged.png";
import carryIcon from "../../assets/roles/carry.png";
import disablerIcon from "../../assets/roles/disabler.png";
import durableIcon from "../../assets/roles/durable.png";
import escapeIcon from "../../assets/roles/escape.png";
import initiatorIcon from "../../assets/roles/initiator.png";
import nukerIcon from "../../assets/roles/nuker.png";
import pusherIcon from "../../assets/roles/pusher.png";
import supportIcon from "../../assets/roles/support.png";
import agilityIcon from "../../assets/primaryAttributes/agility.png";
import intelligenceIcon from "../../assets/primaryAttributes/intelligence.png";
import strengthIcon from "../../assets/primaryAttributes/strength.png";
import universalIcon from "../../assets/primaryAttributes/universal.png";
import complexityIcon from "../../assets/complexity/complexity.png";
import type { APIContext } from "astro/dist/@types/astro";
import { useEffect } from "react";

const CF = import.meta.env.CF_DOMAIN;

type Field = Record<string, any>;

const attackTypes: Field = {
  Melee: meleeIcon,
  Ranged: rangedIcon,
};

const roles: Field = {
  Carry: carryIcon,
  Disabler: disablerIcon,
  Durable: durableIcon,
  Escape: escapeIcon,
  Initiator: initiatorIcon,
  Nuker: nukerIcon,
  Pusher: pusherIcon,
  Support: supportIcon,
};

const primaryAttributes: Field = {
  Agility: agilityIcon,
  Intelligence: intelligenceIcon,
  Strength: strengthIcon,
  Universal: universalIcon,
};

const complexity: Field = {
  Simple: 1,
  Moderate: 2,
  Complex: 3,
};

const HeroGrid = ({
  context,
}: {
  context: APIContext<Record<string, any>, Record<string, string | undefined>>;
}): JSX.Element => {
  let heroes: HeroCardType[] = [];

  useEffect(() => {
    (async () => {
      const response = await GET(context);

      heroes = await response.json();
    })().catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <div>
      {heroes.map((hero: HeroCardType, idx: number) => (
        <div
          key={idx}
          className={cn(
            "cell h-96 w-1/4 border-2 bg-slate-500 overflow-hidden cursor-pointer opacity-0 relative"
          )}
        >
          <Skeleton
            className={cn(
              "skeleton h-full w-full absolute top-0 left-0 rounded-none"
            )}
          />
          <div className={cn("hero h-full w-full absolute top-0 left-0")}>
            <picture>
              <source
                srcSet={`${CF}${hero.secondaryImageKey}`}
                type="image/avif"
              />
              <source
                srcSet={`${CF}${hero.secondaryImageKey}`}
                type="image/webp"
              />
              <img
                src={`${CF}${hero.secondaryImageKey}`}
                height="497"
                width="658"
                decoding="async"
                loading="lazy"
                alt={hero.alias}
                className={cn(
                  "heroImage h-full w-full object-cover absolute top-0 left-0 opacity-0"
                )}
              />
            </picture>
            <div
              className={cn("heroFilter h-full w-full absolute top-0 left-0")}
            >
              <div
                className={cn(
                  "filterContent h-full w-full p-7 flex flex-col justify-between items-center gap-3 absolute"
                )}
              >
                <div
                  className={cn(
                    "heroInfoContainer h-1/5 w-full flex justify-center items-center overflow-hidden"
                  )}
                >
                  <p
                    className={cn(
                      "alias w-full text-white font-semibold text-center leading-none uppercase"
                    )}
                  >
                    {hero.alias}
                  </p>
                </div>
                <div
                  className={cn(
                    "heroInfoContainer w-full flex justify-center overflow-hidden"
                  )}
                >
                  <picture>
                    <source
                      srcSet={primaryAttributes[hero.primaryAttribute]}
                      type="image/avif"
                    />
                    <source
                      srcSet={primaryAttributes[hero.primaryAttribute]}
                      type="image/webp"
                    />
                    <img
                      src={primaryAttributes[hero.primaryAttribute]}
                      decoding="async"
                      loading="lazy"
                      alt={hero.primaryAttribute}
                      className={cn("h-12 w-12")}
                    />
                  </picture>
                </div>
                <div
                  className={cn(
                    "heroInfoContainer w-48 flex flex-wrap gap-y-2 justify-center items-center overflow-hidden"
                  )}
                >
                  <picture>
                    <source
                      srcSet={attackTypes[hero.attackType]}
                      type="image/avif"
                    />
                    <source
                      srcSet={attackTypes[hero.attackType]}
                      type="image/webp"
                    />
                    <img
                      src={attackTypes[hero.attackType]}
                      decoding="async"
                      loading="lazy"
                      alt={hero.attackType}
                      className={cn("h-12 w-12")}
                    />
                  </picture>
                  {hero.roles.map((role: string, idx: number) => (
                    <picture key={idx}>
                      <source srcSet={roles[role]} type="image/avif" />
                      <source srcSet={roles[role]} type="image/webp" />
                      <img
                        src={roles[role]}
                        decoding="async"
                        loading="lazy"
                        alt={role}
                        className={cn("h-12 w-12")}
                      />
                    </picture>
                  ))}
                </div>
                <div
                  className={cn(
                    "heroInfoContainer w-full flex justify-center overflow-hidden"
                  )}
                >
                  {[...Array(complexity[hero.complexity]).keys()].map(
                    (entry: number, idx: number) => (
                      <picture key={idx}>
                        <source srcSet={complexityIcon} type="image/avif" />
                        <source srcSet={complexityIcon} type="image/webp" />
                        <img
                          src={complexityIcon}
                          decoding="async"
                          loading="lazy"
                          alt={hero.complexity}
                          className={cn("h-12 w-12")}
                        />
                      </picture>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroGrid;
