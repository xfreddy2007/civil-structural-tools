import React, { useState, useEffect, useCallback } from 'react';
import { css, cx } from '@emotion/css';
import { md, lg, xl } from '@/libs/utils/break-points';
import Input from '../Input';
import { singleLayerMnStrengthCalculation, resultDataProps } from '@/libs/utils/concrete';
import { findRebarProperty, rebarSpec } from '@/libs/utils/rebar';
import validate from 'validate.js';
import { constraints } from './constraint';
import ResultSection from './ResultSection';

const rootStyle = css``;

type formDataProps = null | {
  '寬度': number,
  '有效深度': number,
  '混凝土抗壓強度': string,
  '鋼筋降伏強度': string,
  '設計彎矩': number,
  '主筋數量': number,
  '主筋號數': rebarSpec,
};

const CapacityCheck:React.FC = () => {
  const [formData, setFormData] = useState<formDataProps>(null);
  const [error, setError] = useState({});
  const [result, setResult] = useState<resultDataProps>(null);
  
  const inputErrorObserver = useCallback((e: any) => {
    const error = validate({[e.target.name]: e.target.value}, constraints) || {};
    setError(error[e.target.name]? {[e.target.name]: error[e.target.name]} : {});
  }, []);
  const validationCheck = useCallback((form:formDataProps) => {
    const errors = validate(form, constraints);
    setError(errors || {});
  }, []);

  const handleSubmitform = useCallback((e: any) => {
    e.preventDefault();
    const data = {
      '寬度': +e.target['寬度'].value,
      '有效深度': +e.target['有效深度'].value,
      '混凝土抗壓強度': e.target['混凝土抗壓強度'].value,
      '鋼筋降伏強度': e.target['鋼筋降伏強度'].value,
      '設計彎矩': +e.target['設計彎矩'].value,
      '主筋數量': +e.target['主筋數量'].value,
      '主筋號數': e.target['主筋號數'].value,
    };
    validationCheck(data);
    if (!validate(data, constraints)) {
      setFormData(data);
    }
  }, [validationCheck]);

  useEffect(() => {
    if (formData) {
      const area = findRebarProperty(formData['主筋號數']);
      setResult(singleLayerMnStrengthCalculation(
        formData['寬度'],
        formData['有效深度'],
        Number(formData['混凝土抗壓強度']),
        Number(formData['鋼筋降伏強度']),
        formData['主筋數量'] * area!.area,
      ));
    }
  }, [error, formData, result]);

  return (
    <div className={cx('w-full block', rootStyle)}>
      <form className="flex flex-col space-y-4 w-full px-4 md:px-0 md:justify-center items-center mb-12" onSubmit={handleSubmitform}>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 w-full md:justify-center">
          <div className="w-full md:w-80 md:px-6">
            <h4 className="text-left">梁尺寸</h4>
            <Input
              id="寬度"
              name="寬度"
              title="梁寬度"
              placeholder="ex: 30 cm"
              onChange={inputErrorObserver}
              error={error}
            />
            <Input
              id="有效深度"
              name="有效深度"
              title="梁有效深度"
              placeholder="ex: 50 cm"
              onChange={inputErrorObserver}
              error={error}
            />
          </div>
          <div className="w-full md:w-80 md:px-6">
            <h4 className="text-left">材料參數</h4>
            <Input
              id="混凝土抗壓強度"
              name="混凝土抗壓強度"
              title="混凝土抗壓強度"
              placeholder="ex: 280 kgf/cm^2"
              onChange={inputErrorObserver}
              error={error}
            />
            <Input
              id="鋼筋降伏強度"
              name="鋼筋降伏強度"
              title="鋼筋降伏強度"
              placeholder="ex: 4200 kgf/cm^2"
              onChange={inputErrorObserver}
              error={error}
            />
          </div>
          <div className="w-full md:w-80 md:px-6">
            <h4 className="text-left">梁設計參數</h4>
            <Input
              id="設計彎矩"
              name="設計彎矩"
              title="設計彎矩 Mu"
              placeholder="ex: 20 tf-m"
              onChange={inputErrorObserver}
              error={error}
            />
            <Input
              id="主筋數量"
              name="主筋數量"
              title="主筋數量"
              placeholder="ex: 4"
              onChange={inputErrorObserver}
              error={error}
            />
            <Input
              id="主筋號數"
              name="主筋號數"
              title="主筋號數"
              placeholder="ex: #4 or D13"
              onChange={inputErrorObserver}
              error={error}
            />
          </div>
        </div>
        <button type="submit" className="w-24 p-2 bg-green-900 text-white rounded-md hover:bg-green-700 cursor-pointer font-bold">檢核</button>
      </form>
      {result && <ResultSection {...result}/>}
    </div>
  );
};

export default React.memo(CapacityCheck);