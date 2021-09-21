import React, { useState } from 'react';
import { css, cx } from '@emotion/css';
import { md, xl } from '@/libs/utils/break-points';
import pageList, { pageListProps } from '@/libs/utils/pageList';
import NavigationTab from './NavigationTab';
import { set } from 'lodash';

type NavigationListProps = React.HTMLAttributes<HTMLDivElement> & {
  desktopClassName?: string,
  mobileClassName?: string,
  tab: number,
  setTab: (state:number) => void,
  open: number,
  setOpen: (state:number) => void,
};

const rootStyle = css`

`;

const NavigationList:React.FC<NavigationListProps> = ({
  desktopClassName,
  mobileClassName,
  tab,
  setTab,
  open,
  setOpen,
  ...rest
}) => {
  // handle subMenu open state
  const subMenuOpenHandler = (state:number) => {
    setTab(state);
    if (state === open) {
      setTab(0);
      setOpen(0);
    } else {
      setOpen(state);
    }
  };
  return (
    <div className={rootStyle}>
      <div
        id="desktop-submenu"
        className={cx('bg-green-700 text-base text-white flex-col', 'desktop-sub-menu', desktopClassName)}
        {...rest}
      >
        {tab > 0 && pageList[tab - 1].pages.map((menu) => {
          return (
            <a
              key={menu.page}
              href={menu.url}
              className="py-2 text-center"
            >
              {menu.page}
            </a>
          );
        })}
      </div>
      <div
        id="mobile-submenu"
        className={cx('bg-green-700 text-base text-white flex-col px-4', 'mobile-sub-menu', mobileClassName)}
      >
        <NavigationTab
          text="RC"
          onClick={() => subMenuOpenHandler(1)}
          subMenu={tab === 1 ? pageList[tab - 1] : undefined}
        />
        <NavigationTab
          text="鋼結構設計"
          onClick={() => subMenuOpenHandler(2)}
          subMenu={tab === 2 ? pageList[tab - 1] : undefined}
        />
        <NavigationTab
          text="地震力設計"
          onClick={() => subMenuOpenHandler(3)}
          subMenu={tab === 3 ? pageList[tab - 1] : undefined}
        />
      </div>
    </div>
  );
}
export default React.memo(NavigationList);
