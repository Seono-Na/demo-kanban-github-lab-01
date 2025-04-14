export interface Issue {
  id: number;
  number: number;
  title: string;
  state: 'open' | 'closed';
  user: {
    login: string;
  };
}
export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

export interface Label {
  id: number;
  name: string;
  color: string;
  description?: string;
}
export interface Milestone {
  id: number;
  number: number;
  title: string;
  description: string;
  due_on: string;
  html_url: string;
  state: 'open' | 'closed';
  open_issues: number;
  closed_issues: number;
}
export interface IssueDetail {
  id: number;
  number: number;
  title: string;
  body: string | null;
  user: GitHubUser;
  created_at: string;
  updated_at: string;
  labels: Label[];
  assignees: GitHubUser[];
  milestone: Milestone | null;
}
export interface GitHubRateLimit {
  rate: {
    limit: number;
    remaining: number;
    reset: number;
  };
}

export interface CreateIssueParams {
  title: string;
  body?: string;
  labels?: string[];
  assignees?: string[];
}
