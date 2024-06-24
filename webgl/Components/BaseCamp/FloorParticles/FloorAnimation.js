import { Color, Vector2, Vector3 } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import FloorAnimationEffect from './components/FloorAnimationEffect'
import FloorAnimationMesh from './components/FloorAnimationMesh'

import gsap from 'gsap'

export default class FloorAnimation extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0.01, -25),
    size = new Vector2(100, 100),
  } = {}) {
    super()

    // Get elements from the experience
    this.time = this.experience.time
    this.renderer = this.experience.renderer

    // Elements
    this.position = position
    this.size = size

    this.components = {
      effect: new FloorAnimationEffect(),
      mesh: new FloorAnimationMesh({ position, size }),
    }
  }

  /**
   * Set the color of the effect
   */
  setEffectColor(color = '#bfbfbf') {
    this.components.effect.setEffectColor(new Color(color))
  }

  /**
   * Set the background color of the experience
   * @param {*} color New color
   */
  setBackgroundColor(color) {
    const colorValue = new Color(color)
    gsap.to(this.renderer.renderMesh.material.uniforms.uBackgroundColor.value, {
      duration: 1,
      r: colorValue.r,
      g: colorValue.g,
      b: colorValue.b,
    })
  }
}
