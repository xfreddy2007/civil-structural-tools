import React from 'react';
import { css, cx } from '@emotion/css';
import { md, lg, xl } from '@/libs/utils/break-points';
import { findRebarProperty, rebarSpec, stirrupRebarSpec } from '@/libs/utils/rebar';
import { getConcreteProperty, getPhiParam } from '@/libs/utils/concrete';
import { roundToDigit } from '@/libs/utils/otherUtils';

type shearCheckResultProps = {
  width?: number,
  depth?: number,
  effectiveDepth?: number,
  concreteStrength?: string,
  rebarStrength?: string,
  designShear?: number,
  mainRebarNum?: number,
  mainRebarSpec?: rebarSpec,
  stirrupSpec?: rebarSpec,
  spacing?: number,
  tiesNum?: number,
  tiesSpec?: rebarSpec,
  normalForce?: number,
  avMin?: number,
  lambdaS?: number,
  rhoW?: number,
  concreteShear?: number,
  rebarShear?: number,
  nominalShear?: number,
  requiredShear?: number,
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

const ShearCheckResult:React.FC<shearCheckResultProps> = ({
  width,
  depth,
  effectiveDepth,
  concreteStrength,
  rebarStrength,
  designShear,
  mainRebarNum,
  mainRebarSpec,
  stirrupSpec,
  spacing,
  tiesNum,
  tiesSpec,
  normalForce,
  avMin,
  lambdaS,
  rhoW,
  concreteShear,
  rebarShear,
  nominalShear,
  requiredShear,
}) => {
  // @ts-ignore
  const as = (mainRebarNum || 0) * (findRebarProperty(mainRebarSpec)?.area || 0);
  // @ts-ignore
  const avStirrup = 2 * (findRebarProperty(stirrupSpec)?.area || 0);
  // @ts-ignore
  const avTies = (tiesNum || 0) * (findRebarProperty(tiesSpec)?.area || 0);

  let VcTitle:string;
  let VcFormula:string;
  if (avMin && avMin > (avStirrup + avTies)) {
    VcTitle = 'Av < Av,min :';
    VcFormula = `混凝土剪力強度 Vc = (2.12 * λs * ∛ρw * λ * √f'c + Nu / 6Ag)bw * d = (2.12 * ${lambdaS} * ∛${rhoW} * ${getConcreteProperty(Number(concreteStrength)).lambda} * √${concreteStrength} + ${normalForce} * 1000 / (6 * ${width! * depth!})) * ${width} * ${effectiveDepth} / 1000 = ${concreteShear} tf`;
  } else {
    VcTitle = 'Av >= Av,min :';
    VcFormula = `混凝土剪力強度 Vc = √0.53 * λ * √f'c * bw * d 與 (2.12 * ∛ρw * λ * √f'c + Nu / 6Ag)bw * d取小值 = min(√0.53 * ${getConcreteProperty(Number(concreteStrength)).lambda} * √${concreteStrength} * ${width} * ${effectiveDepth}, (2.12 * ∛${rhoW} * ${getConcreteProperty(Number(concreteStrength)).lambda} * √${concreteStrength} + ${normalForce} * 1000 / (6 * ${width! * depth!})) * ${width} * ${effectiveDepth}) / 1000 = ${concreteShear} tf`;
  }

  let resultText:string;
  if (requiredShear && designShear && requiredShear < designShear) {
    resultText = `ϕVn < Vu = ${designShear} tf , 此梁剪力強度不足，須增加剪力鋼筋量或是加大梁尺寸。`;
  } else {
    resultText = `ϕVn >= Vu = ${designShear} tf , 此梁剪力強度OK`;
  }

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
        <h5 className="mb-2">檢核梁之參數</h5>
        <ul className="list-disc list-inside space-y-1">
          <li>{`寬度 b: ${width} cm`}</li>
          <li>{`總梁深 h: ${depth} cm`}</li>
          <li>{`有效深度 d: ${effectiveDepth} cm`}</li>
          <li>{`主筋號數: ${mainRebarSpec}`}</li>
          <li>{`主筋數量: ${mainRebarNum}`}</li>
          <li>{`箍筋號數: ${stirrupSpec}`}</li>
          <li>{`箍筋間距: ${spacing} cm`}</li>
          <li>{`繫筋號數: ${tiesSpec}`}</li>
          <li>{`繫筋數量: ${tiesNum}`}</li>
          <li>{`設計剪力: ${designShear} tf`}</li>
          <li>{`軸力大小: ${normalForce} tf`}</li>
        </ul>
      </div>
      <div>
        <h5 className="block mb-2">計算過程</h5>
        <p className="block text-green-900 mb-2">剪力檢核</p>
        <ol className="list-decimal list-inside block space-y-1">
          <li>{`求出梁最小剪力鋼筋量 Av,min: 0.2 * √f'c * bw / fyt 與 3.5 * bw / fyt 取大值= Max(0.2 * √${concreteStrength} * ${width} / ${rebarStrength}, * 3.5 * ${width} / ${rebarStrength}) ≈ ${avMin} cm^2`}</li>
          <li>{`求出尺寸效應修正係數 λs: √2/(1 + d / 25) = √2 / (1 + ${effectiveDepth} / 25) = ${lambdaS}`}</li>
          <li>{`求出斷面縱向拉力鋼筋比 ρw: As / (bw * d) = ${as} / (${width} * ${effectiveDepth}) = ${rhoW}`}</li>
          <li className="flex flex-col">
            <span>計算混凝土提供的剪力強度：</span>
            <span>{`剪力鋼筋量 Av = 2 * ${avStirrup / 2} + ${tiesNum} * ${findRebarProperty(tiesSpec!)!.area || 0} = ${avStirrup + avTies} cm^2`}</span>
            <span>{VcTitle}</span>
            <span>{VcFormula}</span>
            <span>計算鋼筋提供的剪力強度：</span>
            <span>{`鋼筋剪力強度 Vs = Av * fyt * d / s = (${avStirrup + avTies} * ${rebarStrength} * ${effectiveDepth} / ${spacing}) / 1000 = ${rebarShear} tf`}</span>
          </li>
          <li>折減係數 ϕ: 0.75</li>
          <li>{`此梁之剪力強度 ϕVn = ϕ * Vn + Vs = 0.75 * ${concreteShear} * ${rebarShear} = 0.75 * ${nominalShear} * ${requiredShear} tf`}</li>
        </ol>

        <p>{resultText}</p>
      </div>
    </div>
  );
};

export default React.memo(ShearCheckResult);
