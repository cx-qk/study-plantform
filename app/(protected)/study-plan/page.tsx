import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PlanCard } from "@/components/study-plan/PlanCard";
import { PlanForm } from "@/components/study-plan/PlanForm";
import { AddCourseToPlan } from "@/components/study-plan/AddCourseToPlan";
import { CalendarCheck } from "lucide-react";

export const metadata = {
  title: "Study Plan - StudyPlatform",
  description: "Manage your study plans",
};

export default async function StudyPlanPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: plans } = await supabase
    .from("study_plans")
    .select("id, title, description, target_date, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("course_id, progress_pct, courses(id, title)")
    .eq("user_id", user.id);

  const enrolledCourses = (enrollments ?? [])
    .filter((e) => e.courses)
    .map((e) => ({ id: e.courses!.id, title: e.courses!.title }));

  // Get plan items for each plan
  const plansWithItems = await Promise.all(
    (plans ?? []).map(async (plan) => {
      const { data: items } = await supabase
        .from("study_plan_items")
        .select("id, course_id, courses(id, title)")
        .eq("plan_id", plan.id);

      // Calculate completion percentage based on enrollment progress
      const itemCourseIds = (items ?? []).map((i) => i.course_id);
      const relevantEnrollments = (enrollments ?? []).filter((e) =>
        itemCourseIds.includes(e.course_id)
      );
      const completionPct =
        relevantEnrollments.length > 0
          ? Math.round(
              relevantEnrollments.reduce((sum, e) => sum + e.progress_pct, 0) /
                relevantEnrollments.length
            )
          : 0;

      return { ...plan, items: items ?? [], completionPct };
    })
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Study Plans</h1>
        <PlanForm />
      </div>

      {plansWithItems.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center text-muted-foreground">
          <CalendarCheck className="h-12 w-12 mb-4" />
          <p className="text-lg">No study plans yet</p>
          <p className="mt-1 text-sm">
            Create a plan to organize your learning goals.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {plansWithItems.map((plan) => (
            <div key={plan.id} className="space-y-2">
              <PlanCard
                id={plan.id}
                title={plan.title}
                description={plan.description}
                target_date={plan.target_date}
                items={plan.items}
                completionPct={plan.completionPct}
              />
              <AddCourseToPlan
                planId={plan.id}
                enrolledCourses={enrolledCourses}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
