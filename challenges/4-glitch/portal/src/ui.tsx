import type { ComponentProps } from "react";

const v = {
  default: "bg-primary text-primary-foreground hover:brightness-110",
  outline: "border-input bg-transparent text-foreground hover:border-primary hover:text-primary",
  ghost: "hover:bg-muted",
};
const s = { default: "h-10 px-4", sm: "h-9 px-4", xs: "h-7 px-3" };

export function Button({ variant = "default", size = "default", className = "", ...p }: ComponentProps<"button"> & { variant?: keyof typeof v; size?: keyof typeof s }) {
  return <button className={`inline-flex shrink-0 cursor-pointer items-center justify-center gap-1 rounded-md border border-transparent text-sm font-semibold whitespace-nowrap outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50 ${v[variant]} ${s[size]} ${className}`} {...p} />;
}

export function Input({ className = "", ...p }: ComponentProps<"input">) {
  return <input className={`h-10 w-full min-w-0 rounded-md border border-input bg-background px-3 py-1 text-base outline-none file:mr-3 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring md:text-sm ${className}`} {...p} />;
}

export const Label = ({ className = "", ...p }: ComponentProps<"label">) => <label className={`flex items-center gap-2 text-sm font-medium select-none ${className}`} {...p} />;
