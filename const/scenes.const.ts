import Intro from '~/webgl/Scenes/Intro'
import BaseCamp from '~/webgl/Scenes/BaseCamp'
import IceFall from '~/webgl/Scenes/IceFall'
import TestDA from '~/webgl/Scenes/TestDA'
import { UIBtn } from '#components'

export type TSceneInterest = {
  start: number // 0-100, start of the interest action
  end: number // 0-100, end of the interest action
  power: number // 0-1, multiply factor by this value
  data?: {
    // data emited on interest action
    title: string
    date: string
  }
}

export type TSceneInfos = {
  id?: number
  isDefault?: boolean
  name: string
  Scene: any
  nav?: {
    scale: number
    start?: number
    end?: number
    interest?: TSceneInterest[]
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
    name: 'TestDa',
    Scene: TestDA,
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
          start: 0,
          end: 1,
          power: 0.1,
          data: {
            title: 'BASECAMP',
            date: '1953',
          },
        },
        {
          start: 33,
          end: 36,
          power: 0.1,
          data: {
            title: 'BASECAMP',
            date: '2024',
          },
        },
        {
          start: 66,
          end: 69,
          power: 0.1,
          data: {
            title: 'BASECAMP',
            date: '2050',
          },
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
          start: 0,
          end: 1,
          power: 0.1,
          data: {
            title: 'ICEFALL',
            date: '1953',
          },
        },
        {
          start: 100 / 3,
          end: 37,
          power: 0.1,
          data: {
            title: 'ICEFALL',
            date: '2024',
          },
        },
        {
          start: (100 / 3) * 2,
          end: 70,
          power: 0.1,
          data: {
            title: 'ICEFALL',
            date: '2050',
          },
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
