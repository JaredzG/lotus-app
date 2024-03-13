import { cn } from "@/lib/utils";
import Order from "./Order";

const OrderBar = ({
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
        {orderCategories.map((category, idx) => (
          <Order
            key={idx}
            category={category}
            order={order}
            onOrderClick={onOrderClick}
          />
        ))}
      </ul>
    </div>
  );
};

export default OrderBar;
