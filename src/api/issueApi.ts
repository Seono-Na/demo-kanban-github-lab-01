import { Issue } from '@/types/githubTypes';

import { httpClient } from './httpClient';

const BASE_URL = 'https://api.github.com';
const REPO_OWNER = 'nettee-org';
const REPO_NAME = 'demo-kanban-github-lab';

export const getIssues = () => {
  const url = `${BASE_URL}/repos/${REPO_OWNER}/${REPO_NAME}/issues`;
  return httpClient<Issue[]>(url);
};
