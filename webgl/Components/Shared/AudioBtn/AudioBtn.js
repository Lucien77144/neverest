import { UIAudioPlayer } from '#components'
import gsap from 'gsap'
import { CustomEase } from 'gsap/all'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
gsap.registerPlugin(CustomEase)

export default class AudioBtn extends BasicItem {
  /**
   * Constructor
   */
  constructor({ position, source, name }) {
    super()
    // New elements
    this.position = position
    this.source = source
    this.name = name
  }

  /**
   * Init
   */
  init() {
    this.addCSS2D({
      id: this.name + '_audio',
      template: UIAudioPlayer,
      data: {
        source: this.source,
        id: this.name + '_audio',
      },
      parent: this.item,
      position: this.position,
    })
  }
}
