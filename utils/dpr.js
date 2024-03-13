export default function dpr (limit = 2) {
  return Math.min(window.devicePixelRatio, limit)
}
