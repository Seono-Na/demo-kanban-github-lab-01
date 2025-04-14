import { GitHubUser } from '@type/githubTypes';

import { httpClient } from './httpClient';

export const getUsers = () => {
  return httpClient.get<GitHubUser[]>('/collaborators');
};
