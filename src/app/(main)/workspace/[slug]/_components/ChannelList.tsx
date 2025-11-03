import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Hash } from "lucide-react";
import Link from "next/link";

const channelList = [
  { id: "1", name: "general" },
  { id: "2", name: "announcements" },
  { id: "3", name: "product-updates" },
  { id: "4", name: "design-team" },
  { id: "5", name: "engineering" },
  { id: "6", name: "marketing" },
  { id: "7", name: "sales-pipeline" },
  { id: "8", name: "customer-support" },
  { id: "9", name: "random" },
  { id: "10", name: "team-retro" },
];

function ChannelList() {
  return (
    <div className="space-y-0.5 py-1">
      {channelList.map((channel) => {
        return (
          <Link
            href={"#"}
            key={channel.id}
            className={buttonVariants({
              variant: "ghost",
              className: cn(
                "w-full justify-start px-2 py-1 h-7 text-muted-foreground hover:text-accent-foreground hover:bg-accent"
              ),
            })}
          >
            <Hash className="size-4 mr-1" />
            <span className="truncate">{channel.name}</span>
          </Link>
        );
      })}
    </div>
  );
}

export default ChannelList;
