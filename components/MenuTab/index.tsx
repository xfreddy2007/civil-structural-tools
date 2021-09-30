import React from 'react';
import { css, cx } from '@emotion/css';
import { md, lg, xl } from '@/libs/utils/break-points';

type MenuTabProps = React.HTMLAttributes<HTMLButtonElement> & {
  text: string;
  selected: boolean;
}

const style = css`
  font-size: 1rem;
  line-height: 3rem;
  margin: 0 1.875rem;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 0.25rem;
    width: 100%;
    background: linear-gradient(0deg, #A7F3D0, #A7F3D0);
    transition: all 0.5s;
    transform-origin: center;
    transform: scale(0);
  }
  &[data-selected="true"]:after {
    transform: scale(1);
  }
  ${md} {
    line-height: 4rem;
  }
  ${xl} {
    &:hover {
      &:after {
        transform: scale(1);
      }
    }
  }
`;

const MenuTab:React.FC<MenuTabProps> = ({
  text, selected, ...rest
}) => {
  return (
    <button className="cursor-pointer h-full" {...rest}>
      <span data-selected={selected} className={cx('block uppercase font-bold relative whitespace-nowrap h-full md:px-9', style)}>
        {text}
      </span>
    </button>
  );
};

export default React.memo(MenuTab);
