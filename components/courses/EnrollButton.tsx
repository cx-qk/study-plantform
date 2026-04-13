"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { enrollInCourse } from "@/app/actions/enrollment";

type EnrollButtonProps = {
  courseId: string;
  isLoggedIn: boolean;
  isEnrolled: boolean;
  progressPct: number;
};

export function EnrollButton({
  courseId,
  isLoggedIn,
  isEnrolled,
  progressPct,
}: EnrollButtonProps) {
  const router = useRouter();

  if (!isLoggedIn) {
    return (
      <Button size="lg" onClick={() => router.push("/login")}>
        Enroll Now
      </Button>
    );
  }

  if (isEnrolled) {
    return (
      <div className="text-center">
        <Button size="lg" variant="secondary" onClick={() => router.push("/progress")}>
          Continue Learning
        </Button>
        <p className="mt-2 text-sm text-muted-foreground">
          {progressPct}% complete
        </p>
      </div>
    );
  }

  return (
    <form action={enrollInCourse.bind(null, courseId)}>
      <Button size="lg" type="submit">
        Enroll Now
      </Button>
    </form>
  );
}
