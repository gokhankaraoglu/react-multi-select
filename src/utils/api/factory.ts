import { QueryKey, useQuery } from "@tanstack/react-query";
import { get } from ".";

export function useGet<T>(path: string, queryKey?: QueryKey) {
  // We are using path as a query key if queryKey is not provided
  const fetchQueryKey: QueryKey = queryKey || [{ path }];
  const { isError, data, isLoading, error } = useQuery({
    queryKey: fetchQueryKey,
    queryFn: () => get<T>({ path }),
  });

  return { isError, data, isLoading, error };
}
