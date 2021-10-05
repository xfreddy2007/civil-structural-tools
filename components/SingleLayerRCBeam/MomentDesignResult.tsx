import React from 'react';
import { css, cx } from '@emotion/css';

type MomentDesignResultProps = {
  neuturalDepth?: number,
  alpha?: number,
  et?: number,
  neuturalMoment?: number,
  designMoment?: number,
};

const MomentDesignResult:React.FC<MomentDesignResultProps> = ({
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

export default React.memo(MomentDesignResult);
