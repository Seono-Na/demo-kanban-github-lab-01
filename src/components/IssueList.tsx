import { getIssues } from '@api/issueApi';
import { IssueDetailModal } from '@components/issue/IssueDetailModal';
import { Skeleton } from '@shared/shadcn/ui/skeleton';
import { Issue } from '@type/githubTypes';
import { useEffect, useState } from 'react';

import { IssueCard } from './IssueCard';

export function IssueList() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIssueNumber, setSelectedIssueNumber] = useState<number | null>(
    null
  );

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

  const handleCardClick = (issueNumber: number) => {
    setSelectedIssueNumber(issueNumber);
  };

  const closeModal = () => {
    setSelectedIssueNumber(null);
  };

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
        <div key={issue.id} onClick={() => handleCardClick(issue.number)}>
          <IssueCard
            title={issue.title}
            number={issue.number}
            user={issue.user.login}
            state={issue.state}
          />
        </div>
      ))}

      {selectedIssueNumber && (
        <IssueDetailModal
          issueNumber={selectedIssueNumber}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
