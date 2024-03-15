import { cn } from "@/lib/utils";
import Order from "./Order";

const OrderBar = ({
  orderCategories,
  order,
  onOrderClick,
}: {
  orderCategories: Record<string, string>;
  order: string;
  onOrderClick: (order: string) => void;
}) => {
  return (
    <div className={cn("w-full px-4 py-2 fixed backdrop-blur-lg z-50")}>
      <ul className={cn("flex flex-wrap gap-2")}>
        {Object.keys(orderCategories).map((category, idx) => (
          <Order
            key={idx}
            categoryDisplay={category}
            categoryValue={orderCategories[category]}
            order={order}
            onOrderClick={onOrderClick}
          />
        ))}
      </ul>
    </div>
  );
};

export default OrderBar;
