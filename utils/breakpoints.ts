export const breakpoints: {
  [key: string]: number
} = {
  xs: 450,
  sm: 540,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1440,
  xxxl: 1920,
}

export function breakpoint(width: number): string {
  if (width <= 450) return 'xs'
  else if (width <= 540) return 'sm'
  else if (width <= 768) return 'md'
  else if (width <= 992) return 'lg'
  else if (width <= 1200) return 'xl'
  else if (width <= 1440) return 'xxl'
  else if (width <= 1920) return 'xxxl'
  else return 'xxxl'
}
