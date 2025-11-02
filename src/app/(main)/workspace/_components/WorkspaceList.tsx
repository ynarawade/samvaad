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
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";

const colorCombinations = [
  "bg-blue-400 hover:bg-blue-500 text-white",
  "bg-purple-400 hover:bg-purple-500 text-white",
  "bg-emerald-400 hover:bg-emerald-500 text-white",
  "bg-rose-400 hover:bg-rose-500 text-white",
  "bg-amber-400 hover:bg-amber-500 text-white",
  "bg-cyan-400 hover:bg-cyan-500 text-white",
  "bg-indigo-400 hover:bg-indigo-500 text-white",
  "bg-violet-400 hover:bg-violet-500 text-white",
  "bg-fuchsia-400 hover:bg-fuchsia-500 text-white",
  "bg-sky-400 hover:bg-sky-500 text-white",
  "bg-lime-400 hover:bg-lime-500 text-white",
  "bg-pink-400 hover:bg-pink-500 text-white",
  "bg-orange-400 hover:bg-orange-500 text-white",
];

function getWorkspaceColor(id: string) {
  const charSum = id
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const colorIndex = charSum % colorCombinations.length;
  return colorCombinations[colorIndex];
}

function WorkspaceList() {
  const {
    data: { workspaces, currentWorkspace },
  } = useSuspenseQuery(orpc.workspace.list.queryOptions());
  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex flex-col gap-2">
        {workspaces.map((workspace) => {
          const isActive = currentWorkspace.orgCode === workspace.id;
          return (
            <Tooltip key={workspace.id}>
              <TooltipTrigger asChild>
                <LoginLink orgCode={workspace.id}>
                  <Button
                    aria-label={`Switch to ${workspace.name}`}
                    aria-current={isActive ? "page" : undefined}
                    size={"icon"}
                    className={cn(
                      "size-12 transition-all duration-300 rounded-2xl relative group",
                      getWorkspaceColor(workspace.id),
                      isActive &&
                        "bg-primary text-primary-foreground hover:bg-primary"
                    )}
                  >
                    <span className="text-sm font-semibold">
                      {workspace.avatar}
                    </span>
                    {isActive && (
                      <span className="absolute -bottom-0.5 -right-0.5 size-4 bg-green-500 rounded-full flex items-center justify-center border-2 border-background">
                        <Check className="size-2.5 text-green-500" />
                      </span>
                    )}
                  </Button>
                </LoginLink>
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
