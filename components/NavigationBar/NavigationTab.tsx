import React from 'react';
import { css, cx } from '@emotion/css';
import { md, xl } from '@/libs/utils/break-points';

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
  &[data-selected="true"]:after {
    transform: scale(1);
  }
  &:hover {
    &:after {
      transform: scale(1);
    }
  }
`;

type NavigationTabProps = React.HTMLAttributes<HTMLButtonElement> & {
  text: string,
  selected: boolean,
}
const NavigationTab: React.FC<NavigationTabProps> = ({
  text, selected, ...rest
}) => {
  return (
    <button
      className={cx('cursor-pointer h-full relative', rootStyle)}
      {...rest}
    >
      <span
        data-select={selected}
        className="uppercase font-bold whitespace-nowrap h-full px-8 text-base"
      >
        {text}
      </span>
    </button>
  );
};

export default React.memo(NavigationTab);
