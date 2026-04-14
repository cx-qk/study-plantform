"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createQuestion(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const title = formData.get("title") as string;
  const body = formData.get("body") as string;
  const courseId = formData.get("course_id") as string;

  await supabase.from("questions").insert({
    user_id: user.id,
    title,
    body,
    course_id: courseId || null,
  });

  revalidatePath("/qa");
}

export async function createAnswer(questionId: string, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const body = formData.get("body") as string;

  await supabase.from("answers").insert({
    question_id: questionId,
    user_id: user.id,
    body,
  });

  revalidatePath(`/qa/${questionId}`);
}

export async function deleteQuestion(questionId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  await supabase
    .from("questions")
    .delete()
    .eq("id", questionId)
    .eq("user_id", user.id);

  revalidatePath("/qa");
  redirect("/qa");
}

export async function deleteAnswer(answerId: string, questionId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  await supabase
    .from("answers")
    .delete()
    .eq("id", answerId)
    .eq("user_id", user.id);

  revalidatePath(`/qa/${questionId}`);
}
