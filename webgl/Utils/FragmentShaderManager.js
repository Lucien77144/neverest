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
   *
   * @param {*} name
   */
  remove(name) {
    // console.log(this.frag)
  }

  /**
   * Set the scene1 shader to scene0
   */
  shift() {
    const getScene = (s, pos) => {
      const start = this.frag.indexOf(`/** [${pos}_${s}] **/`)
      const end = this.frag.indexOf(`/** [/${pos}_${s}] **/`)
      return this.frag.substring(start, end)
    }

    const start0 = getScene('scene0', 'start')
    const end0 = getScene('scene0', 'end')
    const imports0 = getScene('scene0', 'imports')

    const start1 = getScene('scene1', 'start')
    const end1 = getScene('scene1', 'end')
    const imports1 = getScene('scene1', 'imports')

    this.frag = this.frag
      .replaceAll(start1, `/** [start_scene1] **/`)
      .replaceAll(end1, `/** [end_scene1] **/`)
      .replaceAll(imports1, `/** [imports_scene1] **/`)
      .replaceAll(start0, start1.replaceAll('scene1', 'scene0'))
      .replaceAll(end0, end1.replaceAll('scene1', 'scene0'))
      .replaceAll(imports0, imports1.replaceAll('scene1', 'scene0'))

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
