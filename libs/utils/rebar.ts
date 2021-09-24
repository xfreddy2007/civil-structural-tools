// CNS560 rebar size and dimensions

/**
 * units
 * unitWeight: kg/m
 * diameter: cm
 * area: cm^2
 */

import { roundToDigit } from './otherUtils';

const rebar = [
  {
    id: '#3',
    size: 'D10',
    unitWeight: 0.56,
    diameter: 0.953,
    area: 0.7133,
  },
  {
    id: '#4',
    size: 'D13',
    unitWeight: 0.994,
    diameter: 1.27,
    area: 1.267,
  },
  {
    id: '#5',
    size: 'D16',
    unitWeight: 1.56,
    diameter: 1.59,
    area: 1.986,
  },
  {
    id: '#6',
    size: 'D19',
    unitWeight: 2.25,
    diameter: 1.91,
    area: 2.865,
  },
  {
    id: '#7',
    size: 'D22',
    unitWeight: 3.04,
    diameter: 2.22,
    area: 3.871,
  },
  {
    id: '#8',
    size: 'D25',
    unitWeight: 3.98,
    diameter: 2.54,
    area: 5.067,
  },
  {
    id: '#9',
    size: 'D29',
    unitWeight: 5.08,
    diameter: 2.87,
    area: 6.469,
  },
  {
    id: '#10',
    size: 'D32',
    unitWeight: 6.39,
    diameter: 3.22,
    area: 8.143,
  },
  {
    id: '#11',
    size: 'D36',
    unitWeight: 7.9,
    diameter: 3.58,
    area: 10.07,
  },
  {
    id: '#14',
    size: 'D43',
    unitWeight: 11.4,
    diameter: 4.3,
    area: 14.52,
  },
  {
    id: '#18',
    size: 'D57',
    unitWeight: 20.2,
    diameter: 5.73,
    area: 25.79,
  },
];

export const findRebarProperty = (size:string) => {
  const bar = rebar.find(i => i.id === size || i.size === size);
  if (typeof bar === 'undefined') return '請輸入正確的鋼筋規格';
  return {
    id: bar?.id,
    size: bar?.size,
    unitWeight: bar?.unitWeight,
    diameter: bar?.diameter,
    area: bar?.area,
  };
};

export const getRebarAreaPerMeter = (size:string, spacing:string):string => {
  const bar = rebar.find(i => i.id === size || i.size === size);
  if (typeof bar === 'undefined') {
    return '請輸入正確的鋼筋規格';
  } else {
    const areaPerMeter = roundToDigit(bar.area * 100 / (+spacing), 2);
    return `${areaPerMeter} cm^2/m`;
  }
}
