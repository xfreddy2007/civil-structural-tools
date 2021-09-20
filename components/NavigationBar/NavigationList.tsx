import React from 'react';
import { css, cx } from '@emotion/css';
import { md, xl } from '@/libs/utils/break-points';
import { pageListProps } from '@/libs/utils/pageList';

type NavigationListProps = {
  subMenu: pageListProps,
  className: string,
};

const rootStyle = css`

`;

const NavigationList:React.FC<NavigationListProps> = ({ subMenu, className }) => {
  return (
    <div className={cx('bg-green-700 text-base text-white flex flex-col', className, rootStyle)}>
      {subMenu.pages.map((menu) => {
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
  );
}
export default React.memo(NavigationList);
