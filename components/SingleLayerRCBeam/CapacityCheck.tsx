import React, { useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { md, lg, xl } from '@/libs/utils/break-points';
import Input from '../Input';
import { singleLayerMnStrengthCalculation } from '@/libs/utils/concrete';
import { findRebarProperty, rebarSpec } from '@/libs/utils/rebar';

const rootStyle = css``;

type formDataProps = null | {
  width: number,
  effectiveDepth: number,
  designMoment: number,
  mainRebarNum: number,
  mainRebarSpec: rebarSpec,
};

const CapacityCheck:React.FC = () => {
  const [formData, setFormData] = useState<formDataProps>(null);
  const handleSubmitform = (e: any) => {
    e.preventDefault();
    const data = {
      width: +e.target.width.value,
      effectiveDepth: +e.target.effectiveDepth.value,
      designMoment: +e.target.designMoment.value,
      mainRebarNum: +e.target.mainRebarNum.value,
      mainRebarSpec: e.target.mainRebarSpec.value,
    };
    setFormData(data);
  };
  useEffect(() => {
    console.log(formData);
    if (formData) {
      const area = findRebarProperty(formData.mainRebarSpec);
      console.log(singleLayerMnStrengthCalculation(
        formData.width,
        formData.effectiveDepth,
        280,
        4200,
        formData.mainRebarNum * area!.area
      ));
    }

  }, [formData]);

  return (
    <div className={cx('w-full block', rootStyle)}>
      <form className="flex flex-col space-y-4 w-full px-4 md:px-0 md:justify-center items-center mb-12" onSubmit={handleSubmitform}>
        <div className="flex flex-col md:flex-row space-x-4 w-full md:justify-center">
          <div className="w-full md:w-80 md:px-2">
            <h4 className="text-left">梁尺寸</h4>
            <Input
              id="width"
              name="width"
              title="梁寬度"
              placeholder="ex: 30 cm"
            />
            <Input
              id="effective-depth"
              name="effectiveDepth"
              title="梁有效深度"
              placeholder="ex: 50 cm"
            />
          </div>
          <div className="w-full md:w-80">
            <h4 className="text-left">梁設計參數</h4>
            <Input
              id="design-moment"
              name="designMoment"
              title="設計彎矩 Mu"
              placeholder="ex: 20 tf-m"
            />
            <Input
              id="main-rebar-num"
              name="mainRebarNum"
              title="主筋數量"
              placeholder="ex: 4"
            />
            <Input
              id="main-rebar-spec"
              name="mainRebarSpec"
              title="主筋號數"
              placeholder="ex: #4 or D13"
            />
          </div>
        </div>
        <button type="submit" className="w-24 p-2 bg-green-900 text-white rounded-md hover:bg-green-700 cursor-pointer font-bold">檢核</button>
      </form>
    </div>
  );
};

export default React.memo(CapacityCheck);