"use client";

import { orpc } from "@/lib/orpc";
import { useSuspenseQuery } from "@tanstack/react-query";

function WorkspaceHeader() {
  const {
    data: { currentWorkspace },
  } = useSuspenseQuery(orpc.channel.list.queryOptions());
  return <h2 className="text-lg font-bold">{currentWorkspace.orgName}</h2>;
}

export default WorkspaceHeader;
