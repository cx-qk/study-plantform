import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Clock } from "lucide-react";

type Course = {
  id: string;
  title: string;
  thumbnail_url: string | null;
  duration_minutes: number;
  categories: { name: string } | null;
  lesson_count: number;
};

export function CourseCarousel({ courses }: { courses: Course[] }) {
  if (courses.length === 0) return null;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Popular Courses
        </h2>
        <div className="mt-8 flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="shrink-0"
            >
              <Card className="w-72 transition-shadow hover:shadow-lg">
                <div className="h-40 rounded-t-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-primary/40" />
                </div>
                <CardContent className="p-4">
                  {course.categories && (
                    <Badge variant="secondary" className="mb-2">
                      {course.categories.name}
                    </Badge>
                  )}
                  <h3 className="font-semibold line-clamp-2">{course.title}</h3>
                  <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" />
                      {course.lesson_count} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {Math.round(course.duration_minutes / 60)}h
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
