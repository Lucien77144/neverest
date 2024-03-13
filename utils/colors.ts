const getHex = (color: string) =>
  window.getComputedStyle(document.body).getPropertyValue(color).trim()

export const colors = () => ({
  primary: getHex('--primary'),
  secondary: getHex('--secondary'),
  black: getHex('--black'),
  white: getHex('--white'),
  success: getHex('--success'),
  info: getHex('--info'),
  warning: getHex('--warning'),
  danger: getHex('--danger'),
})
