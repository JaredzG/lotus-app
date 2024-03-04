"use client";
import { useMemo, useState } from "react";
import { useGetHeroesQuery } from "@/features/api/apiSlice";
import { cn } from "@/lib/utils";
import { HeroCardType } from "@/lib/zod";
import { Button } from "@/components/ui/button";

const orderingTypes: Record<string, Record<string, number>> = {
  primaryAttribute: {
    Strength: 1,
    Agility: 2,
    Intelligence: 3,
    Universal: 4
  },

  attackType: {
    Melee: 1,
    Ranged: 2
  },

  role: {
    Carry: 1,
    Support: 2,
    Nuker: 3,
    Disabler: 4,
    Durable: 5,
    Escape: 6,
    Pusher: 7,
    Initiator: 8
  },

  complexity: {
    Simple: 1,
    Moderate: 2,
    Complex: 3
  }
};

const orderingTypeOptionAmounts: Record<string, number> = {
  primaryAttribute: 4,
  attackType: 2,
  complexity: 3
};

const TestPage = () => {
  const {
    data: heroes,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetHeroesQuery(undefined);

  const [ordering, setOrdering] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<
    Record<string, Record<string, Set<string>>>
  >({
    primaryAttribute: {
      And: new Set(),
      Or: new Set()
    },
    attackType: {
      And: new Set(),
      Or: new Set()
    },
    roles: {
      And: new Set(),
      Or: new Set()
    },
    complexity: {
      And: new Set(),
      Or: new Set()
    }
  });

  const orderedHeroes = useMemo(() => {
    if (heroes) {
      let orderedHeroes: HeroCardType[] = heroes.data.slice();
      orderedHeroes?.sort(
        (a: HeroCardType, b: HeroCardType) => a.alias - b.alias
      );

      let prevOrderedGroups = [orderedHeroes];
      let nextOrderedGroups: HeroCardType[][] = [];

      ordering.forEach((criteria: string) => {
        if (criteria !== "role") {
          nextOrderedGroups = [
            ...new Array(
              orderingTypeOptionAmounts[criteria] * prevOrderedGroups.length
            )
          ].map(() => []);
          prevOrderedGroups.forEach((group, idx) => {
            group.forEach((hero: HeroCardType) => {
              nextOrderedGroups[
                orderingTypes[criteria][hero[criteria]] +
                  orderingTypeOptionAmounts[criteria] * idx -
                  1
              ].push(hero);
            });
          });
          prevOrderedGroups = nextOrderedGroups.slice();
          nextOrderedGroups = [];
        } else {
          prevOrderedGroups.forEach((group) => {
            group.sort((a: HeroCardType, b: HeroCardType) => {
              if (a.roles.includes("Carry") && !b.roles.includes("Carry"))
                return -1;
              if (!a.roles.includes("Carry") && b.roles.includes("Carry"))
                return 1;
              if (a.roles.includes("Support") && !b.roles.includes("Support"))
                return -1;
              if (!a.roles.includes("Support") && b.roles.includes("Support"))
                return 1;
              if (a.roles.includes("Nuker") && !b.roles.includes("Nuker"))
                return -1;
              if (!a.roles.includes("Nuker") && b.roles.includes("Nuker"))
                return 1;
              if (a.roles.includes("Disabler") && !b.roles.includes("Disabler"))
                return -1;
              if (!a.roles.includes("Disabler") && b.roles.includes("Disabler"))
                return 1;
              if (a.roles.includes("Durable") && !b.roles.includes("Durable"))
                return -1;
              if (!a.roles.includes("Durable") && b.roles.includes("Durable"))
                return 1;
              if (a.roles.includes("Escape") && !b.roles.includes("Escape"))
                return -1;
              if (!a.roles.includes("Escape") && b.roles.includes("Escape"))
                return 1;
              if (a.roles.includes("Pusher") && !b.roles.includes("Pusher"))
                return -1;
              if (!a.roles.includes("Pusher") && b.roles.includes("Pusher"))
                return 1;
              if (
                a.roles.includes("Initiator") &&
                !b.roles.includes("Initiator")
              )
                return -1;
              if (
                !a.roles.includes("Initiator") &&
                b.roles.includes("Initiator")
              )
                return 1;
              return a.alias - b.alias;
            });
          });
        }
      });
      orderedHeroes = [];
      prevOrderedGroups.forEach((group: HeroCardType[]) => {
        orderedHeroes = orderedHeroes.concat(group);
      });
      return orderedHeroes;
    }
  }, [heroes, ordering]);

  const filteredHeroes = useMemo(() => {
    if (heroes) {
      let filteredHeroes = [];
      orderedHeroes?.forEach((hero) => {
        filteredHeroes.push({ ...hero, good: true });
      });
      for (const criteria in filters)
        for (const condition in filters[criteria])
          filters[criteria][condition].forEach((value: string) => {
            if (condition === "And") {
              filteredHeroes?.forEach((hero) => {
                hero.good =
                  criteria === "roles"
                    ? hero[criteria].includes(value)
                    : hero[criteria] === value;
                // console.log(hero.alias, hero.good);
              });
            }
          });
      filteredHeroes = filteredHeroes.filter((hero) => hero.good === true);
      filteredHeroes.forEach((hero) => delete hero.good);
      return filteredHeroes;
    }
  }, [heroes, filters, orderedHeroes]);

  const handleOrderingButtonClick = (criteria: string) => {
    if (!ordering.has(criteria)) setOrdering(new Set([...ordering, criteria]));
    else
      setOrdering(
        new Set([...ordering].filter((entry: string) => entry !== criteria))
      );
  };

  const handleFilteringButtonClick = (
    criteria: string,
    condition: string,
    value: string
  ) => {
    if (!filters[criteria][condition].has(value)) {
      setFilters({
        ...filters,
        [criteria]: {
          ...filters[criteria],
          [condition]: new Set([...filters[criteria][condition], value])
        }
      });
    } else
      setFilters({
        ...filters,
        [criteria]: {
          ...filters[criteria],
          [condition]: new Set(
            [...filters[criteria][condition]].filter(
              (entry: string) => entry !== value
            )
          )
        }
      });
  };

  return (
    <main>
      <Button
        variant="default"
        onClick={() => handleOrderingButtonClick("primaryAttribute")}
      >
        Primary Attribute
      </Button>
      <Button
        variant="default"
        onClick={() => handleOrderingButtonClick("attackType")}
      >
        Attack Type
      </Button>
      <Button
        variant="default"
        onClick={() => handleOrderingButtonClick("role")}
      >
        Role
      </Button>
      <Button
        variant="default"
        onClick={() => handleOrderingButtonClick("complexity")}
      >
        Complexity
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          handleFilteringButtonClick("complexity", "And", "Complex")
        }
      >
        Complexity
      </Button>
      <div className={cn("flex flex-wrap gap-32 p-28 justify-evenly")}>
        {filteredHeroes?.map((hero: HeroCardType) => (
          <ul key={hero.alias}>
            {Object.keys(hero).map(
              (infoType: string) =>
                infoType !== "primaryImageKey" &&
                (infoType === "roles" ? (
                  hero[infoType].map((role: string) => (
                    <li key={role}>{role}</li>
                  ))
                ) : (
                  <li key={hero[infoType]}>{hero[infoType]}</li>
                ))
            )}
          </ul>
        ))}
      </div>
    </main>
  );
};

export default TestPage;
