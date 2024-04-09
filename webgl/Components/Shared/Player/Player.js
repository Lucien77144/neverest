import { Group, Sprite, SpriteMaterial } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import Mountain from '../../Intro/Mountain/Mountain'

export default class Player extends BasicItem {
  /**
   * Constructor
   */
  constructor(_options = {}) {
    super()

    // Options
    this.players = _options
    this.items = {}

    // Init
    this.init()
  }

  /**
   * Init the player
   */
  init() {
    console.log('Player initialized')
    this.addPlanes()

    this.components = {
      mountain: new Mountain(),
    }
  }

  /**
   * Add sprite to item group
   */
  addPlane(player, index) {
    const material = new SpriteMaterial({
      map: this.experience.resources.items[player.source],
    })
    const sprite = new Sprite(material)
    sprite.scale.set(8, 5, 1)
    sprite.position.set(index + 1, index + 1, 1)
    sprite.visible = true
    this.item.add(sprite)
  }

  /**
   * Create sprite for each texture passed in options
   */
  addPlanes() {
    this.item = new Group()
    this.players.forEach((player, index) => {
      this.addPlane(player, index)
    })
    // this.addPlane(this.players[0], 0)
  }

  onClick() {
    console.log('Player clicked')
  }
}
