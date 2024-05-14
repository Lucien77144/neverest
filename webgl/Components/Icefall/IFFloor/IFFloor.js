import { MeshNormalMaterial } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import CraieMaterial from '../../Shared/CraieMaterial/CraieMaterial'

export default class IFFloor extends BasicItem {
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
    this.item = this.resources.IFFloor.scene.clone()

    const testM = new CraieMaterial({
      textureParams:{
        textureSize:512,
        nbOfColumns:1,
        borderSize:0.05,
        columnsOffset:0,
        nbOfCurvePerColumns:50,
        areCurveOnSameDirection:true,
        curveDirection:'up',
        curveDirectionAmountFactor:0.4,
        maxCurveHorizontalDecalage:0.3,
        maxHeightCurve:1,
        maxThicknessCurve:1,
        nbOfPointsPerCurve:2
      },
      side:0,
      color:'#C8DFEA',
      bgColor:'#F8ECE8'
    }).instance

    this.item.traverse((e) => {
      if (!e.isMesh) return
      e.material = testM
    })
  }

  /**
   * Init the floor
   */
  init() {
    this.setItem()
  }
}
