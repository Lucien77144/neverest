class Manager {
    instances = {}
  
    register (superclass, singleton) {
      this.instances[this.id(superclass)] = singleton
    }
  
    has (superclass) {
      return this.id(superclass) in this.instances
    }
  
    get (superclass) {
      return this.instances[this.id(superclass)]
    }
  
    id (superclass) {
      return superclass.name ? superclass.name : superclass
    }
  
    destroy () {
      this.instances = {}
    }
  }
  
  const SingletonManager = new Manager()
  
  const Singleton = (...a) => {
    const params = {
      superclass: null,
      id: null
    }
  
    if (typeof a[0] === 'string') {
      params.superclass = class S {}
      params.id = a[0]
    } else {
      params.superclass = a[0]
      params.id = typeof a[1] === 'string' ? a[1] : params.superclass.name
    }
  
    return class extends params.superclass {
      constructor (...args) {
        if (SingletonManager.has(params.id)) {
          return SingletonManager.get(params.id)
        } else {
          super(...args)
          SingletonManager.register(params.id, this)
          this.__constructor && this.__constructor(...args)
        }
      }
  
      __constructor (...a) {}
    }
  }
  
  export { Singleton as default, Singleton, SingletonManager }
  