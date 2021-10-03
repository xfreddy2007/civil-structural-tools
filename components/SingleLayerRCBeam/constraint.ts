import validate from 'validate.js';
import { rebarMapping, rebarYieldStrength } from '@/libs/utils/rebar';
import { concreteStrengthList } from '@/libs/utils/concrete';
// declare the constraint for single layer rc beam form

export const constraints = {
  '寬度': {
    presence: {
      allowEmpty: false,
      message: "為必填項目",
    },
    numericality: {
      strict: true,
      greaterThan: 0,
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
    },
  },
  '混凝土抗壓強度': {
    presence: {
      allowEmpty: false,
      message: "為必填項目",
    },
    numericality: {
      strict: true,
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
    },
    type: "rebarYieldStrengthType",
  },
  '設計彎矩': {
    presence: {
      allowEmpty: false,
      message: "為必填項目",
    },
    numericality: {
      strict: true,
      greaterThan: 0,
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
    },
  },
  '主筋號數': {
    presence: {
      allowEmpty: false,
      message: "為必填項目",
    },
    type: "rebarSpecType",
  },
};

// concreteStrengthType
validate.validators.type.types.concreteStrengthType = function (value:string) {
  return !(Object.keys(concreteStrengthList).findIndex(i => i === value) < 0); 
};
validate.validators.type.messages.concreteStrengthType = "輸入不正確的規格，請輸入正確的混凝土抗壓強度";

// rebarYieldStrengthType
validate.validators.type.types.rebarYieldStrengthType = function (value:string) {
  return !(Object.keys(rebarYieldStrength).findIndex(i => i === value) < 0); 
};
validate.validators.type.messages.rebarYieldStrengthType = "輸入不正確的規格，請輸入正確的鋼筋降伏強度";

// rebarSpecType
validate.validators.type.types.rebarSpecType = function (value:string) {
  return !(Object.keys(rebarMapping).findIndex(i => i === value) < 0); 
};
validate.validators.type.messages.rebarSpecType = "輸入不正確的規格，請輸入正確的鋼筋號數";