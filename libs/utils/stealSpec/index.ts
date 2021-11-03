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
 * X1: tf/cm^2
 * X2: (cm^2/tf)^2
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

const HBeams = {
  
};