import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Clock } from "lucide-react";

type CourseCardProps = {
  id: string;
  title: string;
  thumbnail_url: string | null;
  duration_minutes: number;
  category_name: string | null;
  lesson_count: number;
};

export function CourseCard({
  id,
  title,
  thumbnail_url,
  duration_minutes,
  category_name,
  lesson_count,
}: CourseCardProps) {
  return (
    <Link href={`/courses/${id}`}>
      <Card className="h-full transition-shadow hover:shadow-lg">
        <div className="h-40 rounded-t-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
          <BookOpen className="h-12 w-12 text-primary/40" />
        </div>
        <CardContent className="p-4">
          {category_name && (
            <Badge variant="secondary" className="mb-2">
              {category_name}
            </Badge>
          )}
          <h3 className="font-semibold line-clamp-2">{title}</h3>
          <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              {lesson_count} lessons
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {Math.round(duration_minutes / 60)}h
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
