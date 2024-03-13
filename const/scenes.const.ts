import Scene1 from '~/webgl/Scenes/Scene1'
import Scene2 from '~/webgl/Scenes/Scene2'
import TRANSITIONS from './transitions.const'

const SCENES = [
  {
    name: 'scene1',
    Scene: Scene1,
    scale: 50,
    transition: {
      template: TRANSITIONS.FADE,
      duration: 2000,
    },
  },
  {
    name: 'scene2',
    Scene: Scene2,
    scale: 100,
    transition: {
      template: TRANSITIONS.FADE,
      duration: 2000,
    },
  },
  {
    name: 'scene3',
    Scene: Scene1,
    scale: 200,
    transition: {
      template: TRANSITIONS.FADE,
      duration: 2000,
    },
  },
]

const total = (arr: any[]): number =>
  arr.reduce((acc, curr) => acc + curr.scale, 0)

export default {
  total: total(SCENES),
  list: SCENES.map((s, i) => ({
    ...s,
    start: total(SCENES.slice(0, i)),
    end: total(SCENES.slice(0, i + 1)),
  })),
}
