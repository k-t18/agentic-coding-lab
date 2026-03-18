import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
  type UseMutationOptions,
  type QueryKey,
} from "@tanstack/react-query";
import { apiClient, type RequestOptions } from "./api-client";

/**
 * Generic GET query hook.
 * Usage: useApiQuery<User[]>(['users'], '/api/users')
 */
export function useApiQuery<T>(
  queryKey: QueryKey,
  path: string,
  requestOptions?: RequestOptions,
  queryOptions?: Omit<UseQueryOptions<T>, "queryKey" | "queryFn">,
) {
  return useQuery<T>({
    queryKey,
    queryFn: () => apiClient.get<T>(path, requestOptions),
    ...queryOptions,
  });
}

/**
 * Generic POST mutation hook.
 * Usage: const { mutate } = useApiMutation<User, CreateUserDto>('/api/users')
 */
export function useApiMutation<TResponse, TBody = unknown>(
  path: string,
  options?: {
    method?: "POST" | "PUT" | "PATCH" | "DELETE";
    invalidateKeys?: QueryKey[];
    requestOptions?: Omit<RequestOptions, "body">;
    mutationOptions?: Omit<
      UseMutationOptions<TResponse, Error, TBody>,
      "mutationFn"
    >;
  },
) {
  const queryClient = useQueryClient();
  const method = options?.method ?? "POST";

  const mutationFn = (body: TBody) => {
    const fn = apiClient[method.toLowerCase() as Lowercase<typeof method>] as (
      path: string,
      options?: RequestOptions,
    ) => Promise<TResponse>;

    return fn(path, { ...options?.requestOptions, body });
  };

  return useMutation<TResponse, Error, TBody>({
    mutationFn,
    onSuccess: (...args) => {
      options?.invalidateKeys?.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key }),
      );
      options?.mutationOptions?.onSuccess?.(...args);
    },
    ...options?.mutationOptions,
  });
}
