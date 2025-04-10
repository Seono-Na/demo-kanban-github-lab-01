const GITHUB_API = 'https://api.github.com';
const REPO_OWNER = 'nettee-space'; // organization 이름
const REPO_NAME = 'frontend-sample-monorepo-simple-crud'; // 레포 이름

const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_GITHUB_PAT}`,
  Accept: 'application/vnd.github+json',
};

export const getIssues = async () => {
  const response = await fetch(
    `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/issues`,
    { headers }
  );
  if (!response.ok) throw new Error('이슈를 불러오는데 실패했어요.');
  return response.json();
};
