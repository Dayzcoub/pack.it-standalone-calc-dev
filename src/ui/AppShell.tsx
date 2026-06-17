import type { ReactNode } from "react";

type AppShellProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export const AppShell = ({ title, subtitle, children, actions, className }: AppShellProps) => (
  <main className={`appShell${className ? ` ${className}` : ""}`}>
    <header className="topBar">
      <div>
        <span className="brand">PACK.IT</span>
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      {actions ? <div className="topActions">{actions}</div> : null}
    </header>
    {children}
  </main>
);
