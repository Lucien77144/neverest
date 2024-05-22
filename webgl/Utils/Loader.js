import Experience from '../Experience.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { LottieLoader } from 'three/examples/jsm/loaders/LottieLoader.js'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'

export default class Loader {
  /**
   * Constructor
   */
  constructor() {
    // Get elements from experience
    this.experience = new Experience()

    // New elements
    this.toLoad = 0
    this.loaded = 0
    this.items = {}
    this.loaders = []
    this.i18n = useI18n()

    // Plugin
    this.$bus = this.experience.$bus

    // Store
    this.setSubtitlesCues = useSubtitlesStore().setCues

    // Init
    this.init()
  }

  /**
   * Init loaders
   */
  init() {
    // Images
    this.loaders.push({
      extensions: ['jpg', 'png', 'svg', 'webp'],
      action: (resource) => {
        const image = new Image()

        image.addEventListener('load', () => {
          this.fileLoadEnd(resource, image)
        })

        image.addEventListener('error', () => {
          this.fileLoadEnd(resource, image)
        })

        image.src = resource.source
      },
    })

    // EXR
    const exrLoader = new EXRLoader()
    this.loaders.push({
      extensions: ['exr'],
      action: (resource) => {
        exrLoader.load(resource.source, (data) => {
          this.fileLoadEnd(resource, data)
        })
      },
    })

    // Draco
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('draco/')
    dracoLoader.setDecoderConfig({ type: 'js' })

    this.loaders.push({
      extensions: ['drc'],
      action: (resource) => {
        dracoLoader.load(resource.source, (data) => {
          this.fileLoadEnd(resource, data)

          DRACOLoader.releaseDecoderModule()
        })
      },
    })

    // GLTF
    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)

    this.loaders.push({
      extensions: ['glb', 'gltf'],
      action: (resource) => {
        gltfLoader.load(resource.source, (data) => {
          this.fileLoadEnd(resource, data)
        })
      },
    })

    // FBX
    const fbxLoader = new FBXLoader()

    this.loaders.push({
      extensions: ['fbx'],
      action: (resource) => {
        fbxLoader.load(resource.source, (data) => {
          this.fileLoadEnd(resource, data)
        })
      },
    })

    // RGBE | HDR
    const rgbeLoader = new RGBELoader()

    this.loaders.push({
      extensions: ['hdr'],
      action: (resource) => {
        rgbeLoader.load(resource.source, (data) => {
          this.fileLoadEnd(resource, data)
        })
      },
    })

    // Video
    this.loaders.push({
      extensions: ['mp4'],
      action: (resource) => {
        const video = document.createElement('video')
        video.src = resource.source

        // Subtitles
        resource.subtitles && this.setSubtitles(video, resource.subtitles)

        video.load()

        console.log({ video })
        video.addEventListener('loadeddata', () => {
          this.fileLoadEnd(resource, video)
        })
      },
    })

    // Audio
    this.loaders.push({
      extensions: ['mp3', 'ogg', 'wav'],
      action: (resource) => {
        // Audio
        const audio = document.createElement('audio')
        audio.preload = 'auto'
        audio.src = resource.source

        // Subtitles
        resource.subtitles && this.setSubtitles(audio, resource.subtitles)

        audio.load()
        audio.addEventListener('loadeddata', () => {
          this.fileLoadEnd(resource, audio)
        })
      },
    })

    // Lottie
    const lottieLoader = new LottieLoader()

    this.loaders.push({
      extensions: ['lottie'],
      action: (resource) => {
        lottieLoader.load(resource.source, (animation) => {
          this.fileLoadEnd(resource, animation)
        })
      },
    })

    //Font

    const fontLoader = new FontLoader()

    this.loaders.push({
      extensions: ['font'],
      action: (ressource) => {
        fontLoader.load(ressource.source, (font) => {
          this.fileLoadEnd(ressource, font)
        })
      },
    })
  }

  /**
   * Get extension from ressource
   * @param {*} source source to check
   * @returns extension for loader uses
   */
  getExtension(source) {
    const res = source.match(/\.([a-z0-9]+)$/i)?.[1]
    if (!res) return false

    if (res == 'json') {
      if (source.includes('lottie')) {
        return 'lottie'
      } else if (source.includes('font')) {
        return 'font'
      }
    }

    return res
  }

  /**
   * Set subtitles for an audio or video
   * @param {*} element Audio / Video element
   * @param {*} subtitles Subtitles object
   */
  setSubtitles(element, subtitles) {
    const handleCueChange = (event) => {
      const cues = event.currentTarget.track.activeCues
      this.setSubtitlesCues(cues)
    }

    // Init tracks of the element
    Object.keys(subtitles).forEach((key) => {
      const trackEl = document.createElement('track')
      trackEl.src = subtitles[key]
      trackEl.kind = 'subtitles'
      trackEl.label = this.i18n.t('LANG.' + key.toUpperCase() + '.LABEL')
      trackEl.srclang = key
      trackEl.default = this.i18n.locale.value == key

      trackEl.addEventListener('cuechange', handleCueChange)
      element.appendChild(trackEl)

      trackEl.track.mode = 'hidden'
    })

    // Update the track on locale change
    this.$bus.on('lang:change', (locale) => this.onLangChange(element, locale))
  }

  /**
   * On lang change, set the language of the subtitles
   * @param {*} element Audio / Video element
   * @param {*} locale New locale to use
   */
  onLangChange(element, locale) {
    // Disable all text tracks that are currently active
    Object.values(element.textTracks)
      .filter((x) => x.mode !== 'disabled')
      .forEach((x) => {
        x.mode = 'disabled'
      })

    // Enable the text track for a specific language
    Object.values(element.textTracks).filter(
      (x) => x.language == locale
    )[0].mode = 'hidden'
  }

  /**
   * Load
   */
  load(resources = []) {
    for (const resource of resources) {
      this.toLoad++
      const extension = this.getExtension(resource.source)

      if (typeof extension !== 'undefined') {
        const loader = this.loaders.find((loader) =>
          loader.extensions.find((e) => e === extension)
        )

        if (loader) {
          loader.action(resource)
        } else {
          console.warn(`Cannot found loader for ${resource}`)
        }
      } else {
        console.warn(`Cannot found extension of ${resource}`)
      }
    }
  }

  /**
   * File load end
   */
  fileLoadEnd(resource, data) {
    this.loaded++
    this.items[resource.name] = data

    this.$bus.emit('fileEnd', { resource, data })

    if (this.loaded === this.toLoad) {
      this.$bus.emit('loadingGroupEnd')
    }
  }
}
