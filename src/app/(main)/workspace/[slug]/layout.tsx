import ChannelList from "@/app/(main)/workspace/[slug]/_components/ChannelList";
import CreateNewChannel from "@/app/(main)/workspace/[slug]/_components/CreateNewChannel";
import MembersList from "@/app/(main)/workspace/[slug]/_components/MembersList";
import WorkspaceHeader from "@/app/(main)/workspace/[slug]/_components/WorkspaceHeader";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { ReactNode } from "react";

function ChannelListLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex h-full w-80 flex-col bg-secondary border-r border-border">
        {/* Header */}
        <div className="flex items-center w-full px-4 h-14 border-b border-border">
          <WorkspaceHeader />
        </div>
        <div className="px-4 py-2">
          <CreateNewChannel />
        </div>
        {/* Channel List */}
        <div className="flex-1 overflow-y-auto px-4">
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium text-muted-foreground px-2 py-1 hover:text-accent-foreground">
              Main
              <ChevronDown className="size-4 transition-transform duration-300" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <ChannelList />
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Members List */}
        <div className="px-4 py-2 border-t border-border">
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium text-muted-foreground px-2 py-1 hover:text-accent-foreground [&[data-state=open]>svg]:rotate-180">
              Members
              <ChevronUp className="size-4 transition-transform duration-300" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <MembersList />
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </>
  );
}

export default ChannelListLayout;
