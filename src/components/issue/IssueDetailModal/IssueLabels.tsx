type Props = {
  labels: {
    id: number;
    name: string;
    color: string;
  }[];
};

export function IssueLabels({ labels }: Props) {
  return labels.length > 0 ? (
    <div className="flex flex-wrap gap-2">
      {labels.map((label) => (
        <span
          key={label.id}
          className="rounded-full px-2 py-1 text-xs"
          style={{
            backgroundColor: `#${label.color}`,
            color: 'white',
          }}
        >
          {label.name}
        </span>
      ))}
    </div>
  ) : (
    <p className="text-muted-foreground text-sm">라벨 없음</p>
  );
}
