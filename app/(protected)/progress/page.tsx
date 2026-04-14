import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ActivityHistory } from "@/components/progress/ActivityHistory";
import { StreakBadge } from "@/components/progress/StreakBadge";
import { BookOpen, CheckCircle2, TrendingUp } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Progress - StudyPlatform",
  description: "Track your learning progress",
};

export default async function ProgressPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Get enrollments with course info
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("id, progress_pct, course_id, courses(title)")
    .eq("user_id", user.id);

  // Get total completed lessons
  const { count: completedCount } = await supabase
    .from("progress_records")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  // Get recent activity
  const { data: recentProgress } = await supabase
    .from("progress_records")
    .select("id, completed_at, lesson_id, course_id, lessons(title), courses(title)")
    .eq("user_id", user.id)
    .order("completed_at", { ascending: false })
    .limit(10);

  const activities = (recentProgress ?? []).map((p) => ({
    id: p.id,
    completed_at: p.completed_at,
    lesson_title: p.lessons?.title ?? "Unknown lesson",
    course_title: p.courses?.title ?? "Unknown course",
  }));

  // Calculate streak
  const { data: allProgress } = await supabase
    .from("progress_records")
    .select("completed_at")
    .eq("user_id", user.id)
    .order("completed_at", { ascending: false });

  let streak = 0;
  if (allProgress && allProgress.length > 0) {
    const activeDays = new Set(
      allProgress.map((p) =>
        new Date(p.completed_at).toISOString().slice(0, 10)
      )
    );
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().slice(0, 10);
      if (activeDays.has(dateStr)) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
  }

  const totalEnrolled = enrollments?.length ?? 0;
  const overallPct =
    totalEnrolled > 0
      ? Math.round(
          (enrollments ?? []).reduce((sum, e) => sum + e.progress_pct, 0) /
            totalEnrolled
        )
      : 0;

  if (totalEnrolled === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight">Progress</h1>
        <div className="mt-16 flex flex-col items-center text-center text-muted-foreground">
          <TrendingUp className="h-12 w-12 mb-4" />
          <p className="text-lg">No courses enrolled yet</p>
          <p className="mt-1 text-sm">
            <Link href="/courses" className="text-primary hover:underline">
              Browse courses
            </Link>{" "}
            to start learning.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Progress</h1>

      {/* Stats Overview */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-3 py-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <div>
              <p className="text-2xl font-bold">{totalEnrolled}</p>
              <p className="text-xs text-muted-foreground">Enrolled Courses</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 py-4">
            <CheckCircle2 className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-2xl font-bold">{completedCount ?? 0}</p>
              <p className="text-xs text-muted-foreground">
                Completed Lessons
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 py-4">
            <TrendingUp className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-2xl font-bold">{overallPct}%</p>
              <p className="text-xs text-muted-foreground">
                Overall Completion
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Streak */}
      <div className="mt-6">
        <StreakBadge streak={streak} />
      </div>

      {/* Per-course progress */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Course Progress</h2>
        <div className="space-y-4">
          {(enrollments ?? []).map((enrollment) => (
            <Card key={enrollment.id}>
              <CardContent className="py-4">
                <div className="flex items-center justify-between mb-2">
                  <Link
                    href={`/courses/${enrollment.course_id}`}
                    className="text-sm font-medium hover:underline"
                  >
                    {enrollment.courses?.title ?? "Unknown course"}
                  </Link>
                  <span className="text-sm text-muted-foreground">
                    {enrollment.progress_pct}%
                  </span>
                </div>
                <Progress value={enrollment.progress_pct} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Activity History */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ActivityHistory activities={activities} />
      </div>
    </div>
  );
}
