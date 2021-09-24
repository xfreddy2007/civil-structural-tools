// Concrete Specification

/**
 * units
 * kg, cm
 */

import { findRebarProperty } from './rebar';
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
const getPhiParam = (et:number, ety:number, isSpiral:boolean = false):number => {
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
const singleLayerMnStrengthCalculation = (width:number, effectiveDepth:number, fc:number, fy:number, as:number):number => {
  const neuturalDepth = roundToDigit(as * fy / (0.85 * fc * getConcreteProperty(fc).beta * width), 2);
  const et = roundToDigit(0.003 * (effectiveDepth - neuturalDepth) / neuturalDepth, 4);
  const phi = getPhiParam(et, 0.005);
  return roundToDigit(phi * as * fy * (effectiveDepth - 0.5 * 0.85 * neuturalDepth), 0); // kgf - cm
};

const doubleLayerMnStrengthCalculation = (width:number, effectiveDepth:number, effectiveDepthTop:number, fc:number, fy:number, as:number, asTop:number):number|string => {
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
}