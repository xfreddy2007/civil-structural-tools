import React, { useState } from 'react';
import { css, cx } from '@emotion/css';
import MenuTab from '../MenuTab';
import MomentCapacityCheck from './MomentCapacityCheck';
import ShearCapacityCheck from './ShearCapacityCheck';
import CapacityDesign from './CapacityDesign';

const rootStyle = css``;

const SingleLayerRCBeam:React.FC = () => {
  const [tab, setTab] = useState(1);

  let pageContent;
  switch (tab) {
    case 2:
      pageContent = <ShearCapacityCheck />
      break;
    case 3:
      pageContent = <CapacityDesign />
      break;
    case 1:
    default:
      pageContent = <MomentCapacityCheck />;
      break;
  }
  return (
    <div className={cx('font-bold flex flex-col flex-1 justify-center items-center h-full pt-16 md:pt-20 xl:pt-24 text-center', rootStyle)}>
      <h2>單筋梁檢核/設計</h2>
      <div className="w-full h-12 md:h-16 my-4 md:my-8 xl:my-12">
        <MenuTab 
          text="彎矩檢核"
          selected={tab === 1}
          onClick={() => setTab(1)}
          id="single-rc-beam-menu-moment-capacity-check"
        />
        <MenuTab 
          text="剪力檢核"
          selected={tab === 2}
          onClick={() => setTab(2)}
          id="single-rc-beam-menu-shear-capacity-check"
        />
        <MenuTab 
          text="設計"
          selected={tab === 3}
          onClick={() => setTab(3)}
          id="single-rc-beam-menu-capacity-design"
        />
      </div>
      {pageContent}
    </div>
  );
};

export default React.memo(SingleLayerRCBeam);
