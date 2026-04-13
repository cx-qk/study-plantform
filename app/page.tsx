import { createClient } from "@/lib/supabase/server";
import { Hero } from "@/components/home/Hero";
import { CourseCarousel } from "@/components/home/CourseCarousel";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { Features } from "@/components/home/Features";

export default async function HomePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: courses } = await supabase
    .from("courses")
    .select("id, title, thumbnail_url, duration_minutes, categories(name)")
    .limit(8);

  // Get lesson counts per course
  const coursesWithCounts = await Promise.all(
    (courses ?? []).map(async (course) => {
      const { count } = await supabase
        .from("lessons")
        .select("*", { count: "exact", head: true })
        .eq("course_id", course.id);
      return { ...course, lesson_count: count ?? 0 };
    })
  );

  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, icon");

  return (
    <>
      <Hero isLoggedIn={!!user} />
      <CourseCarousel courses={coursesWithCounts} />
      <CategoryGrid categories={categories ?? []} />
      <Features />
    </>
  );
}
