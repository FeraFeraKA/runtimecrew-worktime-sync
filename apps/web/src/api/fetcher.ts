type TFetcherActions = "GET" | "POST" | "PATCH" | "DELETE";

interface IFetcherParams {
  url: string;
  method: TFetcherActions;
  body?: unknown;
  signal?: AbortSignal;
}

interface IErrorData {
  error: string;
}

export const fetcher = async <T>({
  url,
  method,
  body = undefined,
  signal,
}: IFetcherParams): Promise<T> => {
  const response = await fetch(`http://localhost:5173/${url}`, {
    method,
    body: body === undefined ? undefined : JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    signal,
  });

  const data = await response.json();

  if (!response.ok) {
    const errorData = data as IErrorData;

    throw new Error(errorData.error);
  }

  return data;
};
