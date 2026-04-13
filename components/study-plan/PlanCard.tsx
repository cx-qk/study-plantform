"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Trash2, BookOpen, X } from "lucide-react";
import { deletePlan, removePlanItem } from "@/app/actions/study-plan";

type PlanItem = {
  id: string;
  courses: { id: string; title: string } | null;
};

type PlanCardProps = {
  id: string;
  title: string;
  description: string | null;
  target_date: string | null;
  items: PlanItem[];
  completionPct: number;
};

export function PlanCard({
  id,
  title,
  description,
  target_date,
  items,
  completionPct,
}: PlanCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <CardTitle className="text-lg">{title}</CardTitle>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}
        </div>
        <form action={deletePlan.bind(null, id)}>
          <Button variant="ghost" size="icon" type="submit" className="shrink-0">
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </form>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {target_date && (
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              {new Date(target_date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          )}
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            {items.length} courses
          </span>
          <Badge variant="outline">{completionPct}% complete</Badge>
        </div>

        {items.length > 0 && (
          <div className="space-y-1">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-md border px-3 py-1.5 text-sm"
              >
                <span className="truncate">
                  {item.courses?.title ?? "Unknown course"}
                </span>
                <form action={removePlanItem.bind(null, item.id)}>
                  <Button variant="ghost" size="icon" type="submit" className="h-6 w-6">
                    <X className="h-3 w-3" />
                  </Button>
                </form>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
