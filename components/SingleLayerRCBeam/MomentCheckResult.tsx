import React from 'react';
import { css, cx } from '@emotion/css';
import { md, xl } from '@/libs/utils/break-points';
import { findRebarProperty, rebarSpec } from '@/libs/utils/rebar';
import { getConcreteProperty, getPhiParam } from '@/libs/utils/concrete';
import { roundToDigit } from '@/libs/utils/otherUtils';
import { MathJaxContext } from "better-react-mathjax";
import LatexText from '../LatexText';

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
    phiText = ' εt > 0.005, ϕ 為 0.9';
  } else if (et && et >= 0.002) {
    etText = ' 介於 0.005 與 0.002 之間，為轉換斷面。';
    phiText = `0.005 > εt > 0.002, ϕ 為 ${roundToDigit(getPhiParam(et, 0.005), 2)}`;
  } else {
    etText = ' < 0.002，為壓力控制斷面。';
    phiText = ' < 0.002, ϕ 為 0.65'
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
        <MathJaxContext>
          <h5 className="block mb-2">計算過程</h5>
          <p className="block text-green-900 mb-2">彎矩檢核</p>
          <ol className="block space-y-1">
            <li className="latex-li">
              <LatexText textType="text">中性軸位置</LatexText>
              <LatexText textType="formula">{"x = \\frac{As \\times f_y}{0.85 \\times f'_c \\times \\beta \\times b}"}</LatexText>
              <LatexText textType="formula">{` = \\frac{${as} \\times ${rebarStrength}}{0.85 \\times ${concreteStrength} \\times ${getConcreteProperty(Number(concreteStrength)).beta} \\times ${width}}`}</LatexText>
              <LatexText textType="formula">{`\\approx ${neuturalDepth}`}</LatexText>
              <LatexText textType="formula">{'cm'}</LatexText>
            </li>
            <li className="latex-li">
              <LatexText textType="text">求出最外層鋼筋應變</LatexText>
              <LatexText textType="formula">{`\\varepsilon_t = \\frac{0.003 \\times (d - x)}{x}`}</LatexText>
              <LatexText textType="formula">{`= \\frac{0.003 \\times (${effectiveDepth} - ${neuturalDepth})}{${neuturalDepth}}`}</LatexText>
              <LatexText textType="formula">{`\\approx ${et}`}</LatexText>
              <LatexText textType="text">{etText}</LatexText>
            </li>
            <li className="latex-li">
              <LatexText textType="text">求出折減係數</LatexText>
              <LatexText textType="formula">{'\\phi :'}</LatexText>
              <LatexText textType="formula">{phiText}</LatexText>
            </li>
            <li className="latex-li">
              <LatexText textType="text">此梁之設計彎矩</LatexText>
              <LatexText textType="formula">{'\\phi Mn = \\phi \\times As \\times f_y \\times (d - \\frac{0.85 \\times x}{2})'}</LatexText>
              <LatexText textType="formula">{`= ${roundToDigit(getPhiParam(et!, 0.005), 2)} \\times ${as} \\times ${rebarStrength} \\times (${effectiveDepth} - \\frac{0.85 \\times ${neuturalDepth}}{2}) / 100000`}</LatexText>
              <LatexText textType="formula">{`\\approx ${requiredMoment}`}</LatexText>
              <LatexText textType="formula">{'tf - m'}</LatexText>
            </li>
            <li>{`此梁彎矩設計強度${momentText}`}</li>
          </ol>
        </MathJaxContext>
      </div>
    </div>
  );
};

export default React.memo(MomentCheckResult);
