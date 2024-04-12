import Scene2 from '~/webgl/Scenes/Scene2'
import Intro from '~/webgl/Scenes/Intro'
import BaseCamp from '~/webgl/Scenes/BaseCamp'
import IceFall from '~/webgl/Scenes/IceFall'

export type TSceneInfos = {
  id?: number
  isDefault?: boolean
  name: string
  Scene: any
  nav?: {
    scale: number
    start?: number
    end?: number
  }
  transition?: {
    duration: number
  }
}

// Scene list
const SCENES: TSceneInfos[] = [
  {
    isDefault: true,
    name: 'intro',
    Scene: Intro,
    transition: {
      duration: 2000,
    },
  },
  {
    name: 'basecamp',
    Scene: BaseCamp,
    nav: {
      scale: 100,
    },
    transition: {
      duration: 2000,
    },
  },
  {
    name: 'icefall',
    Scene: IceFall,
    transition: {
      duration: 2000,
    },
  },
  {
    name: 'scene4',
    Scene: BaseCamp,
    nav: {
      scale: 100,
    },
    transition: {
      duration: 2000,
    },
  },
  {
    name: 'scene5',
    Scene: Scene2,
    nav: {
      scale: 100,
    },
    transition: {
      duration: 2000,
    },
  },
]

const total = (arr: any[]): number => {
  return arr.reduce((acc, s) => acc + s.nav?.scale, 0)
}

// Set ids :
SCENES.forEach((s: TSceneInfos, i: number) => {
  s.id ??= i
})

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
