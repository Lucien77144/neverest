import { Audio, PositionalAudio } from 'three'
import Experience from '../Experience'

export default class AudioManager {
  constructor() {
    // Get elements from experience
    this.experience = new Experience()
    this.resources = this.experience.resources
    this.debug = this.experience.debug

    // New elements
    this.debugFolder = null
    this.audios = {}
  }

  /**
   * Set debug
   */
  setDebug(title, audio) {
    // Folder
    this.debugFolder ??= this.debug.addFolder({ title: 'Audio' })

    // Subfolder
    const sub = this.debugFolder.addFolder({
      title: `${audio.parent ? '🔗 - ' : ''}${title}`,
      expanded: false,
    })

    // Play state
    const isPlaying = { value: audio.isPlaying }
    sub.addBinding(isPlaying, 'value', { label: 'Play' }).on('change', () => {
      audio.isPlaying = !isPlaying.value

      audio.isPlaying
        ? audio.source?.mediaElement?.pause()
        : audio.source?.mediaElement?.play()
    })

    // Loop
    const loop = { value: !!audio.source?.mediaElement?.loop }
    sub.addBinding(loop, 'value', { label: 'Loop' }).on('change', () => {
      sound.source.mediaElement.loop = loop
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
      .on('change', () => {
        sound.source.mediaElement.volume = volume
      })

    return sub
  }

  /**
   * Add an audio
   */
  add({
    name,
    parent,
    distance,
    loop = false,
    volume = 1,
    play = false,
    listener = this.camera.listener,
  } = {}) {
    if (this.audios[name]) return

    const source = this.resources.items[name]
    const sound = new (parent ? PositionalAudio : Audio)(listener)

    sound.setMediaElementSource(source)
    sound.source.mediaElement.loop = loop
    sound.source.mediaElement.volume = volume

    play && sound.source?.mediaElement?.play()

    if (parent) {
      sound.setRefDistance(distance || 1)
      parent.add(sound)
    }

    sound.name = name
    sound.parent = parent
    sound.volume = volume

    this.audios[name] = sound
    this.audios[name].debug = this.debug && this.setDebug(name, sound)
  }

  /**
   * Remove an audio
   */
  remove(name) {
    this.audios[name]?.debug && this.debugFolder?.remove(this.audios[name].debug)
    this.audios[name]?.stop()
    delete this.audios[name]

    if (Object.keys(this.audios).length == 0) {
      this.debug?.remove(this.debugFolder)
      this.debugFolder = null
    }
  }

  /**
   * Dispose the audio manager
   */
  dispose() {
    this.debugFolder && this.debug?.remove(this.debugFolder)

    Object.keys(this.audios).forEach((name) => this.remove(name))
  }
}
