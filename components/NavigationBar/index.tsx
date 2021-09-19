import React from 'react';
import { css, cx } from '@emotion/css';
import { md, xl } from '@/libs/utils/break-points';
import NavigationTab from './NavigationTab';

const rootStyle = css`
  height: 40px;
  .nav-icon {
    font-family: 'Noto Sans', sans-serif;
  }
  ${md} {
    height: 50px;
  }

`;

const NavigationBar: React.FC = () => {
  return (
    <nav className={cx('w-full bg-green-900 flex text-green-200', rootStyle)}>
      <div className="nav-icon font-bold flex items-center px-4">{"Freddy's Civil & Structural Tools"}</div>
      <NavigationTab
        text="RC"
        selected={true}
      />
      <NavigationTab
        text="鋼結構設計"
        selected={false}
      />
      <NavigationTab
        text="地震力設計"
        selected={false}
      />
    </nav>
  );
};

export default React.memo(NavigationBar);
