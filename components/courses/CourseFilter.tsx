"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type CourseFilterProps = {
  categories: { id: string; name: string }[];
};

export function CourseFilter({ categories }: CourseFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") ?? "";
  const currentCategory = searchParams.get("category") ?? "";

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/courses?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search courses..."
          defaultValue={currentQuery}
          onChange={(e) => updateParams("q", e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={currentCategory === "" ? "default" : "outline"}
          size="sm"
          onClick={() => updateParams("category", "")}
        >
          All
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={currentCategory === cat.name ? "default" : "outline"}
            size="sm"
            onClick={() => updateParams("category", cat.name)}
          >
            {cat.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
