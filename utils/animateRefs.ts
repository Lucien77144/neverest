export type TAnimateRef = {
  el: HTMLElement
  options: {
    transform?: string
    rect: {
      left: number
      right: number
      width: number
    }
    translate?: {
      direction: 1 | -1
      power?: number
    }
    rotate?: {
      direction: 1 | -1
      power?: number
    }
    skew?: {
      direction: 1 | -1
      power?: number
    }
  }
}

/**
 * Get the ratio value of an element to animate
 * @param ref Element
 * @param scroll Scroll position (in px)
 * @param vpWidth Viewport width
 */
const getRatioValue = (ref: TAnimateRef, scroll: number, vpWidth: number) => {
  const rect = ref.options.rect
  const left = rect.left - scroll
  const right = rect.right - scroll
  const width = rect.width

  if (left < vpWidth && right > 0) {
    return (left - width) / (vpWidth + width)
  } else return null
}

/**
 * Animate the refs
 * @param refs Array of animate refs
 * @param scroll Scroll position (in px)
 * @param vpWidth Viewport width
 */
export function animateRefs(
  refs: TAnimateRef[],
  scroll: number,
  vpWidth: number
) {
  refs.forEach((v: TAnimateRef) => {
    const ratio = getRatioValue(v, scroll, vpWidth)
    if (ratio == null) return

    const transform = { value: `${v.options.transform ?? ''} ` }
    if (v.options.translate) {
      const power = v.options.translate.power ?? 50
      const dir = v.options.translate.direction

      const value = Math.round(ratio * power * dir)
      transform.value += `translateX(${value - value * 0.5}px)`
    }
    if (v.options.rotate) {
      const power = v.options.rotate.power ?? 5
      const dir = v.options.rotate.direction

      const value = Math.round(ratio * power * dir * 100) * 0.01
      transform.value += `rotate(${value - value * 0.5}deg)`
    }
    if (v.options.skew) {
      const power = v.options.skew.power ?? 50
      const dir = v.options.skew.direction

      const value = Math.round(ratio * power * dir * 100) * 0.01
      transform.value += `skewX(${value}deg)`
    }

    if (v.el) {
      v.el.style.transform = transform.value
    }
  })
}
