import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import Tile from "./Tile";
import type { TileType } from "./Tile";

export type GridEntry = { pow: number } & TileType;

interface GridProps {
  gridEntries: GridEntry[];
}

const Grid: React.FC<GridProps> = ({ gridEntries }: GridProps) => {
  const [selectedTiles, setSelectedTiles] = useState<TileType[]>([]);
  const [matchedTiles, setMatchedTiles] = useState<TileType[]>([]);
  const [failedMatchTiles, setFailedMatchTiles] = useState<TileType[]>([]);

  useEffect(() => {
    console.log(`${selectedTiles.length} tiles selected!`);
    console.log(
      `Selected tiles: ${selectedTiles.map((tile: TileType) => tile.value).join(", ")}`
    );
    if (selectedTiles.length === 4) {
      const matchingTiles = selectedTiles.filter(
        (tile: TileType) => tile.base === selectedTiles[0].base
      );
      if (matchingTiles.length === selectedTiles.length) {
        console.log(
          `Found matching tiles! ${matchingTiles.map((tile: TileType) => tile.value).join(", ")}`
        );
        setMatchedTiles([...matchedTiles, ...selectedTiles]);
      } else {
        console.log(
          `Tiles do not match! ${selectedTiles.map((tile: TileType) => tile.value).join(", ")}`
        );
        setFailedMatchTiles([...failedMatchTiles, ...selectedTiles]);
      }
    } else {
      if (failedMatchTiles.length > 0) {
        setFailedMatchTiles([]);
      }
    }
  }, [selectedTiles]);

  useEffect(() => {
    if (matchedTiles.length !== 0 && matchedTiles.length % 4 === 0) {
      setSelectedTiles([]);
    }
  }, [matchedTiles]);

  return (
    <div className={cn("grid grid-cols-4 grid-rows-4 gap-4 select-none")}>
      {gridEntries.map((entry) => (
        <Tile
          key={`${entry.base}.${entry.pow}`}
          base={entry.base}
          value={entry.value}
          selectedTiles={selectedTiles}
          isSelectedTile={selectedTiles.some(
            (tile: TileType) => tile.value === entry.value
          )}
          isMatchedTile={matchedTiles.some(
            (tile: TileType) => tile.value === entry.value
          )}
          isFailedMatchTile={failedMatchTiles.some(
            (tile: TileType) => tile.value === entry.value
          )}
          select={setSelectedTiles}
        />
      ))}
    </div>
  );
};

export default Grid;
