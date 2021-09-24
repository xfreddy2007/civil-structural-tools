import React from 'react';
import { css, cx } from '@emotion/css';
import { md, lg, xl } from '@/libs/utils/break-points';

const rootStyle = css``;

const StealColumn:React.FC = () => {
  return (
    <div className={cx('font-bold flex flex-col flex-1 justify-center items-center h-full pt-16 md:pt-20 xl:pt-24 text-center', rootStyle)}>
      <h2>鋼柱檢核/設計</h2>
      <h2>Comming Soon!</h2>
    </div>
  );
};

export default React.memo(StealColumn);
