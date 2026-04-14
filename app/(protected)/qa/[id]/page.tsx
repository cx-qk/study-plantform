import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnswerForm } from "@/components/qa/AnswerForm";
import { deleteQuestion, deleteAnswer } from "@/app/actions/qa";
import { Trash2, User, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function QuestionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: question } = await supabase
    .from("questions")
    .select("*, profiles(display_name), courses(title)")
    .eq("id", id)
    .single();

  if (!question) {
    notFound();
  }

  const { data: answers } = await supabase
    .from("answers")
    .select("*, profiles(display_name)")
    .eq("question_id", id)
    .order("created_at", { ascending: true });

  const isAuthor = user.id === question.user_id;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/qa"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Q&A
      </Link>

      {/* Question */}
      <Card>
        <CardContent className="py-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{question.title}</h1>
              {question.courses && (
                <Badge variant="outline" className="mt-2">
                  {question.courses.title}
                </Badge>
              )}
            </div>
            {isAuthor && (
              <form action={deleteQuestion.bind(null, id)}>
                <Button variant="ghost" size="icon" type="submit">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </form>
            )}
          </div>
          <p className="mt-4 whitespace-pre-wrap">{question.body}</p>
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-3.5 w-3.5" />
            <span>{question.profiles?.display_name ?? "Anonymous"}</span>
            <span>&middot;</span>
            <span>
              {new Date(question.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Answers */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">
          {answers?.length ?? 0} Answer{(answers?.length ?? 0) !== 1 ? "s" : ""}
        </h2>
        <div className="space-y-4">
          {(answers ?? []).map((answer) => (
            <Card key={answer.id}>
              <CardContent className="py-4">
                <div className="flex items-start justify-between gap-4">
                  <p className="flex-1 whitespace-pre-wrap">{answer.body}</p>
                  {user.id === answer.user_id && (
                    <form action={deleteAnswer.bind(null, answer.id, id)}>
                      <Button variant="ghost" size="icon" type="submit">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </form>
                  )}
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-3.5 w-3.5" />
                  <span>
                    {answer.profiles?.display_name ?? "Anonymous"}
                  </span>
                  <span>&middot;</span>
                  <span>
                    {new Date(answer.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Answer Form */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold mb-3">Your Answer</h3>
        <AnswerForm questionId={id} />
      </div>
    </div>
  );
}
