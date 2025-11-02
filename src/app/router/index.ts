import { createWorkspace, workspaceList } from "@/app/router/workspace";

export const router = {
  workspace: {
    list: workspaceList,
    create: createWorkspace,
  },
};
