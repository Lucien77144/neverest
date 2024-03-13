export type TTransitionsKeys = 'FADE' | 'PLANE' | 'CLOUD'

const TRANSITIONS: { [key in TTransitionsKeys]: number } = {
  FADE: 0,
  PLANE: 1,
  CLOUD: 2,
}

export default TRANSITIONS
