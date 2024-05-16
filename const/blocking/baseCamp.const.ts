import { Vector3 } from 'three'

export type TBlockingInfos = {
  name: string
  position: Vector3
  rotation: Vector3
  visibility: [number, number]
}

export const BCSMALLBOX: TBlockingInfos[] = [
  {
    name: 'BoitePetite1',
    position: new Vector3(6.71, -0.058, -18.197),
    rotation: new Vector3(Math.PI, -0.466, Math.PI),
    visibility: [0, 33],
  },
  {
    name: 'BoitePetite2',
    position: new Vector3(6.127, -0.058, -17.631),
    rotation: new Vector3(0, -1.563, 0),
    visibility: [0, 33],
  },
  {
    name: 'BoitePetite3',
    position: new Vector3(5.775, -0.058, -18.327),
    rotation: new Vector3(0, -0.986, 0),
    visibility: [0, 33],
  },
]

export const BCMEDIUMBOX: TBlockingInfos[] = [
  {
    name: 'BoiteMoyenne1',
    position: new Vector3(-4.669, 1.081, -35.599),
    rotation: new Vector3(-Math.PI, 0.418, -Math.PI),
    visibility: [0, 33],
  },
  {
    name: 'BoiteMoyenne2',
    position: new Vector3(8.708, -0.028, -12.984),
    rotation: new Vector3(Math.PI, -0.446, Math.PI),
    visibility: [0, 33],
  },
  {
    name: 'BoiteMoyenne3',
    position: new Vector3(-4.404, 1.09, -6.196),
    rotation: new Vector3(Math.PI, -1.008, Math.PI),
    visibility: [0, 33],
  },
  {
    name: 'BoiteMoyenne4',
    position: new Vector3(-5.276, 1.082, -5.384),
    rotation: new Vector3(-Math.PI, 0.418, -Math.PI),
    visibility: [0, 33],
  },
  {
    name: 'BoiteMoyenne5',
    position: new Vector3(-7.104, 1.09, -3.798),
    rotation: new Vector3(-Math.PI, 0.297, -Math.PI),
    visibility: [0, 33],
  },
]

export const BCBIGBOX: TBlockingInfos[] = [
  {
    name: 'BoiteGrande1',
    position: new Vector3(-4.404, 0, -6.196),
    rotation: new Vector3(Math.PI, -1.015, Math.PI),
    visibility: [0, 33],
  },
  {
    name: 'BoiteGrande2',
    position: new Vector3(-5.255, 0, -5.031),
    rotation: new Vector3(0, -0.763, 0),
    visibility: [0, 33],
  },
  {
    name: 'BoiteGrande3',
    position: new Vector3(-6.768, 0, -3.797),
    rotation: new Vector3(0, -0.59, 0),
    visibility: [0, 33],
  },
  {
    name: 'BoiteGrande4',
    position: new Vector3(10.051, 0, -13.093),
    rotation: new Vector3(0, 0.086, 0),
    visibility: [0, 33],
  },
  {
    name: 'BoiteGrande5',
    position: new Vector3(-4.647, 0, -35.246),
    rotation: new Vector3(0, -0.763, 0),
    visibility: [0, 33],
  },
  {
    name: 'BoiteGrande6',
    position: new Vector3(-3.575, 0, -8.184),
    rotation: new Vector3(Math.PI, -1.484, Math.PI),
    visibility: [0, 33],
  },
]

export const BCTENT_1_1953: TBlockingInfos[] = [
  {
    name: 'BCTENT_1_1953_1',
    position: new Vector3(0.328, 0, -35.809),
    rotation: new Vector3(0, -0.3, 0),
    visibility: [0, 33],
  },
]

export const BCTENT_2_1953: TBlockingInfos[] = [
  {
    name: 'BCTENT_2_1953_1',
    position: new Vector3(-9.547, 0, -24.535),
    rotation: new Vector3(0, 0.61, 0),
    visibility: [0, 33],
  },
  {
    name: 'BCTENT_2_1953_2',
    position: new Vector3(5.046, 0, -21.257),
    rotation: new Vector3(0, 0.23, 0),
    visibility: [0, 33],
  },
  {
    name: 'BCTENT_2_1953_3',
    position: new Vector3(9.157, 0, -16.813),
    rotation: new Vector3(0, 0.458, 0),
    visibility: [0, 33],
  },
]

export const BCTENT_3_1953: TBlockingInfos[] = [
  {
    name: 'BCTENT_3_1953_1',
    position: new Vector3(-9.319, 0, -37.493),
    rotation: new Vector3(0, 0.2, 0),
    visibility: [0, 33],
  },
]

export const BCTENT_1_2024: TBlockingInfos[] = [
  {
    name: 'BC_Tent_1_2024_1',
    position: new Vector3(0.328, 1.266, -35.809),
    rotation: new Vector3(0, -0.3, 0),
    visibility: [33, 78],
  },
]

export const BCTENT_2_2024: TBlockingInfos[] = [
  {
    name: 'Tent_Primative_main001',
    position: new Vector3(0.551, 0.135, -36.868),
    rotation: new Vector3(0, -0.4, 0),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_main002',
    position: new Vector3(4.166, 0.018, -25.984),
    rotation: new Vector3(0.047, -0.407, 0.06),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_main003',
    position: new Vector3(8.533, 0.135, -46.167),
    rotation: new Vector3(0, -0.616, 0),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_main004',
    position: new Vector3(5.277, 0.135, -50.743),
    rotation: new Vector3(0, -0.13, 0),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_main005',
    position: new Vector3(-2.168, 0.135, -63.095),
    rotation: new Vector3(0, 0.019, 0),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_main006',
    position: new Vector3(1.486, 0.135, -56.101),
    rotation: new Vector3(0, -0.945, 0),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_main007',
    position: new Vector3(19.652, 0.331, -25.15),
    rotation: new Vector3(0, -0.665, 0),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_main008',
    position: new Vector3(17.464, 0.331, -30.708),
    rotation: new Vector3(0, -0.069, 0),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_main009',
    position: new Vector3(11.483, 0.331, -41.528),
    rotation: new Vector3(0, 0.114, 0),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_main010',
    position: new Vector3(14.686, 0.331, -36.479),
    rotation: new Vector3(0, -1.069, 0),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_main011',
    position: new Vector3(1.297, 0.135, -46.228),
    rotation: new Vector3(0, -0.616, 0),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_main012',
    position: new Vector3(15.3, 0.331, -18.687),
    rotation: new Vector3(0, -0.665, 0),
    visibility: [33, 78],
  },
]

export const BCTENT_3_2024: TBlockingInfos[] = [
  {
    name: 'Tent_Primative_main013',
    position: new Vector3(13.427, 0.331, -25.211),
    rotation: new Vector3(0, -0.069, 0),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_main014',
    position: new Vector3(9.861, 0.331, -31.365),
    rotation: new Vector3(0, 0.114, 0),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_main015',
    position: new Vector3(6.515, 0.331, -39.342),
    rotation: new Vector3(0, -1.069, 0),
    visibility: [33, 78],
  },
  {
    name: 'Tent_Primative_main016',
    position: new Vector3(9.468, 0.121, -20.786),
    rotation: new Vector3(-0.01, -0.085, 0.069),
    visibility: [33, 78],
  },
]
