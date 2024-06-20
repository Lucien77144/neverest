import { Modal } from '#components'
import {
  AudioListener,
  DoubleSide,
  Mesh,
  MeshNormalMaterial,
  PlaneGeometry,
  PositionalAudio,
  ShaderMaterial,
  Uniform,
  Vector3,
} from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import ModalSprite from '../../Shared/ModalSprite/ModalSprite'
import flagVert from './FlagShader/FlagShader.vert?raw'
import flagFrag from './FlagShader/FlagShader.frag?raw'
import CraieMaterial from '../../Shared/CraieMaterial/CraieMaterial'
import TextureCraieMaterial from '../../Shared/TextureCraieMaterial/TextureCraieMaterial'

export default class BCFlag extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'BCFlag',
    visibility = [0, 100],
  }) {
    super()

    // Elements
    this.position = position
    this.rotation = rotation
    this.name = name
    this.visibility = visibility
    this.flag = null

    // New elements
    this.resources = this.experience.resources.items
    this.time = this.experience.time
  }

  /**
   * Set item
   */
  setBCFlag() {
    this.item = this.resources.BCFlag.scene.clone()
    this.item.position.copy(this.position)
    this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.item.name = this.name

    //this.item.children[0].material =  new CraieMaterial({
    //    textureParams:{
    //      textureSize:1024,
    //      nbOfColumns:1,
    //      borderSize:0,
    //      columnsOffset:0.04,
    //      nbOfCurvePerColumns:30,
    //      areCurveOnSameDirection:false,
    //      curveDirection:'up',
    //      curveDirectionAmountFactor:0.4,
    //      maxCurveHorizontalDecalage:0.3,
    //      maxHeightCurve:5,
    //      maxThicknessCurve:2,
    //      nbOfPointsPerCurve:10,
    //      maxBorderSideDecalage:0.1
    //    },
    //    side:0,
    //    color:'#D6E0EA',
    //    bgColor:'#F8ECE8',
    //    displacementMap:this.resources.ground2024,
    //    isMapEnable:0,
    //    displacementMapIntensity:0,
    //  }).instance
    // this.item.children[0].material  = new TextureCraieMaterial({
    //   side:0,
    //   color:'#96551d',
    //   bgColor:'#F8ECE8',
    //   texture:this.resources.BCFlagPoleTexture
    // }).instance
  }

  setFlag() {
    const flagGeometry = new PlaneGeometry(3, 2, 32, 32)
    const flagMaterial = new ShaderMaterial({
      vertexShader: flagVert,
      fragmentShader: flagFrag,
      uniforms: {
        uTime: new Uniform(this.time.elapsed * 0.001),
        uTexture: new Uniform(this.resources.flagTexture),
      },
    })
    this.flag = new Mesh(flagGeometry, flagMaterial)
    this.flag.position.x += 1.5
    this.flag.position.y += 5.4

    this.item.add(this.flag)
  }

  /**
   * Init
   */
  init() {
    this.setBCFlag()
    this.setFlag()
  }

  update() {
    this.item.children[1].material.uniforms.uTime.value =
      this.time.elapsed * 0.001
  }
}
