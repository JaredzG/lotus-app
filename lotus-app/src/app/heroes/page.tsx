"use client";
import HeroGrid from "@/components/heroes/HeroGrid";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useGetHeroesQuery } from "@/features/api/apiSlice";
import { cn } from "@/lib/utils";

const Heroes = () => {
  const {
    data: heroCategories = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetHeroesQuery({ order: "Role" });

  console.log(heroCategories);

  return (
    <main>
      <div className="flex items-center space-x-2">
        <Switch id="Primary Attribute" />
        <label
          htmlFor="Primary Attribute"
          className={cn("font-bold text-xl text-white tracking-wide")}
        >
          Primary Attribute
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="Attack Type" />
        <label
          htmlFor="Attack Type"
          className={cn("font-bold text-xl text-white tracking-wide")}
        >
          Attack Type
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="Role" />
        <label
          htmlFor="Role"
          className={cn("font-bold text-xl text-white tracking-wide")}
        >
          Role
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="Complexity" />
        <label
          htmlFor="Complexity"
          className={cn("font-bold text-xl text-white tracking-wide")}
        >
          Complexity
        </label>
      </div>
      <div
        className={cn("flex flex-wrap gap-5 p-28 justify-evenly items-start")}
      >
        {Object.keys(heroCategories).map((category: string) => (
          <HeroGrid
            key={category}
            category={category}
            heroes={heroCategories[category]}
          />
        ))}
      </div>
    </main>
  );
};

export default Heroes;
