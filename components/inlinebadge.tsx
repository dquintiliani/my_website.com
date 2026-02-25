import React from "react";

type InlineBadgeProps = {
  children: React.ReactNode;
  color?: "green" | "blue" | "yellow";
};

export function InlineBadge({ children, color = "green" }: InlineBadgeProps) {
  const colorClasses: Record<typeof color, string> = {
    green: "bg-green-100 text-green-800",
    blue: "bg-blue-100 text-blue-800",
    yellow: "bg-yellow-100 text-yellow-800",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${colorClasses[color]}`}
    >
      {children}
    </span>
  );
}