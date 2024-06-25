import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import PlaneTextureIntro from '../PlaneTextureIntro/PlaneTextureIntro'
import IntroFlag from '../IntroFlag/IntroFlag'
import Experience from '~/webgl/Experience'

export default class IntroGroup extends BasicItem {
  constructor() {
    super()

    this.experience = new Experience()
    this.ressources = this.experience.resources.items
  }

  /**
   * Add components
   */
  addComponents() {
    this.components = {
      planeTexture1: new PlaneTextureIntro(
        this.ressources.introMountainPlan1,
        0,
        16.354,
        4.6,
        0.2,
        0,
        0
      ),
      planeTexture2: new PlaneTextureIntro(
        this.ressources.introMountainPlan2,
        -1,
        17.6,
        4.95,
        0.4,
        0,
        0
      ),
      planeTexture3: new PlaneTextureIntro(
        this.ressources.introMountainPlan3,
        -2,
        18.844,
        5.3,
        0.6,
        0,
        0
      ),
      planeTexture4: new PlaneTextureIntro(
        this.ressources.introMountainPlan4,
        -3,
        20.088,
        5.65,
        0.8,
        0,
        0
      ),
      planeTexture5: new PlaneTextureIntro(
        this.ressources.introMountainPlan5,
        -4,
        21.12,
        6,
        1,
        0,
        0
      ),
      introFlag: new IntroFlag(),
    }
  }

  /**
   * On mouse move
   */
  onMouseMove(e) {
    this.components.planeTexture1.cursorXPos = e.centered.x
    this.components.planeTexture2.cursorXPos = e.centered.x
    this.components.planeTexture3.cursorXPos = e.centered.x
    this.components.planeTexture4.cursorXPos = e.centered.x
    this.components.planeTexture5.cursorXPos = e.centered.x
    this.components.planeTexture1.cursorYPos = e.centered.y
    this.components.planeTexture2.cursorYPos = e.centered.y
    this.components.planeTexture3.cursorYPos = e.centered.y
    this.components.planeTexture4.cursorYPos = e.centered.y
    this.components.planeTexture5.cursorYPos = e.centered.y
  }

  /**
   * Init
   */
  init() {
    this.addComponents()
  }
}
