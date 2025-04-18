import { QueryClient, QueryFunction } from "@tanstack/react-query";

// Determinar la base URL de la API dependiendo del entorno
const getAPIBaseUrl = () => {
  if (import.meta.env.PROD) {
    return 'https://migradores.onrender.com';
  }
  return '';
};

const API_BASE_URL = getAPIBaseUrl();

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Agregar el prefijo de API_BASE_URL solo si estamos en producción y la URL no incluye http
  const fullUrl = (API_BASE_URL && !url.includes('://')) 
    ? `${API_BASE_URL}${url}` 
    : url;
    
  const res = await fetch(fullUrl, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const url = queryKey[0] as string;
    // Agregar el prefijo de API_BASE_URL solo si estamos en producción y la URL no incluye http
    const fullUrl = (API_BASE_URL && !url.includes('://')) 
      ? `${API_BASE_URL}${url}` 
      : url;

    const res = await fetch(fullUrl, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
