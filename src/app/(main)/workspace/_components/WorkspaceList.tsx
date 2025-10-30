"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { orpc } from "@/lib/orpc";
import { cn } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";

const colorCombinations = [
  "bg-blue-500 hover:bg-blue-600 text-white",
  "bg-purple-500 hover:bg-purple-600 text-white",
  "bg-emerald-500 hover:bg-emerald-600 text-white",
  "bg-rose-500 hover:bg-rose-600 text-white",
  "bg-amber-500 hover:bg-amber-600 text-white",
  "bg-cyan-500 hover:bg-cyan-600 text-white",
  "bg-indigo-500 hover:bg-indigo-600 text-white",
];

function getWorkspaceColor(id: string) {
  const colorIndex = Number(id) % colorCombinations.length;
  return colorCombinations[colorIndex];
}

function WorkspaceList() {
  const {
    data: { workspaces, currentWorkspace },
  } = useSuspenseQuery(orpc.workspace.list.queryOptions());
  return (
    <TooltipProvider>
      <div className="flex flex-col gap-2">
        {workspaces.map((workspace) => {
          const isActive = currentWorkspace.orgCode === workspace.id;
          return (
            <Tooltip key={workspace.id}>
              <TooltipTrigger asChild>
                <Button
                  size={"icon"}
                  className={cn(
                    "size-12 transition-all duration-300 rounded-2xl",
                    getWorkspaceColor(workspace.id),
                    isActive && "rounded-3xl"
                  )}
                >
                  <span className="text-sm font-semibold">
                    {workspace.avatar}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                {workspace.name}
                {isActive && "(Current)"}{" "}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}

export default WorkspaceList;
