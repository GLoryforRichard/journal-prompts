'use client';

import type { LucideIcon } from 'lucide-react';
import { useId } from 'react';

interface RoughIconProps {
  icon: LucideIcon;
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

/**
 * Renders a Lucide icon with a hand-drawn SVG filter effect.
 * Uses feTurbulence + feDisplacementMap to wobble the strokes,
 * matching the site's journal/sketch aesthetic.
 */
export function RoughIcon({
  icon: Icon,
  size = 24,
  color = '#2d2d2d',
  strokeWidth = 2.2,
  className,
}: RoughIconProps) {
  const id = useId().replace(/:/g, '');
  const filterId = `rough-${id}`;

  return (
    <span className={className} style={{ display: 'inline-flex', position: 'relative' }}>
      <svg width="0" height="0" style={{ position: 'absolute', overflow: 'hidden' }} aria-hidden>
        <defs>
          <filter id={filterId}>
            <feTurbulence
              type="turbulence"
              baseFrequency="0.04"
              numOctaves="4"
              seed="3"
              result="turbulence"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="3.5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <Icon
        size={size}
        color={color}
        strokeWidth={strokeWidth}
        style={{ filter: `url(#${filterId})` }}
      />
    </span>
  );
}
