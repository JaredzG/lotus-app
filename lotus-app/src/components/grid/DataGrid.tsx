import { cn } from "@/lib/utils";
import {
  type HeroFilterType,
  type HeroType,
  type ItemFilterType,
  type ItemType,
} from "@/lib/zod";
import DataItem from "./DataItem";
import { type DataType } from "@/lib/types";

const DataGrid = ({
  dataType,
  category,
  filters,
  data,
}: {
  dataType: DataType;
  category: string;
  filters: HeroFilterType[] | ItemFilterType[];
  data: HeroType[] | ItemType[];
}) => {
  return (
    <div
      className={cn(
        "w-full rounded-lg bg-gradient-to-r from-sky-500 to-fuchsia-500 p-1"
      )}
    >
      <div
        className={cn(
          "rounded-lg bg-gradient-radial from-gray-700 from-20% to-black to-80% bg-fixed p-4"
        )}
      >
        <div
          className={cn(
            "w-min font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500 mb-3 px-3 pb-2"
          )}
        >
          {category}
        </div>
        <div className={cn("flex flex-wrap justify-evenly gap-3")}>
          {data?.map((dataItem, idx) => (
            <DataItem
              key={idx}
              dataType={dataType}
              dataItem={dataItem}
              filters={filters}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataGrid;
