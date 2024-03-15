import { cn } from "@/lib/utils";

const Order = ({
  categoryValue,
  categoryDisplay,
  order,
  onOrderClick,
}: {
  categoryValue: string;
  categoryDisplay: string;
  order: string;
  onOrderClick: (order: string) => void;
}) => {
  return (
    <li
      className={cn(
        "text-white font-medium px-2 py-1 rounded-lg cursor-pointer select-none transition-bg hover:bg-gray-700",
        order === categoryValue
          ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-black"
          : ""
      )}
      onClick={() => onOrderClick(categoryValue)}
    >
      {categoryDisplay}
    </li>
  );
};

export default Order;
