"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthCard } from "@/components/AuthCard";
import { PasswordInput } from "@/components/PasswordInput";
import { SocialAuthButtons } from "@/components/SocialAuthButtons";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        if (result.error === "CredentialsSignin") {
          toast.error("Invalid email or password.");
        } else {
          setError(result.error);
          toast.error("Login failed. See details below.");
        }
        return;
      }

      router.push("/");
      toast.success("Logged in successfully.");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      const msg = error?.message || "Something went wrong. Please try again.";
      setError(msg);
      toast.error("Login failed. See details below.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    signIn("google", {
      callbackUrl: "/",
    });
  };
  
  return (
    <AuthCard
      heading="Welcome back"
      subheading="Log in to track orders, save fits, and shop new drops."
      footer={
        <>
          Don't have an account?{" "}
          <Link href="/auth/signup" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-lg border border-destructive bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive break-words">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/auth/reset-password" className="text-xs font-medium text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <PasswordInput
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full rounded-xl">
          Log in
        </Button>
      </form>

      <SocialAuthButtons onGoogle={handleGoogleAuth} />
    </AuthCard>
  );
}
