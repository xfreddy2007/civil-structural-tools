import React from 'react';
import { css, cx } from '@emotion/css';

type ErrorMessageProps = {
  name: string;
  error: any;
};

const rootStyle = css`
  .has-error {
    color: #E02020;
  }
`;

const ErrorMessage:React.FC<ErrorMessageProps> = ({ name, error }) => {
  return (
    <p className={cx('flex flex-col mt-2', rootStyle)}>
      {error[name].map((i:string) => {
        return <span key={i} className="has-error">{i}</span>
      })}
    </p>
  );
};

export default React.memo(ErrorMessage);
