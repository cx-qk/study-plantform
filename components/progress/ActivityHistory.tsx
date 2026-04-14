import { CheckCircle2 } from "lucide-react";

type Activity = {
  id: string;
  completed_at: string;
  lesson_title: string;
  course_title: string;
};

export function ActivityHistory({ activities }: { activities: Activity[] }) {
  if (activities.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No activity yet. Start learning to track your progress!</p>
    );
  }

  return (
    <div className="space-y-3">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start gap-3 rounded-lg border p-3"
        >
          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm">
              Completed <span className="font-medium">{activity.lesson_title}</span>{" "}
              in <span className="font-medium">{activity.course_title}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              {new Date(activity.completed_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
