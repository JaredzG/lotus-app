import { cn } from "@/lib/utils";

const HeroOrderCategory = ({
  category,
  order,
  onOrderClick,
}: {
  category: string;
  order: string;
  onOrderClick: (order: string) => void;
}) => {
  return (
    <li
      className={cn(
        "text-white font-medium px-2 py-1 rounded-lg cursor-pointer select-none transition-bg hover:bg-gray-700",
        order === category
          ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-black"
          : ""
      )}
      onClick={() => onOrderClick(category)}
    >
      {category}
    </li>
  );
};

export default HeroOrderCategory;
