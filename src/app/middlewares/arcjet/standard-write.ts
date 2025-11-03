import { base } from "@/app/middlewares/base";
import arcjet, { slidingWindow } from "@/lib/arcjet";
import type { KindeUser } from "@kinde-oss/kinde-auth-nextjs";

// factory function
const buildStandardWriteAj = () =>
  arcjet.withRule(
    slidingWindow({
      mode: "LIVE",
      interval: "1m",
      max: 10,
    })
  );

export const standardWriteSecurityMiddleware = base
  .$context<{
    request: Request;
    user: KindeUser<Record<string, unknown>>;
  }>()
  .middleware(async ({ context, next, errors }) => {
    const decision = await buildStandardWriteAj().protect(context.request, {
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
