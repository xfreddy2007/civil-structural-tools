import React, { useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { md, lg, xl } from '@/libs/utils/break-points';
import Input from '../Input';
import { singleLayerMnStrengthCalculation } from '@/libs/utils/concrete';
import { findRebarProperty, rebarSpec } from '@/libs/utils/rebar';
import validate from 'validate.js';
// import { createErrorMessage } from '@/libs/utils/validationCheck';
import { constraints } from './constraint'

const rootStyle = css``;

type formDataProps = {
  width?: number,
  effectiveDepth?: number,
  designMoment?: number,
  mainRebarNum?: number,
  mainRebarSpec?: rebarSpec,
};




const CapacityCheck:React.FC = () => {
  const [formData, setFormData] = useState<formDataProps>({});
  const [error, setError] = useState({});
  
  const inputErrorObserver = (e: any) => {
    const error = validate({[e.target.name]: e.target.value}, constraints) || {};
    setError(error[e.target.name]? {[e.target.name]: error[e.target.name]} : {});
  };
  const validationCheck = (form:formDataProps) => {
    const errors = validate(form, constraints);
    setError(errors || {});
  }

  const handleSubmitform = (e: any) => {
    e.preventDefault();
    const data = {
      width: +e.target['寬度'].value,
      effectiveDepth: +e.target['有效深度'].value,
      concreteStrength: +e.target['混凝土抗壓強度'].value,
      rebarStrength: +e.target['鋼筋降伏強度'].value,
      designMoment: +e.target['設計彎矩'].value,
      mainRebarNum: +e.target['主筋數量'].value,
      mainRebarSpec: e.target['主筋號數'].value,
    };
    validationCheck(data);
    // setFormData(data);
  };

  useEffect(() => {
    // console.log(formData);
    // if (formData) {
    //   const area = findRebarProperty(formData.mainRebarSpec);
    //   console.log(singleLayerMnStrengthCalculation(
    //     formData.width,
    //     formData.effectiveDepth,
    //     280,
    //     4200,
    //     formData.mainRebarNum * area!.area
    //   ));
    // }

  }, [formData]);

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
    </div>
  );
};

export default React.memo(CapacityCheck);