import Link from "next/link";
import { BookOpen } from "lucide-react";

const footerLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
  { href: "/help", label: "Help Center" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
];

export function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-300">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Top row: logo + links */}
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg text-white"
          >
            <BookOpen className="h-5 w-5" />
            <span>StudyPlatform</span>
          </Link>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-zinc-700" />

        {/* Bottom row: copyright */}
        <div className="text-center text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} StudyPlatform. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
