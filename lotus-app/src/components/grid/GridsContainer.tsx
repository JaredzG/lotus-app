import { cn } from "@/lib/utils";
import DataGrid from "./DataGrid";
import { type HeroFilterType, type ItemFilterType } from "@/lib/zod";
import { type DataType } from "@/lib/types";

const GridsContainer = ({
  dataType,
  result,
  filters,
}: {
  dataType: DataType;
  result: any;
  filters: HeroFilterType[] | ItemFilterType[];
}) => {
  return (
    <div className={cn("flex flex-wrap gap-5 p-28 justify-evenly items-start")}>
      {Object.keys(result.data).map((category, idx) => (
        <DataGrid
          key={idx}
          dataType={dataType}
          category={category}
          filters={filters}
          data={result.data[category]}
        />
      ))}
    </div>
  );
};

export default GridsContainer;
