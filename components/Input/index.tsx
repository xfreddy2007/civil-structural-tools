import React from 'react';
import { css, cx } from '@emotion/css';

type InputProps = React.HTMLAttributes<HTMLLabelElement> & {
  id?: string;
  name: string;
  title: string;
  placeholder?: string;
  className?: string;
}

const Input:React.FC<InputProps> = ({
  id, name, title, placeholder, className, ...rest
}) => {
  return (
    <label id={id} className={cx("flex flex-col md:flex-row text-left w-full my-2", className)} {...rest}>
      <span className="flex items-center mr-4 flex-1">{title}</span>
      <input type="text" name={name} className="form-input-style" placeholder={placeholder} />
    </label>
  );
};

export default React.memo(Input);