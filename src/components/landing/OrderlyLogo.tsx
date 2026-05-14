import Image from "next/image";

/** Intrinsic dimensions of public/orderly-logo.png (IHDR). */
export const ORDERLY_LOGO_WIDTH = 1254;
export const ORDERLY_LOGO_HEIGHT = 1254;

type OrderlyLogoProps = {
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function OrderlyLogo({
  className = "h-9 w-auto max-w-[140px] sm:max-w-[160px] object-contain object-left",
  priority,
  sizes = "(max-width: 640px) 140px, 160px",
}: OrderlyLogoProps) {
  return (
    <Image
      src="/orderly-logo.png"
      alt="Orderly"
      width={ORDERLY_LOGO_WIDTH}
      height={ORDERLY_LOGO_HEIGHT}
      className={className}
      priority={priority}
      sizes={sizes}
    />
  );
}
