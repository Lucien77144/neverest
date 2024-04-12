import { Audio, PositionalAudio } from 'three'
import Experience from '../Experience'

export default class AudioManager {
  constructor() {
    // Get elements from experience
    this.experience = new Experience()
    this.resources = this.experience.resources
    this.debug = this.experience.debug
    this.sources = {}

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
    const isPlaying = { value: !!audio.isPlaying }
    sub.addBinding(isPlaying, 'value', { label: 'Play' }).on('change', () => {
      isPlaying.value ? audio?.play() : audio?.pause()
    })

    // Loop
    const loop = { value: !!audio.loop }
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
      .on('change', () => {
        audio.setVolume(volume.value)
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
    if (this.audios[name]) return this.audios[name]

    const source = this.resources.items[name]
    const sound = new (parent ? PositionalAudio : Audio)(listener)

    if (!this.sources[name]) {
      this.sources[name] = sound.setMediaElementSource(source).source
    }
    sound.source = this.sources[name]

    sound.play = () => {
      sound.source.mediaElement.play()
      sound.isPlaying = true
    }
    sound.pause = () => {
      sound.source.mediaElement.pause()
      sound.isPlaying = false
    }
    sound.stop = () => {
      sound.source.mediaElement.pause()
      sound.source.mediaElement.currentTime = 0
      sound.isPlaying = false
    }
    sound.setVolume = (volume) => {
      sound.source.mediaElement.volume = volume
      sound.volume = volume
    }
    sound.setLoop = (loop) => {
      sound.source.mediaElement.loop = loop
      sound.loop = loop
    }

    loop && sound.setLoop(loop)
    volume && sound.setVolume(volume)
    play && sound.play()
    parent && sound.setRefDistance(distance || 1)
    parent && parent.add(sound)
    parent && (sound.parent = parent)

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

    this.audios[name]?.stop()
    this.audios[name]?.parent?.remove(this.audios[name])
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
