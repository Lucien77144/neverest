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
      expanded: audio.isPlaying,
    })

    // Play state
    const isPlaying = { value: audio.isPlaying }
    sub.addBinding(isPlaying, 'value', { label: 'Play' }).on('change', () => {
      isPlaying.value
        ? audio.source?.mediaElement?.pause()
        : audio.source?.mediaElement?.play()

      isPlaying.value = !isPlaying.value
    })

    // Loop
    const loop = { value: !!audio.source?.mediaElement?.loop }
    sub.addBinding(loop, 'value', { label: 'Loop' }).on('change', () => {
      audio.source.mediaElement.loop = loop.value
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
        audio.source.mediaElement.volume = volume.value
      })

    return sub
  }

  /**
   * Add an audio
   * @return {Audio|PositionalAudio}
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
    sound.isPlaying = play

    this.audios[name] = sound
    this.audios[name].debug = this.debug && this.setDebug(name, sound)

    return sound
  }

  /**
   * Remove an audio
   */
  remove(name) {
    const debug = this.audios[name]?.debug
    debug && this.debugFolder?.remove(debug)

    this.audios[name]?.mediaElement?.stop()
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
