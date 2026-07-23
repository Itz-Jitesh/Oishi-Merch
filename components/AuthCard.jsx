export function AuthCard({ heading, subheading, children, footer }) {
  return (
    <div
      className="w-full max-w-[440px] rounded-2xl bg-card p-8 md:p-10"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="mb-7 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{heading}</h1>
        {subheading ? (
          <p className="text-sm text-muted-foreground">{subheading}</p>
        ) : null}
      </div>
      <div className="space-y-5">{children}</div>
      {footer ? (
        <div className="mt-7 border-t border-border pt-5 text-center text-sm text-muted-foreground">
          {footer}
        </div>
      ) : null}
    </div>
  );
}
