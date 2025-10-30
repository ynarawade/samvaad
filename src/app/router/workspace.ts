import { requiredAuthMiddleware } from "@/app/middlewares/auth";
import { base } from "@/app/middlewares/base";
import { requiredWorkspaceMiddleware } from "@/app/middlewares/workspace";
import type {
  KindeOrganization,
  KindeUser,
} from "@kinde-oss/kinde-auth-nextjs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import z from "zod";

export const workspaceList = base
  .use(requiredAuthMiddleware)
  .use(requiredWorkspaceMiddleware)
  .route({
    method: "GET",
    path: "/",
    summary: "lists all workspaces",
    tags: ["workspace"],
  })
  .input(z.void())
  .output(
    z.object({
      workspaces: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          avatar: z.string(),
        })
      ),
      user: z.custom<KindeUser<Record<string, unknown>>>(),
      currentWorkspace: z.custom<KindeOrganization<Record<string, unknown>>>(),
    })
  )
  .handler(async ({ context, errors }) => {
    const { getUserOrganizations } = getKindeServerSession();
    const organizations = await getUserOrganizations();

    if (!organizations || !organizations.orgs) {
      throw errors.FORBIDDEN();
    }
    return {
      workspaces: organizations.orgs.map((org) => ({
        id: org.code ?? "",
        name: org.name ?? "My Workspace",
        avatar: (org.name?.charAt(0) ?? "M").toUpperCase(),
      })),
      user: context.user,
      currentWorkspace: context.workspace,
    };
  });
