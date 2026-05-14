type IconProps = { className?: string };

export function SolutionIcon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const common = `${className} shrink-0 text-orderly-blue`;
  switch (name) {
    case "qr":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <path d="M14 14h3v3h-3zM18 18h3v3h-3zM14 18h3M18 14h3" />
        </svg>
      );
    case "menu":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M4 6h16M4 12h16M4 18h10" strokeLinecap="round" />
        </svg>
      );
    case "pulse":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "waiter":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M12 2v4M8 6h8M6 10h12v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V10z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "extras":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round" />
        </svg>
      );
    case "check":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return <span className={common} />;
  }
}

export function FeatureGlyph({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l2 4 4 .5-3 3 .8 4.5L12 17l-3.8 2L9 14.5 6 11.5l4-.5 2-4z" strokeLinejoin="round" />
    </svg>
  );
}
