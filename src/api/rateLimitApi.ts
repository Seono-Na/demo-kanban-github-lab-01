import { GitHubRateLimit } from '@/types/githubTypes';

import { httpClient } from './httpClient';

export const fetchRateLimit = async () => {
  const res = await httpClient.get<GitHubRateLimit>('/rate_limit', false);
  return res.rate;
};
