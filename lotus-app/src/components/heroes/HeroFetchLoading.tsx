import CircularProgress from "@mui/material/CircularProgress";
import { cn } from "@/lib/utils";

const HeroFetchLoading = () => {
  return (
    <div
      className={cn("h-dvh w-dvh text-4xl font-bold flex justify-center items-center")}
    >
      <div className={cn("flex flex-col justify-center items-center gap-2")}>
        <CircularProgress
          sx={{ color: "oklch(79.52% 0.162 86.05)" }}
          size="20%"
        />
        <span
          className={cn(
            "h-12 uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-yellow-500 flex justify-center items-center"
          )}
        >
          Fetching Heroes...
        </span>
      </div>
    </div>
  );
};

export default HeroFetchLoading;
