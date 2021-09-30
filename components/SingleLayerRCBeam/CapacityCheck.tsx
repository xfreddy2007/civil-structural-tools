import React from 'react';
import { css, cx } from '@emotion/css';
import { md, lg, xl } from '@/libs/utils/break-points';

const rootStyle = css``;

const CapacityCheck:React.FC = () => {
  return (
    <div className={cx('', rootStyle)}>
      Capacity Check
    </div>
  );
};

export default React.memo(CapacityCheck);