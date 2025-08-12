export default function useRouteData() {
  const route = useRoute();

  // Route Params
  function getParams(param: string): string;
  function getParams(params: string[]): string[];
  function getParams(paramOrParams: string | string[]) {
    if (typeof paramOrParams === "string") {
      return route.params?.[paramOrParams]?.toString() ?? "";
    }

    return paramOrParams.map((key) => route.params?.[key]?.toString() ?? "");
  }

  // Search (Query) Params
  function getSearchParams(param: string): string;
  function getSearchParams(params: string[]): string[];
  function getSearchParams(paramOrParams: string | string[]) {
    if (typeof paramOrParams === "string") {
      return route.query?.[paramOrParams]?.toString() ?? "";
    }

    return paramOrParams.map((key) => route.query?.[key]?.toString() ?? "");
  }

  return {
    getParams,
    getSearchParams,
    raw: route,
  };
}
