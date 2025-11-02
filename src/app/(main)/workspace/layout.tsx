import CreateWrokspaceBtn from "@/app/(main)/workspace/_components/CreateWrokspaceBtn";
import UserNav from "@/app/(main)/workspace/_components/UserNav";
import WorkspaceList from "@/app/(main)/workspace/_components/WorkspaceList";
import { orpc } from "@/lib/orpc";
import { getQueryClient, HydrateClient } from "@/lib/query/hydration";
import { ReactNode } from "react";

async function WrokSpaceLayout({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(orpc.workspace.list.queryOptions());

  return (
    <div className="flex w-full h-screen">
      <div className="flex h-full w-16 flex-col items-start bg-secondary py-3 px-2 border-r border-border">
        <HydrateClient client={queryClient}>
          <WorkspaceList />
        </HydrateClient>
        <div className="mt-4 py-4 border-t border-border">
          <CreateWrokspaceBtn />
        </div>
        <div className="mt-auto">
          <HydrateClient client={queryClient}>
            <UserNav />
          </HydrateClient>
        </div>
      </div>
      {children}
    </div>
  );
}

export default WrokSpaceLayout;
