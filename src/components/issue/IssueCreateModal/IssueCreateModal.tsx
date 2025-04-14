import { createIssue } from '@api/issueApi';
import { getLabels } from '@api/labelApi';
import { getUsers } from '@api/userApi';
import { Button } from '@shared/shadcn/ui/button';
import { Checkbox } from '@shared/shadcn/ui/checkbox';
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
    const fetchMeta = async () => {
      try {
        const [labelRes, userRes] = await Promise.all([
          getLabels(),
          getUsers(),
        ]);
        setLabels(labelRes);
        setUsers(userRes);
      } catch (err) {
        console.error('라벨 또는 유저 정보를 가져오는 데 실패했습니다.', err);
      }
    };
    if (open) fetchMeta();
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
        // 서버처리시간
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
            <div className="flex flex-wrap gap-2">
              {labels.map((label) => (
                <label
                  key={label.id}
                  className="flex items-center gap-1 text-sm"
                >
                  <Checkbox
                    checked={selectedLabels.includes(label.name)}
                    onCheckedChange={(checked) =>
                      setSelectedLabels((prev) =>
                        checked
                          ? [...prev, label.name]
                          : prev.filter((l) => l !== label.name)
                      )
                    }
                  />
                  <span
                    className="rounded px-2 py-0.5"
                    style={{ backgroundColor: `#${label.color}` }}
                  >
                    {label.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold">담당자 선택</h4>
            <div className="flex flex-wrap gap-2">
              {users.map((user) => (
                <label
                  key={user.id}
                  className="flex items-center gap-1 text-sm"
                >
                  <Checkbox
                    checked={selectedAssignees.includes(user.login)}
                    onCheckedChange={(checked) =>
                      setSelectedAssignees((prev) =>
                        checked
                          ? [...prev, user.login]
                          : prev.filter((u) => u !== user.login)
                      )
                    }
                  />
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="h-5 w-5 rounded-full"
                  />
                  {user.login}
                </label>
              ))}
            </div>
          </div>

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? '생성 중...' : '이슈 생성'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
