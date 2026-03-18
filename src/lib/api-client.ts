const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

type RequestOptions = Omit<RequestInit, "body"> & {
  params?: Record<string, string>;
  body?: unknown;
};

class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data: unknown
  ) {
    super(`API Error ${status}: ${statusText}`);
    this.name = "ApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new ApiError(response.status, response.statusText, data);
  }

  if (response.status === 204) return undefined as T;
  return response.json();
}

function buildUrl(path: string, params?: Record<string, string>): string {
  const url = new URL(path, API_BASE_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.set(key, value)
    );
  }
  return url.toString();
}

function getHeaders(custom?: HeadersInit): Headers {
  const headers = new Headers(custom);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", `token d2122733a5174cb:968c276fa6e16b5`);
  }
  return headers;
}

export const apiClient = {
  get<T>(path: string, options?: RequestOptions): Promise<T> {
    const { params, ...init } = options ?? {};
    return fetch(buildUrl(path, params), {
      method: "GET",
      headers: getHeaders(init.headers),
    }).then(handleResponse<T>);
  },

  post<T>(path: string, options?: RequestOptions): Promise<T> {
    const { params, body, ...init } = options ?? {};
    return fetch(buildUrl(path, params), {
      ...init,
      method: "POST",
      headers: getHeaders(init.headers),
      body: body != null ? JSON.stringify(body) : undefined,
    }).then(handleResponse<T>);
  },

  put<T>(path: string, options?: RequestOptions): Promise<T> {
    const { params, body, ...init } = options ?? {};
    return fetch(buildUrl(path, params), {
      ...init,
      method: "PUT",
      headers: getHeaders(init.headers),
      body: body != null ? JSON.stringify(body) : undefined,
    }).then(handleResponse<T>);
  },

  patch<T>(path: string, options?: RequestOptions): Promise<T> {
    const { params, body, ...init } = options ?? {};
    return fetch(buildUrl(path, params), {
      ...init,
      method: "PATCH",
      headers: getHeaders(init.headers),
      body: body != null ? JSON.stringify(body) : undefined,
    }).then(handleResponse<T>);
  },

  delete<T>(path: string, options?: RequestOptions): Promise<T> {
    const { params, ...init } = options ?? {};
    return fetch(buildUrl(path, params), {
      method: "DELETE",
      headers: getHeaders(init.headers),
    }).then(handleResponse<T>);
  },
};

export { ApiError };
export type { RequestOptions };
