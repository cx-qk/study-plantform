import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { single } from "@/lib/supabase/helpers";
import { Badge } from "@/components/ui/badge";
import { LessonList } from "@/components/courses/LessonList";
import { LessonListInteractive } from "@/components/courses/LessonListInteractive";
import { EnrollButton } from "@/components/courses/EnrollButton";
import { BookOpen, Clock } from "lucide-react";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: course } = await supabase
    .from("courses")
    .select("*, categories(name)")
    .eq("id", id)
    .single();

  if (!course) {
    notFound();
  }

  const { data: lessons } = await supabase
    .from("lessons")
    .select("id, title, order, duration_minutes")
    .eq("course_id", id)
    .order("order");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let enrollment = null;
  let completedLessonIds: string[] = [];

  if (user) {
    const { data: enrollmentData } = await supabase
      .from("enrollments")
      .select("id, progress_pct")
      .eq("user_id", user.id)
      .eq("course_id", id)
      .single();
    enrollment = enrollmentData;

    if (enrollment) {
      const { data: progress } = await supabase
        .from("progress_records")
        .select("lesson_id")
        .eq("user_id", user.id)
        .eq("course_id", id);
      completedLessonIds = (progress ?? []).map((p) => p.lesson_id);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Course Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex-1">
          {single(course.categories) && (
            <Badge variant="secondary" className="mb-3">
              {single(course.categories)!.name}
            </Badge>
          )}
          <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
          <p className="mt-3 text-muted-foreground">{course.description}</p>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {lessons?.length ?? 0} lessons
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {Math.round(course.duration_minutes / 60)}h total
            </span>
          </div>
        </div>
        <EnrollButton
          courseId={id}
          isLoggedIn={!!user}
          isEnrolled={!!enrollment}
          progressPct={enrollment?.progress_pct ?? 0}
        />
      </div>

      {/* Lessons */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Course Content</h2>
        {enrollment ? (
          <LessonListInteractive
            lessons={lessons ?? []}
            courseId={id}
            completedLessonIds={completedLessonIds}
          />
        ) : (
          <LessonList lessons={lessons ?? []} />
        )}
      </div>
    </div>
  );
}
