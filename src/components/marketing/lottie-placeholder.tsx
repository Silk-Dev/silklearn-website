/**
 * Lottie illustration placeholder.
 *
 * Renders a dashed-border frame with a human-readable description
 * of what the Lottie animation should depict. Replace each instance
 * with a real <DotLottieReact /> or inline SVG once the illustrations
 * are designed and exported from After Effects / Rive / Lottie.
 */

type LottiePlaceholderProps = {
  /** Short label shown above the description */
  label: string;
  /** Detailed description of what the animation should show */
  description: string;
  /** Tailwind height class (default: h-56) */
  height?: string;
  className?: string;
};

export function LottiePlaceholder({
  label,
  description,
  height = 'h-56',
  className,
}: LottiePlaceholderProps) {
  return (
    <div
      aria-hidden
      className={`flex ${height} flex-col items-center justify-center border border-dashed border-[oklch(from_var(--primary)_l_c_h/0.22)] bg-[oklch(from_var(--primary)_l_c_h/0.03)] px-6 text-center ${className ?? ''}`}
    >
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-(--primary)">
        {label}
      </p>
      <p className="mt-2 max-w-[44ch] text-[0.78rem] leading-4 text-(--muted-foreground)">
        {description}
      </p>
    </div>
  );
}
