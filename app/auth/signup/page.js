"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthCard } from "@/components/AuthCard";
import { PasswordInput } from "@/components/PasswordInput";
import { SocialAuthButtons } from "@/components/SocialAuthButtons";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO
  };

  const handleGoogleAuth = () => {
    // TODO
  };

  const handleGithubAuth = () => {
    // TODO
  };

  return (
    <AuthCard
      heading="Create your account"
      subheading="Join Oishi Merch and get early access to limited drops."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/auth/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Sakura Tanaka"
            autoComplete="name"
          />
        </div>

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
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm">Confirm password</Label>
          <PasswordInput
            id="confirm"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            autoComplete="new-password"
          />
        </div>

        <div className="flex items-start gap-2 pt-1">
          <Checkbox id="terms" checked={agree} onCheckedChange={(v) => setAgree(Boolean(v))} />
          <Label htmlFor="terms" className="text-sm font-normal leading-snug text-muted-foreground">
            I agree to the{" "}
            <span className="font-medium text-foreground">Terms</span> and{" "}
            <span className="font-medium text-foreground">Privacy Policy</span>.
          </Label>
        </div>

        <Button type="submit" className="w-full rounded-xl">
          Create account
        </Button>
      </form>

      <SocialAuthButtons onGoogle={handleGoogleAuth} onGithub={handleGithubAuth} />
    </AuthCard>
  );
}
