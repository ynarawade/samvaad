import CreateWrokspaceBtn from "@/app/(main)/workspace/_components/CreateWrokspaceBtn";
import UserNav from "@/app/(main)/workspace/_components/UserNav";
import WorkspaceList from "@/app/(main)/workspace/_components/WorkspaceList";
import { ReactNode } from "react";

function WrokSpace({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full h-screen">
      <div className="flex h-full w-16 flex-col items-start bg-secondary py-3 px-2 border-r border-border">
        <WorkspaceList />
        <div className="mt-4 py-4 border-t border-border">
          <CreateWrokspaceBtn />
        </div>
        <div className="mt-auto">
          <UserNav />
        </div>
      </div>
    </div>
  );
}

export default WrokSpace;
