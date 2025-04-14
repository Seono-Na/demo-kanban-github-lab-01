const BASE_URL = 'https://api.github.com';
const REPO_OWNER = 'Seono-Na';
const REPO_NAME = 'demo-issue-api-playground';

const buildRepoPath = (path: string) =>
  `${BASE_URL}/repos/${REPO_OWNER}/${REPO_NAME}${path}`;

const createUrl = (path: string, isRepoScoped: boolean) =>
  isRepoScoped ? buildRepoPath(path) : `${BASE_URL}${path}`;

const createRequestOptions = (method: string, body?: unknown): RequestInit => ({
  method,
  body: body ? JSON.stringify(body) : undefined,
});

const request = async <T>(
  path: string,
  options?: RequestInit,
  isRepoScoped = true
): Promise<T> => {
  const url = createUrl(path, isRepoScoped);

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_PAT}`,
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};

export const httpClient = {
  get: <T>(path: string, isRepoScoped = true) =>
    request<T>(path, undefined, isRepoScoped),
  post: <T>(path: string, body?: unknown, isRepoScoped = true) =>
    request<T>(path, createRequestOptions('POST', body), isRepoScoped),
  patch: <T>(path: string, body?: unknown, isRepoScoped = true) =>
    request<T>(path, createRequestOptions('PATCH', body), isRepoScoped),
  delete: <T>(path: string, isRepoScoped = true) =>
    request<T>(path, createRequestOptions('DELETE'), isRepoScoped),
};
