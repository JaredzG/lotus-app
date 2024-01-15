import { useState } from "react";
import { cn } from "../lib/utils";

interface TileProps {
  data: string;
}

const Tile: React.FC<TileProps> = (props) => {
  const [isActive, setActive] = useState(false);

  return (
    <div
      className={cn(
        "flex justify-center items-center p-3 border-8 rounded-xl h-40 w-40 text-6xl font-bold text-yellow-500 bg-slate-500 cursor-pointer transition-colors ease-in-out duration-300",
        {
          "text-red-300 bg-green-800": isActive,
        }
      )}
      onClick={() => setActive(!isActive)}
    >
      {props.data}
    </div>
  );
};

export default Tile;
