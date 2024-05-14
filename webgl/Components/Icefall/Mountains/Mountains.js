import { MeshNormalMaterial } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import CraieMaterial from '../../Shared/CraieMaterial/CraieMaterial'

export default class Mountains extends BasicItem {
  /**
   * Constructor
   */
  constructor() {
    super()
    // New elements
    this.resources = this.experience.resources.items
  }

  /**
   * Get mesh
   */
  setItem() {
    this.item = this.resources.IFMountains.scene.clone()

    const testM3 = new CraieMaterial({
      textureParams:{
        textureSize:2048,
        nbOfColumns:1,
        borderSize:0.05,
        columnsOffset:0,
        nbOfCurvePerColumns:50,
        areCurveOnSameDirection:true,
        curveDirection:'up',
        curveDirectionAmountFactor:0.4,
        maxCurveHorizontalDecalage:0.3,
        maxHeightCurve:0.1,
        maxThicknessCurve:2,
        nbOfPointsPerCurve:4
      },
      side:0,
      color:'#93AAF2',
      bgColor:'#F8ECE8'
    }).instance

    this.item.traverse((e) => {
      if (!e.isMesh) return
      e.material = testM3
    })
  }

  /**
   * Init the floor
   */
  init() {
    this.setItem()
  }
}
