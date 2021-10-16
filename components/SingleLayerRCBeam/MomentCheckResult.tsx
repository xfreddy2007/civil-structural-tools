import React from 'react';
import { css, cx } from '@emotion/css';
import { md, lg, xl } from '@/libs/utils/break-points';
import { findRebarProperty, rebarSpec } from '@/libs/utils/rebar';
import { getConcreteProperty, getPhiParam } from '@/libs/utils/concrete';
import { roundToDigit } from '@/libs/utils/otherUtils';

type momentCheckResultProps = {
  width?: number,
  effectiveDepth?: number,
  concreteStrength?: string,
  rebarStrength?: string,
  mainRebarNum?: number,
  mainRebarSpec?: rebarSpec,
  designMoment?: number,
  neuturalDepth?: number,
  alpha?: number,
  et?: number,
  nominalMoment?: number,
  requiredMoment?: number,
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

const MomentCheckResult:React.FC<momentCheckResultProps> = ({
  width,
  effectiveDepth,
  concreteStrength,
  rebarStrength,
  mainRebarNum,
  mainRebarSpec,
  designMoment,
  neuturalDepth,
  et,
  nominalMoment,
  requiredMoment,
}) => {
  // @ts-ignore
  const as = (mainRebarNum || 0) * (findRebarProperty(mainRebarSpec)?.area || 0);
  let etText:string;
  let phiText:string;
  let momentText:string;
  if (et && et > 0.005) {
    etText = ' > 0.005, 為拉力控制斷面。';
    phiText = ' εt > 0.005, ϕ為 0.9';
  } else if (et && et >= 0.002) {
    etText = ' 介於 0.005 與 0.002 之間，為轉換斷面。';
    phiText = `0.005 > εt > 0.002, ϕ為 ${roundToDigit(getPhiParam(et, 0.005), 2)}`;
  } else {
    etText = ' < 0.002，為壓力控制斷面。';
    phiText = ' < 0.002, ϕ為 0.65'
  }
  if (requiredMoment && designMoment && requiredMoment < designMoment) {
    momentText = ' < 設計彎矩，須增加鋼筋量或是加大梁尺寸。';
  } else {
    momentText = ' > 設計彎矩，此梁檢核ＯＫ。'
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
          <li>{`鋼筋降伏強度fy: ${rebarStrength} kgf/cm^2`}</li>
          <li>鋼筋彈性係度: 2,040,000 kgf/cm^2</li>
          <li>混凝土最大應變量: 0.003</li>
        </ul>
      </div>
      <div className="mb-6">
        <h5 className="mb-2">檢核梁之參數</h5>
        <ul className="list-disc list-inside space-y-1">
          <li>{`寬度 b: ${width} cm`}</li>
          <li>{`有效深度 d: ${effectiveDepth} cm`}</li>
          <li>{`主筋號數: ${mainRebarSpec}`}</li>
          <li>{`主筋數量: ${mainRebarNum}`}</li>
          <li>{`設計彎矩: ${designMoment} tf - m`}</li>
        </ul>
      </div>
      <div className="">
        <h5 className="block mb-2">計算過程</h5>
        <p className="block text-green-900 mb-2">彎矩檢核</p>
        <ol className="block space-y-1">
          <li>{`中性軸位置 x: As * Fy / (0.85 * f'c * ß * b) = ${as}*${rebarStrength}/(0.85 * ${concreteStrength} * ${getConcreteProperty(Number(concreteStrength)).beta} * ${width}) ≈ ${neuturalDepth} cm`}</li>
          <li>{`求出最外層鋼筋應變 εt: 0.003 * (d-x) / x = 0.003 * (${effectiveDepth} - ${neuturalDepth}) / ${neuturalDepth} = ${et} ${etText}`}</li>
          <li>{`求出折減係數 ϕ: ${phiText}`}</li>
          <li>{`此梁之設計彎矩 ϕMn = ϕ * As * Fy * (d - (0.85 * x) / 2) = ${roundToDigit(getPhiParam(et!, 0.005), 2)} * ${as} * ${rebarStrength} * (${effectiveDepth} - (0.85 * ${neuturalDepth}) / 2) / 100000 ≈ ${roundToDigit(getPhiParam(et!, 0.005), 2)} * ${nominalMoment} ≈ ${requiredMoment} tf - m`}</li>
          <li>{`此梁彎矩設計強度${momentText}`}</li>
        </ol>
      </div>
    </div>
  );
};

export default React.memo(MomentCheckResult);
