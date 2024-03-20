import Experience from '../Experience.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

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

    // Plugin
    this.$bus = this.experience.$bus

    // Init
    this.init()
  }

  /**
   * Init loaders
   */
  init() {
    // Images
    this.loaders.push({
      extensions: ['jpg', 'png'],
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
  }

  /**
   * Load
   */
  load(resources = []) {
    for (const resource of resources) {
      this.toLoad++
      const extensionMatch = resource.source.match(/\.([a-z]+)$/)

      if (typeof extensionMatch[1] !== 'undefined') {
        const extension = extensionMatch[1]
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

    // this.trigger('fileEnd', [resource, data])
    this.$bus.emit('fileEnd', [resource, data])

    if (this.loaded === this.toLoad) {
      // this.trigger('end')
      this.$bus.emit('end')
    }
  }
}
