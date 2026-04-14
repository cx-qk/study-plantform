"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function toggleLessonComplete(
  lessonId: string,
  courseId: string,
  isCompleted: boolean
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  if (isCompleted) {
    // Remove completion
    await supabase
      .from("progress_records")
      .delete()
      .eq("user_id", user.id)
      .eq("lesson_id", lessonId);
  } else {
    // Add completion
    await supabase.from("progress_records").insert({
      user_id: user.id,
      lesson_id: lessonId,
      course_id: courseId,
    });
  }

  // Recalculate enrollment progress
  const { count: totalLessons } = await supabase
    .from("lessons")
    .select("*", { count: "exact", head: true })
    .eq("course_id", courseId);

  const { count: completedLessons } = await supabase
    .from("progress_records")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("course_id", courseId);

  const progressPct =
    totalLessons && totalLessons > 0
      ? Math.round(((completedLessons ?? 0) / totalLessons) * 100)
      : 0;

  await supabase
    .from("enrollments")
    .update({ progress_pct: progressPct })
    .eq("user_id", user.id)
    .eq("course_id", courseId);

  revalidatePath(`/courses/${courseId}`);
  revalidatePath("/progress");
}
