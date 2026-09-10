import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware Link/router helpers — Link automatically prefixes hrefs with
// the current locale, and usePathname/useRouter strip/re-add the locale
// segment so callers work with locale-agnostic paths (e.g. "/vitalmed").
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
