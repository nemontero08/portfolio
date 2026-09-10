import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  // Both locales always carry a path prefix (/en/..., /es/...), including
  // the default — this is what makes "/" redirect to "/en" rather than
  // rendering English unprefixed at the root.
  localePrefix: "always",
});
