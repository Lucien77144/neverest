import {
  Color,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  Uniform,
  Vector2,
  Vector3,
} from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import fragmentShader from './shaders/fragmentShader.frag?raw'
import vertexShader from './shaders/vertexShader.vert?raw'
import clamp from '~/utils/functions/clamp'

export default class FloorAnimationEffect extends BasicItem {
  /**
   * Constructor
   */
  constructor() {
    super()

    // Get elements from the experience
    this.time = this.experience.time

    // New elements
    this.speedDist = 0
    this.size = new Vector2(0.75, 0.75)
    this.position = new Vector3()
    this.target = new Vector3()
    this.current = new Vector3()
    this.direction = new Vector2(1, 1)
    this.material = null
    this.geometry = null
  }

  /**
   * Set mesh
   */
  setMesh() {
    this.geometry = new PlaneGeometry(this.size.x, this.size.y, 25, 25)
    this.material = new ShaderMaterial({
      transparent: true,
      uniforms: {
        uTime: new Uniform(0),
        uSpeed: new Uniform(5),
        uSpeedDelta: new Uniform(0),
        uDirection: new Uniform(new Vector2(1, 1)),
        uColor: new Uniform(new Color('#bfbfbf')),
      },
      fragmentShader,
      vertexShader,
    })
    this.item = new Mesh(this.geometry, this.material)
    this.item.position.copy(this.position)
    this.item.rotation.x = -Math.PI / 2
  }

  /**
   * Set the color of the effect
   */
  setEffectColor(color) {
    this.item.material.uniforms.uColor.value = color
  }

  /**
   * Set target for the position
   * @param {*} target New position of the mesh
   */
  setTarget(target = new Vector3(0, 0, 0)) {
    this.target.copy(target)
    this.target.z += this.size.x / 2

    // this.position.copy(this.target)
    // this.item.position.copy(this.position)
  }

  /**
   * Init
   */
  init() {
    this.setMesh()
  }

  /**
   * Get the mouse move speed
   * @returns {number} The distance between the current and target position
   */
  getSpeed(min = 1, max = 5) {
    const dist = this.current.distanceTo(this.target) * 10
    return clamp(min, max, Math.abs(dist) * 1.5) / max
  }

  /**
   * Get direction of the mouse move
   * @param {*} prev The previous position of the mouse
   * @returns {Vector2} The direction of the mouse move
   */
  getDirection(prev) {
    this.direction.x = this.current.x > prev.x ? 1 : -1
    this.direction.y = this.current.y > prev.y ? 1 : -1

    return this.direction
  }

  /**
   * Get the speed delta on X
   */
  getSpeedDeltaX() {
    const curr = new Vector3(this.current.x, 0, 0)
    const target = new Vector3(this.target.x, 0, 0)

    return curr.distanceTo(target) * 5
  }

  /**
   * Update
   */
  update() {
    const previous = this.current.clone()
    this.current.lerp(this.target, 0.075)

    this.position.copy(this.current)
    this.item.position.copy(this.position)

    const speed = this.getSpeed()
    this.speedDist += speed + this.time.delta * 0.0001

    // this.item.scale.set(Math.max(0.35, speed), Math.max(0.35, speed), 1)
    this.item.material.uniforms.uTime.value = this.time.elapsed
    this.item.material.uniforms.uSpeed.value = this.speedDist
    this.item.material.uniforms.uSpeedDelta.value = this.getSpeedDeltaX()
    this.item.material.uniforms.uDirection.value = this.getDirection(previous)
  }
}
