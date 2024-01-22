import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/GridGameDialog";
import Grid, { type GridEntry } from "@/components/react/Grid";
import type { TileType } from "@/components/react/Tile";
import { cn } from "@/lib/utils";

interface GridGameProps {
  gridEntries: GridEntry[];
}

export function GridGame({ gridEntries }: GridGameProps) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [tiles, setTiles] = useState<GridEntry[]>(gridEntries);
  const [selectedTiles, setSelectedTiles] = useState<TileType[]>([]);
  const [matchedTiles, setMatchedTiles] = useState<TileType[]>([]);
  const [failedMatchTiles, setFailedMatchTiles] = useState<TileType[]>([]);

  async function handleDialogClose() {
    const response = await fetch("/api/grid");
    const responseBody = await response.json();
    setTiles(responseBody.data);
    setDialogOpen(false);
    setSelectedTiles([]);
    setMatchedTiles([]);
    setFailedMatchTiles([]);
  }

  return (
    <Dialog open={isDialogOpen}>
      <Grid
        tiles={tiles}
        selectedTiles={selectedTiles}
        matchedTiles={matchedTiles}
        failedMatchTiles={failedMatchTiles}
        setDialogOpen={setDialogOpen}
        setSelectedTiles={setSelectedTiles}
        setMatchedTiles={setMatchedTiles}
        setFailedMatchTiles={setFailedMatchTiles}
      />
      <DialogContent className={cn("bg-slate-300 border-none")}>
        <DialogHeader>
          <DialogTitle
            className={cn("font-bold text-xl text-slate-700 uppercase")}
          >
            You win!
          </DialogTitle>
          <DialogDescription className={cn("text-md text-slate-700")}>
            You managed to find the four groups of matching tiles. Can you do it
            again?
          </DialogDescription>
        </DialogHeader>
        <DialogClose asChild>
          <button
            onClick={handleDialogClose}
            className={cn(
              "text-slate-200 font-semibold bg-slate-600 max-w-max justify-self-center px-4 py-2 rounded-lg outline-none transition hover:scale-105 hover:-translate-y-1 hover:bg-amber-800"
            )}
          >
            Play Again
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
