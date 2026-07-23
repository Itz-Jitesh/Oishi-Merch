import { AuthIllustration } from "@/components/AuthIllustration";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-background md:grid md:grid-cols-5">
      <div className="md:col-span-3">
        <AuthIllustration />
      </div>
      <div
        className="flex min-h-screen items-center justify-center px-5 py-10 md:col-span-2"
        style={{ background: "var(--gradient-panel)" }}
      >
        {children}
      </div>
    </div>
  );
}
