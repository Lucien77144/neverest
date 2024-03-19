export default function dpr(limit = 2): number {
  return Math.min(window.devicePixelRatio, limit)
}
