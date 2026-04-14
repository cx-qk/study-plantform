import { Flame } from "lucide-react";

export function StreakBadge({ streak }: { streak: number }) {
  if (streak === 0) {
    return (
      <div className="flex items-center gap-2 rounded-lg border p-4">
        <Flame className="h-6 w-6 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">No active streak</p>
          <p className="text-xs text-muted-foreground">
            Complete a lesson today to start your streak!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-900 dark:bg-orange-950">
      <Flame className="h-6 w-6 text-orange-500" />
      <div>
        <p className="text-sm font-medium">
          {streak} day{streak !== 1 ? "s" : ""} streak!
        </p>
        <p className="text-xs text-muted-foreground">
          Keep going to maintain your learning streak.
        </p>
      </div>
    </div>
  );
}
