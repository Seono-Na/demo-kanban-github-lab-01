import { createIssue } from '@api/issueApi';
import { Button } from '@shared/shadcn/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@shared/shadcn/ui/dialog';
import { Input } from '@shared/shadcn/ui/input';
import { Textarea } from '@shared/shadcn/ui/textarea';
import { CreateIssueParams, GitHubUser, Label } from '@type/githubTypes';
import { useEffect, useState } from 'react';

import { MultiSelect } from '@/shared/MultiSelect';
import { fetchMeta } from '@/utils/fetchMeta';

type Props = {
  open: boolean;
  onClose: () => void;
  onCreated?: () => void;
};

export function IssueCreateModal({ open, onClose }: Props) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [labels, setLabels] = useState<Label[]>([]);
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    fetchMeta()
      .then(({ labels, users }) => {
        setLabels(labels);
        setUsers(users);
      })
      .catch((err) =>
        console.error('라벨 또는 유저 정보를 가져오는 데 실패했습니다.', err)
      );
  }, [open]);

  const handleSubmit = async () => {
    if (!title.trim()) return alert('제목을 입력해주세요.');
    setLoading(true);
    try {
      const params: CreateIssueParams = {
        title,
        body,
        labels: selectedLabels,
        assignees: selectedAssignees,
      };
      await createIssue(params);
      setTimeout(() => {
        onClose(); // TODO: 성공 메시지 띄우기
      }, 2000);
    } catch (err) {
      console.error('이슈 생성 실패', err);
      alert('이슈 생성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>새 이슈 작성</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="설명"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          <div>
            <h4 className="mb-2 text-sm font-semibold">라벨 선택</h4>
            <MultiSelect
              items={labels}
              selectedItems={selectedLabels}
              onChange={setSelectedLabels}
              getKey={(label) => label.name}
              renderLabel={(label) => (
                <span
                  className="rounded px-2 py-0.5"
                  style={{ backgroundColor: `#${label.color}` }}
                >
                  {label.name}
                </span>
              )}
            />
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold">담당자 선택</h4>
            <MultiSelect
              items={users}
              selectedItems={selectedAssignees}
              onChange={setSelectedAssignees}
              getKey={(user) => user.login}
              renderLabel={(user) => (
                <>
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="h-5 w-5 rounded-full"
                  />
                  {user.login}
                </>
              )}
            />
          </div>

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? '생성 중...' : '이슈 생성'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
