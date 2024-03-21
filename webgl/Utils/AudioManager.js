import { Audio, AudioListener } from 'three'
import Experience from '../Experience'

export default class AudioManager {
  constructor() {
    // Get elements from experience
    this.experience = new Experience()
    this.camera = this.experience.renderer.camera
    this.resources = this.experience.resources
    console.log(this.resources)

    // New elements
    this.listener = null
    this.play = true
    this.volume = 0
    this.audios = {}
  }

  /**
   * Add an audio
   * @param {*} param0
   */
  add({}) {
    this.audio = this.resources.items[this.path]

    this.sound = new Audio(this.listener)

    this.sound.setBuffer(this.audio)
    this.sound.setLoop(this.loop)
    this.sound.setVolume(this.volume)
    this.status && this.sound.play()
  }

  /**
   * Remove an audio
   */
  remove() {
    this.sound.stop()
    this.sound = null
  }

  /**
   * Init the audio manager
   */
  init() {
    this.listener = new AudioListener()
    this.camera.add(this.listener)

    console.log(this.resources.items)
  }

  /**
   * Dispose the audio manager
   */
  dispose() {
    this.listener = null
    this.audios = {}
  }

  /**
   * Set the audio volume
   */
  set setVolume(value) {
    this.volume = value
  }

  /**
   * Set the play status
   */
  set setPlay(value) {
    this.play = value
  }

  /**
   * Get the audio volume
   */
  get getPlay() {
    return this.play
  }
}
