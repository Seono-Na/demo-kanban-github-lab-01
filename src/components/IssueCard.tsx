import { Card, CardContent } from '@shared/shadcn/ui/card';

interface IssueCardProps {
  title: string;
  number: number;
  user: string;
  state: 'open' | 'closed';
}

export function IssueCard({ title, number, user, state }: IssueCardProps) {
  return (
    <Card className="mb-4 transition hover:shadow-lg">
      <CardContent className="space-y-2 py-4">
        <div className="text-lg font-semibold">{title}</div>
        <div className="text-muted-foreground text-sm">
          #{number} opened by {user} • {state}
        </div>
      </CardContent>
    </Card>
  );
}
