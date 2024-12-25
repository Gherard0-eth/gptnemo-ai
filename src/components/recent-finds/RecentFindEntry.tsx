interface Find {
  id: number;
  finder: string;
  island: string;
  worth: string;
  time: string;
}

interface RecentFindEntryProps {
  find: Find;
}

export const RecentFindEntry = ({ find }: RecentFindEntryProps) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="font-medium">{find.finder}</div>
        <div className="text-sm text-muted-foreground">{find.time}</div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <div className="text-muted-foreground">{find.island}</div>
        <div className="text-apple-accent">{find.worth}</div>
      </div>
    </div>
  );
};