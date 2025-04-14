import { CreateIssueParams, Issue, IssueDetail } from '@type/githubTypes';

import { httpClient } from './httpClient';

export const getIssues = () => {
  return httpClient.get<Issue[]>('/issues');
};

export const getIssueDetail = (issueNumber: number) => {
  return httpClient.get<IssueDetail>(`/issues/${issueNumber}`);
};

export const createIssue = (params: CreateIssueParams) => {
  return httpClient.post('/issues', params);
};
