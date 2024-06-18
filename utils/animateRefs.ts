export type TAnimateRef = {
  el: HTMLElement
  options: {
    transform?: string
    rect?: {
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
function getRatioValue(ref: TAnimateRef, scroll: number, vpWidth: number) {
  const rect = ref.options.rect
  if (!rect) return null

  const left = rect.left - scroll
  const right = rect.right - scroll
  const width = rect.width

  if (right > 0 && left < vpWidth) {
    const ratio = (left + width) / (vpWidth + width)
    return Math.abs(1 - Math.round(ratio * 1000) / 1000)
  } else return null
}

/**
 * Set the animate rects infos
 */
export function setAnimateRects(ref: Ref<TAnimateRef[]>): TAnimateRef[] {
  ref.value.forEach(({ el, options }) => {
    el.classList.add('transformable')

    const rect = el.getBoundingClientRect()
    options.rect = {
      left: rect.left,
      right: rect.right,
      width: rect.width,
    }
  })

  return ref.value
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
      const power = v.options.translate.power ?? 20
      const dir = v.options.translate.direction ?? 1

      const value = (ratio - 0.5) * power * dir
      transform.value += `translateX(${value}px)`
    }
    if (v.options.rotate) {
      const power = v.options.rotate.power ?? 5
      const dir = v.options.rotate.direction ?? 1

      const value = (ratio - 0.5) * power * dir
      transform.value += `rotate(${Math.round(value * 100) / 100}deg)`
    }
    if (v.options.skew) {
      const power = v.options.skew.power ?? 20
      const dir = v.options.skew.direction

      const value = (ratio - 0.5) * power * dir
      transform.value += `skewX(${value}deg)`
    }

    if (v.el) {
      v.el.style.transform = transform.value
    }
  })
}
