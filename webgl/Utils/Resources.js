import Loader from './Loader.js'
import sources from './assets/data/sources.json'
import { Cache, Scene, Texture } from 'three'
import gsap from 'gsap'
import Experience from '../Experience.js'

export default class Resources {
  /**
   * Constructor
   */
  constructor(_groups) {
    // Get elements from experience
    this.experience = new Experience()
    this.renderer = this.experience.renderer
    Cache.enabled = true

    // New elements
    this.sources = []
    this.items = {} // Will contain every resources
    this.groups = {}
    this.progress = { value: 0 }
    this.toLoad = null
    this.loaded = null
    this.loader = null
    this.preLoaded = { current: 0, max: 0 }

    // Plugins
    this.$bus = useNuxtApp().$bus

    // Init
    this.init()
    this.load(_groups)
  }

  /**
   * Load next group
   */
  loadNextGroup() {
    this.groups.current = this.sources.shift()
    this.groups.current.toLoad = this.groups.current.items.length
    this.groups.current.loaded = 0

    this.loader.load(this.groups.current.items)
  }

  /**
   * Create instanced meshes
   * @param {*} _children
   * @param {*} _groups
   * @returns Instanced meshes
   */
  createInstancedMeshes(_children, _groups) {
    // Groups
    const groups = []

    for (const { name, regex } of _groups) {
      groups.push({
        name,
        regex,
        meshesGroups: [],
        instancedMeshes: [],
      })
    }

    // Result
    const result = {}

    for (const _group of groups) {
      result[_group.name] = _group.instancedMeshes
    }

    return result
  }

  /**
   * Set groups
   */
  setGroups() {
    this.groups.loaded = []
    this.groups.current = null
  }

  /**
   * Load resources by groups (if unset, load all resources)
   * @param {*} _groups Groups of resources to load
   */
  load(_groups) {
    this.toLoad = 0
    this.loaded = 0

    this.sources = sources
      .filter((s) => !_groups || _groups.includes(s.name))
      .map((s) => ({
        ...s,
        items: s.items.filter((i) => {
          if (!(i.name in this.items)) {
            this.toLoad++
            return true
          }
        }),
      }))

    this.toLoad ? this.loadNextGroup() : () => this.$bus.emit('loadingGroupEnd')
  }

  /**
   * Group end loading
   */
  groupEnd() {
    // Trigger
    this.$bus.emit('groupEnd', [this.groups.current])

    if (this.sources.length > 0) {
      this.loadNextGroup()
    } else {
      this.$bus.emit('resources:done')
      this.experience.audioManager.setEvents()
    }
  }

  /**
   * Init
   */
  init() {
    this.loader = new Loader()
    this.setGroups()

    // Loader file end event
    this.$bus.on('fileEnd', (file) => {
      let data = file.data

      // Convert to texture
      if (file.resource.type === 'texture') {
        if (!(data instanceof Texture)) {
          data = new Texture(file.data)
        }
        data.needsUpdate = true
      }

      this.items[file.resource.name] = data

      // Progress and event
      this.groups.current.loaded++
      this.loaded++

      // Set the loading event
      gsap.timeline().to(this.progress, {
        value: (this.loaded / this.toLoad) * 100,
        duration: 1,
        ease: 'power2.inOut',
        onUpdate: () => this.$bus.emit('loading', this.progress.value),
        onComplete: () => {
          if (this.progress.value === 100) {
            this.$bus.emit('start')
          }
        },
      })
    })

    // Loader all end event
    this.$bus.on('loadingGroupEnd', async () => {
      const current = this.groups.current
      this.groups.loaded.push(current)

      if (current.data.preload) {
        const tmpScene = new Scene()
        current.items
          .map((i) => this.items[i.name])
          .forEach((i) => {
            if (i.scene) {
              tmpScene.add(i.scene)
            }
          })

        tmpScene.onAfterRender = () => {
          console.log('preloaded')
          tmpScene.clear()
          this.renderer.instance.clear()
          this.groupEnd()
        }

        setTimeout(() => {
          console.log('preload start for', current.name)
          this.renderer.instance.render(tmpScene, this.renderer.camera)
        }, 100)
      } else {
        this.groupEnd()
      }
    })
  }

  /**
   * Dispose and dispose ressources (if unset, dispose all resources)
   * @param {*} _groups Groups of resources to dispose
   */
  dispose(_groups) {
    sources
      .filter((s) => !_groups || _groups.includes(s.name))
      .flatMap((s) => s.items.map((i) => i.name))
      .forEach((item) => {
        if (this.items[item] instanceof Texture) {
          this.items[item].dispose()
        }
        delete this.items[item]
      })
  }
}
