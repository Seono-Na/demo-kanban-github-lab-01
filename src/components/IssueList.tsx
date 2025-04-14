import { getIssues } from '@api/issueApi';
import { IssueCreateModal } from '@components/issue/IssueCreateModal';
import { IssueDetailModal } from '@components/issue/IssueDetailModal';
import { Skeleton } from '@shared/shadcn/ui/skeleton';
import { Issue } from '@type/githubTypes';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/shared/shadcn/ui/button';

import { IssueCard } from './IssueCard';

export function IssueList() {
  const location = useLocation();
  const navigate = useNavigate();
  const { issueNumber } = useParams<{ issueNumber?: string }>();
  const isCreating = location.pathname === '/issues/new';

  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchIssues();
  }, [location.pathname]);

  const handleCardClick = (issueNumber: number) => {
    navigate(`/issues/${issueNumber}`);
  };

  const closeModal = () => {
    navigate('/');
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button onClick={() => navigate('/issues/new')}>+ 새 이슈 작성</Button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      ) : (
        <>
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
        </>
      )}

      {issueNumber && (
        <IssueDetailModal
          issueNumber={Number(issueNumber)}
          onClose={closeModal}
        />
      )}

      {isCreating && (
        <IssueCreateModal
          open={true}
          onClose={closeModal}
          onCreated={() => {
            fetchIssues();
            closeModal();
          }}
        />
      )}
    </div>
  );
}