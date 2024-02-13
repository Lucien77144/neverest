import * as THREE from 'three'
import EventEmitter from './EventEmitter.js'
import Loader from './Loader.js'
import sources from '../sources.json'

export default class Resources extends EventEmitter {
  /**
   * Constructor
   */
  constructor(_groups) {
    super()

    // New elements
    this.sources = [
      ...sources.filter((s) => !_groups || _groups.includes(s.name)),
    ]
    this.items = {} // Will contain every resources
    this.groups = {}
    this.loader = null

    // Init
    this._init()
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

    for (const _group of _groups) {
      groups.push({
        name: _group.name,
        regex: _group.regex,
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
   * Init
   */
  _init() {
    this.loader = new Loader()
    this._setGroups()
    this._loadNextGroup()

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
   * Load
   * @param {*} _groups Groups of resources to load
   */
  load(_groups) {
    this.sources = sources
      .filter((s) => !_groups || _groups.includes(s.name))
      .map((s) => ({
        ...s,
        items: s.items.filter((i) => !(i.name in this.items)),
      }))

    this._loadNextGroup()
  }

  /**
   * Destroy
   */
  destroy() {
    for (const _itemKey in this.items) {
      const item = this.items[_itemKey]
      if (item instanceof THREE.Texture) {
        item.dispose()
      }
    }
  }
}
