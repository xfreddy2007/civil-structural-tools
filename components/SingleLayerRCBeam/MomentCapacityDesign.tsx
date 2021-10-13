import React from 'react';
import { css, cx } from '@emotion/css';
import { md, lg, xl } from '@/libs/utils/break-points';

const rootStyle = css``;

const MomentCapacityDesign:React.FC = () => {
  return (
    <div className={cx('', rootStyle)}>
      Moment Capacity Design
    </div>
  );
};

export default React.memo(MomentCapacityDesign);