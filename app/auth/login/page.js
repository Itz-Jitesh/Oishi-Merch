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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          remember,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }
      
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    // TODO
  };

  const handleGithubAuth = () => {
    // TODO
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

        <div className="flex items-center gap-2">
          <Checkbox id="remember" checked={remember} onCheckedChange={(v) => setRemember(Boolean(v))} />
          <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">
            Remember me on this device
          </Label>
        </div>

        <Button type="submit" disabled={loading} className="w-full rounded-xl">
          Log in
        </Button>
      </form>

      <SocialAuthButtons onGoogle={handleGoogleAuth} onGithub={handleGithubAuth} />
    </AuthCard>
  );
}
