"use client";

import Image from "next/image";
import Link from "next/link";
import { type ItemFilterType, type ItemType } from "@/lib/zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { cn } from "@/lib/utils";

const cf = process.env.NEXT_PUBLIC_CF_DOMAIN;

const ItemItem = ({
  item,
  filters,
}: {
  item: ItemType;
  filters: ItemFilterType[];
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {item && (
          <Image
            src={`${cf}${item.imageKey}`}
            alt={item.name}
            height={320}
            width={440}
            className={cn(
              filters.length > 0
                ? filters.every((filter) => item[filter.category])
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
            src={`${cf}${item.imageKey}`}
            alt={item.name}
            height={320}
            width={440}
            className={cn("w-1/2 aspect-auto")}
          />
          <DialogTitle className={cn("text-white")}>{item.name}</DialogTitle>
        </DialogHeader>
        <div
          className={cn(
            "h-48 w-full flex flex-col justify-between items-start"
          )}
        >
          {Object.keys(item).map((property) => {
            if (property === "type")
              return (
                <p className={cn("text-gray-200")}>
                  Type:&nbsp;
                  <span className={cn("font-semibold text-white")}>
                    {item.type}
                  </span>
                </p>
              );
            else if (property === "classification")
              return (
                <p className={cn("text-gray-200")}>
                  Classification:&nbsp;
                  <span className={cn("font-semibold text-white")}>
                    {item.classification}
                  </span>
                </p>
              );
            else if (property === "hasStats") {
              return (
                <p
                  key={`${item.name} ${property}`}
                  className={cn("font-semibold text-white")}
                >
                  {item[property] === true ? (
                    <span className={cn("text-green-500")}>Has</span>
                  ) : (
                    <span className={cn("text-red-500")}>Does not have</span>
                  )}
                  &nbsp;Stats
                </p>
              );
            } else if (property === "hasAbilities") {
              return (
                <p
                  key={`${item.name} ${property}`}
                  className={cn("font-semibold text-white")}
                >
                  {item[property] === true ? (
                    <span className={cn("text-green-500")}>Has</span>
                  ) : (
                    <span className={cn("text-red-500")}>Does not have</span>
                  )}
                  &nbsp;Abilities
                </p>
              );
            } else if (property === "isComponent") {
              return (
                <p
                  key={`${item.name} ${property}`}
                  className={cn("font-semibold text-white")}
                >
                  {item[property] === true ? (
                    <span className={cn("text-green-500")}>Is</span>
                  ) : (
                    <span className={cn("text-red-500")}>Is not</span>
                  )}
                  &nbsp;Component
                </p>
              );
            } else if (property === "hasComponents") {
              return (
                <p
                  key={`${item.name} ${property}`}
                  className={cn("font-semibold text-white")}
                >
                  {item[property] === true ? (
                    <span className={cn("text-green-500")}>Has</span>
                  ) : (
                    <span className={cn("text-red-500")}>Does not have</span>
                  )}
                  &nbsp;Components
                </p>
              );
            } else if (property === "hasRecipe") {
              return (
                <p
                  key={`${item.name} ${property}`}
                  className={cn("font-semibold text-white")}
                >
                  {item[property] === true ? (
                    <span className={cn("text-green-500")}>Has</span>
                  ) : (
                    <span className={cn("text-red-500")}>Does not have</span>
                  )}
                  &nbsp;Recipe
                </p>
              );
            }
            // else if (property === "roles")
            //   return (
            //     <div key={`${hero.alias} Roles`} className={cn("h-1/5 flex")}>
            //       {hero.roles.map((role) => (
            //         <TooltipProvider
            //           key={`${hero.alias} ${role}`}
            //           delayDuration={300}
            //         >
            //           <Tooltip>
            //             <TooltipTrigger asChild>
            //               <Image
            //                 src={`/${role.toLocaleLowerCase()}.svg`}
            //                 alt={role}
            //                 height={450}
            //                 width={560}
            //                 className={cn("h-full w-auto")}
            //               />
            //             </TooltipTrigger>
            //             <TooltipContent>
            //               <p>{role}</p>
            //             </TooltipContent>
            //           </Tooltip>
            //         </TooltipProvider>
            //       ))}
            //     </div>
            //   );
            // else if (property === "complexity")
            //   return (
            //     <div
            //       key={`${hero.alias} Complexity`}
            //       className={cn("h-1/5 flex")}
            //     >
            //       {[...Array(complexityValues[hero.complexity])].map(
            //         (_, idx) => (
            //           <TooltipProvider
            //             key={`${hero.alias} ${hero.complexity} ${idx + 1}`}
            //             delayDuration={300}
            //           >
            //             <Tooltip>
            //               <TooltipTrigger asChild>
            //                 <Image
            //                   src={"/complexity.svg"}
            //                   alt={hero.complexity}
            //                   height={450}
            //                   width={560}
            //                   className={cn("h-full w-auto")}
            //                 />
            //               </TooltipTrigger>
            //               <TooltipContent>
            //                 <p>{hero.complexity}</p>
            //               </TooltipContent>
            //             </Tooltip>
            //           </TooltipProvider>
            //         )
            //       )}
            //     </div>
            //   );
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
            <span className={cn("font-semibold text-white")}>{item.name}</span>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ItemItem;
