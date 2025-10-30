import { base } from "@/app/middlewares/base";
import type { KindeOrganization } from "@kinde-oss/kinde-auth-nextjs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const requiredWorkspaceMiddleware = base
  .$context<{
    workspace?: KindeOrganization<any> | null;
  }>()
  .middleware(async ({ context, next, errors }) => {
    const workspace = context.workspace ?? (await getWorkspace());

    if (!workspace) {
      throw errors.FORBIDDEN();
    }

    return next({
      context: {
        workspace,
      },
    });
  });

async function getWorkspace() {
  const { getOrganization } = getKindeServerSession();
  const organization = await getOrganization();
  return organization;
}
