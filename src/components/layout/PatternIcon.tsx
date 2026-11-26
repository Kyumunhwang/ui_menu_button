import type { MenuPatternId } from '../../data/menuPatterns';

interface PatternIconProps {
  id: MenuPatternId;
  className?: string;
  active?: boolean;
}

export function PatternIcon({ id, className = 'h-5 w-5', active = false }: PatternIconProps) {
  const strokeColor = active ? '#3182F6' : 'currentColor';

  switch (id) {
    case 'hamburger':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="M4 6.5H20" stroke={strokeColor} strokeWidth="2.1" strokeLinecap="round" />
          <path d="M4 12H20" stroke={strokeColor} strokeWidth="2.1" strokeLinecap="round" />
          <path d="M4 17.5H20" stroke={strokeColor} strokeWidth="2.1" strokeLinecap="round" />
        </svg>
      );
    case 'kebab':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <circle cx="12" cy="5.5" r="1.85" fill={strokeColor} />
          <circle cx="12" cy="12" r="1.85" fill={strokeColor} />
          <circle cx="12" cy="18.5" r="1.85" fill={strokeColor} />
        </svg>
      );
    case 'meatball':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <circle cx="5.5" cy="12" r="1.85" fill={strokeColor} />
          <circle cx="12" cy="12" r="1.85" fill={strokeColor} />
          <circle cx="18.5" cy="12" r="1.85" fill={strokeColor} />
        </svg>
      );
    case 'waffle':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <rect x="4" y="4" width="3.75" height="3.75" rx="1" fill={strokeColor} />
          <rect x="10.125" y="4" width="3.75" height="3.75" rx="1" fill={strokeColor} />
          <rect x="16.25" y="4" width="3.75" height="3.75" rx="1" fill={strokeColor} />
          <rect x="4" y="10.125" width="3.75" height="3.75" rx="1" fill={strokeColor} />
          <rect x="10.125" y="10.125" width="3.75" height="3.75" rx="1" fill={strokeColor} />
          <rect x="16.25" y="10.125" width="3.75" height="3.75" rx="1" fill={strokeColor} />
          <rect x="4" y="16.25" width="3.75" height="3.75" rx="1" fill={strokeColor} />
          <rect x="10.125" y="16.25" width="3.75" height="3.75" rx="1" fill={strokeColor} />
          <rect x="16.25" y="16.25" width="3.75" height="3.75" rx="1" fill={strokeColor} />
        </svg>
      );
    case 'bento':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <rect x="4" y="4" width="9" height="9" rx="2" fill={strokeColor} />
          <rect x="15" y="4" width="5" height="5" rx="1.5" fill={strokeColor} />
          <rect x="15" y="11" width="5" height="9" rx="1.5" fill={strokeColor} />
          <rect x="4" y="15" width="9" height="5" rx="1.5" fill={strokeColor} />
        </svg>
      );
    case 'doner':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="M4 7H20" stroke={strokeColor} strokeWidth="2.1" strokeLinecap="round" />
          <path d="M7 12H17" stroke={strokeColor} strokeWidth="2.1" strokeLinecap="round" />
          <path d="M10 17H14" stroke={strokeColor} strokeWidth="2.1" strokeLinecap="round" />
        </svg>
      );
    case 'hotdog':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="M6.5 7H17.5" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
          <path d="M3.5 12H20.5" stroke="#3182F6" strokeWidth="2.3" strokeLinecap="round" />
          <path d="M6.5 17H17.5" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'candybox':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <circle cx="6.5" cy="8.5" r="2" fill={strokeColor} />
          <circle cx="12" cy="8.5" r="2" fill={strokeColor} />
          <circle cx="17.5" cy="8.5" r="2" fill={strokeColor} />
          <circle cx="6.5" cy="15.5" r="2" fill={strokeColor} />
          <circle cx="12" cy="15.5" r="2" fill={strokeColor} />
          <circle cx="17.5" cy="15.5" r="2" fill={strokeColor} />
        </svg>
      );
    case 'fab':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="9.5" fill="#3182F6" />
          <path d="M12 7.5V16.5M7.5 12H16.5" stroke="#FFFFFF" strokeWidth="2.1" strokeLinecap="round" />
        </svg>
      );
  }
}
