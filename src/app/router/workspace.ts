import { heavyWriteSecurityMiddleware } from "@/app/middlewares/arcjet/heavy-write";
import { standardSecurityMiddleware } from "@/app/middlewares/arcjet/standard";
import { requiredAuthMiddleware } from "@/app/middlewares/auth";
import { base } from "@/app/middlewares/base";
import { requiredWorkspaceMiddleware } from "@/app/middlewares/workspace";
import { WorkspaceSchema } from "@/app/schemas/workspace";
import type {
  KindeOrganization,
  KindeUser,
} from "@kinde-oss/kinde-auth-nextjs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { init, Organizations } from "@kinde/management-api-js";
import z from "zod";

export const workspaceList = base
  .use(requiredAuthMiddleware)
  .use(requiredWorkspaceMiddleware)
  .route({
    method: "GET",
    path: "/workspace",
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

export const createWorkspace = base
  .use(requiredAuthMiddleware)
  .use(requiredWorkspaceMiddleware)
  .use(standardSecurityMiddleware)
  .use(heavyWriteSecurityMiddleware)
  .route({
    method: "POST",
    path: "/workspace",
    summary: "creates a new workspace",
    tags: ["workspace"],
  })
  .input(WorkspaceSchema)
  .output(
    z.object({
      orgCode: z.string(),
      workspaceName: z.string(),
    })
  )
  .handler(async ({ input, context, errors }) => {
    //docs.kinde.com/api/v1/organization
    https: init(); // configs all our env variables kindeDomain,clientId,clientSecret.
    let data;
    try {
      data = await Organizations.createOrganization({
        requestBody: {
          name: input.name,
        },
      });
    } catch (error) {
      throw errors.FORBIDDEN();
    }
    if (!data.organization?.code) {
      throw errors.FORBIDDEN({
        message: "Org code not defined",
      });
    }
    // adding user to the org
    try {
      await Organizations.addOrganizationUsers({
        orgCode: data.organization.code,
        requestBody: {
          users: [
            {
              id: context.user.id,
              roles: ["admin"],
            },
          ],
        },
      });
    } catch (error) {
      throw errors.FORBIDDEN();
    }
    // updating tokens after creating organizations
    const { refreshTokens } = getKindeServerSession();
    await refreshTokens();

    return {
      orgCode: data.organization.code,
      workspaceName: input.name,
    };
  });
