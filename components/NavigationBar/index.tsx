import React, { useState } from 'react';
import { css, cx } from '@emotion/css';
import { md } from '@/libs/utils/break-points';
import NavigationTab from './NavigationTab';
import NavigationList from './NavigationList';
import pageList from '@/libs/utils/pageList';

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
  const [tab, setTab] = useState(0);

  return (
    <header className="w-full fixed top-0 left-0 z-50" onMouseLeave={() => setTab(0)}>
      <nav className={cx('w-full bg-green-900 flex text-white', rootStyle)}>
        <div className="nav-icon font-bold flex items-center px-4">{"Freddy's Civil & Structural Tools"}</div>
        <NavigationTab
          text="RC"
          onClick={() => setTab(1)}
          onMouseOver={() => setTab(1)}
        />
        <NavigationTab
          text="鋼結構設計"
          onClick={() => setTab(2)}
          onMouseOver={() => setTab(2)}
        />
        <NavigationTab
          text="地震力設計"
          onClick={() => setTab(1)}
          onMouseOver={() => setTab(1)}
        />
      </nav>
      <NavigationList subMenu={tab > 0 ? pageList[tab - 1] : pageList[0]} className={tab === 0 ? 'hidden' : 'block'}/>
    </header>
  );
};

export default React.memo(NavigationBar);
