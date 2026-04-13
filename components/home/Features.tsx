import { Card, CardContent } from "@/components/ui/card";
import { CalendarCheck, BarChart3, MessageCircleQuestion } from "lucide-react";

const features = [
  {
    icon: CalendarCheck,
    title: "Structured Study Plans",
    description:
      "Create personalized study plans with goals and deadlines. Stay organized and on track with your learning.",
  },
  {
    icon: BarChart3,
    title: "Track Your Progress",
    description:
      "See how far you've come with visual progress indicators. Monitor your learning streak and activity history.",
  },
  {
    icon: MessageCircleQuestion,
    title: "Ask & Discuss",
    description:
      "Get help from fellow learners. Ask questions, share insights, and learn together as a community.",
  },
];

export function Features() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Why Choose Us
          </h2>
          <p className="mt-2 text-muted-foreground">
            Everything you need to succeed in your learning journey
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center">
              <CardContent className="flex flex-col items-center gap-4 py-8">
                <div className="rounded-full bg-primary/10 p-3">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
