import { getIssueDetail } from '@api/issueApi';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@shared/shadcn/ui/dialog';
import { Skeleton } from '@shared/shadcn/ui/skeleton';
import { formatRelativeTime } from '@shared/utils/date';
import { IssueDetail } from '@type/githubTypes';
import { useEffect, useState } from 'react';

import { IssueAssignees } from './IssueAssignees';
import { IssueLabels } from './IssueLabels';
import { IssueMilestone } from './IssueMilestone';

type Props = {
  issueNumber: number;
  onClose: () => void;
};

export function IssueDetailModal({ issueNumber, onClose }: Props) {
  const [issue, setIssue] = useState<IssueDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getIssueDetail(issueNumber);
        setIssue(data);
      } catch (error) {
        console.error('이슈 상세 정보를 가져오는 데 실패했습니다.', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [issueNumber]);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          {loading || !issue ? (
            <>
              <DialogTitle>
                <VisuallyHidden>이슈 상세 정보 로딩 중</VisuallyHidden>
              </DialogTitle>
              <DialogDescription>
                <VisuallyHidden>
                  로딩 중입니다. 잠시만 기다려 주세요.
                </VisuallyHidden>
              </DialogDescription>
            </>
          ) : (
            <>
              <DialogTitle className="text-xl">{issue.title}</DialogTitle>
              <DialogDescription className="text-muted-foreground text-sm">
                #{issue.number} • 작성자: {issue.user.login} •{' '}
                {formatRelativeTime(issue.created_at)}
              </DialogDescription>
            </>
          )}
        </DialogHeader>

        {loading || !issue ? (
          <Skeleton className="h-48 rounded-xl" />
        ) : (
          <>
            <div className="my-4 text-sm whitespace-pre-wrap">
              {issue.body ? (
                issue.body
              ) : (
                <p className="text-gray-400">내용이 없습니다.</p>
              )}
            </div>

            <div className="mt-4 space-y-4">
              <section>
                <h4 className="mb-1 text-sm font-semibold">라벨</h4>
                <IssueLabels labels={issue.labels} />
              </section>

              <section>
                <h4 className="mb-1 text-sm font-semibold">담당자</h4>
                <IssueAssignees assignees={issue.assignees} />
              </section>

              <section>
                <h4 className="mb-1 text-sm font-semibold">마일스톤</h4>
                <IssueMilestone milestone={issue.milestone} />
              </section>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
