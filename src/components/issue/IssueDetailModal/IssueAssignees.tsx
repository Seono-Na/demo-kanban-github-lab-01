type Props = {
  assignees: {
    id: number;
    login: string;
    avatar_url: string;
  }[];
};

export function IssueAssignees({ assignees }: Props) {
  return assignees.length > 0 ? (
    <div className="flex flex-wrap items-center gap-3">
      {assignees.map((user) => (
        <div key={user.id} className="flex items-center gap-2">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="h-6 w-6 rounded-full"
          />
          <span className="text-sm">{user.login}</span>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-muted-foreground text-sm">담당자 없음</p>
  );
}
