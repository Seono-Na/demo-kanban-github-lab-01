const BASE_URL = 'https://api.github.com';
const REPO_OWNER = 'Seono-Na';
const REPO_NAME = 'demo-issue-api-playground';

const buildRepoPath = (path: string) => {
  return `${BASE_URL}/repos/${REPO_OWNER}/${REPO_NAME}${path}`;
};

const request = async <T>(url: string, options?: RequestInit): Promise<T> => {
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
    request<T>(isRepoScoped ? buildRepoPath(path) : path),
  post: <T>(path: string, body?: unknown, isRepoScoped = true) =>
    request<T>(isRepoScoped ? buildRepoPath(path) : path, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),
  patch: <T>(path: string, body?: unknown, isRepoScoped = true) =>
    request<T>(isRepoScoped ? buildRepoPath(path) : path, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    }),
  delete: <T>(path: string, isRepoScoped = true) =>
    request<T>(isRepoScoped ? buildRepoPath(path) : path, {
      method: 'DELETE',
    }),
};
