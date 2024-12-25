interface Hunter {
  id: number;
  name: string;
  finds: number;
  worth: string;
}

interface LeaderboardEntryProps {
  hunter: Hunter;
  position: number;
}

const getPositionEmoji = (position: number) => {
  switch (position) {
    case 1:
      return "🥇";
    case 2:
      return "🥈";
    case 3:
      return "🥉";
    default:
      return "";
  }
};

export const LeaderboardEntry = ({ hunter, position }: LeaderboardEntryProps) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="font-medium">{hunter.name}</div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">#{position}</span>
          <span>{getPositionEmoji(position)}</span>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{hunter.finds} finds</span>
        <span className="text-apple-accent font-medium">{hunter.worth}</span>
      </div>
    </div>
  );
};