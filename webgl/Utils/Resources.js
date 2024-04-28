import Loader from './Loader.js'
import sources from './assets/data/sources.json'
import { Texture } from 'three'
import gsap from 'gsap'

export default class Resources {
  /**
   * Constructor
   */
  constructor(_groups) {
    // New elements
    this.sources = []
    this.items = {} // Will contain every resources
    this.groups = {}
    this.progress = { value: 0 }
    this.toLoad = null
    this.loaded = null
    this.loader = null

    // Plugins
    this.$bus = useNuxtApp().$bus

    // Store
    this.landing = computed(() => useDebugStore().getLanding)

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

    this.toLoad
      ? this.loadNextGroup()
      : setTimeout(() => this.$bus.emit('loadingEng'))
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
          if (this.progress.value === 100 && !this.landing.value) {
            this.$bus.emit('start')
          }
        },
      })
    })

    // Loader all end event
    this.$bus.on('loadingEnd', () => {
      this.groups.loaded.push(this.groups.current)

      // Trigger
      this.$bus.emit('groupEnd', [this.groups.current])

      if (this.sources.length > 0) {
        this.loadNextGroup()
      } else if (this.sources.length) {
        this.$bus.emit('loadingEnd')
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
