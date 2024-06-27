import { Audio, PositionalAudio } from 'three'
import Experience from '../Experience'
import gsap from 'gsap'

export default class AudioManager {
  constructor() {
    // Get elements from experience
    this.experience = new Experience()
    this.resources = this.experience.resources
    this.debug = this.experience.debug
    this.$bus = this.experience.$bus
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
    this.debugFolder ??= this.debug.panel.addFolder({
      expanded: false,
      title: 'Audio',
    })

    // Subfolder
    const sub = this.debugFolder.addFolder({
      expanded: false,
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
   * Set events
   */
  setEvents() {
    const sounds = {
      click: this.resources.items.click,
      intro: this.resources.items.intro,
      ambient_intro: this.resources.items.ambient_intro,
      intro_basecamp: this.resources.items.intro_basecamp,
      ambient_1953: this.resources.items.ambient_1953,
      ambient_2024: this.resources.items.ambient_2024,
      ambient_2050: this.resources.items.ambient_2050,
      ambient_conclusion: this.resources.items.ambient_conclusion,
    }

    this.$bus.on('audio:click', () => sounds.click.play())

    // INTRO
    this.$bus.on('audio:intro', () => {
      setTimeout(() => {
        sounds.intro.play()
      }, 1000)
      // on intro end play ambient intro
      sounds.intro.onended = () => {
        // fade in ambient intro
        sounds.ambient_intro.play()
        sounds.ambient_intro.loop = true
        sounds.ambient_intro.volume = 0
        gsap.to(sounds.ambient_intro, {
          volume: 1,
          duration: 10,
        })
      }
    })

    // BASECAMP
    this.$bus.on('audio:start', () => {
      gsap.to(sounds.ambient_intro, {
        volume: 0,
        duration: 3,
        onComplete: () => {
          sounds.ambient_intro.pause()
          sounds.ambient_intro.currentTime = 0

          sounds.intro_basecamp.play()

          setTimeout(() => {
            sounds.ambient_1953.play()
            sounds.ambient_1953.loop = true
            sounds.ambient_1953.volume = 0
            gsap.to(sounds.ambient_1953, {
              volume: 1,
              duration: 5,
            })
          }, 3000)
        },
      })
    })
    this.$bus.on('audio:1953', () => {
      // fade out 2024
      gsap.to(sounds.ambient_2024, {
        volume: 0,
        duration: 3,
        onComplete: () => {
          sounds.ambient_2024.pause()
          sounds.ambient_2024.currentTime = 0
        },
      })

      // play 1953
      sounds.ambient_1953.play()
      sounds.ambient_1953.loop = true
      sounds.ambient_1953.volume = 0
      gsap.to(sounds.ambient_1953, {
        volume: 1,
        duration: 3,
      })
    })
    this.$bus.on('audio:2024', () => {
      // fade out 1953
      gsap.to(sounds.ambient_1953, {
        volume: 0,
        duration: 3,
        onComplete: () => {
          sounds.ambient_1953.pause()
          sounds.ambient_1953.currentTime = 0
        },
      })

      // fade out 2050
      gsap.to(sounds.ambient_2050, {
        volume: 0,
        duration: 3,
        onComplete: () => {
          sounds.ambient_2050.pause()
          sounds.ambient_2050.currentTime = 0
        },
      })

      // play 2024
      sounds.ambient_2024.play()
      sounds.ambient_2024.loop = true
      sounds.ambient_2024.volume = 0
      gsap.to(sounds.ambient_2024, {
        volume: 0.3,
        duration: 3,
      })
    })

    this.$bus.on('audio:2050', () => {
      // fade out 2024
      gsap.to(sounds.ambient_2024, {
        volume: 0,
        duration: 3,
        onComplete: () => {
          sounds.ambient_2024.pause()
          sounds.ambient_2024.currentTime = 0
        },
      })

      // fade out conclusion
      gsap.to(sounds.ambient_conclusion, {
        volume: 0,
        duration: 3,
        onComplete: () => {
          sounds.ambient_conclusion.pause()
          sounds.ambient_conclusion.currentTime = 0
        },
      })

      // play 2050
      sounds.ambient_2050.play()
      sounds.ambient_2050.loop = true
      sounds.ambient_2050.volume = 0
      gsap.to(sounds.ambient_2050, {
        volume: 1,
        duration: 3,
      })
    })

    this.$bus.on('audio:conclusion', () => {
      // fade out 2050
      gsap.to(sounds.ambient_2050, {
        volume: 0,
        duration: 3,
        onComplete: () => {
          sounds.ambient_2050.pause()
          sounds.ambient_2050.currentTime = 0
        },
      })

      // play conclusion
      sounds.ambient_conclusion.play()
      sounds.ambient_conclusion.loop = true
      sounds.ambient_conclusion.volume = 0
      gsap.to(sounds.ambient_conclusion, {
        volume: 1,
        duration: 3,
      })
    })

    this.$bus.on('audio:mute', () => {
      Object.values(sounds).forEach((sound) => {
        sound.volume = 0
      })
    })
    this.$bus.on('audio:unmute', () => {
      Object.values(sounds).forEach((sound) => {
        sound.volume = 1
      })
    })
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
    listener,
    isSingle = null,
  } = {}) {
    if (this.audios[name]) return this.audios[name]
    if (!listener) return

    const source = this.resources.items[name]
    const sound = new (parent ? PositionalAudio : Audio)(listener)

    if (!this.sources[name] && source) {
      this.sources[name] = sound.setMediaElementSource(source).source
    }
    sound.source = this.sources[name]

    sound.play = () => {
      if (sound.source?.mediaElement) {
        sound.source.mediaElement.play()
        sound.isPlaying = true
      }
    }
    sound.pause = () => {
      if (sound.source?.mediaElement) {
        sound.source.mediaElement.pause()
        sound.isPlaying = false
      }
    }
    sound.stop = () => {
      if (sound.source?.mediaElement) {
        sound.source.mediaElement.pause()
        sound.source.mediaElement.currentTime = 0
        sound.isPlaying = false
      }
    }
    sound.setVolume = (volume) => {
      if (sound.source?.mediaElement) {
        sound.source.mediaElement.volume = volume
      }

      sound.volume = volume
    }
    sound.setLoop = (loop) => {
      if (sound.source?.mediaElement) {
        sound.source.mediaElement.loop = loop
      }

      sound.loop = loop
    }

    loop && sound.setLoop(loop)
    volume && sound.setVolume(volume)
    play && sound.play()
    parent && sound.setRefDistance(distance || 1)
    parent && parent.add(sound)
    parent && (sound.parent = parent)
    isSingle && (sound.isSingle = isSingle)

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

    if (Object.keys(this.audios).length == 0 && this.debugFolder) {
      this.debug?.panel.remove(this.debugFolder)
      this.debugFolder = null
    }
  }

  /**
   * Dispose the audio manager
   */
  dispose() {
    this.debugFolder && this.debug?.panel.remove(this.debugFolder)

    Object.keys(this.audios).forEach((name) => this.remove(name))
  }
}
