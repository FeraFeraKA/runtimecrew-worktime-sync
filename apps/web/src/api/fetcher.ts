type TFetcherActions = "GET" | "POST" | "PATCH" | "DELETE";

interface IFetcherParams {
  url: string;
  method: TFetcherActions;
  body?: unknown;
  signal?: AbortSignal;
}

interface IErrorData {
  error?: string;
  message?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "";

const getRequestUrl = (url: string) => {
  if (/^https?:\/\//.test(url)) {
    return url;
  }

  const path = url.startsWith("/") ? url : `/${url}`;

  return `${API_BASE_URL}${path}`;
};

export const fetcher = async <T>({
  url,
  method,
  body = undefined,
  signal,
}: IFetcherParams): Promise<T> => {
  const response = await fetch(getRequestUrl(url), {
    method,
    body: body === undefined ? undefined : JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    signal,
  });

  const text = await response.text();
  const data = text.length > 0 ? (JSON.parse(text) as unknown) : undefined;

  if (!response.ok) {
    const errorData = data as IErrorData | undefined;

    throw new Error(
      errorData?.error ?? errorData?.message ?? "Request failed",
    );
  }

  return data as T;
};
