/**
 * 鋼構斷面總表
 * 基本項目：
 * 梁深 h height: mm
 * 梁寬 b width: mm
 */

 /** 
 * 通用斷面性質：
 * 面積 area： cm^2
 * 單位質量 unitWeight: kg/m
 * 慣性矩 Ix inertiaX: cm^4
 * 慣性矩 Iy inertiaY: cm^4
 * 迴轉半徑 rx radiusGyrationX: cm
 * 迴轉半徑 ry radiusGyrationY: cm
 * 斷面模數 Sx sectionModulusX: cm^3
 * 斷面模數 Sy sectionModulusY: cm^3
 * 塑性斷面模數 Zx plasticModulusX: cm^3
 * 塑性斷面模數 Zy plasticModulusY: cm^3
 */

/**
 * 通用斷面扭轉性質：
 * 扭轉常數 J torsionConst: cm^4
 * 翹曲常數 Cw warpingConst: cm^6
 */

// 斷面基礎性質type
type CrossSectionProps = {
  section: string;
  height: number;
  width: number;
}
// 斷面性質type
type CrossSectionSpecProps = {
  area: number;
  unitWeight: number;
  inertiaX: number;
  inertiaY: number;
  radiusGyrationX: number;
  radiusGyrationY: number;
  sectionModulusX: number;
  sectionModulusY: number;
  plasticModulusX: number;
  plasticModulusY: number;
}
// 斷面性質type
type CorssSectionTorsionSpecProps = {
  torsionConst: number;
  warpingConst: number;
}

// RH型鋼, BH型鋼 //
/**
 * 基本性質：
 * 腹版厚度 tw webThick: mm
 * 翼版厚度 tf flangeThick: mm
 * 
 * 扭轉性質：
 * X1 xOne: tf/cm^2
 * X2 xTwo: (cm^2/tf)^2
 * 
 * 其他性質：
 * 結實斷面之最高降伏應力 (FyL)p maxStressofCompactSection: tf/cm^2
 * 耐震斷面之最高降伏應力 (FyL)pd maxStressofSeismicSection: tf/cm^2
 * 繞X軸之翼板塑性模數與全斷面塑性模數比 plasticModulusRatio: null
 */
export type HBeamCrossSectionProps =  CrossSectionProps & CrossSectionSpecProps & CorssSectionTorsionSpecProps & {
  webThick: number;
  flangeThick: number;
  xOne: number;
  xTwo: number;
  maxStressofCompactSection?: number;
  maxStressofSeismicSection?: number;
  plasticModulusRatio: number;
}

// 等邊槽型鋼 C型鋼 //
/**
 * 重心位置 Cx centralMassX: cm
 * 重心位置 Cy centralMassY: cm
 * 剪力中心 X0 shearCentroidX: cm
 * 剪力中心 Y0 shearCentroidY: cm
 */
export type CBeamCrossSectionProps =  CrossSectionProps & CrossSectionSpecProps & {
  centralMassX: number;
  centralMassY: number;
  shearCentroidX: number;
  shearCentroidY: number;
}

// 不同鋼材種類降伏強度及抗拉強度
type SteelStrengthlListProps = {
  yieldingStrength: number|{[k: string]: number}; // unit: tf/cm^2
  fractureStrength: number|{[k: string]: number}; // unit: tf/cm^2
}
type BrandListProps = { [k: string]: SteelStrengthlListProps}
type SteelMaterialsListProps = { [k in 'ASTM'|'CNS']: BrandListProps}
const SteelMaterialsList:SteelMaterialsListProps = {
  ASTM: {
    A36: { yieldingStrength: 2.5, fractureStrength: 4},
    A572_Gr42: {yieldingStrength: 2.9, fractureStrength: 4.15},
    A572_Gr50: {yieldingStrength: 3.45, fractureStrength: 4.5},
    A572_Gr55: {yieldingStrength: 3.8, fractureStrength: 4.85},
    A572_Gr60: {yieldingStrength: 4.15, fractureStrength: 5.2},
    A572_Gr65: {yieldingStrength: 4.5, fractureStrength: 5.5},
    A992_Gr50: {yieldingStrength: 3.45, fractureStrength: 4.5},
    A709_Gr36: {yieldingStrength: {'100': 2.5, 'up':0}, fractureStrength: 4},
    A709_Gr50: {yieldingStrength: {'100': 3.45, 'up':0}, fractureStrength: 4.5},
    A709_Gr50S: {yieldingStrength: 3.45, fractureStrength: 4.5},
    A709_Gr50W: {yieldingStrength: {'100': 3.45, 'up':0}, fractureStrength: 4.85},
    A709_Gr70W: {yieldingStrength: {'100': 4.85, 'up':0}, fractureStrength: 5.85},
    A709_Gr100: {yieldingStrength: {'65': 6.9, '100': 6.2, 'up':0}, fractureStrength: {'65': 7.6, '100': 6.9, 'up':0}},
    A588_GrA: {yieldingStrength: {'100': 3.45, '125': 3.15, '200': 2.9,'up':0}, fractureStrength: {'100': 4.85, '125': 4.6, '200': 4.35,'up':0}},
    A588_GrB: {yieldingStrength: {'100': 3.45, '125': 3.15, '200': 2.9,'up':0}, fractureStrength: {'100': 4.85, '125': 4.6, '200': 4.35,'up':0}},
    A588_GrC: {yieldingStrength: {'100': 3.45, '125': 3.15, '200': 2.9,'up':0}, fractureStrength: {'100': 4.85, '125': 4.6, '200': 4.35,'up':0}},
    A588_GrK: {yieldingStrength: {'100': 3.45, '125': 3.15, '200': 2.9,'up':0}, fractureStrength: {'100': 4.85, '125': 4.6, '200': 4.35,'up':0}},
  },
  CNS: {
    SS330: { yieldingStrength: {'16': 2.05, '40': 1.95, 'up': 1.75}, fractureStrength: 3.3},
    SS400: { yieldingStrength: {'16': 2.45, '40': 2.35, 'up': 2.15}, fractureStrength: 4},
    SS490: { yieldingStrength: {'16': 2.85, '40': 2.75, 'up': 2.55}, fractureStrength: 4.9},
    SS540: { yieldingStrength: {'16': 4, '40': 3.9, 'up': 0}, fractureStrength: 5.4},
    SM400A: { yieldingStrength: {'16': 2.45, '40': 2.35, '100': 2.15, '160': 2.05, '200': 1.95, 'up':0}, fractureStrength: 4},
    SM400B: { yieldingStrength: {'16': 2.45, '40': 2.35, '100': 2.15, '160': 2.05, '200': 1.95, 'up':0}, fractureStrength: 4},
    SM400C: { yieldingStrength: {'16': 2.45, '40': 2.35, '100': 2.15, 'up':0}, fractureStrength: 4},
    SM490A: { yieldingStrength: {'16': 3.25, '40': 3.15, '100': 2.95, '160': 2.85, '200': 2.75, 'up':0}, fractureStrength: 4.9},
    SM490B: { yieldingStrength: {'16': 3.25, '40': 3.15, '100': 2.95, '160': 2.85, '200': 2.75, 'up':0}, fractureStrength: 4.9},
    SM490C: { yieldingStrength: {'16': 3.25, '40': 3.15, '100': 2.95, 'up':0}, fractureStrength: 4.9},
    SM490YA: { yieldingStrength: {'16': 3.65, '40': 3.55, '100': 3.25, 'up':0}, fractureStrength: 4.9},
    SM490YB: { yieldingStrength: {'16': 3.65, '40': 3.55, '100': 3.25, 'up':0}, fractureStrength: 4.9},
    SM520B: { yieldingStrength: {'16': 3.65, '40': 3.55, '75': 3.35, '100': 3.25, 'up':0}, fractureStrength: 5.2},
    SM520C: { yieldingStrength: {'16': 3.65, '40': 3.55, '75': 3.35, '100': 3.25, 'up':0}, fractureStrength: 5.2},
    SM570: { yieldingStrength: {'16': 4.6, '40': 4.5, '75': 4.3, '100': 4.2, 'up':0}, fractureStrength: 5.7},
    SN400A: { yieldingStrength: {'40': 2.35, '100': 2.15, 'up':0}, fractureStrength: 4},
    SN400B: { yieldingStrength: {'40': 2.35, '100': 2.15, 'up':0}, fractureStrength: 4},
    SN400C: { yieldingStrength: {'16': 0, '40': 2.35, '100': 2.15, 'up':0}, fractureStrength: 4},
    SN490YB: { yieldingStrength: {'40': 3.25, '100': 2.95, 'up':0}, fractureStrength: 4.9},
    SN490YC: { yieldingStrength: {'16': 0, '40': 3.25, '100': 2.95, 'up':0}, fractureStrength: 4.9},
    SMA400A: { yieldingStrength: {'16': 2.45, '40': 2.35, '100': 2.15, '160': 2.05, '200': 1.95, 'up':0}, fractureStrength: 4},
    SMA400B: { yieldingStrength: {'16': 2.45, '40': 2.35, '100': 2.15, '160': 2.05, '200': 1.95, 'up':0}, fractureStrength: 4},
    SMA400C: { yieldingStrength: {'16': 2.45, '40': 2.35, '100': 2.15, 'up':0}, fractureStrength: 4},
    SMA490A: { yieldingStrength: {'16': 3.65, '40': 3.55, '75': 3.35, '100': 3.25, '160': 3.05, '200': 2.95, 'up':0}, fractureStrength: 4.9},
    SMA490B: { yieldingStrength: {'16': 3.65, '40': 3.55, '75': 3.35, '100': 3.25, '160': 3.05, '200': 2.95, 'up':0}, fractureStrength: 4.9},
    SMA490C: { yieldingStrength: {'16': 3.65, '40': 3.55, '75': 3.35, '100': 3.25, 'up':0}, fractureStrength: 4.9},
    SMA570: { yieldingStrength: {'16': 4.6, '40': 4.5, '75': 4.3, '100': 4.2, 'up':0}, fractureStrength: 5.7},
  }
};

// common steel plate thickness
const commonSteelThickness = [6, 9, 10, 12, 15, 16, 19, 22, 25, 28, 32, 36, 40, 45, 50];