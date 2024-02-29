import EventEmitter from './EventEmitter.js'
import Loader from './Loader.js'
import sources from '../sources.json'
import * as THREE from 'three'

export default class Resources extends EventEmitter {
  /**
   * Constructor
   */
  constructor(_groups) {
    super()

    // New elements
    this.sources = []
    this.items = {} // Will contain every resources
    this.groups = {}
    this.toLoad = null
    this.loaded = null
    this.loader = null

    // Init
    this._init()
    this.load(_groups)
  }

  /**
   * Load next group
   */
  _loadNextGroup() {
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
  _createInstancedMeshes(_children, _groups) {
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
  _setGroups() {
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

    this.toLoad ? this._loadNextGroup() : setTimeout(() => this.trigger('end'))
  }

  /**
   * Init
   */
  _init() {
    this.loader = new Loader()
    this._setGroups()

    // Loader file end event
    this.loader.on('fileEnd', (_resource, _data) => {
      let data = _data

      // Convert to texture
      if (_resource.type === 'texture') {
        if (!(data instanceof THREE.Texture)) {
          data = new THREE.Texture(_data)
        }
        data.needsUpdate = true
      }

      this.items[_resource.name] = data

      // Progress and event
      this.groups.current.loaded++
      this.loaded++
      this.trigger('progress', [this.groups.current, _resource, data])
    })

    // Loader all end event
    this.loader.on('end', () => {
      this.groups.loaded.push(this.groups.current)

      // Trigger
      this.trigger('groupEnd', [this.groups.current])

      if (this.sources.length > 0) {
        this._loadNextGroup()
      } else {
        this.trigger('end')
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
        if (this.items[item] instanceof THREE.Texture) {
          this.items[item].dispose()
        }
        delete this.items[item]
      })
  }
}
