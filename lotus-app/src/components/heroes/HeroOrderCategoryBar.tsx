import { cn } from "@/lib/utils";
import HeroOrderCategory from "./HeroOrderCategory";

const HeroOrderCategoryBar = ({
  orderCategories,
  order,
  onOrderClick,
}: {
  orderCategories: string[];
  order: string;
  onOrderClick: (order: string) => void;
}) => {
  return (
    <div className={cn("w-full px-4 py-2 fixed backdrop-blur-lg z-50")}>
      <ul className={cn("flex flex-wrap gap-2")}>
        {orderCategories.map((category) => (
          <HeroOrderCategory
            key={category}
            category={category}
            order={order}
            onOrderClick={onOrderClick}
          />
        ))}
      </ul>
    </div>
  );
};

export default HeroOrderCategoryBar;
