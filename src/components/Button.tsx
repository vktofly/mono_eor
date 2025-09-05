import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
};

export function Button({ variant = "primary", href, className = "", children, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-md px-5 py-3 font-medium focus:outline-none focus:ring-4 transition-colors";
  const styles =
    variant === "primary"
      ? "bg-cta-500 hover:bg-cta-600 text-white focus:ring-cta-300"
      : variant === "secondary"
      ? "text-brand-500 hover:text-brand-600 border border-line bg-white"
      : "text-text-secondary hover:text-text-primary";

  if (href) {
    return (
      <a href={href} className={`${base} ${styles} ${className}`.trim()}>
        {children}
      </a>
    );
  }

  return (
    <button className={`${base} ${styles} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}


