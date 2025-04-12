import { useEffect, useState } from 'react';

import { getIssueDetail } from '@/api/issueApi';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { formatRelativeTime } from '@/shared/utils/date';
import { IssueDetail } from '@/types/githubTypes';

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
        {loading || !issue ? (
          <Skeleton className="h-48 rounded-xl" />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">{issue.title}</DialogTitle>
            </DialogHeader>
            <div className="text-muted-foreground mb-2 text-sm">
              #{issue.number} • 작성자: {issue.user.login} •{' '}
              {formatRelativeTime(issue.created_at)}
            </div>
            <div className="my-4 text-sm whitespace-pre-wrap">
              {issue.body ? (
                issue.body
              ) : (
                <p className="text-gray-400">내용이 없습니다.</p>
              )}
            </div>
            {/* 추가 정보: 라벨, 담당자, 마일스톤 등은 여기에 */}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
