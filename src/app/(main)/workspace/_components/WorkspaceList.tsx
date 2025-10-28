import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const workspaces = [
  {
    id: 1,
    name: "My Workspace",
    avatar: "MW",
  },
  {
    id: 2,
    name: "Tech Innovators",
    avatar: "TI",
  },
  {
    id: 3,
    name: "Design Studio",
    avatar: "DS",
  },
  {
    id: 4,
    name: "Marketing Hub",
    avatar: "MH",
  },
  {
    id: 5,
    name: "Development Team",
    avatar: "DT",
  },
  {
    id: 6,
    name: "Product Labs",
    avatar: "PL",
  },
  {
    id: 7,
    name: "Sales Force",
    avatar: "SF",
  },
  {
    id: 8,
    name: "Creative Agency",
    avatar: "CA",
  },
  {
    id: 9,
    name: "Data Analytics",
    avatar: "DA",
  },
  {
    id: 10,
    name: "Support Center",
    avatar: "SC",
  },
];

const colorCombinations = [
  "bg-blue-500 hover:bg-blue-600 text-white",
  "bg-purple-500 hover:bg-purple-600 text-white",
  "bg-emerald-500 hover:bg-emerald-600 text-white",
  "bg-rose-500 hover:bg-rose-600 text-white",
  "bg-amber-500 hover:bg-amber-600 text-white",
  "bg-cyan-500 hover:bg-cyan-600 text-white",
  "bg-indigo-500 hover:bg-indigo-600 text-white",
];

function getWorkspaceColor(id: number) {
  const colorIndex = id % colorCombinations.length;
  return colorCombinations[colorIndex];
}

function WorkspaceList() {
  return (
    <TooltipProvider>
      <div className="flex flex-col gap-2">
        {workspaces.map((item) => (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              <Button
                size={"icon"}
                className={cn(
                  "size-12 transition-all duration-300 rounded-2xl",
                  getWorkspaceColor(item.id)
                )}
              >
                <span className="text-sm font-semibold">{item.avatar}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">{item.name}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}

export default WorkspaceList;
