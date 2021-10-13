import React from 'react';
import { css, cx } from '@emotion/css';
import { md, lg, xl } from '@/libs/utils/break-points';

const rootStyle = css``;

const ShearCapacityDesign:React.FC = () => {
  return (
    <div className={cx('', rootStyle)}>
      Capacity Design
    </div>
  );
};

export default React.memo(ShearCapacityDesign);