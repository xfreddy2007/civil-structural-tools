import React, { useState, useEffect, useCallback } from 'react';
import { css, cx } from '@emotion/css';
import Input from '../Input';
import { singleLayerMnStrengthCalculation, resultDataProps } from '@/libs/utils/concrete';
import { findRebarProperty, rebarSpec } from '@/libs/utils/rebar';
import validate from 'validate.js';
import { constraints } from './constraint';
import ShearCheckResult from './ShearCheckResult';

const rootStyle = css``;

type shearFormDataProps = {
  '寬度'?: number,
  '有效深度'?: number,
  '混凝土抗壓強度'?: string,
  '鋼筋降伏強度'?: string,
  '設計彎矩'?: number,
  '主筋數量'?: number,
  '主筋號數'?: rebarSpec,
};

const ShearCapacityCheck:React.FC = () => {
  const [MomentformData, setMomentFormData] = useState<shearFormDataProps>({});
  const [error, setError] = useState({});
  const [result, setResult] = useState<resultDataProps>(null);
  
  const inputErrorObserver = useCallback((e: any) => {
    const error = validate({[e.target.name]: e.target.value}, constraints) || {};
    setError(error[e.target.name]? {[e.target.name]: error[e.target.name]} : {});
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
    const errors = validate(data, constraints);
    setError(errors || {});
    if (!errors) {
      setMomentFormData(data);
    } else {
      setMomentFormData({});
    }
  }, []);

  useEffect(() => {
    if (Object.keys(MomentformData).length > 0) {
      const area = findRebarProperty(MomentformData['主筋號數']!);
      setResult(singleLayerMnStrengthCalculation(
        MomentformData['寬度']!,
        MomentformData['有效深度']!,
        Number(MomentformData['混凝土抗壓強度']!),
        Number(MomentformData['鋼筋降伏強度']!),
        MomentformData['主筋數量']! * area!.area,
      ));
    } else {
      setResult(null);
    }
  }, [MomentformData]);

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
        <div className="flex space-x-4">
          <button type="submit" className="px-10 py-2 bg-green-900 text-white rounded-md hover:bg-green-700 cursor-pointer font-bold">檢核</button>
          <input type="reset" className="px-10 py-2 bg-green-900 text-white rounded-md hover:bg-green-700 cursor-pointer font-bold" value="重設參數"/>
        </div>
      </form>
      {result && <ShearCheckResult
        width={MomentformData['寬度']}
        effectiveDepth={MomentformData['有效深度']}
        concreteStrength={MomentformData['混凝土抗壓強度']}
        rebarStrength={MomentformData['鋼筋降伏強度']}
        mainRebarNum={MomentformData['主筋數量']}
        mainRebarSpec={MomentformData['主筋號數']}
        designMoment={MomentformData['設計彎矩']}
        {...result}
      />}
    </div>
  );
};

export default React.memo(ShearCapacityCheck);