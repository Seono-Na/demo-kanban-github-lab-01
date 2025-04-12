import { useEffect, useState } from 'react';

import { getIssues } from '@/api/issueApi';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { Issue } from '@/types/githubTypes';

import { IssueCard } from './IssueCard';
import { IssueDetailModal } from './IssueDetailModal';

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
