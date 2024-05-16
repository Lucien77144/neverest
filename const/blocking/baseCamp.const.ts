import { Vector3 } from 'three'

export type TBlockingInfos = {
  name: string
  position: Vector3
  rotation: Vector3
  visibility: [number, number]
}

export const BCSMALLBOX_1953: TBlockingInfos[] = [
  {
    name: 'BoitePetite1',
    position: new Vector3(6.71, -0.058, -18.197),
    rotation: new Vector3(Math.PI, -0.466, Math.PI),
    visibility: [0, 25.87],
  },
  {
    name: 'BoitePetite2',
    position: new Vector3(6.127, -0.058, -17.631),
    rotation: new Vector3(0, -1.563, 0),
    visibility: [0, 25.87],
  },
  {
    name: 'BoitePetite3',
    position: new Vector3(5.775, -0.058, -18.327),
    rotation: new Vector3(0, -0.986, 0),
    visibility: [0, 25.87],
  },
]

export const BCSMALLBOX_2024: TBlockingInfos[] = [
  {
    name: 'BoitePetite1_2024',
    position: new Vector3(-1.866, 1.006, -19.711),
    rotation: new Vector3(Math.PI, -1.155, Math.PI),
    visibility: [25.87, 75.97],
  },
  {
    name: 'BoitePetite2_2024',
    position: new Vector3(8.737, 1.229, -37.667),
    rotation: new Vector3(-Math.PI, 0.638, -Math.PI),
    visibility: [25.87, 75.97],
  },
  {
    name: 'BoitePetite3_2024',
    position: new Vector3(-5.179, 0.581, -42.138),
    rotation: new Vector3(-Math.PI, 0.638, -Math.PI),
    visibility: [25.87, 75.97],
  },
]

export const BCMEDIUMBOX_1953: TBlockingInfos[] = [
  {
    name: 'BoiteMoyenne1',
    position: new Vector3(-4.669, 1.081, -35.599),
    rotation: new Vector3(-Math.PI, 0.418, -Math.PI),
    visibility: [0, 25.87],
  },
  {
    name: 'BoiteMoyenne2',
    position: new Vector3(8.708, -0.028, -12.984),
    rotation: new Vector3(Math.PI, -0.446, Math.PI),
    visibility: [0, 25.87],
  },
  {
    name: 'BoiteMoyenne3',
    position: new Vector3(-4.404, 1.09, -6.196),
    rotation: new Vector3(Math.PI, -1.008, Math.PI),
    visibility: [0, 25.87],
  },
  {
    name: 'BoiteMoyenne4',
    position: new Vector3(-5.276, 1.082, -5.384),
    rotation: new Vector3(-Math.PI, 0.418, -Math.PI),
    visibility: [0, 25.87],
  },
  {
    name: 'BoiteMoyenne5',
    position: new Vector3(-7.104, 1.09, -3.798),
    rotation: new Vector3(-Math.PI, 0.297, -Math.PI),
    visibility: [0, 25.87],
  },
]

export const BCMEDIUMBOX_2024: TBlockingInfos[] = [
  {
    name: 'BoiteMoyenne1_2024',
    position: new Vector3(9.429, 0.3, -17.631),
    rotation: new Vector3(Math.PI / 2, 0, -0.155),
    visibility: [25.87, 75.97],
  },
  {
    name: 'BoiteMoyenne2_2024',
    position: new Vector3(-0.703, 0.300, -19.263),
    rotation: new Vector3(Math.PI / 2, 0, 0.173),
    visibility: [25.87, 75.97],
  },
  {
    name: 'BoiteMoyenne3_2024',
    position: new Vector3(-7.68, 0.300, -26.668),
    rotation: new Vector3(Math.PI / 2, 0, 0.173),
    visibility: [25.87, 75.97],
  },
  {
    name: 'BoiteMoyenne4_2024',
    position: new Vector3(8.043, 0.391, -36.632),
    rotation: new Vector3(Math.PI / 2, 0, 1.966),
    visibility: [25.87, 75.97],
  },
  {
    name: 'BoiteMoyenne5_2024',
    position: new Vector3(-5.156, 0.300, -42.098),
    rotation: new Vector3(Math.PI / 2, 0, 0.173),
    visibility: [25.87, 75.97],
  },
]

export const BCBIGBOX_1953: TBlockingInfos[] = [
  {
    name: 'BoiteGrande1',
    position: new Vector3(-4.404, 0, -6.196),
    rotation: new Vector3(Math.PI, -1.015, Math.PI),
    visibility: [0, 25.87],
  },
  {
    name: 'BoiteGrande2',
    position: new Vector3(-5.255, 0, -5.031),
    rotation: new Vector3(0, -0.763, 0),
    visibility: [0, 25.87],
  },
  {
    name: 'BoiteGrande3',
    position: new Vector3(-6.768, 0, -3.797),
    rotation: new Vector3(0, -0.59, 0),
    visibility: [0, 25.87],
  },
  {
    name: 'BoiteGrande4',
    position: new Vector3(10.051, 0, -13.093),
    rotation: new Vector3(0, 0.086, 0),
    visibility: [0, 25.87],
  },
  {
    name: 'BoiteGrande5',
    position: new Vector3(-4.647, 0, -35.246),
    rotation: new Vector3(0, -0.763, 0),
    visibility: [0, 25.87],
  },
  {
    name: 'BoiteGrande6',
    position: new Vector3(-3.575, 0, -8.184),
    rotation: new Vector3(Math.PI, -1.484, Math.PI),
    visibility: [0, 25.87],
  },
]

export const BCBIGBOX_2024: TBlockingInfos[] = [
  {
    name: 'BoiteGrande1_2024',
    position: new Vector3(-2.085, 0.500, -20.207),
    rotation: new Vector3(Math.PI / 2, 0, 0.797),
    visibility: [25.87, 75.97],
  },
  {
    name: 'BoiteGrande2_2024',
    position: new Vector3(10.242, 0.5, -11.112),
    rotation: new Vector3(Math.PI / 2, 0, -0.198),
    visibility: [25.87, 75.97],
  },
  {
    name: 'BoiteGrande3_2024',
    position: new Vector3(-9.334, 0.5, -16.435),
    rotation: new Vector3(Math.PI / 2, 0, 0.164),
    visibility: [25.87, 75.97],
  },
  {
    name: 'BoiteGrande4_2024',
    position: new Vector3(-10.133, 0.5, -22.4),
    rotation: new Vector3(Math.PI / 2, 0, -0.38),
    visibility: [25.87, 75.97],
  },
  {
    name: 'BoiteGrande5_2024',
    position: new Vector3(-6.717, 0.5, -27.655),
    rotation: new Vector3(Math.PI / 2, 0, 0.553),
    visibility: [25.87, 75.97],
  },
  {
    name: 'BoiteGrande6_2024',
    position: new Vector3(9.269, 0.668, -37.772),
    rotation: new Vector3(Math.PI / 2, 0, 2.59),
    visibility: [25.87, 75.97],
  },
]

export const BCTENT_1_1953: TBlockingInfos[] = [
  {
    name: 'BCTENT_1_1953_1',
    position: new Vector3(0.328, 0, -35.809),
    rotation: new Vector3(0, -0.3, 0),
    visibility: [0, 25.87],
  },
]

export const BCTENT_2_1953: TBlockingInfos[] = [
  {
    name: 'BCTENT_2_1953_1',
    position: new Vector3(-9.547, 0, -24.535),
    rotation: new Vector3(0, 0.61, 0),
    visibility: [0, 25.87],
  },
  {
    name: 'BCTENT_2_1953_2',
    position: new Vector3(5.046, 0, -21.257),
    rotation: new Vector3(0, 0.23, 0),
    visibility: [0, 25.87],
  },
  {
    name: 'BCTENT_2_1953_3',
    position: new Vector3(9.157, 0, -16.813),
    rotation: new Vector3(0, 0.458, 0),
    visibility: [0, 25.87],
  },
]

export const BCTENT_3_1953: TBlockingInfos[] = [
  {
    name: 'BCTENT_3_1953_1',
    position: new Vector3(-9.319, 0, -37.493),
    rotation: new Vector3(0, 0.2, 0),
    visibility: [0, 25.87],
  },
]

export const BCTENT_1_2024: TBlockingInfos[] = [
  {
    name: 'BC_Tent_1_2024_1',
    position: new Vector3(0.328, 0, -35.809),
    rotation: new Vector3(0, -0.3, 0),
    visibility: [25.87, 75.97],
  },
]

export const BCTENT_2_2024: TBlockingInfos[] = [
  {
    name: 'BC_Tent_2_2024_1',
    position: new Vector3(-11.568, -0.522, -14.34),
    rotation: new Vector3(Math.PI, -0.711 + Math.PI, Math.PI),
    visibility: [25.87, 75.97],
  },
  {
    name: 'BC_Tent_2_2024_2',
    position: new Vector3(-11.384, -0.522, -19.582),
    rotation: new Vector3(Math.PI, -1.196 + Math.PI, Math.PI),
    visibility: [25.87, 75.97],
  },
  {
    name: 'BC_Tent_2_2024_3',
    position: new Vector3(-11.592, -0.522, -26.937),
    rotation: new Vector3(Math.PI, -1.15 + Math.PI, Math.PI),
    visibility: [25.87, 75.97],
  },
  {
    name: 'BC_Tent_2_2024_4',
    position: new Vector3(-8.884, -0.522, -30.942),
    rotation: new Vector3(Math.PI, -1.473 + Math.PI, Math.PI),
    visibility: [25.87, 75.97],
  },
  {
    name: 'BC_Tent_2_2024_5',
    position: new Vector3(-5.551, -0.522, -47.315),
    rotation: new Vector3(Math.PI, -0.454 + Math.PI, Math.PI),
    visibility: [25.87, 75.97],
  },
  {
    name: 'BC_Tent_2_2024_6',
    position: new Vector3(1.486, -0.522, -56.101),
    rotation: new Vector3(Math.PI, -1.105 + Math.PI, Math.PI),
    visibility: [25.87, 75.97],
  },
  {
    name: 'BC_Tent_2_2024_7',
    position: new Vector3(-8.468, -0.522, -59.765),
    rotation: new Vector3(Math.PI, -0.452 + Math.PI, Math.PI),
    visibility: [25.87, 75.97],
  },
  {
    name: 'BC_Tent_2_2024_8',
    position: new Vector3(12.123, -0.288, -22.804),
    rotation: new Vector3(-Math.PI, 1.109 + Math.PI, -Math.PI),
    visibility: [25.87, 75.97],
  },
  {
    name: 'BC_Tent_2_2024_9',
    position: new Vector3(-11.605, 0.108, -52.992),
    rotation: new Vector3(Math.PI, -1.15 + Math.PI, Math.PI),
    visibility: [25.87, 75.97],
  },
  {
    name: 'BC_Tent_2_2024_10',
    position: new Vector3(15.217, -0.555, -37.222),
    rotation: new Vector3(0, -1.269 + Math.PI, 0),
    visibility: [25.87, 75.97],
  },
  {
    name: 'BC_Tent_2_2024_11',
    position: new Vector3(12.014, -0.555, -42.272),
    rotation: new Vector3(0, -1.088 + Math.PI, 0),
    visibility: [25.87, 75.97],
  },
  {
    name: 'BC_Tent_2_2024_12',
    position: new Vector3(8.533, -0.555, -46.167),
    rotation: new Vector3(0, -0.937 + Math.PI, 0),
    visibility: [25.87, 75.97],
  },
  {
    name: 'BC_Tent_2_2024_13',
    position: new Vector3(15.3, -0.555, -18.687),
    rotation: new Vector3(0, -1.163 + Math.PI, 0),
    visibility: [25.87, 75.97],
  },
  {
    name: 'BC_Tent_2_2024_14',
    position: new Vector3(4.134, -0.614, -28.875),
    rotation: new Vector3(-Math.PI, 0.194 + Math.PI, -Math.PI),
    visibility: [25.87, 75.97],
  },
  {
    name: 'BC_Tent_2_2024_15',
    position: new Vector3(-3.518, -0.522, -71.106),
    rotation: new Vector3(-Math.PI, 0.119 + Math.PI, -Math.PI),
    visibility: [25.87, 75.97],
  },
  {
    name: 'BC_Tent_2_2024_16',
    position: new Vector3(1.199, -0.522, -47.405),
    rotation: new Vector3(-Math.PI, 0.161 + Math.PI, -Math.PI),
    visibility: [25.87, 75.97],
  },
  {
    name: 'BC_Tent_2_2024_17',
    position: new Vector3(10.874, -0.184, -31.476),
    rotation: new Vector3(-Math.PI, 0.517 + Math.PI, -Math.PI),
    visibility: [25.87, 75.97],
  },
  {
    name: 'BC_Tent_2_2024_18',
    position: new Vector3(11.486, -0.428, -14.626),
    rotation: new Vector3(-Math.PI, 1.514 + Math.PI, -Math.PI),
    visibility: [25.87, 75.97],
  },
]

export const BCTENT_3_2024: TBlockingInfos[] = [
  {
    name: 'BC_Tent_3_2024_1',
    position: new Vector3(-8.427, -0.336, -37.772),
    rotation: new Vector3(Math.PI, -1.43 + Math.PI, Math.PI),
    visibility: [25.87, 75.97],
  },
  {
    name: 'BC_Tent_3_2024_2',
    position: new Vector3(9.152, -0.336, -53.987),
    rotation: new Vector3(Math.PI, -1.43 + Math.PI, Math.PI),
    visibility: [25.87, 75.97],
  },
  {
    name: 'BC_Tent_3_2024_3',
    position: new Vector3(-16.077, -0.336, -33.902),
    rotation: new Vector3(Math.PI, -1.43 + Math.PI, Math.PI),
    visibility: [25.87, 75.97],
  },
  {
    name: 'BC_Tent_3_2024_4',
    position: new Vector3(0.124, -0.336, -63.334),
    rotation: new Vector3(Math.PI, -1.43 + Math.PI, Math.PI),
    visibility: [25.87, 75.97],
  },
  {
    name: 'BC_Tent_3_2024_5',
    position: new Vector3(17.315, -0.336, -30.661),
    rotation: new Vector3(Math.PI, -1.43 + Math.PI, Math.PI),
    visibility: [25.87, 75.97],
  },
]
