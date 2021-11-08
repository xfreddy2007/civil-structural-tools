import validate from 'validate.js';

// declare the constraint for steel beam moment design form

export const momentConstraints = {
  '總長度': {
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
  '最大未側撐長度': {
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
  '設計彎矩': {
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
  '鋼構降伏強度': {
    presence: {
      allowEmpty: false,
      message: "為必填項目",
    },
  },
}