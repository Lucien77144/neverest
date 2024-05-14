import { Vector3 } from 'three'

export type TBlockingInfos = {
  name: string
  position: Vector3
  rotation: Vector3
  scale: Vector3
  visibility: [number, number]
}

export const BCSMALLBOX: TBlockingInfos[] = [
  {
    name: 'Boxd',
    position: new Vector3(-6.768, -0.019, -3.797),
    rotation: new Vector3(0, -0.631, 0),
    scale: new Vector3(0.746, 0.836, 0.746),
    visibility: [0, 30],
  },
  {
    name: 'Boxd1',
    position: new Vector3(-5.255, -0.013, -5.031),
    rotation: new Vector3(0, -1.269, 0),
    scale: new Vector3(0.72, 0.72, 0.72),
    visibility: [0, 20],
  },
  {
    name: 'Boxd2',
    position: new Vector3(-4.404, 0.01, -6.196),
    rotation: new Vector3(0, -0.624, 0),
    scale: new Vector3(0.72, 0.72, 0.72),
    visibility: [0, 40],
  },

  {
    name: 'Boxd011',
    position: new Vector3(-10.133, 0.73, -22.401),
    rotation: new Vector3(0, 0.37, 0),
    scale: new Vector3(0.72, 0.72, 0.72),
    visibility: [33, 78],
  },
  {
    name: 'Boxd012',
    position: new Vector3(-9.334, 0.142, -16.435),
    rotation: new Vector3(-0.018, 0.37, 0.007),
    scale: new Vector3(0.523, 0.523, 0.523),
    visibility: [33, 78],
  },
]

export const BCMEDIUMBOX: TBlockingInfos[] = [
  {
    name: 'Boxd3',
    position: new Vector3(-3.562, 0.006, -7.182),
    rotation: new Vector3(0, -0.624, 0),
    scale: new Vector3(0.5, 0.5, 0.5),
    visibility: [0, 60],
  },
  {
    name: 'Boxu',
    position: new Vector3(-5.608, 1.506, -5.397),
    rotation: new Vector3(0, 0.785, 0),
    scale: new Vector3(0.448, 0.448, 0.448),
    visibility: [0, 80],
  },
  {
    name: 'Boxu1',
    position: new Vector3(-4.521, 1.484, -5.838),
    rotation: new Vector3(-3.141, 0.789, -3.141),
    scale: new Vector3(0.327, 0.327, 0.327),
    visibility: [0, 100],
  },
  {
    name: 'Boxd004',
    position: new Vector3(9.024, 0.01, -15.228),
    rotation: new Vector3(3.141, -1.197, 3.141),
    scale: new Vector3(0.72, 0.72, 0.72),
    visibility: [0, 25],
  },
  {
    name: 'Boxd005',
    position: new Vector3(9.97, 0.01, -13.099),
    rotation: new Vector3(3.141, -0.124, 3.141),
    scale: new Vector3(0.72, 0.72, 0.72),
    visibility: [0, 10],
  },
  {
    name: 'Boxd009',
    position: new Vector3(-0.602, 0.126, -19.623),
    rotation: new Vector3(0, -0.218, 0),
    scale: new Vector3(0.474, 0.474, 0.474),
    visibility: [33, 78],
  },
  {
    name: 'Boxd010',
    position: new Vector3(-0.74, 0.914, -20.004),
    rotation: new Vector3(0, -1.306, 0),
    scale: new Vector3(0.274, 0.274, 0.274),
    visibility: [33, 78],
  },
]

export const BCBIGBOX: TBlockingInfos[] = [
  {
    name: 'Boxu002',
    position: new Vector3(8.618, -0.014, -13.226),
    rotation: new Vector3(0, -0.077, 0),
    scale: new Vector3(0.448, 0.448, 0.448),
    visibility: [0, 35],
  },
  {
    name: 'Boxu003',
    position: new Vector3(8.645, -0.024, -11.573),
    rotation: new Vector3(0, 0.216, 0),
    scale: new Vector3(0.327, 0.203, 0.327),
    visibility: [0, 60],
  },
  {
    name: 'Boxd006',
    position: new Vector3(-4.67, 0.01, -35.288),
    rotation: new Vector3(0, -0.624, 0),
    scale: new Vector3(0.72, 0.72, 0.72),
    visibility: [0, 40],
  },
  {
    name: 'Box',
    position: new Vector3(6.163, -0.224, -17.777),
    rotation: new Vector3(3.141, 0.03, 3.141),
    scale: new Vector3(0.275, 0.275, 0.275),
    visibility: [0, 100],
  },
  {
    name: 'Boxl',
    position: new Vector3(5.775, -0.224, -18.327),
    rotation: new Vector3(-3.141, -0.556, -3.141),
    scale: new Vector3(0.275, 0.275, 0.275),
    visibility: [0, 54],
  },
  {
    name: 'Boxr',
    position: new Vector3(6.71, -0.224, -18.197),
    rotation: new Vector3(3.141, -0.31, 3.141),
    scale: new Vector3(0.275, 0.275, 0.275),
    visibility: [0, 60],
  },
  {
    name: 'Boxd007',
    position: new Vector3(-6.717, 0.426, -27.655),
    rotation: new Vector3(0, -0.624, 0),
    scale: new Vector3(0.72, 0.72, 0.72),
    visibility: [33, 78],
  },
  {
    name: 'Boxd008',
    position: new Vector3(-2.085, 0.338, -20.207),
    rotation: new Vector3(0, -0.788, 0),
    scale: new Vector3(0.72, 0.72, 0.72),
    visibility: [33, 78],
  },
]

export const BCTENT_1_1953: TBlockingInfos[] = [
  {
    name: 'Tent_Primative_main',
    position: new Vector3(0.551, -0.18, -36.868),
    rotation: new Vector3(3.141, 0.045, 3.141),
    scale: new Vector3(1.412, 1.412, 1.412),
    visibility: [0, 30],
  },
]

export const BCTENT_2_1953: TBlockingInfos[] = [
  {
    name: 'Tent_Primative_l_1',
    position: new Vector3(-7.939, -0.098, -30.382),
    rotation: new Vector3(0, 1.128, 0),
    scale: new Vector3(1.2, 1.2, 1.2),
    visibility: [0, 20],
  },
  {
    name: 'Tent_Primative_l_1001',
    position: new Vector3(-6.143, -0.098, -33.12),
    rotation: new Vector3(0, 0.696, 0),
    scale: new Vector3(1.2, 1.2, 1.2),
    visibility: [0, 78],
  },
]

export const BCTENT_3_1953: TBlockingInfos[] = [
  {
    name: 'Tent_Primative_r_1',
    position: new Vector3(4.993, -0.134, -21.521),
    rotation: new Vector3(-0.036, 0.938, -0.005),
    scale: new Vector3(1.044, 1.044, 1.044),
    visibility: [0, 40],
  },
  {
    name: 'Tent_Primative_r_2',
    position: new Vector3(9.231, 0.006, -17.279),
    rotation: new Vector3(3.141, 1.365, 3.141),
    scale: new Vector3(0.953, 0.953, 0.953),
    visibility: [0, 30],
  },
]

export const BCTENT_1_2024: TBlockingInfos[] = [
  {
    name: 'Tent_Primative_l_1002',
    position: new Vector3(-10.4, -0.919, -13.491),
    rotation: new Vector3(0, 0.934, 0),
    scale: new Vector3(1.803, 1.803, 1.803),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_l_1003',
    position: new Vector3(-10.003, -0.465, -19.582),
    rotation: new Vector3(0, 0.934, 0),
    scale: new Vector3(1.803, 1.803, 1.803),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_l_1004',
    position: new Vector3(-8.725, -0.236, -25.45),
    rotation: new Vector3(0.096, 0.933, -0.12),
    scale: new Vector3(1.803, 1.803, 1.803),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_l_1005',
    position: new Vector3(-8.884, -0.258, -30.942),
    rotation: new Vector3(0, 0.934, 0),
    scale: new Vector3(1.803, 1.803, 1.803),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_l_1006',
    position: new Vector3(-16.356, -0.098, -16.973),
    rotation: new Vector3(0, 0.934, 0),
    scale: new Vector3(1.803, 1.803, 1.803),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_l_1007',
    position: new Vector3(-15.883, -0.098, -22.354),
    rotation: new Vector3(0, 0.934, 0),
    scale: new Vector3(1.803, 1.803, 1.803),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_l_1008',
    position: new Vector3(-15.076, -0.098, -27.122),
    rotation: new Vector3(0, 0.934, 0),
    scale: new Vector3(1.803, 1.803, 1.803),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_l_1009',
    position: new Vector3(-13.735, -0.098, -32.011),
    rotation: new Vector3(0, 0.934, 0),
    scale: new Vector3(1.803, 1.803, 1.803),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_l_1010',
    position: new Vector3(-11.037, -0.098, -36.744),
    rotation: new Vector3(0, 0.934, 0),
    scale: new Vector3(1.803, 1.803, 1.803),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_l_1011',
    position: new Vector3(-6.79, -0.336, -37.142),
    rotation: new Vector3(0, 0.934, 0),
    scale: new Vector3(1.803, 1.803, 1.803),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_l_1012',
    position: new Vector3(-9.384, -0.098, -42.549),
    rotation: new Vector3(0, 0.934, 0),
    scale: new Vector3(1.803, 1.803, 1.803),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_l_1013',
    position: new Vector3(-5.551, -0.191, -47.315),
    rotation: new Vector3(0, 0.934, 0),
    scale: new Vector3(1.803, 1.803, 1.803),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_l_1014',
    position: new Vector3(-7.303, -0.098, -52.639),
    rotation: new Vector3(0, 0.934, 0),
    scale: new Vector3(1.803, 1.803, 1.803),
    visibility: [33, 78],
  },
]

export const BCTENT_2_2024: TBlockingInfos[] = [
  {
    name: 'Tent_Primative_main001',
    position: new Vector3(0.551, 0.135, -36.868),
    rotation: new Vector3(0, -0.4, 0),
    scale: new Vector3(1.412, 1.412, 1.412),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_main002',
    position: new Vector3(4.166, 0.018, -25.984),
    rotation: new Vector3(0.047, -0.407, 0.06),
    scale: new Vector3(1.412, 1.412, 1.412),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_main003',
    position: new Vector3(8.533, 0.135, -46.167),
    rotation: new Vector3(0, -0.616, 0),
    scale: new Vector3(1.412, 1.412, 1.412),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_main004',
    position: new Vector3(5.277, 0.135, -50.743),
    rotation: new Vector3(0, -0.13, 0),
    scale: new Vector3(1.412, 1.412, 1.412),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_main005',
    position: new Vector3(-2.168, 0.135, -63.095),
    rotation: new Vector3(0, 0.019, 0),
    scale: new Vector3(1.412, 1.412, 1.412),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_main006',
    position: new Vector3(1.486, 0.135, -56.101),
    rotation: new Vector3(0, -0.945, 0),
    scale: new Vector3(1.412, 1.412, 1.412),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_main007',
    position: new Vector3(19.652, 0.331, -25.15),
    rotation: new Vector3(0, -0.665, 0),
    scale: new Vector3(1.412, 1.412, 1.412),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_main008',
    position: new Vector3(17.464, 0.331, -30.708),
    rotation: new Vector3(0, -0.069, 0),
    scale: new Vector3(1.412, 1.412, 1.412),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_main009',
    position: new Vector3(11.483, 0.331, -41.528),
    rotation: new Vector3(0, 0.114, 0),
    scale: new Vector3(1.412, 1.412, 1.412),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_main010',
    position: new Vector3(14.686, 0.331, -36.479),
    rotation: new Vector3(0, -1.069, 0),
    scale: new Vector3(1.412, 1.412, 1.412),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_main011',
    position: new Vector3(1.297, 0.135, -46.228),
    rotation: new Vector3(0, -0.616, 0),
    scale: new Vector3(1.412, 1.412, 1.412),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_main012',
    position: new Vector3(15.3, 0.331, -18.687),
    rotation: new Vector3(0, -0.665, 0),
    scale: new Vector3(1.412, 1.412, 1.412),
    visibility: [33, 78],
  },
]

export const BCTENT_3_2024: TBlockingInfos[] = [
  {
    name: 'Tent_Primative_main013',
    position: new Vector3(13.427, 0.331, -25.211),
    rotation: new Vector3(0, -0.069, 0),
    scale: new Vector3(1.412, 1.412, 1.412),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_main014',
    position: new Vector3(9.861, 0.331, -31.365),
    rotation: new Vector3(0, 0.114, 0),
    scale: new Vector3(1.412, 1.412, 1.412),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_main015',
    position: new Vector3(6.515, 0.331, -39.342),
    rotation: new Vector3(0, -1.069, 0),
    scale: new Vector3(1.412, 1.412, 1.412),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_main016',
    position: new Vector3(9.468, 0.121, -20.786),
    rotation: new Vector3(-0.01, -0.085, 0.069),
    scale: new Vector3(1.412, 1.412, 1.412),
    visibility: [33, 78],
  },
]
