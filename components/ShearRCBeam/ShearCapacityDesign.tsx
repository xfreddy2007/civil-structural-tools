import React, { useState, useEffect, useCallback } from 'react';
import { css, cx } from '@emotion/css';
import Input from '../Input';
import { rebarSpec } from '@/libs/utils/rebar';
import validate from 'validate.js';
import { designConstraints } from './constraint';
import ShearDesignResult, { shearResultProps } from './ShearDesignResult';

const rootStyle = css``;

type shearFormDataProps = {
  '寬度'?: number,
  '總梁深度'?: number,
  '混凝土抗壓強度'?: string,
  '鋼筋降伏強度'?: string,
  '設計剪力'?: number,
  '軸力大小'?: number,
  '主筋數量'?: number,
  '主筋號數'?: rebarSpec,
};

const ShearCapacityDesign:React.FC = () => {
  const [shearFormData, setShearFormData] = useState<shearFormDataProps>({});
  const [error, setError] = useState({});
  const [result, setResult] = useState<null|shearResultProps>(null);

  const inputErrorObserver = useCallback((e: any) => {
    const error = validate({[e.target.name]: e.target.value}, designConstraints) || {};
    setError(error[e.target.name]? {[e.target.name]: error[e.target.name]} : {});
  }, []);

  const handleSubmitform = useCallback((e: any) => {
    e.preventDefault();
    const data = {
      '寬度': +e.target['寬度'].value,
      '總梁深度': +e.target['總梁深度'].value,
      '混凝土抗壓強度': e.target['混凝土抗壓強度'].value,
      '鋼筋降伏強度': e.target['鋼筋降伏強度'].value,
      '設計剪力': +e.target['設計剪力'].value,
      '軸力大小': +e.target['軸力大小'].value || 0,
      '主筋數量': +e.target['主筋數量'].value,
      '主筋號數': e.target['主筋號數'].value,
    };
    const errors = validate(data, designConstraints);
    setError(errors || {});
    if (!errors) {
      setShearFormData(data);
    } else {
      setShearFormData({});
    }
  }, []);

  useEffect(() => {
    if (Object.keys(shearFormData).length > 0) {
      // Assume effective depth to be 90% of total depth
      const effectiveDepth = 0.9 * shearFormData['總梁深度']!;
      const dataForm = {
        width: shearFormData['寬度']!,
        depth: shearFormData['總梁深度']!,
        effectiveDepth: effectiveDepth!,
        concreteStrength: shearFormData['混凝土抗壓強度']!.toString(),
        rebarStrength: shearFormData['鋼筋降伏強度']!.toString(),
        designShear: shearFormData['設計剪力']!,
        normalForce: shearFormData['軸力大小']!,
        mainRebarNum: shearFormData['主筋數量']!,
        mainRebarSpec: shearFormData['主筋號數']!,
      };
      setResult(dataForm);
    } else {
      setResult(null);
    }
  }, [shearFormData]);

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
              id="總梁深度"
              name="總梁深度"
              title="總梁深度"
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
              placeholder="ex: 20 tf"
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
          </div>
        </div>
        <div className="flex space-x-4">
          <button type="submit" className="px-10 py-2 bg-green-900 text-white rounded-md hover:bg-green-700 cursor-pointer font-bold">設計</button>
          <input type="reset" className="px-10 py-2 bg-green-900 text-white rounded-md hover:bg-green-700 cursor-pointer font-bold" value="重設參數" onClick={() => setShearFormData({})} />
        </div>
      </form>
      {result && <ShearDesignResult {...result} />}
    </div>
  );
};

export default React.memo(ShearCapacityDesign);