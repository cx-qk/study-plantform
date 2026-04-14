"use client";

import { Clock, CheckCircle2, Circle } from "lucide-react";
import { toggleLessonComplete } from "@/app/actions/progress";

type Lesson = {
  id: string;
  title: string;
  order: number;
  duration_minutes: number;
};

type Props = {
  lessons: Lesson[];
  courseId: string;
  completedLessonIds: string[];
};

export function LessonListInteractive({
  lessons,
  courseId,
  completedLessonIds,
}: Props) {
  return (
    <div className="space-y-2">
      {lessons.map((lesson) => {
        const isCompleted = completedLessonIds.includes(lesson.id);
        return (
          <form
            key={lesson.id}
            action={toggleLessonComplete.bind(
              null,
              lesson.id,
              courseId,
              isCompleted
            )}
          >
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg border p-3 text-left hover:bg-accent transition-colors"
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
            </button>
          </form>
        );
      })}
    </div>
  );
}
