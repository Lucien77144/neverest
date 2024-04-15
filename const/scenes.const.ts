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
    interest?: {
      start: number // 0-100, start of the interest action
      end: number // 0-100, end of the interest action
      power: number // 0-1, multiply factor by this value
    }[]
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
      interest: [
        {
          start: 31,
          end: 35,
          power: 0.025,
        },
        {
          start: 64,
          end: 68,
          power: 0.025,
        },
      ],
    },
    transition: {
      duration: 2000,
    },
  },
  {
    name: 'icefall',
    Scene: IceFall,
    nav: {
      scale: 100,
      interest: [
        {
          start: 31,
          end: 35,
          power: 0.025,
        },
        {
          start: 64,
          end: 68,
          power: 0.025,
        },
      ],
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
    interest: s.nav?.interest || [],
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
