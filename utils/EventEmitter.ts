type TName = {
  original: string
  value: string
  namespace: string
}

export default class EventEmitter {
  // Public
  public callbacks: any

  /**
   * Constructor
   */
  constructor() {
    // Public
    this.callbacks = {
      base: {},
    }
  }

  /**
   * Set callback for an event
   * @param _names Event names
   * @param callback Callback
   */
  public on(_names: string, callback: any): any {
    // Errors
    if (typeof _names === 'undefined' || _names === '') {
      console.warn('wrong names')
      return false
    }

    if (typeof callback === 'undefined') {
      console.warn('wrong callback')
      return false
    }

    // Resolve names
    const names = this._resolveNames(_names)

    // Each name
    names.forEach((_name) => {
      // Resolve name
      const name = this._resolveName(_name)

      // Create namespace if not exist
      if (!(this.callbacks[name.namespace] instanceof Object)) {
        this.callbacks[name.namespace] = {}
      }

      // Create callback if not exist
      if (!(this.callbacks[name.namespace][name.value] instanceof Array)) {
        this.callbacks[name.namespace][name.value] = []
      }

      // Add callback
      this.callbacks[name.namespace][name.value].push(callback)
    })

    return this
  }

  /**
   * Off event
   * @param _names Event names
   */
  public off(_names: string): any {
    // Errors
    if (typeof _names === 'undefined' || _names === '') {
      console.warn('wrong name')
      return false
    }

    // Resolve names
    const names = this._resolveNames(_names)

    // Each name
    names.forEach((_name) => {
      // Resolve name
      const name = this._resolveName(_name)

      // Remove namespace
      if (name.namespace !== 'base' && name.value === '') {
        delete this.callbacks[name.namespace]
      }

      // Remove specific callback in namespace
      else {
        // Default
        if (name.namespace === 'base') {
          // Try to remove from each namespace
          for (const namespace in this.callbacks) {
            if (
              this.callbacks[namespace] instanceof Object &&
              this.callbacks[namespace][name.value] instanceof Array
            ) {
              delete this.callbacks[namespace][name.value]

              // Remove namespace if empty
              if (Object.keys(this.callbacks[namespace]).length === 0)
                delete this.callbacks[namespace]
            }
          }
        }

        // Specified namespace
        else if (
          this.callbacks[name.namespace] instanceof Object &&
          this.callbacks[name.namespace][name.value] instanceof Array
        ) {
          delete this.callbacks[name.namespace][name.value]

          // Remove namespace if empty
          if (Object.keys(this.callbacks[name.namespace]).length === 0)
            delete this.callbacks[name.namespace]
        }
      }
    })

    return this
  }

  /**
   * Trigger event
   * @param _name Event name
   * @param _args Event arguments
   */
  public trigger(_name: string, _args?: any): any {
    // Errors
    if (typeof _name === 'undefined' || _name === '') {
      console.warn('wrong name')
      return false
    }

    let finalResult: any
    let result: any

    // Default args
    const args = !(_args instanceof Array) ? [_args] : _args

    // Resolve names (should on have one event)
    let name: TName = this._resolveName(this._resolveNames(_name)[0])

    // Default namespace
    if (name.namespace === 'base') {
      // Try to find callback in each namespace
      for (const namespace in this.callbacks) {
        if (
          this.callbacks[namespace] instanceof Object &&
          this.callbacks[namespace][name.value] instanceof Array
        ) {
          this.callbacks[namespace][name.value].forEach((callback: any) => {
            result = callback.apply(this, args)

            if (typeof finalResult === 'undefined') {
              finalResult = result
            }
          })
        }
      }
    }

    // Specified namespace
    else if (this.callbacks[name.namespace] instanceof Object) {
      if (name.value === '') {
        console.warn('wrong name')
        return this
      }

      this.callbacks[name.namespace][name.value].forEach((callback: any) => {
        result = callback.apply(this, args)

        if (typeof finalResult === 'undefined') finalResult = result
      })
    }

    return finalResult
  }

  /**
   * Resolve multiple names and return an array of names
   * @param _names Event names
   */
  private _resolveNames(_names: string): string[] {
    let names: string | string[] = _names
    names = names.replace(/[^a-zA-Z0-9 ,/.]/g, '')
    names = names.replace(/[,/]+/g, ' ')

    return names.split(' ')
  }

  /**
   * Resolve name and return an object with original, value and namespace
   * @param name Event name
   */
  private _resolveName(name: string): TName {
    const parts = name.split('.')
    const newName = {
      original: name,
      value: parts[0],
      namespace: 'base', // Base namespace
    }

    // Specified namespace
    if (parts.length > 1 && parts[1] !== '') {
      newName.namespace = parts[1]
    }

    return newName
  }
}
