export const wobblyBorderRadius = {
  sm: '255px 15px 225px 15px / 15px 225px 15px 255px',
  md: '15px 225px 15px 255px / 255px 15px 225px 15px',
  lg: '225px 15px 255px 15px / 15px 255px 15px 225px',
  xl: '15px 255px 15px 225px / 225px 15px 255px 15px',
} as const;

export const handShadow = {
  default: '4px 4px 0px 0px #2d2d2d',
  hover: '6px 6px 0px 0px #2d2d2d',
  active: '2px 2px 0px 0px #2d2d2d',
  none: 'none',
} as const;

export const rotations = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2] as const;

export function getRandomRotation(): number {
  return rotations[Math.floor(Math.random() * rotations.length)];
}
