import { waLink } from "@/lib/whatsapp";

type Variant = "primary" | "secondary" | "ghost" | "heroWhite";

interface CtaButtonProps {
  treatment?: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_8px_24px_oklch(0.252_0.034_224_/_0.22)]",
  secondary:
    "border border-border bg-card text-foreground hover:border-primary/40 hover:bg-secondary",
  ghost: "text-foreground hover:text-foreground/70 underline-offset-4 hover:underline px-0",
  heroWhite:
    "bg-white text-foreground hover:bg-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.25)]",
};

export function CtaButton({
  treatment,
  variant = "primary",
  className = "",
  children,
}: CtaButtonProps) {
  return (
    <a
      href={waLink(treatment)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all duration-300 ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
