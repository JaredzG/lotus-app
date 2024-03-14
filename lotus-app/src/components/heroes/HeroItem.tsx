"use client";

import Image from "next/image";
import Link from "next/link";
import { type HeroFilterType, type HeroType } from "@/lib/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const cf = process.env.NEXT_PUBLIC_CF_DOMAIN;

const complexityValues = {
  Simple: 1,
  Moderate: 2,
  Complex: 3,
};

const HeroItem = ({
  hero,
  filters,
}: {
  hero: HeroType;
  filters: HeroFilterType[];
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {hero && (
          <Image
            src={`${cf}${hero.primaryImageKey}`}
            alt={hero.alias}
            height={640}
            width={360}
            className={cn(
              filters.length > 0
                ? filters.every((filter) => {
                    if (filter.category !== "roles")
                      return hero[filter.category] === filter.criteria;
                    else return hero[filter.category].includes(filter.criteria);
                  })
                  ? ""
                  : "grayscale brightness-50"
                : ""
            )}
          />
        )}
      </DialogTrigger>
      <DialogContent className={cn("bg-gray-600/90 border-0")}>
        <DialogHeader>
          <Image
            src={`${cf}${hero.primaryImageKey}`}
            alt={hero.alias}
            height={640}
            width={360}
            className={cn("w-1/2 aspect-auto")}
          />
          <DialogTitle className={cn("text-white")}>{hero.alias}</DialogTitle>
          <DialogDescription className={cn("text-white")}>
            {hero.name}
          </DialogDescription>
        </DialogHeader>
        <div
          className={cn(
            "h-48 w-full flex flex-col justify-between items-start"
          )}
        >
          {Object.keys(hero).map((property) => {
            if (property === "primaryAttribute")
              return (
                <TooltipProvider
                  key={`${hero.alias} ${hero.primaryAttribute}`}
                  delayDuration={300}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Image
                        src={`/${hero.primaryAttribute.toLocaleLowerCase()}.svg`}
                        alt={hero.primaryAttribute}
                        height={225}
                        width={225}
                        className={cn("h-1/5 w-auto")}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{hero.primaryAttribute}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            else if (property === "attackType")
              return (
                <TooltipProvider
                  key={`${hero.alias} ${hero.attackType}`}
                  delayDuration={300}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Image
                        src={`/${hero.attackType.toLocaleLowerCase()}.svg`}
                        alt={hero.attackType}
                        height={450}
                        width={560}
                        className={cn("h-1/5 w-auto")}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{hero.attackType}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            else if (property === "roles")
              return (
                <div key={`${hero.alias} Roles`} className={cn("h-1/5 flex")}>
                  {hero.roles.map((role) => (
                    <TooltipProvider
                      key={`${hero.alias} ${role}`}
                      delayDuration={300}
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Image
                            src={`/${role.toLocaleLowerCase()}.svg`}
                            alt={role}
                            height={450}
                            width={560}
                            className={cn("h-full w-auto")}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{role}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              );
            else if (property === "complexity")
              return (
                <div
                  key={`${hero.alias} Complexity`}
                  className={cn("h-1/5 flex")}
                >
                  {[...Array(complexityValues[hero.complexity])].map(
                    (_, idx) => (
                      <TooltipProvider
                        key={`${hero.alias} ${hero.complexity} ${idx + 1}`}
                        delayDuration={300}
                      >
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Image
                              src={"/complexity.svg"}
                              alt={hero.complexity}
                              height={450}
                              width={560}
                              className={cn("h-full w-auto")}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{hero.complexity}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )
                  )}
                </div>
              );
          })}
        </div>
        <DialogFooter>
          <Link
            href="#"
            className={cn(
              "hover:bg-gray-500/60 rounded-lg p-2 transition-colors text-gray-200 hover:text-black"
            )}
          >
            Learn more about&nbsp;
            <span className={cn("font-semibold text-white")}>{hero.alias}</span>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HeroItem;
