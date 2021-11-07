import React, { useState } from 'react';
import { css, cx } from '@emotion/css';
import MenuTab from '../MenuTab';
import ASDDesign from './ASDDesign';
import LRFDDesign from './LRFDDesign';


const rootStyle = css``;

const StealBeam:React.FC = () => {
  const [tab, setTab] = useState(1);

  let pageContent;
  switch (tab) {
    case 2:
      pageContent = <LRFDDesign />
      break;
    case 1:
    default:
      pageContent = <ASDDesign />;
      break;
  }
  return (
    <div className={cx('font-bold flex flex-col flex-1 justify-center items-center h-full pt-16 md:pt-20 xl:pt-24 text-center', rootStyle)}>
      <h2>小梁檢核/設計</h2>
      <div className="w-full h-12 md:h-16 my-4 md:my-8 xl:my-12">
        <MenuTab 
          text="ASD"
          selected={tab === 1}
          onClick={() => setTab(1)}
          id="steel-beam-menu-asd-design"
        />
        <MenuTab 
          text="LRFD"
          selected={tab === 2}
          onClick={() => setTab(2)}
          id="steel-beam-menu-lrfd-design"
        />
      </div>
      {pageContent}
    </div>
  );
};

export default StealBeam;
