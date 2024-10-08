import { useLocation, useParams } from "@remix-run/react";

export function useCurrentPageSlug() {
  const location = useLocation();
  const params = useParams();

  let currentPageSlug = location.pathname.substring(1);
  const routerSlug = params.slug;

  if (Array.isArray(routerSlug)) {
    return currentPageSlug.replace("*", routerSlug[0] || "");
  }

  if (routerSlug) {
    return currentPageSlug.replace(":slug", routerSlug);
  }

  return currentPageSlug.replace(":slug", "");
}