import React, { useState, useCallback, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { md, lg, xl } from '@/libs/utils/break-points';
import Input from '../Input';
import validate from 'validate.js';
import { stirrupRebarConstraint } from './constraint';
import { findRebarProperty, rebarSpec, stirrupRebarSpec } from '@/libs/utils/rebar';
import { getConcreteProperty, getVcStrength, shearVnStrengthCalculation, shearResultDataProps, vcResultDataProps } from '@/libs/utils/concrete';
import { roundToDigit } from '@/libs/utils/otherUtils';

export type shearResultProps = {
  width?: number,
  depth?: number,
  effectiveDepth?: number,
  concreteStrength?: string,
  rebarStrength?: string,
  designShear?: number,
  normalForce?: number,
  mainRebarNum?: number,
  mainRebarSpec?: rebarSpec,
};

type stirrupRebarFormDataProps = {
  '箍筋號數'?: stirrupRebarSpec,
  '箍筋間距'?: number,
  '繫筋數量'?: number,
  '繫筋號數'?: stirrupRebarSpec,
};

const rootStyle = css`
  box-shadow: 5px 5px 50px rgba(0, 0, 0, 0.5);
  margin: 0 20px 50px 20px;
  ${md} {
    box-shadow: 5px 5px 50px rgba(0, 0, 0, 0.5);
    margin: 0 100px 50px 100px;
  }
  ${xl} {
    box-shadow: 5px 5px 100px rgba(0, 0, 0, 0.5);
    margin: 0 200px 100px 200px;
  }
`;

const ShearCheckResult:React.FC<shearResultProps> = ({
  width,
  depth,
  effectiveDepth,
  concreteStrength,
  rebarStrength,
  designShear,
  normalForce,
  mainRebarNum,
  mainRebarSpec,
}) => {
  // stirrup rebar design
  const [stirrupRebarformData, setStirrupRebarFormData] = useState<stirrupRebarFormDataProps>({});
  const [error, setError] = useState({});
  const [vcResult, setVcResult] = useState<vcResultDataProps>(null);
  const [result, setResult] = useState<shearResultDataProps>(null);

  const inputErrorObserver = useCallback((e: any) => {
    const error = validate({[e.target.name]: e.target.value}, stirrupRebarConstraint) || {};
    setError(error[e.target.name]? {[e.target.name]: error[e.target.name]} : {});
  }, []);

  const handleSubmitform = useCallback((e: any) => {
    e.preventDefault();
    const data = {
      '箍筋號數': e.target['箍筋號數'].value,
      '箍筋間距': e.target['箍筋間距'].value,
      '繫筋數量': e.target['繫筋數量'].value === '' ? 0 : +e.target['繫筋數量'].value,
      '繫筋號數': e.target['繫筋號數'].value === '' ? '#4' : e.target['繫筋號數'].value,
    };
    const errors = validate(data, stirrupRebarConstraint);
    setError(errors || {});
    if (!errors) {
      setStirrupRebarFormData(data);
    } else {
      setStirrupRebarFormData({});
    }
  }, []);

  // main rebar area As
  const mainRebarArea = findRebarProperty(mainRebarSpec!)?.area! * mainRebarNum!;

  // Calculate Vc for initial design
  useEffect(() => {
    setVcResult(getVcStrength(
      width!,
      depth!,
      effectiveDepth!,
      normalForce,
      Number(concreteStrength),
      false,
      mainRebarArea,
    ));
  }, [concreteStrength, depth, effectiveDepth, mainRebarArea, normalForce, width]);

  useEffect(() => {
    if (Object.keys(stirrupRebarformData).length > 0) {
      const stirrupArea = 2 * findRebarProperty(stirrupRebarformData['箍筋號數']!)?.area! + stirrupRebarformData['繫筋數量']! * findRebarProperty(stirrupRebarformData['繫筋號數']!)?.area!;
      setResult(shearVnStrengthCalculation(
        width!,
        depth!,
        effectiveDepth!,
        normalForce,
        Number(concreteStrength),
        Number(rebarStrength),
        mainRebarArea,
        stirrupArea,
        stirrupRebarformData['箍筋間距']!,
      ));
    } else {
      setResult(null);
    }

  }, [concreteStrength, depth, effectiveDepth, mainRebarArea, normalForce, rebarStrength, stirrupRebarformData, width]);


  let VcCrossSectionText:string;
  if (designShear && designShear > 5 * vcResult?.concreteShear!) {
    VcCrossSectionText = `< 設計剪力 ${designShear} tf >> 斷面過小，須增加斷面面積。`;
  } else {
    VcCrossSectionText = `>= 設計剪力 ${designShear} tf >> OK。`
  }
  let VcTitle:string;
  let VcFormula:string;
  // if (avMin && avMin > (avStirrup + avTies)) {
  //   VcTitle = 'Av < Av,min :';
  //   VcFormula = `混凝土剪力強度 Vc = (2.12 * λs * ∛ρw * λ * √f'c + Nu / 6Ag)bw * d = (2.12 * ${lambdaS} * ∛${rhoW} * ${getConcreteProperty(Number(concreteStrength)).lambda} * √${concreteStrength} + ${normalForce} * 1000 / (6 * ${width! * depth!})) * ${width} * ${effectiveDepth} / 1000 = ${concreteShear} tf`;
  // } else {
  //   VcTitle = 'Av >= Av,min :';
  //   VcFormula = `混凝土剪力強度 Vc = √0.53 * λ * √f'c * bw * d 與 (2.12 * ∛ρw * λ * √f'c + Nu / 6Ag)bw * d取小值 = min(√0.53 * ${getConcreteProperty(Number(concreteStrength)).lambda} * √${concreteStrength} * ${width} * ${effectiveDepth}, (2.12 * ∛${rhoW} * ${getConcreteProperty(Number(concreteStrength)).lambda} * √${concreteStrength} + ${normalForce} * 1000 / (6 * ${width! * depth!})) * ${width} * ${effectiveDepth}) / 1000 = ${concreteShear} tf`;
  // }

  // let resultText:string;
  // if (designShear && maximunVu && designShear > maximunVu) {
  //   resultText = `Vu > 5ϕVc, 須加大梁尺寸。`
  // } else if (requiredShear && designShear && requiredShear < designShear) {
  //   resultText = `ϕVn < Vu = ${designShear} tf , 此梁剪力強度不足，須增加剪力鋼筋量或是加大梁尺寸。`;
  // } else {
  //   resultText = `ϕVn >= Vu = ${designShear} tf , 此梁剪力強度OK`;
  // }

  return (
    <div className={cx('block text-left p-4 md:p-8 xl:p-12 rounded-2xl overflow-hidden', rootStyle)}>
      <div className="mb-6">
        <h5 className="mb-2">設計規範</h5>
        <p>依據[土木401-110] 混凝土工程設計規範 計算</p>
      </div>
      <div className="mb-6">
        <h5 className="mb-2">設計參數</h5>
        <ul className="list-disc list-inside space-y-1">
          <li>{`混凝土28天抗壓強度f'c: ${concreteStrength} kgf/cm^2`}</li>
          <li>{`箍筋降伏強度fyt: ${rebarStrength} kgf/cm^2`}</li>
          <li>鋼筋彈性係度: 2,040,000 kgf/cm^2</li>
          <li>混凝土最大應變量: 0.003</li>
        </ul>
      </div>
      <div className="mb-6">
        <h5 className="mb-2">設計梁之參數</h5>
        <ul className="list-disc list-inside space-y-1">
          <li>{`寬度 b: ${width} cm`}</li>
          <li>{`總梁深 h: ${depth} cm`}</li>
          <li>{`有效深度 d: ${effectiveDepth} cm (假設梁有效深度為0.9 * 總梁深度)`}</li>
          <li>{`主筋號數: ${mainRebarSpec}`}</li>
          <li>{`主筋數量: ${mainRebarNum}`}</li>
          <li>{`設計剪力: ${designShear} tf`}</li>
          <li>{`軸力大小: ${normalForce} tf`}</li>
        </ul>
      </div>
      <div>
        <h5 className="block mb-2">剪力筋設計</h5>
        <p className="block text-green-900 mb-2">計算混凝土剪力強度 Vc</p>
        <ol className="list-inside block space-y-1">
          <li>依據[土木401-110] 混凝土工程設計規範 設計，混凝土剪力強度公式會由於剪力筋面積不同，而有不同的公式計算方式。設計上假設<span className="text-green-700">{'設計剪力筋面積 Av > 最小需求剪力筋面積 Av,min'}</span> 較為合理。</li>
          <li>{"Vc = √0.53 * λ * √f'c * bw * d 或是 (2.12 * ∛ρw * λ * √f'c + Nu / 6Ag)bw * d，在此取兩者之小值。"}</li>
          <li>{`>> Vc = min(√0.53 * ${getConcreteProperty(Number(concreteStrength)).lambda} * √${concreteStrength} * ${width} * ${effectiveDepth}, (2.12 * ∛${vcResult?.rhoW} * ${getConcreteProperty(Number(concreteStrength)).lambda} * √${concreteStrength} + ${normalForce} * 1000 / (6 * ${width! * depth!})) * ${width} * ${effectiveDepth}) / 1000 = ${vcResult?.concreteShear} tf`}</li>
          <li>{`檢核斷面剪力筋配置上限 5ϕVc = 5 * ${vcResult?.concreteShear} = ${roundToDigit(5 * vcResult?.concreteShear!, 2)} tf ${VcCrossSectionText}`}</li>
        </ol>
        <form className="w-full flex flex-col px-4 xl:px-8 items-center mb-6" onSubmit={handleSubmitform}>
          <div className="flex flex-col md:flex-row space-x-0 md:space-x-8 w-full mb-4">
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
          <div className="flex space-x-4">
            <button type="submit" className="px-6 md:px-10 py-2 bg-green-900 text-white rounded-md hover:bg-green-700 cursor-pointer font-bold">設計</button>
            <input type="reset" className="px-6 md:px-10 py-2 bg-green-900 text-white rounded-md hover:bg-green-700 cursor-pointer font-bold" value="重設參數" onClick={() => setStirrupRebarFormData({})}/>
          </div>
        </form>

      </div>
    </div>
  );
};

export default React.memo(ShearCheckResult);
