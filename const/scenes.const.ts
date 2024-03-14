import Scene1 from '~/webgl/Scenes/Scene1'
import Scene2 from '~/webgl/Scenes/Scene2'
import TRANSITIONS from './transitions.const'

export type TSceneInfos = {
  isDefault?: boolean
  name: string
  Scene: any
  nav?: {
    scale: number
    start?: number
    end?: number
  }
  transition?: {
    template: number
    duration: number
  }
}

// Scene list
const SCENES: TSceneInfos[] = [
  {
    isDefault: true,
    name: 'start',
    Scene: Scene1,
    nav: {
      scale: 50,
    },
    transition: {
      template: TRANSITIONS.FADE,
      duration: 2000,
    },
  },
  {
    name: 'scene2',
    Scene: Scene2,
    nav: {
      scale: 100,
    },
    transition: {
      template: TRANSITIONS.FADE,
      duration: 2000,
    },
  },
  {
    name: 'scene3',
    Scene: Scene1,
    transition: {
      template: TRANSITIONS.FADE,
      duration: 2000,
    },
  },
  {
    name: 'scene4',
    Scene: Scene2,
    nav: {
      scale: 100,
    },
    transition: {
      template: TRANSITIONS.FADE,
      duration: 2000,
    },
  },
]

const total = (arr: any[]): number => {
  return arr.reduce((acc, s) => acc + s.nav?.scale, 0)
}

// Init the nav start and end
const NAV_SCENE = SCENES.filter((s) => s.nav)
NAV_SCENE.forEach((s: TSceneInfos, i: number) => {
  s.nav = {
    scale: s.nav?.scale || 0,
    start: total(NAV_SCENE.slice(0, i)),
    end: total(NAV_SCENE.slice(0, i + 1)),
  }
})

export default {
  default: SCENES.find((s) => s.isDefault) || SCENES[0],
  list: SCENES,
  nav: {
    list: NAV_SCENE,
    total: total(NAV_SCENE),
  },
}
