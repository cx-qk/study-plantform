"use client";

import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { addCourseToPlan } from "@/app/actions/study-plan";

type Props = {
  planId: string;
  enrolledCourses: { id: string; title: string }[];
};

export function AddCourseToPlan({ planId, enrolledCourses }: Props) {
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");

  if (enrolledCourses.length === 0) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants({ variant: "outline", size: "sm" })}>
        <Plus className="mr-1 h-3 w-3" />
        Add Course
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Course to Plan</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Select value={courseId} onValueChange={(v) => setCourseId(v ?? "")}>
            <SelectTrigger>
              <SelectValue placeholder="Select a course" />
            </SelectTrigger>
            <SelectContent>
              {enrolledCourses.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            className="w-full"
            disabled={!courseId}
            onClick={async () => {
              await addCourseToPlan(planId, courseId);
              setOpen(false);
              setCourseId("");
            }}
          >
            Add to Plan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
