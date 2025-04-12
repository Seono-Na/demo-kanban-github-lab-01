import { Issue, IssueDetail } from '@/types/githubTypes';

import { httpClient } from './httpClient';

export const getIssues = () => {
  return httpClient.get<Issue[]>('/issues');
};

export const getIssueDetail = (issueNumber: number) => {
  return httpClient.get<IssueDetail>(`/issues/${issueNumber}`);
};
