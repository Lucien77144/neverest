import { Group, Sprite, SpriteMaterial } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'

export default class Player extends BasicItem {
  /**
   * Constructor
   */
  constructor(_options = {}) {
    super()

    // Options
    this.player = _options
    this.items = {}
    this.sprites = {}

    // this.onClick = false
  }

  /**
   * Init the player
   */
  init() {
    this.addPlayers()
  }

  /**
   * Add sprite to item group
   */
  addPlayer(media, index) {
    const map = this.experience.resources.items[media.source]

    const material = new SpriteMaterial({
      map: map,
    })

    const sprite = new Sprite(material)
    sprite.scale.set(8, 5, 1)
    sprite.position.set(index + 1, index + 1, 1)

    this.sprites[media.source] = sprite
    this.item.add(sprite)
  }

  /**
   * Create sprite for each texture passed in options
   */
  addPlayers() {
    this.item = new Group()
    this.player.forEach((source, index) => {
      this.addPlayer(source, index)
    })
  }

  // onClick() {
  //   console.log('Player clicked')
  // }
}
