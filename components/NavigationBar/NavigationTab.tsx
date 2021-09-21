import React from 'react';
import { css, cx } from '@emotion/css';
import { md, xl } from '@/libs/utils/break-points';
import { pageListProps } from '@/libs/utils/pageList';

const rootStyle = css`
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4px;
    width: 100%;
    background: linear-gradient(0deg, #A7F3D0, #A7F3D0);
    transition: all 0.5s;
    transform-origin: center;
    transform: scale(0);
  }
  ${xl} {
    &:hover {
      &:after {
        transform: scale(1);
      }
    }
  }
`;

type NavigationTabProps = React.HTMLAttributes<HTMLButtonElement> & {
  text: string,
  subMenu?: pageListProps,
}
const NavigationTab: React.FC<NavigationTabProps> = ({
  text,
  subMenu,
  ...rest
}) => {
  return (
    <div className="border-b border-solid border-green-200 py-4 xl:border-0 xl:py-0">
      <button
        className={cx('cursor-pointer h-full relative', rootStyle)}
        {...rest}
      >
        <span
          className="uppercase font-bold whitespace-nowrap h-full px-8 text-base"
        >
          {text}
        </span>
      </button>
      {subMenu && <div className="flex flex-col xl:hidden">
        {subMenu.pages.map((menu) => {
          return (
            <a
              key={menu.page}
              href={menu.url}
              className="py-2 block pl-10"
            >
              {menu.page}
            </a>
          );
        })}
      </div>}
    </div>
  );
};

export default React.memo(NavigationTab);
