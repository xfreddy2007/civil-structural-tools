import React, { useState, useCallback, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { md, lg, xl } from '@/libs/utils/break-points';
import Input from '../Input';
import validate from 'validate.js';
import { stirrupRebarConstraint } from './constraint';
import { findRebarProperty, rebarSpec, stirrupRebarSpec } from '@/libs/utils/rebar';
import { getConcreteProperty, getVcStrength, stirrupDesign, stirrupDesignProps, vcResultDataProps, getSpacingSelectOption } from '@/libs/utils/concrete';
import { roundToDigit } from '@/libs/utils/otherUtils';
import { MathJaxContext } from "better-react-mathjax";
import LatexText from '../LatexText';

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
  const [vcResult, setVcResult] = useState<vcResultDataProps>(null);
  const [result, setResult] = useState<stirrupDesignProps>(null);

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

  // Calculate required stirrup spacing ratio
  useEffect(() => {
    vcResult && setResult(stirrupDesign(
      designShear!,
      vcResult?.concreteShear!,
      effectiveDepth!,
      Number(rebarStrength)!,
    ))
  }, [designShear, effectiveDepth, rebarStrength, vcResult]);

  // stirrup rebar design
  const [stirrupRebarFormData, setStirrupRebarFormData] = useState<stirrupRebarFormDataProps>({});
  const [error, setError] = useState({});

  const inputErrorObserver = useCallback((e: any) => {
    const error = validate({[e.target.name]: e.target.value}, stirrupRebarConstraint) || {};
    setError(error[e.target.name]? {[e.target.name]: error[e.target.name]} : {});
  }, []);

  const handleSubmitform = useCallback((e: any) => {
    e.preventDefault();
    const data = {
      '箍筋號數': e.target['箍筋號數'].value,
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

  // get selected
  const [usedStirrupSpacing, setUsedStirrupSpacing] = useState('');
  const handleSpacingSelect = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setUsedStirrupSpacing(e.target.value);
  };

  // design stirrup and spacing
  let designedStirrupSpec:stirrupRebarSpec = '#3';
  let designedTiesSpec:stirrupRebarSpec = '#3';
  let designedStirrupSpacing:number = 10;
  if (Object.keys(stirrupRebarFormData).length > 0) {
    designedStirrupSpec = stirrupRebarFormData['箍筋號數']!;
    designedTiesSpec = stirrupRebarFormData['繫筋號數']!;
    const stirrupArea = 2 * findRebarProperty(designedStirrupSpec)?.area! + stirrupRebarFormData['繫筋數量']! * findRebarProperty(designedTiesSpec)?.area!;
    designedStirrupSpacing = roundToDigit(stirrupArea / result?.stirrupSpacingRatio!, 2);
  }

  let VcMaxText:string;
  let VcMaxText_1:string;
  if (vcResult && vcResult?.maxConcreteShear < vcResult?.concreteShear) {
    VcMaxText = '<';
    VcMaxText_1 = 'Vc, 使用Vc,max 為混凝土剪力強度';
  } else {
    VcMaxText = '\\geqq';
    VcMaxText_1 = 'Vc, OK';
  }

  let VcCrossSectionText:string;
  let VcCrossSectionText_1:string;
  if (designShear && designShear > 5 * vcResult?.concreteShear!) {
    VcCrossSectionText = '<';
    VcCrossSectionText_1 = '>> 斷面過小，須增加斷面面積。';
  } else {
    VcCrossSectionText = '\\geqq';
    VcCrossSectionText_1 = '>> OK。';
  }

  let maxSpacingShearText:string;
  let spacingText:string;
  if (result && vcResult && result?.requiredVs > vcResult?.maxSpacingShear) {
    maxSpacingShearText = `> 1.06 \\sqrt{f'_c} b_w d = ${vcResult?.maxSpacingShear}`;
    if (Number(usedStirrupSpacing) > Math.min(effectiveDepth! / 4, 30)) {
      spacingText = '> Min(d/4, 30 cm)，請重新設計箍筋尺寸。';
    } else {
      spacingText = '<= Min(d/4, 30 cm)，OK';
    }
  } else {
    maxSpacingShearText = `\\leqq 1.06 \\sqrt{f'_c} b_w d = ${vcResult?.maxSpacingShear}`;
    if (Number(usedStirrupSpacing) > Math.min(effectiveDepth! / 2, 60)) {
      spacingText = '> Min(d/2, 60 cm)，請重新設計箍筋尺寸。';
    } else {
      spacingText = '<= Min(d/2, 60 cm)，OK';
    }
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
        <MathJaxContext>
          {vcResult && result && <>
            <h5 className="block mb-2">剪力筋設計</h5>
            <p className="block text-green-900 mb-2">計算混凝土剪力強度 Vc</p>
            <ol className="list-inside block space-y-1 mb-2">
              <li>依據[土木401-110] 混凝土工程設計規範 設計，混凝土剪力強度公式會由於剪力筋面積不同，而有不同的公式計算方式。設計上假設<span className="text-green-700">{'設計剪力筋面積 Av > 最小需求剪力筋面積 Av,min'}</span> 較為合理。</li>
              <li className="latex-li">
                <LatexText textType="formula">{"Vc = (0.53 \\lambda \\sqrt{f'_c} + \\frac{N_u}{6A_g})bwd"}</LatexText>
                <LatexText textType="text">或是</LatexText>
                <LatexText textType="formula">{"(2.12 \\sqrt[3]{\\rho_w} \\lambda \\sqrt{f'_c} + \\frac{N_u}{6A_g})bwd"}</LatexText>
                <LatexText textType="text">，在此取兩者之小值。</LatexText>
              </li>
              <li className="latex-li">
                <LatexText textType="text">斷面縱向拉力鋼筋比</LatexText>
                <LatexText textType="formula">{"\\rho_w = \\frac{A_s}{b_w \\times d}"}</LatexText>
                <LatexText textType="formula">{`= \\frac{${mainRebarArea}}{${width} \\times ${effectiveDepth}}`}</LatexText>
                <LatexText textType="formula">{`= ${vcResult?.rhoW}`}</LatexText>
              </li>
              <li className="latex-li">
                <LatexText textType="formula">{`>> Vc = min((0.53 \\times ${getConcreteProperty(Number(concreteStrength)).lambda} \\times \\sqrt{${concreteStrength}}`}</LatexText>
                <LatexText textType="formula">{`+ \\frac{${normalForce}}{6 \\times ${width! * depth!}}) \\times ${width} \\times ${effectiveDepth},`}</LatexText>
                <LatexText textType="formula">{`(2.12 \\times \\sqrt[3]{${vcResult?.rhoW}} \\times ${getConcreteProperty(Number(concreteStrength)).lambda} \\times \\sqrt{${concreteStrength}}`}</LatexText>
                <LatexText textType="formula">{`+ \\frac{${normalForce}}{6 \\times ${width! * depth!}}) \\times ${width} \\times ${effectiveDepth}) / 1000`}</LatexText>
                <LatexText textType="formula">{`= ${vcResult?.concreteShear}`}</LatexText>
                <LatexText textType="formula">{'tf'}</LatexText>
              </li>
              <li className="latex-li">
                <LatexText textType="text">混凝土剪力強度上限</LatexText>
                <LatexText textType="formula">{"Vc,max = 1.33 \\lambda \\sqrt{f'_c} bwd"}</LatexText>
                <LatexText textType="formula">{`= 1.33 \\times ${getConcreteProperty(Number(concreteStrength)).lambda} \\sqrt{${concreteStrength}} \\times ${width} \\times ${effectiveDepth} / 1000`}</LatexText>
                <LatexText textType="formula">{`= ${vcResult.maxConcreteShear}`}</LatexText>
                <LatexText textType="formula">{'tf'}</LatexText>
                <LatexText textType="formula">{VcMaxText}</LatexText>
                <LatexText textType="text">{VcMaxText_1}</LatexText>
              </li>
              <li className="latex-li">
                <LatexText textType="text">檢核斷面剪力筋配置上限</LatexText>
                <LatexText textType="formula">{`5 \\phi Vc = 5 \\times ${vcResult?.concreteShear}`}</LatexText>
                <LatexText textType="formula">{`= ${roundToDigit(5 * vcResult?.concreteShear!, 2)}`}</LatexText>
                <LatexText textType="formula">{'tf'}</LatexText>
                <LatexText textType="formula">{VcCrossSectionText}</LatexText>
                <LatexText textType="text">設計剪力</LatexText>
                <LatexText textType="formula">{`${designShear}`}</LatexText>
                <LatexText textType="formula">{'tf'}</LatexText>
                <LatexText textType="text">{VcCrossSectionText_1}</LatexText>
              </li>
            </ol>
            <p className="block text-green-900 mb-2">計算剪力筋間距比 Av/s</p>
            <ol className="list-inside block space-y-1 mb-2">
              <li className="latex-li">
                <LatexText textType="text">折減係數</LatexText>
                <LatexText textType="formula">{'\\phi : 0.75'}</LatexText>
              </li>
              <li className="latex-li">
                <LatexText textType="text">剪力筋所需提供之剪力</LatexText>
                <LatexText textType="formula">{'V_s = \\frac{V_u}{\\phi} - V_c'}</LatexText>
                <LatexText textType="formula">{`= \\frac{${designShear}}{0.75} - ${vcResult?.concreteShear}`}</LatexText>
                <LatexText textType="formula">{`= ${result?.requiredVs}`}</LatexText>
                <LatexText textType="formula">{'tf'}</LatexText>
              </li>
              <li className="latex-li">
                <LatexText textType="text">需求剪力筋間距比</LatexText>
                <LatexText textType="formula">{'A_v / s = \\frac{V_s,req}{f_yt \\times d}'}</LatexText>
                <LatexText textType="formula">{`= \\frac{${result?.requiredVs} \\times 1000}{${rebarStrength} \\times ${effectiveDepth}}`}</LatexText>
                <LatexText textType="formula">{`= ${result?.stirrupSpacingRatio}`}</LatexText>
              </li>
            </ol>
            <p className="block text-green-900 mb-2">剪力筋及繫筋設計</p>
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
            {Object.keys(stirrupRebarFormData).length > 0 && <div className="mb-6">
              <ul className="list-disc list-inside space-y-1 mb-2">
                <li>{`箍筋號數: ${stirrupRebarFormData['箍筋號數']}, 單位面積 = ${findRebarProperty(stirrupRebarFormData['箍筋號數']!)?.area} cm^2`}</li>
                <li>{`繫筋號數: ${stirrupRebarFormData['繫筋號數']}, 單位面積 = ${findRebarProperty(stirrupRebarFormData['繫筋號數']!)?.area} cm^2`}</li>
                <li>{`>> 所需最大間距 s,max = ${designedStirrupSpacing} cm `}</li>
              </ul>
              <p className="block text-green-900 mb-2">剪力筋間距設計</p>
              <select onChange={handleSpacingSelect} className="form-select-style mb-2">
                {getSpacingSelectOption(Math.min(designedStirrupSpacing, effectiveDepth!)).map((option) => {
                  return <option key={option} value={option}>{`${option} cm`}</option>;
                })}
              </select>
              {usedStirrupSpacing && <ul className="list-inside space-y-1 mb-2">
                <li className="latex-li">
                  {/* {`箍筋設計: ${stirrupRebarFormData['箍筋號數']}@${usedStirrupSpacing}`} */}
                  <LatexText textType="text">箍筋設計:</LatexText>
                  <LatexText textType="text">{stirrupRebarFormData['箍筋號數']!}</LatexText>
                  <LatexText textType="text">@</LatexText>
                  <LatexText textType="text">{usedStirrupSpacing}</LatexText>
                </li>
                <li className="latex-li">
                  <LatexText textType="formula">{`V_s = ${result?.requiredVs}`}</LatexText>
                  <LatexText textType="formula">{'tf'}</LatexText>
                  <LatexText textType="formula">{maxSpacingShearText}</LatexText>
                  <LatexText textType="formula">{'tf'}</LatexText>
                </li>
                <li className="latex-li">
                  <LatexText textType="formula">{`>> ${usedStirrupSpacing}`}</LatexText>
                  <LatexText textType="formula">{'cm'}</LatexText>
                  <LatexText textType="formula">{spacingText}</LatexText>
                </li>
              </ul>}
            </div>}
          </>}
        </MathJaxContext>
      </div>
    </div>
  );
};

export default React.memo(ShearCheckResult);
