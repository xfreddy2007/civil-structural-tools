import React from 'react';
import { css, cx } from '@emotion/css';

type ResultSectionProps = {
  neuturalDepth?: number,
  alpha?: number,
  et?: number,
  neuturalMoment?: number,
  designMoment?: number,
};

const ResultSection:React.FC<ResultSectionProps> = ({
  neuturalDepth,
  alpha,
  et,
  neuturalMoment,
  designMoment,
}) => {
  return (
    <div>
      Result
    </div>
  );
};

export default React.memo(ResultSection);
