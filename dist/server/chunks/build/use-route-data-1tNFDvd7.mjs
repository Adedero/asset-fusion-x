import { M as useRoute } from './server.mjs';

function useRouteData() {
  const route = useRoute();
  function getParams(paramOrParams) {
    if (typeof paramOrParams === "string") {
      return route.params?.[paramOrParams]?.toString() ?? "";
    }
    return paramOrParams.map((key) => route.params?.[key]?.toString() ?? "");
  }
  function getSearchParams(paramOrParams) {
    if (typeof paramOrParams === "string") {
      return route.query?.[paramOrParams]?.toString() ?? "";
    }
    return paramOrParams.map((key) => route.query?.[key]?.toString() ?? "");
  }
  return {
    getParams,
    getSearchParams,
    raw: route
  };
}

export { useRouteData as u };
//# sourceMappingURL=use-route-data-1tNFDvd7.mjs.map
