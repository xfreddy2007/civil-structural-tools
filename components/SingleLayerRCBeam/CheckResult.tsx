import React from 'react';
import { css, cx } from '@emotion/css';
import { findRebarProperty, rebarSpec } from '@/libs/utils/rebar';
import { getConcreteProperty, getPhiParam } from '@/libs/utils/concrete';
import { roundToDigit } from '@/libs/utils/otherUtils';

type CheckResultProps = {
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
  neuturalMoment?: number,
  requiredMoment?: number,
};

const CheckResult:React.FC<CheckResultProps> = ({
  width,
  effectiveDepth,
  concreteStrength,
  rebarStrength,
  mainRebarNum,
  mainRebarSpec,
  designMoment,
  neuturalDepth,
  alpha,
  et,
  neuturalMoment,
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
    <div className="text-left">
      <div>
        <h5>設計規範</h5>
        <p>依據[土木401-110] 混凝土工程設計規範 計算</p>
      </div>
      <div>
        <h5>設計參數</h5>
        <ol>
          <li>{`混凝土28天抗壓強度f'c: ${concreteStrength} kgf/cm^2`}</li>
          <li>{`鋼筋降伏強度fy: ${rebarStrength} kgf/cm^2`}</li>
          <li>鋼筋彈性係度: 2,040,000 kgf/cm^2</li>
          <li>混凝土最大應變量: 0.003</li>
        </ol>
      </div>
      <div>
        <h5>檢核梁之參數</h5>
        <ol>
          <li>{`寬度 b: ${width} cm`}</li>
          <li>{`有效深度 d: ${effectiveDepth} cm`}</li>
          <li>{`主筋號數: ${mainRebarSpec}`}</li>
          <li>{`主筋數量: ${mainRebarNum}`}</li>
          <li>{`設計彎矩: ${designMoment} tf - m`}</li>
        </ol>
      </div>
      <div>
        <h5>計算過程</h5>
        <p>1. 彎矩檢核</p>
        <p>{`中性軸位置 x: As*Fy/(0.85*f'c*ß*b) = ${as}*${rebarStrength}/(0.85*${concreteStrength}*${getConcreteProperty(Number(concreteStrength)).beta}*${width}) ≈ ${neuturalDepth} cm`}</p>
        <p>{`求出最外層鋼筋應變 εt: 0.003*(d-x)/x = 0.003*(${effectiveDepth}-${neuturalDepth})/${neuturalDepth} = ${et} ${etText}`}</p>
        <p>{`求出折減係數 ϕ: ${phiText}`}</p>
        <p>{`此梁之設計彎矩 ϕMn = ϕ*As*Fy*(d-(0.85*x)/2) = ${roundToDigit(getPhiParam(et!, 0.005), 2)}*${as}*${rebarStrength}*(${effectiveDepth}-(0.85*${neuturalDepth})/2)/100000 ≈ ${roundToDigit(getPhiParam(et!, 0.005), 2)} * ${neuturalMoment} ≈ ${requiredMoment} tf - m`}</p>
        <p>{`此梁彎矩設計強度${momentText}`}</p>
      </div>
    </div>
  );
};

export default React.memo(CheckResult);
