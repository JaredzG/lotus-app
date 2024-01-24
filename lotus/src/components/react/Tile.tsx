import { cn } from "../../lib/utils";

export type TileType = Pick<TileProps, "base" | "value">;

interface TileProps {
  base: number;
  value: number;
  selectedTiles: TileType[];
  isSelectedTile: boolean;
  isMatchedTile: boolean;
  isFailedMatchTile: boolean;
  select: React.Dispatch<React.SetStateAction<TileType[]>>;
}

const Tile = ({
  base,
  value,
  selectedTiles,
  isSelectedTile,
  isMatchedTile,
  isFailedMatchTile,
  select,
}: TileProps): JSX.Element => {
  function handleClick(): void {
    if (!isSelectedTile && !isMatchedTile) {
      if (selectedTiles.length < 4) {
        select([...selectedTiles, { base, value }]);
      }
    } else {
      const selectedTilesArray = Array.from(selectedTiles);
      select(
        selectedTilesArray.filter((tile: TileType) => tile.value !== value)
      );
    }
  }

  return (
    <div
      className={cn(
        "flex justify-center items-center p-3 border-8 rounded-xl h-40 w-40 text-6xl font-bold text-yellow-500 bg-slate-500 cursor-pointer",
        {
          "text-red-300 bg-green-800": isSelectedTile,
          "text-black bg-yellow-500 animate-ping-once": isMatchedTile,
          "text-black bg-red-600 animate-wiggle": isFailedMatchTile,
        }
      )}
      onClick={handleClick}
    >
      {value}
    </div>
  );
};

export default Tile;
