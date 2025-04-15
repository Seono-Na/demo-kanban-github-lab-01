import { getLabels } from '@api/labelApi';
import { getUsers } from '@api/userApi';
import { GitHubUser, Label } from '@type/githubTypes';

export async function fetchMeta(): Promise<{
  labels: Label[];
  users: GitHubUser[];
}> {
  const [labelRes, userRes] = await Promise.all([getLabels(), getUsers()]);
  return {
    labels: labelRes,
    users: userRes,
  };
}
