import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Code,
  Calculator,
  FlaskConical,
  Languages,
  Briefcase,
  Palette,
  Cog,
  Music,
  BookOpen,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  code: Code,
  calculator: Calculator,
  "flask-conical": FlaskConical,
  languages: Languages,
  briefcase: Briefcase,
  palette: Palette,
  cog: Cog,
  music: Music,
};

type Category = {
  id: string;
  name: string;
  icon: string | null;
};

export function CategoryGrid({ categories }: { categories: Category[] }) {
  if (categories.length === 0) return null;

  return (
    <section className="bg-muted/30 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Browse by Category
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon ?? ""] ?? BookOpen;
            return (
              <Link
                key={cat.id}
                href={`/courses?category=${encodeURIComponent(cat.name)}`}
              >
                <Card className="transition-shadow hover:shadow-md">
                  <CardContent className="flex flex-col items-center gap-3 py-6">
                    <Icon className="h-8 w-8 text-primary" />
                    <span className="text-sm font-medium">{cat.name}</span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
