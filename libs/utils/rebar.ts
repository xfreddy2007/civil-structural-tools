// CNS560 rebar size and dimensions

/**
 * units
 * unitWeight: kg/m
 * diameter: cm
 * area: cm^2
 */

import { roundToDigit } from './otherUtils';

// rebar mapping
export type rebarSpec = '#3'|'#4'|'#5'|'#6'|'#7'|'#8'|'#9'|'#10'|'#11'|'#14'|'#18'|'D10'|'D13'|'D16'|'D19'|'D22'|'D25'|'D29'|'D32'|'D36'|'D43'|'D57'; 
export type mainRebarSpec = 'D10'|'D13'|'D16'|'D19'|'D22'|'D25'|'D29'|'D32'|'D36'|'D43'|'D57';
export type stirrupRebarSpec = '#3'|'#4'|'#5'|'D10'|'D13'|'D16';
type rebarMappingTypes = {
  [index in rebarSpec]: mainRebarSpec;
};
export const rebarMapping:rebarMappingTypes = {
  '#3': 'D10',
  '#4': 'D13',
  '#5': 'D16',
  '#6': 'D19',
  '#7': 'D22',
  '#8': 'D25',
  '#9': 'D29',
  '#10': 'D32',
  '#11': 'D36',
  '#14': 'D43',
  '#18': 'D57',
  'D10': 'D10',
  'D13': 'D13',
  'D16': 'D16',
  'D19': 'D19',
  'D22': 'D22',
  'D25': 'D25',
  'D29': 'D29',
  'D32': 'D32',
  'D36': 'D36',
  'D43': 'D43',
  'D57': 'D57',
};
type stirrupMappingTypes = {
  [index in stirrupRebarSpec]: 'D10'|'D13'|'D16';
};
export const stirrupMapping:stirrupMappingTypes = {
  '#3': 'D10',
  '#4': 'D13',
  '#5': 'D16',
  'D10': 'D10',
  'D13': 'D13',
  'D16': 'D16',
}

// rebar yield strength
export const rebarYieldStrength = ['2800', '4200'];
// rebar property
const rebar = [
  {
    size: 'D10',
    unitWeight: 0.56,
    diameter: 0.953,
    area: 0.7133,
  },
  {
    size: 'D13',
    unitWeight: 0.994,
    diameter: 1.27,
    area: 1.267,
  },
  {
    size: 'D16',
    unitWeight: 1.56,
    diameter: 1.59,
    area: 1.986,
  },
  {
    size: 'D19',
    unitWeight: 2.25,
    diameter: 1.91,
    area: 2.865,
  },
  {
    size: 'D22',
    unitWeight: 3.04,
    diameter: 2.22,
    area: 3.871,
  },
  {
    size: 'D25',
    unitWeight: 3.98,
    diameter: 2.54,
    area: 5.067,
  },
  {
    size: 'D29',
    unitWeight: 5.08,
    diameter: 2.87,
    area: 6.469,
  },
  {
    size: 'D32',
    unitWeight: 6.39,
    diameter: 3.22,
    area: 8.143,
  },
  {
    size: 'D36',
    unitWeight: 7.9,
    diameter: 3.58,
    area: 10.07,
  },
  {
    size: 'D43',
    unitWeight: 11.4,
    diameter: 4.3,
    area: 14.52,
  },
  {
    size: 'D57',
    unitWeight: 20.2,
    diameter: 5.73,
    area: 25.79,
  },
];

export const findRebarProperty = (size:rebarSpec|stirrupRebarSpec) => {
  if (Object.keys(rebarMapping).findIndex(i => i === size) < 0) return;
  const bar = rebar.find(i => i.size === rebarMapping[size]);
  return {
    size: bar!.size,
    unitWeight: bar!.unitWeight,
    diameter: bar!.diameter,
    area: bar!.area,
  };
};

export const getRebarAreaPerMeter = (size:rebarSpec, spacing:string) => {
  if (Object.keys(rebarMapping).findIndex(i => i === size) < 0) return;
  const bar = rebar.find(i => i.size === rebarMapping[size]);
  const areaPerMeter = roundToDigit(bar!.area * 100 / (+spacing), 2);
  return `${areaPerMeter} cm^2/m`;
}
