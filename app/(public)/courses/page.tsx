import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { single } from "@/lib/supabase/helpers";
import { CourseCard } from "@/components/courses/CourseCard";
import { CourseFilter } from "@/components/courses/CourseFilter";

export const metadata = {
  title: "Courses - StudyPlatform",
  description: "Browse all available courses",
};

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q, category } = await searchParams;
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select("id, name");

  let query = supabase
    .from("courses")
    .select("id, title, thumbnail_url, duration_minutes, category_id, categories(name)");

  if (q) {
    query = query.ilike("title", `%${q}%`);
  }

  if (category) {
    const cat = (categories ?? []).find((c) => c.name === category);
    if (cat) {
      query = query.eq("category_id", cat.id);
    }
  }

  const { data: courses } = await query;

  const coursesWithCounts = await Promise.all(
    (courses ?? []).map(async (course) => {
      const { count } = await supabase
        .from("lessons")
        .select("*", { count: "exact", head: true })
        .eq("course_id", course.id);
      return { ...course, lesson_count: count ?? 0 };
    })
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
      <div className="mt-6">
        <Suspense>
          <CourseFilter categories={categories ?? []} />
        </Suspense>
      </div>
      {coursesWithCounts.length === 0 ? (
        <div className="mt-16 text-center text-muted-foreground">
          <p className="text-lg">No courses found.</p>
          <p className="mt-1 text-sm">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {coursesWithCounts.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              thumbnail_url={course.thumbnail_url}
              duration_minutes={course.duration_minutes}
              category_name={single(course.categories)?.name ?? null}
              lesson_count={course.lesson_count}
            />
          ))}
        </div>
      )}
    </div>
  );
}
