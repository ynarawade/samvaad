import { createChannel, listChannels } from "@/app/router/channel";
import { createWorkspace, listWorkspace } from "@/app/router/workspace";

export const router = {
  workspace: {
    list: listWorkspace,
    create: createWorkspace,
  },
  channel: {
    create: createChannel,
    list: listChannels,
  },
};
