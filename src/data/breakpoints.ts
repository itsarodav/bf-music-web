// Mirror of src/styles/base/_breakpoints.scss: change both together.
// Only for what CSS can't reach: image `sizes` (built into the HTML) and matchMedia.
export const breakpoints = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
} as const;

export const media = {
  tabletUp: `(min-width: ${breakpoints.tablet}px)`,
  // Same as the below-tablet mixin
  belowTablet: `(max-width: ${breakpoints.tablet - 0.02}px)`,
} as const;
