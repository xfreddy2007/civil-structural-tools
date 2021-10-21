import React, { useState, useCallback } from 'react';
import { css, cx } from '@emotion/css';
import { md, xl } from '@/libs/utils/break-points';
import Input from '../Input';
import validate from 'validate.js';
import { mainRebarConstraint } from './constraint';
import { findRebarProperty, rebarSpec, stirrupRebarSpec, rebarMapping, stirrupMapping } from '@/libs/utils/rebar';
import { getMinimumBeamWidth } from '@/libs/utils/concrete';
import { roundToDigit } from '@/libs/utils/otherUtils';
import { MathJaxContext } from "better-react-mathjax";
import LatexText from '../LatexText';

type MomentDesignResultProps = {
  width?: number,
  depth?: number,
  concreteStrength?: string,
  rebarStrength?: string,
  designMoment?: number,
  momentParam?: number,
  materialParam?: number,
  designRebarArea?: number,
  neuturalDepth?: number,
  asMin?: number,
  asMax?: number,
};

type mainRebarFormDataProps = {
  '主筋號數'?: rebarSpec,
  '箍筋號數'?: stirrupRebarSpec,
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

const MomentDesignResult:React.FC<MomentDesignResultProps> = ({
  width,
  depth,
  concreteStrength,
  rebarStrength,
  designMoment,
  momentParam,
  materialParam,
  designRebarArea,
  neuturalDepth,
  asMin,
  asMax,
}) => {
  // Assume effective depth to be 90% of total depth
  const effectiveDepth = 0.9 * depth!;

  // determine true design rebar area
  let usedRebarArea:number = 0;
  let asText:string;
  if (designRebarArea && asMax && designRebarArea > asMax) {
    asText = 'As,req > As,max，應配置壓力筋，請見雙筋梁設計';
  } else if (designRebarArea && asMin && designRebarArea < asMin) {
    asText = 'As,req < As,min，設計鋼筋量使用As,min';
    usedRebarArea = asMin;
  } else {
    asText = 'As,min <= As,req < As,max，OK!';
    usedRebarArea = designRebarArea!;
  }

  // main rebar design
  const [mainRebarformData, setMainRebarFormData] = useState<mainRebarFormDataProps>({});
  const [error, setError] = useState({});
  const inputErrorObserver = useCallback((e: any) => {
    const error = validate({[e.target.name]: e.target.value}, mainRebarConstraint) || {};
    setError(error[e.target.name]? {[e.target.name]: error[e.target.name]} : {});
  }, []);

  const handleSubmitform = useCallback((e: any) => {
    e.preventDefault();
    const data = {
      '主筋號數': e.target['主筋號數'].value,
      '箍筋號數': e.target['箍筋號數'].value,
    };
    const errors = validate(data, mainRebarConstraint);
    setError(errors || {});
    if (!errors) {
      setMainRebarFormData(data);
    } else {
      setMainRebarFormData({});
    }
  }, []);

  // design rebar spec and amount
   // minimum beam width
  let designedRebarSpec:rebarSpec = '#3';
  let designedRebarAmount:number = 2;
  let usedRebarAmount:number = 2;
  let minimumBeamWidth:number = 0;
  if (Object.keys(mainRebarformData).length > 0) {
    designedRebarSpec = mainRebarformData['主筋號數']!;
    designedRebarAmount = roundToDigit(usedRebarArea / findRebarProperty(mainRebarformData['主筋號數']!)?.area!, 2);
    usedRebarAmount = (Math.floor(designedRebarAmount) + 1);
    minimumBeamWidth = getMinimumBeamWidth(rebarMapping[designedRebarSpec!], stirrupMapping[mainRebarformData['箍筋號數']!], usedRebarAmount.toString());
  }
  let minBeamWidthText:string;
  if (width && minimumBeamWidth > width) {
    minBeamWidthText = `梁寬 ${width} cm < ${minimumBeamWidth} cm，須擴大梁寬或是更換大號數的鋼筋`;
  } else {
    minBeamWidthText = `梁寬 ${width} cm >= ${minimumBeamWidth} cm，OK!`;
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
        <h5 className="mb-2">設計梁之參數</h5>
        <ul className="list-disc list-inside space-y-1">
          <li>{`寬度 b: ${width} cm`}</li>
          <li>{`總梁深度 h: ${depth} cm`}</li>
          <li>{`設計彎矩: ${designMoment} tf - m`}</li>
        </ul>
      </div>
      <div className="mb-6">
        <MathJaxContext>
          <h5 className="block mb-2">計算過程</h5>
          <p className="block text-green-900 mb-2">彎矩設計</p>
          <ol className="block space-y-1">
            <li>依據[土木401-110] 混凝土工程設計規範定義設計梁均為<span className="text-green-700">拉力控制斷面</span>，因此折減係數ϕ假設為0.9</li>
            <li className="latex-li">
              {/* {`假設梁有效深度為0.9 * 總梁深度 = 0.9 * ${depth} = ${effectiveDepth} cm`} */}
              <LatexText textType="text">假設梁有效深度為</LatexText>
              <LatexText textType="formula">{'0.9 \\times'}</LatexText>
              <LatexText textType="text">總梁深度</LatexText>
              <LatexText textType="formula">{`= 0.9 \\times ${depth}`}</LatexText>
              <LatexText textType="formula">{`= ${effectiveDepth}`}</LatexText>
              <LatexText textType="formula">{'cm'}</LatexText>
            </li>
            <li className="latex-li">
              <LatexText textType="text">檢核最小鋼筋量</LatexText>
              <LatexText textType="formula">{'As,min = \\frac{14 \\times b \\times d}{f_y}'}</LatexText>
              <LatexText textType="text">與</LatexText>
              <LatexText textType="formula">{"\\frac{0.8 \\times \\sqrt{f'_c} \\times b \\times d}{f_y}"}</LatexText>
              <LatexText textType="text">兩者取大值</LatexText>
              <LatexText textType="formula">{`= Max(\\frac{14 \\times ${width} \\times ${effectiveDepth}}{${rebarStrength}}, \\frac{0.8 \\times \\sqrt{${concreteStrength}} \\times ${width} \\times ${effectiveDepth}}{${rebarStrength}})`}</LatexText>
              <LatexText textType="formula">{`= ${asMin}`}</LatexText>
              <LatexText textType="formula">{'cm^{2}'}</LatexText>
            </li>
            <li>要滿足設計梁為拉力控制斷面，需定義最大拉力鋼筋量為<span className="text-green-700">當最外層拉力鋼筋應變剛好等於0.005時</span>的鋼筋量</li>
            <li className="latex-li">
              {/* {`As,max = (Mu / 0.9) / (fy * (d - (0.85 * x) / 2)) = (${designMoment} * 100000 / 0.9) / (${rebarStrength} * (${effectiveDepth} - (0.85 * ${neuturalDepth}) / 2)) = ${asMax} cm^2`} */}
              <LatexText textType="formula">{'As,max = \\frac{Mu / 0.9}{f_y \\times (d - \\frac{0.85 \\times x}{2})}'}</LatexText>
              <LatexText textType="formula">{`= \\frac{${designMoment} \\times 100000 / 0.9}{${rebarStrength} \\times (${effectiveDepth} - \\frac{0.85 \\times ${neuturalDepth}}{2})}`}</LatexText>
              <LatexText textType="formula">{`= ${asMax}`}</LatexText>
              <LatexText textType="formula">{'cm^{2}'}</LatexText>
            </li>
            <li className="flex flex-col">
              <LatexText textType="text">單筋梁拉力鋼筋需求計算:</LatexText>
              <span className="ml-2 xl:ml-4 latex-li">
                <LatexText textType="text">力矩參數</LatexText>
                <LatexText textType="formula">{'Rn = \\frac{M_u}{\\phi \\times b \\times d^{2}}'}</LatexText>
                <LatexText textType="formula">{`= \\frac{${designMoment} \\times 100000}{0.9  \\times ${width} \\times ${effectiveDepth}^{2}}`}</LatexText>
                <LatexText textType="formula">{`= ${momentParam}`}</LatexText>
              </span>
              <span className="ml-2 xl:ml-4 latex-li">
                {/* {`材料參數 m = fy / (0.85 * f'c) = ${rebarStrength} / (0.85 * ${concreteStrength}) = ${materialParam}`} */}
                <LatexText textType="text">材料參數</LatexText>
                <LatexText textType="formula">{"m = \\frac{f_y}{0.85 \\times f'_c}"}</LatexText>
                <LatexText textType="formula">{`= \\frac{${rebarStrength}}{0.85 \\times ${concreteStrength}}`}</LatexText>
                <LatexText textType="formula">{`= ${materialParam}`}</LatexText>
              </span>
              <span className="ml-2 xl:ml-4 latex-li">
                {/* {`需求拉力鋼筋面積 As,req = (1 / m) * (1 - √(1 - (2 * m * Rn / fy))) * b * d = (1 / ${materialParam}) * (1 - √(1 - (2 * ${materialParam} * ${momentParam} / ${rebarStrength}))) * ${width} * ${effectiveDepth} = ${designRebarArea} cm^2`} */}
                <LatexText textType="text">需求拉力鋼筋面積</LatexText>
                <LatexText textType="formula">{"As,req = (\\frac{1}{m}) \\times (1 - \\sqrt{1 - \\frac{2 \\times m \\times Rn}{f_y}}) \\times b \\times d"}</LatexText>
                <LatexText textType="formula">{`= (\\frac{1}{${materialParam}}) \\times (1 - \\sqrt{1 - \\frac{2 \\times ${materialParam} \\times ${momentParam}}{${rebarStrength}}}) \\times ${width} \\times ${effectiveDepth}`}</LatexText>
                <LatexText textType="formula">{`= ${designRebarArea}`}</LatexText>
                <LatexText textType="formula">{'cm^{2}'}</LatexText>
              </span>
              <span className="ml-2 xl:ml-4">{asText}</span>
            </li>
          </ol>
        </MathJaxContext>
      </div>
      {!(designRebarArea! > asMax!) && <div className="w-full">
        <MathJaxContext>
          <h5 className="block mb-2">主筋設計</h5>
          <p className="latex-li">
            {/* {`設計鋼筋量 As: ${usedRebarArea} cm^2`} */}
            <LatexText textType="text">設計鋼筋量 As =</LatexText>
            <LatexText textType="formula">{`${usedRebarArea}`}</LatexText>
            <LatexText textType="formula">{'cm^{2}'}</LatexText>
          </p>
          <form className="w-full flex flex-col px-4 xl:px-32 items-center mb-6" onSubmit={handleSubmitform}>
            <div className="flex flex-col md:flex-row space-x-0 md:space-x-8 w-full mb-4">
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
            </div>
            <div className="flex space-x-4">
              <button type="submit" className="px-6 md:px-10 py-2 bg-green-900 text-white rounded-md hover:bg-green-700 cursor-pointer font-bold">設計</button>
              <input type="reset" className="px-6 md:px-10 py-2 bg-green-900 text-white rounded-md hover:bg-green-700 cursor-pointer font-bold" value="重設參數" onClick={() => setMainRebarFormData({})}/>
            </div>
          </form>
          {Object.keys(mainRebarformData).length > 0 && <div className="mb-6">
            <ul className="list-disc list-inside space-y-1 mb-2">
              <li>{`主筋號數： ${designedRebarSpec}, 單位面積 = ${findRebarProperty(mainRebarformData['主筋號數']!)?.area} cm^2`}</li>
              <li>{`所需鋼筋數 = ${designedRebarAmount} => ${usedRebarAmount} 支`}</li>
            </ul>
            {usedRebarAmount < 2 && <p className="block text-red-600 mb-2">{'>> 所需鋼筋數 = 1 支，請更換更小號數之主筋'}</p>}
            {usedRebarAmount > 10 && <p className="block text-red-600 mb-2">{'>> 所需鋼筋數 > 10 支，需擴大梁寬梁深'}</p>}
            {!(usedRebarAmount < 2) && !(usedRebarAmount > 10) && <>
              <p className="block text-green-900 mb-2">最小梁寬檢核</p>
              <ul className="list-disc list-inside space-y-1">
                <li>{`主筋設計: ${Math.floor(designedRebarAmount) + 1} - ${designedRebarSpec}`}</li>
                <li>{`最小梁寬: ${minimumBeamWidth} cm >> ${minBeamWidthText}`}</li>
              </ul>
            </>}
          </div>}
        </MathJaxContext>
      </div>}
    </div>
  );
};

export default React.memo(MomentDesignResult);
