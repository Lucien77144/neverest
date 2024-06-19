import { Vector3 } from 'three'

export type TBlockingInfos = {
  position: Vector3
  rotation: Vector3
}

export const BCSMALLBOX_1953: TBlockingInfos[] = [
  {
    position: new Vector3(6.71, -0.058, -18.197),
    rotation: new Vector3(Math.PI, -0.466, Math.PI),
  },
  {
    position: new Vector3(6.127, -0.058, -17.631),
    rotation: new Vector3(0, -1.563, 0),
  },
  {
    position: new Vector3(5.775, -0.058, -18.327),
    rotation: new Vector3(0, -0.986, 0),
  },
]

export const BCSMALLBOX_2024: TBlockingInfos[] = [
  {
    position: new Vector3(-1.866, 1.006, -19.711),
    rotation: new Vector3(Math.PI, -1.155, Math.PI),
  },
  {
    position: new Vector3(8.737, 1.229, -37.667),
    rotation: new Vector3(-Math.PI, 0.638, -Math.PI),
  },
  {
    position: new Vector3(-5.179, 0.581, -42.138),
    rotation: new Vector3(-Math.PI, 0.638, -Math.PI),
  },
]

export const BCMEDIUMBOX_1953: TBlockingInfos[] = [
  {
    position: new Vector3(-4.669, 1.081, -35.599),
    rotation: new Vector3(-Math.PI, 0.418, -Math.PI),
  },
  {
    position: new Vector3(7.708, -0.028, -9.984),
    rotation: new Vector3(Math.PI, -0.446, Math.PI),
  },
  {
    position: new Vector3(-4.404, 1.09, -6.196),
    rotation: new Vector3(Math.PI, -1.008, Math.PI),
  },
  {
    position: new Vector3(-5.276, 1.082, -5.384),
    rotation: new Vector3(-Math.PI, 0.418, -Math.PI),
  },
  {
    position: new Vector3(-7.104, 1.09, -3.798),
    rotation: new Vector3(-Math.PI, 0.297, -Math.PI),
  },
]

export const BCMEDIUMBOX_2024: TBlockingInfos[] = [
  {
    position: new Vector3(9.429, 0.3, -17.631),
    rotation: new Vector3(Math.PI / 2, 0, -0.155),
  },
  {
    position: new Vector3(-0.703, 0.300, -19.263),
    rotation: new Vector3(Math.PI / 2, 0, 0.173),
  },
  {
    position: new Vector3(-7.68, 0.300, -26.668),
    rotation: new Vector3(Math.PI / 2, 0, 0.173),
  },
  {
    position: new Vector3(8.043, 0.391, -36.632),
    rotation: new Vector3(Math.PI / 2, 0, 1.966),
  },
  {
    position: new Vector3(-5.156, 0.300, -42.098),
    rotation: new Vector3(Math.PI / 2, 0, 0.173),
  },
]

export const BCBIGBOX_1953: TBlockingInfos[] = [
  {
    position: new Vector3(-4.404, 0, -6.196),
    rotation: new Vector3(Math.PI, -1.015, Math.PI),
  },
  {
    position: new Vector3(-5.255, 0, -5.031),
    rotation: new Vector3(0, -0.763, 0),
  },
  {
    position: new Vector3(-6.768, 0, -3.797),
    rotation: new Vector3(0, -0.59, 0),
  },
  {
    position: new Vector3(9.051, 0, -11.093),
    rotation: new Vector3(0, 0.086, 0),
  },
  {
    position: new Vector3(-4.647, 0, -35.246),
    rotation: new Vector3(0, -0.763, 0),
  },
  {
    position: new Vector3(-3.575, 0, -8.184),
    rotation: new Vector3(Math.PI, -1.484, Math.PI),
  },
]

export const BCBIGBOX_2024: TBlockingInfos[] = [
  {
    position: new Vector3(-2.085, 0.500, -20.207),
    rotation: new Vector3(Math.PI / 2, 0, 0.797),
  },
  {
    position: new Vector3(10.242, 0.5, -11.112),
    rotation: new Vector3(Math.PI / 2, 0, -0.198),
  },
  {
    position: new Vector3(-9.334, 0.5, -16.435),
    rotation: new Vector3(Math.PI / 2, 0, 0.164),
  },
  {
    position: new Vector3(-10.133, 0.5, -22.4),
    rotation: new Vector3(Math.PI / 2, 0, -0.38),
  },
  {
    position: new Vector3(-6.717, 0.5, -27.655),
    rotation: new Vector3(Math.PI / 2, 0, 0.553),
  },
  {
    position: new Vector3(9.269, 0.668, -37.772),
    rotation: new Vector3(Math.PI / 2, 0, 2.59),
  },
]

export const BCBIGBOX_2050: TBlockingInfos[] = [
  {
    position: new Vector3(-6.59, -0.454, -9.765),
    rotation: new Vector3(1.903, 0.038, 0.763),
  },
  {
    position: new Vector3(-9.334, 0.008, -16.435),
    rotation: new Vector3(Math.PI / 2, -0.2, 0.164),
  },
  {
    position: new Vector3(-6.735, 0.145, -27.625),
    rotation: new Vector3(1.729, 0.097, 0.546),
  },
  {
    position: new Vector3(-10.133, 0.257, -22.4),
    rotation: new Vector3(1.843, 0.101, -0.373),
  },
  {
    position: new Vector3(10.242, 0.071, -11.112),
    rotation: new Vector3(1.762, 0, -0.198),
  },
  {
    position: new Vector3(9.255, 0.428, -37.795),
    rotation: new Vector3(1.379, 0.117, 2.601),
  },
]

export const BCTENT_1_1953: TBlockingInfos[] = [
  {
    position: new Vector3(0.328, 0, -35.809),
    rotation: new Vector3(0, -0.3, 0),
  },
]

export const BCTENT_2_1953: TBlockingInfos[] = [
  {
    position: new Vector3(-9.547, 0, -24.535),
    rotation: new Vector3(0, 0.61 + Math.PI , 0),
  },
  {
    position: new Vector3(4.046, 0, -21.257),
    rotation: new Vector3(0, 0.23 - Math.PI / 2, 0),
  },
  {
    position: new Vector3(9.507, 0, -16.813),
    rotation: new Vector3(0, 0.558 - Math.PI / 2, 0),
  },
]

export const BCTENT_3_1953: TBlockingInfos[] = [
  {
    position: new Vector3(-9.319, 0, -37.493),
    rotation: new Vector3(0, 0.2, 0),
  },
]

export const BCTENT_1_2024: TBlockingInfos[] = [
  {
    position: new Vector3(0.328, 0, -35.809),
    rotation: new Vector3(0, -0.3, 0),
  },
]

export const BCTENT_2_2024: TBlockingInfos[] = [
  {
    position: new Vector3(-11.568, -0.522, -14.34),
    rotation: new Vector3(Math.PI, -0.711, Math.PI),
  },
  {
    position: new Vector3(-11.384, -0.522, -19.582),
    rotation: new Vector3(Math.PI, -1.196, Math.PI),
  },
  {
    position: new Vector3(-11.592, -0.522, -26.937),
    rotation: new Vector3(Math.PI, -1.15, Math.PI),
  },
  {
    position: new Vector3(-8.884, -0.522, -30.942),
    rotation: new Vector3(Math.PI, -1.473, Math.PI),
  },
  {
    position: new Vector3(-5.551, -0.522, -47.315),
    rotation: new Vector3(Math.PI, -0.454, Math.PI),
  },
  {
    position: new Vector3(1.486, -0.522, -56.101),
    rotation: new Vector3(Math.PI, -1.105, Math.PI),
  },
  {
    position: new Vector3(-8.468, -0.522, -59.765),
    rotation: new Vector3(Math.PI, -0.452, Math.PI),
  },
  {
    position: new Vector3(12.123, -0.288, -22.804),
    rotation: new Vector3(-Math.PI, 1.109, -Math.PI),
  },
  {
    position: new Vector3(-11.605, 0.108, -52.992),
    rotation: new Vector3(Math.PI, -1.15, Math.PI),
  },
  {
    position: new Vector3(15.217, -0.555, -37.222),
    rotation: new Vector3(0, -1.269, 0),
  },
  {
    position: new Vector3(12.014, -0.555, -42.272),
    rotation: new Vector3(0, -1.088, 0),
  },
  {
    position: new Vector3(8.533, -0.555, -46.167),
    rotation: new Vector3(0, -0.937, 0),
  },
  {
    position: new Vector3(15.3, -0.555, -18.687),
    rotation: new Vector3(0, -1.163, 0),
  },
  {
    position: new Vector3(4.134, -0.614, -28.875),
    rotation: new Vector3(-Math.PI, 0.194, -Math.PI),
  },
  {
    position: new Vector3(-3.518, -0.522, -71.106),
    rotation: new Vector3(-Math.PI, 0.119, -Math.PI),
  },
  {
    position: new Vector3(1.199, -0.522, -47.405),
    rotation: new Vector3(-Math.PI, 0.161, -Math.PI),
  },
  {
    position: new Vector3(10.874, -0.184, -31.476),
    rotation: new Vector3(-Math.PI, 0.517, -Math.PI),
  },
  {
    position: new Vector3(11.486, -0.428, -14.626),
    rotation: new Vector3(-Math.PI, 1.514, -Math.PI),
  },
]

export const BCTENT_3_2024: TBlockingInfos[] = [
  {
    position: new Vector3(-9.727, -0.336, -37.772),
    rotation: new Vector3(Math.PI, -1.43 + Math.PI, Math.PI),
  },
  {
    position: new Vector3(9.152, -0.336, -53.987),
    rotation: new Vector3(Math.PI, -1.43 + Math.PI, Math.PI),
  },
  {
    position: new Vector3(-16.077, -0.336, -33.902),
    rotation: new Vector3(Math.PI, -1.43 + Math.PI, Math.PI),
  },
  {
    position: new Vector3(0.124, -0.336, -63.334),
    rotation: new Vector3(Math.PI, -1.43 + Math.PI, Math.PI),
  },
  {
    position: new Vector3(17.315, -0.336, -30.661),
    rotation: new Vector3(Math.PI, -1.43 + Math.PI, Math.PI),
  },
]

export const BCTENT_MAIN_2050: TBlockingInfos[] = [
  {
    position: new Vector3(0.328, 0, -35.809),
    rotation: new Vector3(0, -0.3, 0),
  },
]

export const BCTENT_1_2050: TBlockingInfos[] = [
  {
    position: new Vector3(-7.222, 0.122, -4.038),
    rotation: new Vector3(Math.PI, -0.711 + Math.PI, Math.PI),
  },
  {
    position: new Vector3(5.228, 0.12, -5.648),
    rotation: new Vector3(0, -1.088 + Math.PI, 0),
  },
  {
    position: new Vector3(15.217, 0.258, -37.222),
    rotation: new Vector3(0, -1.269 + Math.PI, 0),
  },
  {
    position: new Vector3(12.014, 0.277, -42.272),
    rotation: new Vector3(0, -1.088 + Math.PI, 0),
  },
  {
    position: new Vector3(1.486, 0.053, -56.101),
    rotation: new Vector3(Math.PI, -1.105 + Math.PI, Math.PI),
  },
  {
    position: new Vector3(-11.605, 0.108, -52.992),
    rotation: new Vector3(Math.PI, -1.15 + Math.PI, Math.PI),
  },
  {
    position: new Vector3(-7.903, 0.108, -66.916),
    rotation: new Vector3(Math.PI, -0.573 + Math.PI, Math.PI),
  },
  {
    position: new Vector3(7.067, 0.108, -62.972),
    rotation: new Vector3(-Math.PI, 0.586 + Math.PI, -Math.PI),
  },
]

export const BCTENT_2_2050: TBlockingInfos[] = [
  {
    position: new Vector3(2.056, -0.1659, -13.835),
    rotation: new Vector3(-Math.PI, 0.589, -Math.PI),
  },
  {
    position: new Vector3(11.486, -0.1428, -14.626),
    rotation: new Vector3(-Math.PI, 1.514, -Math.PI),
  },
  {
    position: new Vector3(-3.669, -0.503, -10.932),
    rotation: new Vector3(3.099, -0.765, 2.812),
  },
  {
    position: new Vector3(-11.384, -0.222, -19.582),
    rotation: new Vector3(Math.PI, -1.196, Math.PI),
  },
  {
    position: new Vector3(12.123, -0.1, -22.034),
    rotation: new Vector3(0, 0.988, 0),
  },
  {
    position: new Vector3(4.134, -0.272, -28.875),
    rotation: new Vector3(0, 0.982, 0),
  },
  {
    position: new Vector3(-11.592, -0.222, -26.937),
    rotation: new Vector3(Math.PI, -1.15, Math.PI),
  },
  {
    position: new Vector3(-8.884, -0.222, -30.942),
    rotation: new Vector3(Math.PI, -1.473, Math.PI),
  },
  {
    position: new Vector3(10.874, -0.184, -31.476),
    rotation: new Vector3(-Math.PI, 0.517, -Math.PI),
  },
  {
    position: new Vector3(-14.019, 0.108, -44.622),
    rotation: new Vector3(Math.PI, -0.187, Math.PI),
  },
  {
    position: new Vector3(-5.551, -0.222, -47.315),
    rotation: new Vector3(Math.PI, -0.454, Math.PI),
  },
  {
    position: new Vector3(1.675, 0.108, -49.049),
    rotation: new Vector3(-Math.PI, 0.206, -Math.PI),
  },
  {
    position: new Vector3(8.533, 0.11, -46.167),
    rotation: new Vector3(0, -0.937, 0),
  },
  {
    position: new Vector3(-2.832, 0.108, -71.342),
    rotation: new Vector3(-Math.PI, 0.586, -Math.PI),
  },
  {
    position: new Vector3(-8.468, -0.104, -59.765),
    rotation: new Vector3(Math.PI, -0.452, Math.PI),
  },
  {
    position: new Vector3(-11.568, -0.222, -14.34),
    rotation: new Vector3(Math.PI, -0.711, Math.PI),
  },
]

export const BCTENT_3_2050: TBlockingInfos[] = [
  {
    position: new Vector3(-16.077, -0.216, -33.902),
    rotation: new Vector3(0, -0.24, 0),
  },
  {
    position: new Vector3(0.124, -0.336, -63.334),
    rotation: new Vector3(0, -0.655, 0),
  },
  {
    position: new Vector3(9.152, -0.336, -53.987),
    rotation: new Vector3(Math.PI, -1.43, Math.PI),
  },
  {
    position: new Vector3(-8.427, -0.336, -37.772),
    rotation: new Vector3(Math.PI, -1.43, Math.PI),
  },
  {
    position: new Vector3(17.315, -0.336, -30.661),
    rotation: new Vector3(Math.PI, -1.43 + Math.PI, Math.PI),
  },
]