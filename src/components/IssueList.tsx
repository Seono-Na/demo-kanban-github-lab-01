import { getIssues } from '@api/issueApi';
import { IssueDetailModal } from '@components/issue/IssueDetailModal';
import { Skeleton } from '@shared/shadcn/ui/skeleton';
import { Issue } from '@type/githubTypes';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { IssueCard } from './IssueCard';

export function IssueList() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { issueNumber } = useParams<{ issueNumber?: string }>();

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
    navigate(`/issues/${issueNumber}`);
  };

  const closeModal = () => {
    navigate('/');
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

      {issueNumber && (
        <IssueDetailModal
          issueNumber={Number(issueNumber)}
          onClose={closeModal}
        />
      )}
    </div>
  );
}