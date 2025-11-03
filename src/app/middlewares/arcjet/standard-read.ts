import { base } from "@/app/middlewares/base";
import arcjet, { slidingWindow } from "@/lib/arcjet";
import type { KindeUser } from "@kinde-oss/kinde-auth-nextjs";

// factory function
const buildStandardReadAj = () =>
  arcjet.withRule(
    slidingWindow({
      mode: "LIVE",
      interval: "1m",
      max: 180,
    })
  );

export const standardReadSecurityMiddleware = base
  .$context<{
    request: Request;
    user: KindeUser<Record<string, unknown>>;
  }>()
  .middleware(async ({ context, next, errors }) => {
    const decision = await buildStandardReadAj().protect(context.request, {
      userId: context.user.id,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        throw errors.RATE_LIMITED();
      }
      throw errors.FORBIDDEN({ message: "Request blocked!" });
    }
    return next();
  });
