import React, { useState, useEffect, useCallback } from 'react';
import { css, cx } from '@emotion/css';
import Input from '../Input';
import { shearVnStrengthCalculation, shearResultDataProps } from '@/libs/utils/concrete';
import { findRebarProperty, rebarSpec, stirrupRebarSpec } from '@/libs/utils/rebar';
import validate from 'validate.js';
import { shearConstraints } from './constraint';
import ShearCheckResult from './ShearCheckResult';

const rootStyle = css``;

type shearFormDataProps = {
  '寬度'?: number,
  '總深度'?: number,
  '有效深度'?: number,
  '混凝土抗壓強度'?: string,
  '鋼筋降伏強度'?: string,
  '設計剪力'?: number,
  '軸力大小'?: number,
  '主筋數量'?: number,
  '主筋號數'?: rebarSpec,
  '箍筋間距'?: number,
  '箍筋號數'?: stirrupRebarSpec,
  '繫筋數量'?: number,
  '繫筋號數'?: stirrupRebarSpec,
};

const ShearCapacityCheck:React.FC = () => {
  const [shearformData, setShearFormData] = useState<shearFormDataProps>({});
  const [error, setError] = useState({});
  const [result, setResult] = useState<shearResultDataProps>(null);
  
  const inputErrorObserver = useCallback((e: any) => {
    const error = validate({[e.target.name]: e.target.value}, shearConstraints) || {};
    setError(error[e.target.name]? {[e.target.name]: error[e.target.name]} : {});
  }, []);

  const handleSubmitform = useCallback((e: any) => {
    e.preventDefault();
    const data = {
      '寬度': +e.target['寬度'].value,
      '有效深度': +e.target['有效深度'].value,
      '總深度': +e.target['總深度'].value,
      '混凝土抗壓強度': e.target['混凝土抗壓強度'].value,
      '鋼筋降伏強度': e.target['鋼筋降伏強度'].value,
      '設計剪力': +e.target['設計剪力'].value,
      '軸力大小': +e.target['軸力大小'].value || 0,
      '主筋數量': +e.target['主筋數量'].value,
      '主筋號數': e.target['主筋號數'].value,
      '箍筋間距': +e.target['箍筋間距'].value,
      '箍筋號數': e.target['箍筋號數'].value,
      '繫筋數量': e.target['繫筋數量'].value === '' ? 0 : +e.target['繫筋數量'].value,
      '繫筋號數': e.target['繫筋號數'].value === '' ? '#4' : e.target['繫筋號數'].value,
    };
    const errors = validate(data, shearConstraints);
    setError(errors || {});
    if (!errors) {
      setShearFormData(data);
    } else {
      setShearFormData({});
    }
  }, []);

  useEffect(() => {
    if (Object.keys(shearformData).length > 0) {
      const mainRebarUnitArea = findRebarProperty(shearformData['主筋號數']!);
      const stirrupUnitArea = findRebarProperty(shearformData['箍筋號數']!);
      const tiesUnitArea = findRebarProperty(shearformData['繫筋號數']!);

      // Calaulate as, av
      const As = shearformData['主筋數量']! * mainRebarUnitArea!.area;
      const Av = 2 * stirrupUnitArea!.area + shearformData['繫筋數量']! * tiesUnitArea!.area;
      setResult(shearVnStrengthCalculation(
        shearformData['寬度']!,
        shearformData['總深度']!,
        shearformData['有效深度']!,
        shearformData['軸力大小']!,
        Number(shearformData['混凝土抗壓強度']!),
        Number(shearformData['鋼筋降伏強度']!),
        As,
        Av,
        shearformData['箍筋間距']!,
      ));
    } else {
      setResult(null);
    }
  }, [shearformData]);

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
              isRequired
              placeholder="ex: 30 cm"
              onChange={inputErrorObserver}
              error={error}
            />
            <Input
              id="總深度"
              name="總深度"
              title="梁總深度"
              isRequired
              placeholder="ex: 60 cm"
              onChange={inputErrorObserver}
              error={error}
            />
            <Input
              id="有效深度"
              name="有效深度"
              title="梁有效深度"
              isRequired
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
              isRequired
              placeholder="ex: 280 kgf/cm^2"
              onChange={inputErrorObserver}
              error={error}
            />
            <Input
              id="鋼筋降伏強度"
              name="鋼筋降伏強度"
              title="鋼筋降伏強度"
              isRequired
              placeholder="ex: 4200 kgf/cm^2"
              onChange={inputErrorObserver}
              error={error}
            />
          </div>
          <div className="w-full md:w-80 md:px-6">
            <h4 className="text-left">梁設計參數</h4>
            <Input
              id="設計剪力"
              name="設計剪力"
              title="設計剪力 Vu"
              isRequired
              placeholder="ex: 30 tf"
              onChange={inputErrorObserver}
              error={error}
            />
            <Input
              id="軸力大小"
              name="軸力大小"
              title="軸力大小 Nu"
              isRequired
              placeholder="ex: 30 tf 壓力為+，拉力為-"
              onChange={inputErrorObserver}
              error={error}
            />
            <Input
              id="主筋數量"
              name="主筋數量"
              title="主筋數量"
              placeholder="ex: 4"
              isRequired
              onChange={inputErrorObserver}
              error={error}
            />
            <Input
              id="主筋號數"
              name="主筋號數"
              title="主筋號數"
              isRequired
              placeholder="ex: #4 or D13"
              onChange={inputErrorObserver}
              error={error}
            />
            <Input
              id="箍筋號數"
              name="箍筋號數"
              title="箍筋號數"
              isRequired
              placeholder="ex: #4 or D13"
              onChange={inputErrorObserver}
              error={error}
            />
            <Input
              id="箍筋間距"
              name="箍筋間距"
              title="箍筋間距"
              isRequired
              placeholder="ex: 15 cm"
              onChange={inputErrorObserver}
              error={error}
            />
            <Input
              id="繫筋數量"
              name="繫筋數量"
              title="繫筋數量"
              isRequired
              placeholder="ex: 4"
              onChange={inputErrorObserver}
              error={error}
            />
            <Input
              id="繫筋號數"
              name="繫筋號數"
              title="繫筋號數"
              isRequired
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
        width={shearformData['寬度']}
        depth={shearformData['總深度']}
        effectiveDepth={shearformData['有效深度']}
        concreteStrength={shearformData['混凝土抗壓強度']}
        rebarStrength={shearformData['鋼筋降伏強度']}
        designShear={shearformData['設計剪力']}
        mainRebarNum={shearformData['主筋數量']}
        mainRebarSpec={shearformData['主筋號數']}
        stirrupSpec={shearformData['箍筋號數']}
        spacing={shearformData['箍筋間距']}
        tiesNum={shearformData['繫筋數量']}
        tiesSpec={shearformData['繫筋號數']}
        normalForce={shearformData['軸力大小']}
        {...result}
      />}
    </div>
  );
};

export default React.memo(ShearCapacityCheck);