import { MathUtils, MeshNormalMaterial } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import gsap from 'gsap'
import CraieMaterial from '../../Shared/CraieMaterial/CraieMaterial'

export default class Iceblocks extends BasicItem {
  /**
   * Constructor
   */
  constructor() {
    super()
    // New elements
    this.resources = this.experience.resources.items
  }

  /**
   * OnHold function
   */
  onHold() {
    const interests = this.parentScene.interest.list
    if (this.parentScene.currentPoint >= interests?.length) return

    this.parentScene.navigate()
    if (this.parentScene.currentPoint >= interests?.length - 1) {
      this.disabledFn.push('onHold') // disable the hold if we reach the end
    }

    this.item.traverse((e) => {
      if (e.isMesh) {
        const pos = e.position.clone()
        gsap.to(pos, {
          duration: 1,
          ease: 'power2.out',
          y: pos.y - Math.random() / 2,
          z: pos.z + Math.random(),
          onUpdate: () => e.position.copy(pos),
        })
      }
    })

    // shake camera :
    const shake = { power: 1 }
    const pos = this.parentScene.camera.instance.position.clone()
    gsap.to(shake, {
      duration: 1,
      power: 0,
      ease: 'power2.out',
      onUpdate: () => {
        // lerp
        this.parentScene.camera.instance.position.x = MathUtils.lerp(
          pos.x,
          pos.x + Math.random() * shake.power * 5,
          0.1
        )
      },
    })
  }

  /**
   * Get mesh
   */
  setItem() {
    this.item = this.resources.IFIceblocks.scene.clone()

    //const testM2 = new CraieMaterial({
    //  textureParams:{
    //    textureSize:512,
    //    nbOfColumns:1,
    //    borderSize:0.1,
    //    columnsOffset:0.05,
    //    nbOfCurvePerColumns:60,
    //    areCurveOnSameDirection:true,
    //    curveDirection:'up',
    //    curveDirectionAmountFactor:0.4,
    //    maxCurveHorizontalDecalage:0.3,
    //    maxHeightCurve:1,
    //    maxThicknessCurve:2,
    //    nbOfPointsPerCurve:3
    //  },
    //  side:0,
    //  color:'#537D90',
    //  bgColor:'#F8ECE8'
    //}).instance

    this.item.traverse((e) => {
      if (!e.isMesh) return
      e.material = new MeshNormalMaterial()
    })
  }

  /**
   * Init
   */
  init() {
    this.setItem()
  }
}
