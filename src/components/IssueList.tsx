// src/components/IssueList.tsx
import { useEffect, useState } from 'react';

import { getIssues } from '@/api/github';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { Issue } from '@/types/github';

import { IssueCard } from './IssueCard';

export function IssueList() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const data = await getIssues();
        setIssues(data);
      } catch (e) {
        console.error('Failed to fetch issues', e);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div>
      {issues.map((issue) => (
        <IssueCard
          key={issue.id}
          title={issue.title}
          number={issue.number}
          user={issue.user.login}
          state={issue.state}
        />
      ))}
    </div>
  );
}
