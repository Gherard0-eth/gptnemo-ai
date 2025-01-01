import { formatInTimeZone } from 'date-fns-tz';

interface Find {
  id: number;
  finder: string;
  island: string;
  worth: string;
  time: string;
  timestamp?: Date;
}

export const RecentFindEntry = ({ find }: { find: Find }) => {
  const formattedTime = find.timestamp 
    ? formatInTimeZone(find.timestamp, 'Europe/Rome', 'HH:mm:ss')
    : find.time;

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none">{find.finder}</p>
        <p className="text-sm text-muted-foreground">
          Found {find.worth} on {find.island}
        </p>
      </div>
      <p className="text-sm text-muted-foreground">{formattedTime}</p>
    </div>
  );
};