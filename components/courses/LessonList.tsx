import { Clock, CheckCircle2, Circle } from "lucide-react";

type Lesson = {
  id: string;
  title: string;
  order: number;
  duration_minutes: number;
};

type LessonListProps = {
  lessons: Lesson[];
  completedLessonIds?: string[];
};

export function LessonList({
  lessons,
  completedLessonIds = [],
}: LessonListProps) {
  return (
    <div className="space-y-2">
      {lessons.map((lesson) => {
        const isCompleted = completedLessonIds.includes(lesson.id);
        return (
          <div
            key={lesson.id}
            className="flex items-center gap-3 rounded-lg border p-3"
          >
            {isCompleted ? (
              <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">
                {lesson.order}. {lesson.title}
              </p>
            </div>
            <span className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
              <Clock className="h-3 w-3" />
              {lesson.duration_minutes}m
            </span>
          </div>
        );
      })}
    </div>
  );
}
