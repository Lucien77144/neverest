import shaders from '~/const/shaders.const'
import Experience from '../Experience'
import fragmentShader from '~/webgl/Modules/Renderer/shaders/fragmentShader.frag?raw'

/**
 * Fragment Shader manager
 * This shader is made to apply shaders globaly to a scene or the Render Mesh
 */
export default class FragmentShaderManager {
  constructor(_baseShaders) {
    // Get elements from experience
    this.experience = new Experience()
    this.renderMesh = this.experience.renderer.renderMesh
    this.frag = fragmentShader

    _baseShaders?.forEach((shader) => this.add(shader))
  }

  /**
   * Add a shader
   * @param {*} name Fragment shader name (from the shader const)
   * @param {*} force Boolean, if set remove the doubled lines from the frag
   * @param {*} scene Scene, scene0 or scene1 (if not set, global shader)
   */
  add({ name, force, scene }) {
    const imports = this.getImports(name, force)
    const main = this.getMain(name, force, scene)

    this.appendChunk(name, imports, 'imports', scene)
    main.start && this.appendChunk(name, main.start, 'start', scene)
    main.end && this.appendChunk(name, main.end, 'end', scene)

    this.renderMesh.material.fragmentShader = this.frag
    this.renderMesh.material.needsUpdate = true
  }

  /**
   * Get the chunk of a shader
   * @param {*} name Fragment shader name (from the shader const)
   * @param {*} remove Boolean, if set remove the chunck from the frag
   * @returns {Object} Chuncks of the shader (imports, start, end)
   */
  getChuncks(name, remove) {
    const getChunck = (s, pos) => {
      const start = this.frag.indexOf(`/** [${pos}_${s}] **/`)
      const end = this.frag.indexOf(`/** [/${pos}_${s}] **/`)
      return this.frag.substring(start, end)
    }

    const chuncks = {
      imports: getChunck(name, 'imports'),
      start: getChunck(name, 'start'),
      end: getChunck(name, 'end'),
    }

    if (remove) {
      this.frag = this.frag
        .replaceAll(chuncks.start, `/** [start_${name}] **/`)
        .replaceAll(chuncks.end, `/** [end_${name}] **/`)
        .replaceAll(chuncks.imports, `/** [imports_${name}] **/`)
    }

    return chuncks
  }

  /**
   * Remove a chunck from the current frag
   * @param {*} name Fragment shader name (from the shader const)
   * @returns {Object} Chuncks of the shader (imports, start, end)
   */
  remove(name) {
    // this.getChuncks(name, true)

    // console.log(this.frag)

    // this.renderMesh.material.fragmentShader = this.frag
    // this.renderMesh.material.needsUpdate = true
    // debugger
  }

  /**
   * Set the scene1 shader to scene0
   */
  shift() {
    const scene0 = this.getChuncks('scene0')
    const scene1 = this.getChuncks('scene1', true)

    this.frag = this.frag
      .replaceAll(scene0.start, scene1.start.replaceAll('scene1', 'scene0'))
      .replaceAll(scene0.end, scene1.end.replaceAll('scene1', 'scene0'))
      .replaceAll(scene0.imports, scene1.imports.replaceAll('scene1', 'scene0'))

    this.renderMesh.material.fragmentShader = this.frag
    this.renderMesh.material.needsUpdate = true
  }

  /**
   * Append a chunck to the current frag
   * @param {*} name
   * @param {*} shader
   * @param {*} position
   * @param {*} scene
   */
  appendChunk(name, shader, position, scene = 'main') {
    this.frag = this.frag.replace(
      `/** [${position}_${scene}] **/`,
      `/** [${position}_${scene}] **/\n` + this.wrapChunk(name, shader)
    )
  }

  /**
   * Get the imports and functions from the shader
   * @param {*} name Fragment shader
   * @returns {string} Imports and functions
   */
  getImports(name, force) {
    const frag = shaders[name].frag
    const imports = frag.split('void main()')[0]
    return this.checkDouble(name, imports, force)
  }

  /**
   * Get the main function content
   * @param {*} name Fragment shader
   * @param {*} force Boolean, if set remove the doubled lines from the frag
   * @param {*} scene Scene (if not set, global shader)
   * @returns {string} Main function content
   */
  getMain(name, force) {
    const frag = shaders[name].frag
    const main = frag.split('void main() {')[1]
    const mainContent = main.substring(main.indexOf('{') + 1)

    const res = {}

    // Get start content
    const start = mainContent.indexOf('/** [start] **/')
    const end = mainContent.indexOf('/** [end] **/')
    if (start > -1 && end > -1) {
      res.start = mainContent
        .substring(start, end)
        .replace('/** [start] **/', '')

      res.start = this.checkDouble(name, res.start, force)
    }

    // Get end content
    const lastBracket = mainContent.lastIndexOf('}')
    if (end > -1 && lastBracket > -1) {
      res.end = mainContent
        .substring(end, lastBracket)
        .replace('/** [end] **/', '')

      res.end = this.checkDouble(name, res.end, force)
    }

    return res
  }

  /**
   * Wrap shader with comments
   * @param {*} name name of the shader
   * @param {*} frag content of the shader
   * @returns {string} Shader wrapped with comments
   */
  wrapChunk(name, frag) {
    return `/** [start-${name}] **/\n${frag}\n/** [end-${name}] **/`
  }

  /**
   * Check if each line already exists in the current frag
   * @param {string} frag Fragment shader
   * @param {string} force Boolean, if set remove the doubled lines from the frag
   */
  checkDouble(name, frag, force) {
    const lines = frag.split('\n')
    const currentLines = this.frag.split('\n')
    const doubles = []

    lines.forEach((line) => {
      if (
        currentLines.includes(line) &&
        // if line don't only have space and \n :
        line.replaceAll(' ', '').length > 1 &&
        line.replaceAll('\n', '').length > 1 &&
        !line.includes('/** [')
      ) {
        doubles.push(line)
        if (force) {
          line = ''
        }
      }
    })

    if (doubles.length > 0) {
      console.group(
        `[${name} shader] The following lines are doubled ${
          force ? 'and have been removed ' : ''
        }: `
      )
      doubles.forEach((line) => {
        console[force ? 'warn' : 'error'](line)
      })
      console.groupEnd()
    }

    return lines.join('\n')
  }
}
