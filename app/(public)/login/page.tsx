import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";

export const metadata = {
  title: "Sign In - StudyPlatform",
  description: "Sign in to your StudyPlatform account",
};

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-8 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to continue your learning journey
          </p>
        </div>
        <GoogleSignInButton />
        <p className="text-center text-sm text-muted-foreground">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
