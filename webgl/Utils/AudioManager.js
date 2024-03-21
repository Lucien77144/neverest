import { Audio, AudioListener } from 'three'
import Experience from '../Experience'
import InputManager from './InputManager'

export default class AudioManager {
  constructor({
    _path = null,
    _loop = false,
    _volume = 1,
    _status = true,
  } = {}) {
    this.experience = new Experience()
    this.camera = this.experience.camera.instance
    this.resources = this.experience.resources

    this.path = _path
    this.isAudioLoaded = false
    this.isPlaying = false
    this.loop = _loop
    this.volume = _volume
    this.status = _status

    // Wait for resources & event
    // this.ressources.on("ready", () => { // FOR SERVER SETUP
    InputManager.on('startAudio', () => {
      // comment this line for server setup
      if (this.resources.loadedAudios == this.resources.toLoadAudios) {
        InputManager.audioLoaded = true // comment this line for server setup
        this.buildSound()
      }
    })
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

  play() {
    if (!this.sound) return
    this.sound.play()
    this.isPlaying = true
  }

  stop() {
    if (!this.sound) return
    this.sound.stop()
    this.isPlaying = false
  }

  toggle() {
    if (this.isPlaying) {
      this.stop()
    } else {
      this.play()
    }
  }
}
