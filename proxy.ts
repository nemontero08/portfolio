import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match every path except Next internals and files with an extension
  // (static assets served from public/).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
