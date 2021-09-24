import React from 'react';
import { css, cx } from '@emotion/css';
import { md, lg, xl } from '@/libs/utils/break-points';
import Head from 'next/head';

const rootStyle = css``;

const SingleLayerRCBeam:React.FC = () => {
  return (
    <div className={cx('font-bold flex flex-col flex-1 justify-center items-center h-full pt-16 md:pt-20 xl:pt-24 text-center', rootStyle)}>
      <h2>單筋梁檢核/設計</h2>
    </div>
  );
};

export default React.memo(SingleLayerRCBeam);
