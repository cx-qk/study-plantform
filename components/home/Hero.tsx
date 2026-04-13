"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Hero({ isLoggedIn }: { isLoggedIn: boolean }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/courses?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Learn Without Limits
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Discover courses, build study plans, track your progress, and
            achieve your learning goals — all in one place.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="mt-10 flex items-center gap-2 mx-auto max-w-md"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for courses..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>

          {/* CTA */}
          <div className="mt-8">
            <Button
              size="lg"
              onClick={() => router.push(isLoggedIn ? "/courses" : "/login")}
            >
              Get Started for Free
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
