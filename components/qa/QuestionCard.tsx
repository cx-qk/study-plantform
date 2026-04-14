import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, User } from "lucide-react";

type QuestionCardProps = {
  id: string;
  title: string;
  author_name: string;
  created_at: string;
  answer_count: number;
  course_name: string | null;
};

export function QuestionCard({
  id,
  title,
  author_name,
  created_at,
  answer_count,
  course_name,
}: QuestionCardProps) {
  return (
    <Link href={`/qa/${id}`}>
      <Card className="transition-shadow hover:shadow-md">
        <CardContent className="py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold line-clamp-1">{title}</h3>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  {author_name}
                </span>
                <span>
                  {new Date(created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                {course_name && (
                  <Badge variant="outline" className="text-xs">
                    {course_name}
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground shrink-0">
              <MessageCircle className="h-4 w-4" />
              {answer_count}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
