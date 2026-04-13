"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPlan(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const targetDate = formData.get("target_date") as string;

  await supabase.from("study_plans").insert({
    user_id: user.id,
    title,
    description: description || null,
    target_date: targetDate || null,
  });

  revalidatePath("/study-plan");
}

export async function updatePlan(planId: string, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const targetDate = formData.get("target_date") as string;

  await supabase
    .from("study_plans")
    .update({
      title,
      description: description || null,
      target_date: targetDate || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", planId)
    .eq("user_id", user.id);

  revalidatePath("/study-plan");
}

export async function deletePlan(planId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  await supabase
    .from("study_plans")
    .delete()
    .eq("id", planId)
    .eq("user_id", user.id);

  revalidatePath("/study-plan");
}

export async function addCourseToPlan(planId: string, courseId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  await supabase.from("study_plan_items").insert({
    plan_id: planId,
    course_id: courseId,
  });

  revalidatePath("/study-plan");
}

export async function removePlanItem(itemId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  await supabase.from("study_plan_items").delete().eq("id", itemId);

  revalidatePath("/study-plan");
}
