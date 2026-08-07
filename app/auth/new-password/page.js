"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AuthCard } from "@/components/AuthCard";
import { PasswordInput } from "@/components/PasswordInput";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NewPasswordPage() {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirm) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch("/api/auth/new-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password,
                }),
            });

            const data = await response.json();

            if (data.success) {

                toast.success(data.message);

                router.push("/auth/login");

            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        }
    };



    return (
        <AuthCard
            heading="Create new password"
            subheading="Enter a new password for your account."
        >
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="password">New password</Label>
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

                <Button type="submit" className="w-full rounded-xl">
                    Reset password
                </Button>
            </form>
        </AuthCard>
    );

}
