import { useEffect, useState } from 'react';

import { getIssues } from '@/api/github';

type Issue = {
  id: number;
  title: string;
  state: 'open' | 'closed';
  number: number;
  user: {
    login: string;
  };
};

export function IssueList() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getIssues();
        setIssues(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>불러오는 중...</p>;

  return (
    <ul className="space-y-2">
      {issues.map((issue) => (
        <li key={issue.id} className="rounded-lg border p-4 shadow-sm">
          <p className="font-bold">
            #{issue.number} - {issue.title}
          </p>
          <p className="text-sm text-gray-500">작성자: {issue.user.login}</p>
          <p className="text-sm text-gray-400">상태: {issue.state}</p>
        </li>
      ))}
    </ul>
  );
}
