import React from 'react';
import { css, cx } from '@emotion/css';
import { md, xl } from '@/libs/utils/break-points';
import { findRebarProperty, rebarSpec } from '@/libs/utils/rebar';
import { getConcreteProperty } from '@/libs/utils/concrete';
import { MathJaxContext } from "better-react-mathjax";
import LatexText from '../LatexText';

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
  maximunVu?: number,
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
  maximunVu,
  requiredShear,
}) => {
  // @ts-ignore
  const as = (mainRebarNum || 0) * (findRebarProperty(mainRebarSpec)?.area || 0);
  // @ts-ignore
  const avStirrup = 2 * (findRebarProperty(stirrupSpec)?.area || 0);
  // @ts-ignore
  const avTies = (tiesNum || 0) * (findRebarProperty(tiesSpec)?.area || 0);

  let VcTitle:string;
  let VcFormula1:string;
  let VcFormula1_1:string = '';
  let VcFormula2:string;
  let VcFormula2_0:string = '';
  let VcFormula2_1:string;
  let VcFormula2_2:string = '';
  if (avMin && avMin > (avStirrup + avTies)) {
    VcTitle = 'Av < Av,min :';
    VcFormula1 = `Vc = (2.12 \\lambda_s \\sqrt[3]{\\rho_w} \\lambda \\sqrt{f'_c} + \\frac{N_u}{6A_g})bwd tf`;
    VcFormula2 = `= (2.12 \\times ${lambdaS} \\times \\sqrt[3]{${rhoW}} \\times ${getConcreteProperty(Number(concreteStrength)).lambda} \\times \\sqrt{${concreteStrength}}`;
    VcFormula2_1 = `+ \\frac{${normalForce} \\times 1000}{6 \\times ${width! * depth!}}) \\times ${width} \\times ${effectiveDepth} / 1000`;
  } else {
    VcTitle = 'Av \\geqq Av,min :';
    VcFormula1 = `Vc = (0.53 \\lambda \\sqrt{f'_c} + \\frac{N_u}{6A_g})bwd`;
    VcFormula1_1 = `(2.12 \\sqrt[3]{\\rho_w} \\lambda \\sqrt{f'_c} + \\frac{N_u}{6A_g})bwd`
    VcFormula2 = `= min((0.53\\times${getConcreteProperty(Number(concreteStrength)).lambda}\\times\\sqrt{${concreteStrength}}`;
    VcFormula2_0 = `+ \\frac{${normalForce}\\times1000}{6\\times${width! * depth!}})\\times${width}\\times${effectiveDepth},`
    VcFormula2_1 = `(2.12\\times\\sqrt[3]{${rhoW}}\\times${getConcreteProperty(Number(concreteStrength)).lambda}\\times\\sqrt{${concreteStrength}}`;
    VcFormula2_2 = `+ \\frac{${normalForce}\\times1000}{6\\times${width! * depth!}})\\times${width}\\times${effectiveDepth}) / 1000`;
  }

  let resultText:string;
  let resultText_1:string;
  if (designShear && maximunVu && designShear > maximunVu) {
    resultText = `V_u > 5\\phiV_c,`;
    resultText_1 = '?????????????????????';
  } else if (requiredShear && designShear && requiredShear < designShear) {
    resultText = `\\phi V_n < V_u = ${designShear} tf,`;
    resultText_1 = '???????????????????????????????????????????????????????????????????????????';
  } else {
    resultText = `\\phi V_n \\geqq V_u = ${designShear} tf,`;
    resultText_1 = '??????????????????OK???';
  }

  return (
    <div className={cx('block text-left p-4 md:p-8 xl:p-12 rounded-2xl overflow-hidden', rootStyle)}>
      <div className="mb-6">
        <h5 className="mb-2">????????????</h5>
        <p>??????[??????401-110] ??????????????????????????? ??????</p>
      </div>
      <div className="mb-6">
        <h5 className="mb-2">????????????</h5>
        <ul className="list-disc list-inside space-y-1">
          <li>{`?????????28???????????????f'c: ${concreteStrength} kgf/cm^2`}</li>
          <li>{`??????????????????fyt: ${rebarStrength} kgf/cm^2`}</li>
          <li>??????????????????: 2,040,000 kgf/cm^2</li>
          <li>????????????????????????: 0.003</li>
        </ul>
      </div>
      <div className="mb-6">
        <h5 className="mb-2">??????????????????</h5>
        <ul className="list-disc list-inside space-y-1">
          <li>{`?????? b: ${width} cm`}</li>
          <li>{`????????? h: ${depth} cm`}</li>
          <li>{`???????????? d: ${effectiveDepth} cm`}</li>
          <li>{`????????????: ${mainRebarSpec}`}</li>
          <li>{`????????????: ${mainRebarNum}`}</li>
          <li>{`????????????: ${stirrupSpec}`}</li>
          <li>{`????????????: ${spacing} cm`}</li>
          <li>{`????????????: ${tiesSpec}`}</li>
          <li>{`????????????: ${tiesNum}`}</li>
          <li>{`????????????: ${designShear} tf`}</li>
          <li>{`????????????: ${normalForce} tf`}</li>
        </ul>
      </div>
      <div>
        <MathJaxContext>
          <h5 className="block mb-2">????????????</h5>
          <p className="block text-green-900 mb-2">????????????</p>
          <ol className="list-inside block space-y-1">
            <li className="latex-li">
              <LatexText textType="text">??????????????????????????????</LatexText>
              <LatexText textType="formula">{"Av,min = \\frac{3.5 \\times bw \\times s}{f_y}"}</LatexText>
              <LatexText textType="text">???</LatexText>
              <LatexText textType="formula">{"\\frac{0.2 \\times \\sqrt{f'_c} \\times bw \\times s}{f_y}"}</LatexText>
              <LatexText textType="text">???????????????</LatexText>
              <LatexText textType="formula">{`= Max(\\frac{3.5 \\times ${width} \\times ${spacing}}{${rebarStrength}}, \\frac{0.2 \\times \\sqrt{${concreteStrength}} \\times ${width} \\times ${spacing}}{${rebarStrength}})`}</LatexText>
              <LatexText textType="formula">{`= ${avMin}`}</LatexText>
              <LatexText textType="formula">{'cm^{2}'}</LatexText>
            </li>
            <li className="latex-li">
              <LatexText textType="text">??????????????????????????????</LatexText>
              <LatexText textType="formula">{"\\lambda_s = \\sqrt{\\frac{2}{1 + \\frac{d}{25}}}"}</LatexText>
              <LatexText textType="formula">{`= \\sqrt{\\frac{2}{1 + \\frac{${effectiveDepth}}{25}}}`}</LatexText>
              <LatexText textType="formula">{`= ${lambdaS}`}</LatexText>
            </li>
            <li className="latex-li">
              <LatexText textType="text">?????????????????????????????????</LatexText>
              <LatexText textType="formula">{"\\rho_w = \\frac{A_s}{b_w \\times d}"}</LatexText>
              <LatexText textType="formula">{`= \\frac{${as}}{${width} \\times ${effectiveDepth}}`}</LatexText>
              <LatexText textType="formula">{`= ${rhoW}`}</LatexText>
            </li>
            <li className="flex flex-col">
              <span>???????????????????????????????????????</span>
              <span className="ml-2 xl:ml-4 latex-li">
                <LatexText textType="text">???????????????</LatexText>
                <LatexText textType="formula">{`Av = 2 \\times ${avStirrup / 2} + ${tiesNum} \\times ${findRebarProperty(tiesSpec!)!.area || 0}`}</LatexText>
                <LatexText textType="formula">{`= ${avStirrup + avTies}`}</LatexText>
                <LatexText textType="formula">{'cm^{2}'}</LatexText>
              </span>
              <span className="ml-2 xl:ml-4"><LatexText textType="formula">{VcTitle}</LatexText></span>
              <span className="ml-2 xl:ml-4 latex-li">
                <LatexText textType="text">?????????????????????</LatexText>
                <LatexText textType="formula">{VcFormula1}</LatexText>
                {VcFormula1_1 && <LatexText textType="text">???</LatexText>}
                <LatexText textType="formula">{VcFormula1_1}</LatexText>
                {VcFormula1_1 && <LatexText textType="text">?????????</LatexText>}
                <LatexText textType="formula">{VcFormula2}</LatexText>
                {VcFormula2_0 && <LatexText textType="formula">{VcFormula2_0}</LatexText>}
                <LatexText textType="formula">{VcFormula2_1}</LatexText>
                {VcFormula2_2 && <LatexText textType="formula">{VcFormula2_2}</LatexText>}
                <LatexText textType="formula">{`= ${concreteShear}`}</LatexText>
                <LatexText textType="formula">{'tf'}</LatexText>
              </span>
              <span>????????????????????????????????????</span>
              <span className="ml-2 xl:ml-4 latex-li">
                <LatexText textType="text">??????????????????</LatexText>
                <LatexText textType="formula">{'Vs = \\frac{A_v \\times f_yt \\times d}{s}'}</LatexText>
                <LatexText textType="formula">{`= \\frac{${avStirrup + avTies} \\times ${rebarStrength} \\times ${effectiveDepth}}{${spacing}} / 1000`}</LatexText>
                <LatexText textType="formula">{`= ${rebarShear}`}</LatexText>
                <LatexText textType="text">{'tf'}</LatexText>
              </span>
            </li>
            <li className="latex-li">
              <LatexText textType="text">????????????</LatexText>
              <LatexText textType="formula">{'\\phi: 0.75'}</LatexText>
            </li>
            <li className="latex-li">
              <LatexText textType="text">?????????????????????</LatexText>
              <LatexText textType="formula">{'\\phi V_n = \\phi \\times (V_n + V_s)'}</LatexText>
              <LatexText textType="formula">{`= 0.75 \\times (${concreteShear} + ${rebarShear})`}</LatexText>
              <LatexText textType="formula">{`= 0.75 \\times ${nominalShear}`}</LatexText>
              <LatexText textType="formula">{`= ${requiredShear}`}</LatexText>
              <LatexText textType="formula">{'tf'}</LatexText>
            </li>
          </ol>
          <p className="latex-li">
            <LatexText textType="formula">{resultText}</LatexText>
            <LatexText textType="text">{resultText_1}</LatexText>
          </p>
        </MathJaxContext>
      </div>
    </div>
  );
};

export default React.memo(ShearCheckResult);
