import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { QuestionCard } from "@/components/qa/QuestionCard";
import { QuestionForm } from "@/components/qa/QuestionForm";
import { MessageCircleQuestion } from "lucide-react";

export const metadata = {
  title: "Q&A - StudyPlatform",
  description: "Ask questions and help others",
};

export default async function QAPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: questions } = await supabase
    .from("questions")
    .select(
      "id, title, created_at, user_id, course_id, profiles(display_name), courses(title)"
    )
    .order("created_at", { ascending: false });

  // Get answer counts
  const questionsWithCounts = await Promise.all(
    (questions ?? []).map(async (q) => {
      const { count } = await supabase
        .from("answers")
        .select("*", { count: "exact", head: true })
        .eq("question_id", q.id);
      return {
        ...q,
        answer_count: count ?? 0,
        author_name: q.profiles?.display_name ?? "Anonymous",
        course_name: q.courses?.title ?? null,
      };
    })
  );

  const { data: courses } = await supabase
    .from("courses")
    .select("id, title");

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Q&A</h1>
        <QuestionForm courses={courses ?? []} />
      </div>

      {questionsWithCounts.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center text-muted-foreground">
          <MessageCircleQuestion className="h-12 w-12 mb-4" />
          <p className="text-lg">No questions yet</p>
          <p className="mt-1 text-sm">
            Be the first to ask a question!
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {questionsWithCounts.map((q) => (
            <QuestionCard
              key={q.id}
              id={q.id}
              title={q.title}
              author_name={q.author_name}
              created_at={q.created_at}
              answer_count={q.answer_count}
              course_name={q.course_name}
            />
          ))}
        </div>
      )}
    </div>
  );
}
