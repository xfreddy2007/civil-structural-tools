// 梁深100mm section 組

import { HBeamCrossSectionProps } from '../index';

// 斷面種類名稱表
const RH100SectionsName = [
  'RH100x50x5x7',
  'RH100x100x6x8',
  'RH125x60x6x8',
  'RH125x125x6.5x9',
  'RH150x75x5x7',
  'RH148x100x6x9',
  'RH150x150x7x10',
  'RH175x90x5x8',
  'RH175x175x7.5x11',
] as const;

// type RH100Sections
type RH100SectionsProps = { [k in (typeof RH100SectionsName)[number]]: HBeamCrossSectionProps;}
const RH100Sections:RH100SectionsProps = {
  'RH100x50x5x7': {
    height: 100,
    width: 50,
    webThick: 5,
    flangeThick: 7,
    area: 11.8,
    unitWeight: 9.3,
    inertiaX: 187,
    inertiaY: 14.7,
    radiusGyrationX: 3.98,
    radiusGyrationY: 1.11,
    sectionModulusX: 37.5,
    sectionModulusY: 5.88,
    plasticModulusX: 44.1,
    plasticModulusY: 9.52,
    torsionConst: 2.03,
    warpingConst: 315,
    xOne: 379,
    xTwo: 0.0446,
    plasticModulusRatio: 0.739,
  },
};

export default RH100Sections;