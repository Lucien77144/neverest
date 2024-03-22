import { Audio, AudioListener } from 'three'
import Experience from '../Experience'

export default class AudioManager {
  constructor() {
    // Get elements from experience
    this.experience = new Experience()
    this.camera = this.experience.renderer.camera
    this.resources = this.experience.resources
    this.debug = this.experience.debug

    // New elements
    this.debugFolder = null
    this.listener = null
    this.audios = {}
    this.components = null
  }

  /**
   * Set debug
   */
  setDebug(name, audio) {
    this.debugFolder ??= this.debug.addFolder({ title: 'Audio' })

    // Subfolder
    const title = `${name}${audio.group ? ` - ${audio.group}` : ''}`
    const sub = this.debugFolder.addFolder({ title, expanded: false })

    // Play state
    const isPlaying = { value: audio.isPlaying }
    sub.addBinding(isPlaying, 'value', { label: 'Toggle' }).on('change', () => {
      audio.isPlaying ? audio.pause() : audio.play()
    })

    // Loop
    const loop = { value: audio.loop }
    sub.addBinding(loop, 'value', { label: 'Loop' }).on('change', () => {
      audio.setLoop(loop.value)
    })

    // Volume
    const volume = { value: audio.volume }
    sub
      .addBinding(volume, 'value', {
        label: 'Volume',
        min: 0,
        max: 1,
        step: 0.01,
      })
      .on('change', () => audio.setVolume(volume.value))

    // Parent element
    sub
      .addBlade({
        view: 'list',
        label: 'Parent',
        options: [
          ...Object.keys(this.components).map((name) => ({
            text: name,
            value: name,
          })),
          { text: '[none]', value: null },
        ],
        value: audio.parent,
      })
      .on('change', (value) => {
        audio.parent = value
      })
  }

  /**
   * Add an audio
   */
  add({ name, group, parent, loop = false, volume = 1, play = false } = {}) {
    const source = this.resources.items[name]
    const sound = new Audio(this.listener)
    sound.setBuffer(source)
    sound.setLoop(loop)
    sound.setVolume(volume)
    play && sound.play()

    // console.log(this.components)
    // console.log(this.components[parent]?.item)
    // console.log(sound)
    // this.components[parent]?.item?.add(sound)

    sound.name = name
    sound.group = group
    sound.parent = parent || null
    sound.volume = volume

    this.audios[name] = sound
    this.debug && this.setDebug(name, sound)
  }

  /**
   * Get the components of the current scene
   */
  setComponents() {
    this.components = this.experience.sceneManager.active.components
  }

  /**
   * Remove an audio
   */
  remove({ names, group } = {}) {}

  /**
   * Init the audio manager
   * @param {Array} _audios - Default audios
   */
  init(_audios = []) {
    this.setComponents()
    // this.$bus.on('scene:switch', () => this.setComponents())

    this.listener = new AudioListener()
    this.camera.add(this.listener)

    _audios.forEach((audio) => this.add(audio))
  }

  /**
   * Dispose the audio manager
   */
  dispose() {
    this.listener = null
    this.audios = {}
  }
}
