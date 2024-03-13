"use client";

import Image from "next/image";
import { type HeroFilterType, type HeroType } from "@/lib/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { cn } from "@/lib/utils";

const cf = process.env.NEXT_PUBLIC_CF_DOMAIN;

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{hero.alias}</DialogTitle>
          <DialogDescription>{hero.name}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default HeroItem;
