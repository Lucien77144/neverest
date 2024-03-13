import Scene1 from '~/webgl/Scenes/Scene1'
import Scene2 from '~/webgl/Scenes/Scene2'
import TRANSITIONS from './transitions.const'

export default [
  {
    name: 'scene1',
    Scene: Scene1,
    duration: 100,
    transition: TRANSITIONS.FADE,
  },
  {
    name: 'scene2',
    Scene: Scene2,
    duration: 200,
    transition: TRANSITIONS.FADE,
  },
  {
    name: 'scene3',
    Scene: Scene1,
    duration: 50,
    transition: TRANSITIONS.FADE,
  },
]
