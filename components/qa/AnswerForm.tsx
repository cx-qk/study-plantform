"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createAnswer } from "@/app/actions/qa";

export function AnswerForm({ questionId }: { questionId: string }) {
  return (
    <form
      action={createAnswer.bind(null, questionId)}
      className="space-y-3"
    >
      <Textarea
        name="body"
        required
        placeholder="Write your answer..."
        rows={3}
      />
      <Button type="submit" size="sm">
        Post Answer
      </Button>
    </form>
  );
}
