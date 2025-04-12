type Props = {
  milestone: {
    title: string;
    open_issues: number;
  } | null;
};

export function IssueMilestone({ milestone }: Props) {
  return milestone ? (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">{milestone.title}</span>
      <span className="text-muted-foreground text-xs">
        {milestone.open_issues > 0 ? '진행 중' : '완료됨'}
      </span>
    </div>
  ) : (
    <p className="text-muted-foreground text-sm">마일스톤 없음</p>
  );
}
