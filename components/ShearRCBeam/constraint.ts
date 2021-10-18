import validate from 'validate.js';
import { rebarMapping, rebarYieldStrength } from '@/libs/utils/rebar';
import { concreteStrengthList } from '@/libs/utils/concrete';
// declare the constraint for single layer rc beam form

export const shearConstraints = {
  '寬度': {
    presence: {
      allowEmpty: false,
      message: "為必填項目",
    },
    numericality: {
      strict: true,
      greaterThan: 0,
      notValid: '必須是一個有效數字',
      notGreaterThan: '必須大於0',
    },
  },
  '總深度': {
    presence: {
      allowEmpty: false,
      message: "為必填項目",
    },
    numericality: {
      strict: true,
      greaterThan: 0,
      notValid: '必須是一個有效數字',
      notGreaterThan: '必須大於0',
    },
  },
  '有效深度': {
    presence: {
      allowEmpty: false,
      message: "為必填項目",
    },
    numericality: {
      strict: true,
      greaterThan: 0,
      notValid: '必須是一個有效數字',
      notGreaterThan: '必須大於0',
    },
  },
  '混凝土抗壓強度': {
    presence: {
      allowEmpty: false,
      message: "為必填項目",
    },
    numericality: {
      strict: true,
      notValid: '必須是一個有效數字',
    },
    type: "concreteStrengthType",
  },
  '鋼筋降伏強度': {
    presence: {
      allowEmpty: false,
      message: "為必填項目",
    },
    numericality: {
      strict: true,
      greaterThan: 0,
      notValid: '必須是一個有效數字',
    },
    type: "rebarYieldStrengthType",
  },
  '設計剪力': {
    presence: {
      allowEmpty: false,
      message: "為必填項目",
    },
    numericality: {
      strict: true,
      greaterThan: 0,
      notValid: '必須是一個有效數字',
      notGreaterThan: '必須大於0',
    },
  },
  '軸力大小': {
    numericality: {
      strict: true,
      notValid: '必須是一個有效數字',
    },
  },
  '主筋數量': {
    presence: {
      allowEmpty: false,
      message: "為必填項目",
    },
    numericality: {
      strict: true,
      onlyInteger: true,
      greaterThan: 0,
      notValid: '必須是一個有效數字',
      notGreaterThan: '必須大於0',
      notInteger: '必須是一個正整數'
    },
  },
  '主筋號數': {
    presence: {
      allowEmpty: false,
      message: "為必填項目",
    },
    type: "rebarSpecType",
  },
  '箍筋間距': {
    presence: {
      allowEmpty: false,
      message: "為必填項目",
    },
    numericality: {
      strict: true,
      greaterThan: 0,
      notValid: '必須是一個有效數字',
      notGreaterThan: '必須大於0',
    },
  },
  '箍筋號數': {
    presence: {
      allowEmpty: false,
      message: "為必填項目",
    },
    type: "stirrupRebarSpecType",
  },
  '繫筋數量': {
    presence: {
      allowEmpty: true,
    },
    numericality: {
      strict: false,
      onlyInteger: true,
      notValid: '必須是一個有效數字',
      notInteger: '必須是一個正整數'
    },
  },
  '繫筋號數': {
    presence: {
      allowEmpty: true,
    },
    type: "stirrupRebarSpecType",
  },
};

export const designConstraints = {
  '寬度': {
    presence: {
      allowEmpty: false,
      message: "為必填項目",
    },
    numericality: {
      strict: true,
      greaterThan: 0,
      notValid: '必須是一個有效數字',
      notGreaterThan: '必須大於0',
    },
  },
  '總梁深度': {
    presence: {
      allowEmpty: false,
      message: "為必填項目",
    },
    numericality: {
      strict: true,
      greaterThan: 0,
      notValid: '必須是一個有效數字',
      notGreaterThan: '必須大於0',
    },
  },
  '混凝土抗壓強度': {
    presence: {
      allowEmpty: false,
      message: "為必填項目",
    },
    numericality: {
      strict: true,
      notValid: '必須是一個有效數字',
    },
    type: "concreteStrengthType",
  },
  '鋼筋降伏強度': {
    presence: {
      allowEmpty: false,
      message: "為必填項目",
    },
    numericality: {
      strict: true,
      greaterThan: 0,
      notValid: '必須是一個有效數字',
    },
    type: "rebarYieldStrengthType",
  },
  '設計剪力': {
    presence: {
      allowEmpty: false,
      message: "為必填項目",
    },
    numericality: {
      strict: true,
      greaterThan: 0,
      notValid: '必須是一個有效數字',
      notGreaterThan: '必須大於0',
    },
  },
};

export const stirrupRebarConstraint = {
  '箍筋號數': {
    presence: {
      allowEmpty: false,
      message: "為必填項目",
    },
    type: "stirrupRebarSpecType",
  },
  '箍筋間距': {
    presence: {
      allowEmpty: false,
      message: "為必填項目",
    },
    numericality: {
      strict: true,
      greaterThan: 0,
      notValid: '必須是一個有效數字',
      notGreaterThan: '必須大於0',
    },
  },
};

// concreteStrengthType
validate.validators.type.types.concreteStrengthType = function (value:string) {
  return !(concreteStrengthList.findIndex(i => i === value) < 0); 
};
validate.validators.type.messages.concreteStrengthType = "輸入不正確的規格，請輸入正確的混凝土抗壓強度";

// rebarYieldStrengthType
validate.validators.type.types.rebarYieldStrengthType = function (value:string) {
  return !(rebarYieldStrength.findIndex(i => i === value) < 0); 
};
validate.validators.type.messages.rebarYieldStrengthType = "輸入不正確的規格，請輸入正確的鋼筋降伏強度";

// rebarSpecType
validate.validators.type.types.rebarSpecType = function (value:string) {
  return !(Object.keys(rebarMapping).findIndex(i => i === value) < 0); 
};
validate.validators.type.messages.rebarSpecType = "輸入不正確的規格，請輸入正確的鋼筋號數";

// stirrupRebarSpecType
validate.validators.type.types.stirrupRebarSpecType = function (value:string) {
  return !(Object.keys(rebarMapping)
    .filter((j) => j === '#3' || j === '#4' || j === '#5' || j === 'D10' || j === 'D13' || j === 'D16')
    .findIndex(i => i === value) < 0); 
};
validate.validators.type.messages.stirrupRebarSpecType = "輸入不正確的規格，請輸入正確的鋼筋號數";