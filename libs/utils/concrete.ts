// Concrete Specification

/**
 * units
 * kg, cm
 */

import { findRebarProperty, mainRebarSpec, stirrupRebarSpec } from './rebar';
import { roundToDigit } from './otherUtils';

// beta param calculation
const getBetaParam = (strength:number):number => {
  if (!(strength > 280)) {
    return 0.85;
  } else if (!(strength > 560)) {
    return roundToDigit(0.85 - 0.05 * (strength - 280) / 70, 2);
  } else {
    return 0.65;
  }
};
// get f'c, young's Modulus, & beta param function 
// from 140 to 560
export const concreteStrengthList = ['140', '210', '280', '350', '420', '490', '560'];
type concreteProps = {
  strength: number;
  unitWeight: number;
  youngModulus: number;
  beta: number;
}

export const getConcreteProperty = (strength:number, isNormalWeight:boolean = true, unitWeight:number = 2300):concreteProps => {
  return {
    strength: strength, // kgf/cm^2
    unitWeight: isNormalWeight ? 2300 : unitWeight, // kg/m^3
    youngModulus: isNormalWeight ? roundToDigit(Math.sqrt(strength) * 12000, 0) : roundToDigit(Math.pow(unitWeight, 1.5) * 0.11 * Math.sqrt(strength), 0), // kgf/cm^2
    beta: getBetaParam(140),
  };
};

// phi param calcaulation function
export const getPhiParam = (et:number, ety:number, isSpiral:boolean = false):number => {
  if (!(roundToDigit(ety, 3) < roundToDigit(et, 3))) {
    return isSpiral ? 0.75 : 0.65;
  } else if (roundToDigit(et, 3) < roundToDigit(ety + 0.003, 3)) {
    const spiral = 0.75 + 0.15 * (roundToDigit(et, 3) - roundToDigit(ety, 3)) / 0.003;
    const bamboo = 0.65 + 0.25 * (roundToDigit(et, 3) - roundToDigit(ety, 3)) / 0.003;
    return isSpiral ? spiral : bamboo;
  } else {
    return 0.9;
  }
};

// get Mn
export type resultDataProps = null | {
  neuturalDepth: number,
  et: number,
  neuturalMoment: number,
  requiredMoment: number,
};

export const singleLayerMnStrengthCalculation = (width:number, effectiveDepth:number, fc:number, fy:number, as:number):resultDataProps => {
  const neuturalDepth = roundToDigit(as * fy / (0.85 * fc * getConcreteProperty(fc).beta * width), 2);
  const et = roundToDigit(0.003 * (effectiveDepth - neuturalDepth) / neuturalDepth, 4);
  const phi = getPhiParam(et, 0.005);
  return {
    neuturalDepth: neuturalDepth, // cm
    et: et,
    neuturalMoment: roundToDigit(as * fy * (effectiveDepth - 0.5 * 0.85 * neuturalDepth) / 100000, 2), // tf - m
    requiredMoment: roundToDigit(phi * as * fy * (effectiveDepth - 0.5 * 0.85 * neuturalDepth) / 100000, 2), // tf - m
  }; 
};

export const doubleLayerMnStrengthCalculation = (width:number, effectiveDepth:number, effectiveDepthTop:number, fc:number, fy:number, as:number, asTop:number):number|string => {
  // determine compression rebar stress when tension rebar yield
  // assume tension rebar just at yield strain 0.002
  const neuturalDepthBalance = roundToDigit(0.6 * effectiveDepth, 2);
  const neuturalDepthYield = roundToDigit(3 * effectiveDepthTop, 2);
  const asBalance = roundToDigit(0.85 * fc * getConcreteProperty(fc).beta * neuturalDepthBalance * width / fy + asTop, 2);
  const asYield = roundToDigit(0.85 * fc * getConcreteProperty(fc).beta * neuturalDepthYield * width / fy + asTop, 2);

  // Steel's young's Modulus
  const Es = 2040000;
  // as <= asBalance, compression rebar & tension rebar yield! 
  if (!(as > asBalance)) {
    const Ts = as * fy;
    const Cs = asTop * (fy - 0.85 * fc);
    const neuturalDepth = roundToDigit((Ts + Cs) / (0.85 * fc * getConcreteProperty(fc).beta * width), 2);
    const et = roundToDigit(0.003 * (neuturalDepth - effectiveDepthTop) / neuturalDepth, 4);
    const phi = getPhiParam(et, 0.005);
    return roundToDigit(phi * (0.85 * fc * getConcreteProperty(fc).beta * neuturalDepth * width * (effectiveDepth - 0.5 * getConcreteProperty(fc).beta * neuturalDepth) + asTop * (fy - 0.85 * fc) * (effectiveDepth - effectiveDepthTop)), 0);
  }
  // asBalance < as <= asYield, tension rebar yield but compression rebar not yield!
  else if (asBalance < as && !(as > asYield)) {
    // Quadratic function a^2 x + b x + c = 0
    let root1, root2;
    const a = roundToDigit(0.85 * fc * getConcreteProperty(fc).beta * width, 2);
    const b = roundToDigit(0.003 * asTop * Es - 0.85 * fc - as * fy, 2);
    const c = -roundToDigit(0.003 * asTop * Es * effectiveDepthTop, 2);
    // calculate discriminant
    const discriminant = b * b - 4 * a * c;

    // condition for real and different roots
    if (discriminant > 0) {
      root1 = roundToDigit((-b + Math.sqrt(discriminant)) / (2 * a), 2);
      root2 = roundToDigit((-b - Math.sqrt(discriminant)) / (2 * a), 2);
    } else if (discriminant === 0) {
      root1 = root2 = roundToDigit(-b / (2 * a), 2);
    } else {
      return '參數錯誤，請重新輸入！';
    }
    const neuturalDepth = Math.max(root1, root2);
    const et = roundToDigit(0.003 * (effectiveDepth - neuturalDepth) / neuturalDepth, 4);
    const phi = getPhiParam(et, 0.005);
    return roundToDigit(phi * (0.85 * fc * getConcreteProperty(fc).beta * neuturalDepth * width * (effectiveDepth - 0.5 * getConcreteProperty(fc).beta * neuturalDepth) + asTop * (fy - 0.85 * fc) * (effectiveDepth - effectiveDepthTop)), 0);
  }
  // as > asYield, tension rebar & compression rebar both not yield!
  else {
    return '參數錯誤，請重新輸入！';
  }
};

// get minimum beam width function
type barNumSpec = '2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'10';
const MinimunBeamWidth = [ // unit: cm
  {
    main: 'D10',
    stirrup: {
      'D10': { '2': 15, '3': 18, '4': 22, '5': 25, '6': 29, '7': 32, '8': 36, '9': 39, '10': 42 },
      'D13': { '2': 15, '3': 19, '4': 22, '5': 26, '6': 29, '7': 33, '8': 36, '9': 40, '10': 43 },
      'D16': { '2': 16, '3': 20, '4': 23, '5': 25, '6': 29, '7': 32, '8': 36, '9': 39, '10': 42 },
    },
  },
  {
    main: 'D13',
    stirrup: {
      'D10': { '2': 15, '3': 19, '4': 23, '5': 27, '6': 31, '7': 34, '8': 38, '9': 42, '10': 46 },
      'D13': { '2': 16, '3': 20, '4': 24, '5': 27, '6': 31, '7': 35, '8': 39, '9': 42, '10': 46 },
      'D16': { '2': 17, '3': 20, '4': 24, '5': 28, '6': 32, '7': 36, '8': 39, '9': 43, '10': 47 },
    },
  },
  {
    main: 'D16',
    stirrup: {
      'D10': { '2': 16, '3': 20, '4': 24, '5': 28, '6': 32, '7': 37, '8': 41, '9': 45, '10': 49 },
      'D13': { '2': 17, '3': 21, '4': 25, '5': 29, '6': 33, '7': 37, '8': 41, '9': 45, '10': 49 },
      'D16': { '2': 17, '3': 21, '4': 26, '5': 30, '6': 34, '7': 38, '8': 42, '9': 46, '10': 50 },
    },
  },
  {
    main: 'D19',
    stirrup: {
      'D10': { '2': 17, '3': 21, '4': 26, '5': 30, '6': 34, '7': 39, '8': 43, '9': 48, '10': 52 },
      'D13': { '2': 17, '3': 22, '4': 26, '5': 31, '6': 35, '7': 39, '8': 44, '9': 48, '10': 53 },
      'D16': { '2': 18, '3': 22, '4': 27, '5': 31, '6': 36, '7': 40, '8': 44, '9': 49, '10': 53 },
    },
  },
  {
    main: 'D22',
    stirrup: {
      'D10': { '2': 17, '3': 22, '4': 27, '5': 32, '6': 36, '7': 41, '8': 46, '9': 50, '10': 55 },
      'D13': { '2': 18, '3': 23, '4': 27, '5': 32, '6': 37, '7': 42, '8': 46, '9': 51, '10': 56 },
      'D16': { '2': 19, '3': 23, '4': 28, '5': 33, '6': 37, '7': 42, '8': 47, '9': 52, '10': 56 },
    },
  },
  {
    main: 'D25',
    stirrup: {
      'D10': { '2': 18, '3': 23, '4': 28, '5': 33, '6': 38, '7': 43, '8': 49, '9': 54, '10': 59 },
      'D13': { '2': 19, '3': 24, '4': 29, '5': 34, '6': 39, '7': 44, '8': 49, '9': 54, '10': 59 },
      'D16': { '2': 19, '3': 24, '4': 29, '5': 35, '6': 40, '7': 45, '8': 50, '9': 55, '10': 60 },
    },
  },
  {
    main: 'D29',
    stirrup: {
      'D10': { '2': 19, '3': 25, '4': 30, '5': 36, '6': 42, '7': 48, '8': 53, '9': 59, '10': 65 },
      'D13': { '2': 20, '3': 25, '4': 31, '5': 37, '6': 43, '7': 48, '8': 54, '9': 60, '10': 66 },
      'D16': { '2': 20, '3': 26, '4': 32, '5': 38, '6': 43, '7': 49, '8': 55, '9': 60, '10': 66 },
    },
  },
  {
    main: 'D32',
    stirrup: {
      'D10': { '2': 20, '3': 27, '4': 33, '5': 39, '6': 46, '7': 52, '8': 59, '9': 65, '10': 72 },
      'D13': { '2': 21, '3': 27, '4': 34, '5': 40, '6': 46, '7': 53, '8': 59, '9': 66, '10': 72 },
      'D16': { '2': 21, '3': 28, '4': 34, '5': 41, '6': 47, '7': 54, '8': 60, '9': 66, '10': 73 },
    },
  },
  {
    main: 'D36',
    stirrup: {
      'D10': { '2': 21, '3': 28, '4': 35, '5': 43, '6': 50, '7': 57, '8': 64, '9': 71, '10': 78 },
      'D13': { '2': 22, '3': 29, '4': 36, '5': 43, '6': 50, '7': 58, '8': 65, '9': 72, '10': 79 },
      'D16': { '2': 22, '3': 30, '4': 37, '5': 44, '6': 51, '7': 58, '8': 65, '9': 73, '10': 80 },
    },
  },
  {
    main: 'D43',
    stirrup: {
      'D10': { '2': 23, '3': 32, '4': 41, '5': 49, '6': 58, '7': 66, '8': 75, '9': 84, '10': 92 },
      'D13': { '2': 24, '3': 33, '4': 41, '5': 50, '6': 58, '7': 67, '8': 76, '9': 84, '10': 93 },
      'D16': { '2': 25, '3': 33, '4': 42, '5': 50, '6': 59, '7': 68, '8': 76, '9': 85, '10': 93 },
    },
  },
  {
    main: 'D57',
    stirrup: {
      'D10': { '2': 28, '3': 39, '4': 51, '5': 62, '6': 73, '7': 85, '8': 96, '9': 108, '10': 119 },
      'D13': { '2': 28, '3': 40, '4': 51, '5': 63, '6': 74, '7': 86, '8': 97, '9': 108, '10': 120 },
      'D16': { '2': 29, '3': 40, '4': 52, '5': 63, '6': 75, '7': 86, '8': 98, '9': 109, '10': 121 },
    },
  },
];
export const getMinimumBeamWidth = (mainRebar:mainRebarSpec, stirrup:stirrupRebarSpec, barNum:barNumSpec):number => {
  const stir = MinimunBeamWidth.find(i => i.main === mainRebar)!.stirrup;
  return stir[stirrup][barNum];
};