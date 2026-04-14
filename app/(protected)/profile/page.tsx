import { createClient } from "@/lib/supabase/server";
import { single } from "@/lib/supabase/helpers";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EnrolledCourses } from "@/components/profile/EnrolledCourses";
import { Settings } from "@/components/profile/Settings";
import { LogOut, Mail } from "lucide-react";

export const metadata = {
  title: "Profile - StudyPlatform",
  description: "Your profile and settings",
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, email, avatar_url")
    .eq("id", user.id)
    .single();

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("course_id, progress_pct, courses(title)")
    .eq("user_id", user.id);

  const enrollmentList = (enrollments ?? [])
    .filter((e) => e.courses)
    .map((e) => ({
      course_id: e.course_id,
      progress_pct: e.progress_pct,
      course_title: single(e.courses)?.title ?? "Unknown",
    }));

  const displayName =
    profile?.display_name || user.user_metadata?.full_name || "User";
  const email = profile?.email || user.email || "";
  const avatarUrl =
    profile?.avatar_url || user.user_metadata?.avatar_url || "";

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Profile</h1>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {/* Profile Info */}
        <Card className="md:col-span-1">
          <CardContent className="flex flex-col items-center py-8">
            <Avatar className="h-20 w-20">
              <AvatarImage src={avatarUrl} alt={displayName} />
              <AvatarFallback className="text-2xl">
                {displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h2 className="mt-4 text-lg font-semibold">{displayName}</h2>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              {email}
            </p>
            <form action="/auth/signout" method="POST" className="mt-6 w-full">
              <Button variant="outline" className="w-full" type="submit">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Enrolled Courses */}
          <Card>
            <CardHeader>
              <CardTitle>Enrolled Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <EnrolledCourses enrollments={enrollmentList} />
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <Settings displayName={displayName} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
