import { Audio, AudioListener } from 'three'
import Experience from '../Experience'
import InputManager from './InputManager'

export default class AudioManager {
  constructor() {
    // Get elements from experience
    this.experience = new Experience()
    this.camera = this.experience.camera.instance
    this.resources = this.experience.resources

    // New elements
    this.play = null
  }

  buildSound() {
    this.initListener()

    this.audio = this.resources.items[this.path]

    this.sound = new Audio(this.listener)

    this.sound.setBuffer(this.audio)
    this.sound.setLoop(this.loop)
    this.sound.setVolume(this.volume)
    this.status && this.sound.play()
  }

  initListener() {
    this.listener = new AudioListener()
    this.camera.add(this.listener)
  }

  set play(value) {
    this.play = value
  }

  get play() {
    return this.play
  }
}
