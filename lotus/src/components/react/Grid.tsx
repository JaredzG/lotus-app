import { useEffect } from "react";
import { cn } from "../../lib/utils";
import Tile, { type TileType } from "@/components/react/Tile";

export type GridEntry = { pow: number } & TileType;

interface GridProps {
  tiles: GridEntry[];
  selectedTiles: TileType[];
  matchedTiles: TileType[];
  failedMatchTiles: TileType[];
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTiles: React.Dispatch<React.SetStateAction<TileType[]>>;
  setMatchedTiles: React.Dispatch<React.SetStateAction<TileType[]>>;
  setFailedMatchTiles: React.Dispatch<React.SetStateAction<TileType[]>>;
}

export default function Grid({
  tiles,
  selectedTiles,
  matchedTiles,
  failedMatchTiles,
  setDialogOpen,
  setSelectedTiles,
  setMatchedTiles,
  setFailedMatchTiles,
}: GridProps) {
  useEffect(() => {
    if (selectedTiles.length === 4) {
      const matchingTiles = selectedTiles.filter(
        (tile: TileType) => tile.base === selectedTiles[0].base
      );
      if (matchingTiles.length === selectedTiles.length) {
        setMatchedTiles([...matchedTiles, ...selectedTiles]);
      } else {
        setFailedMatchTiles([...failedMatchTiles, ...selectedTiles]);
      }
    } else {
      if (failedMatchTiles.length > 0) {
        setFailedMatchTiles([]);
      }
    }
  }, [selectedTiles]);

  useEffect(() => {
    if (matchedTiles.length === 16) {
      setDialogOpen(true);
    } else if (matchedTiles.length !== 0 && matchedTiles.length % 4 === 0) {
      setSelectedTiles([]);
    }
  }, [matchedTiles]);

  return (
    <div className={cn("grid grid-cols-4 grid-rows-4 gap-4 select-none")}>
      {tiles.map((entry) => (
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
}
