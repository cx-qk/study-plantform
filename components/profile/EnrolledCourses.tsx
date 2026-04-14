import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen } from "lucide-react";

type Enrollment = {
  course_id: string;
  progress_pct: number;
  course_title: string;
};

export function EnrolledCourses({
  enrollments,
}: {
  enrollments: Enrollment[];
}) {
  if (enrollments.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        <BookOpen className="h-8 w-8 mx-auto mb-2" />
        <p>No courses enrolled yet.</p>
        <Link href="/courses" className="text-sm text-primary hover:underline">
          Browse courses
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {enrollments.map((e) => (
        <Card key={e.course_id}>
          <CardContent className="py-3">
            <div className="flex items-center justify-between mb-2">
              <Link
                href={`/courses/${e.course_id}`}
                className="text-sm font-medium hover:underline"
              >
                {e.course_title}
              </Link>
              <span className="text-sm text-muted-foreground">
                {e.progress_pct}%
              </span>
            </div>
            <Progress value={e.progress_pct} className="h-2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
