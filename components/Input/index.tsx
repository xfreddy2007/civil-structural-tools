import React from 'react';
import { cx } from '@emotion/css';
import ErrorMessage from '../ErrorMessage';

type InputProps = React.HTMLAttributes<HTMLDivElement> & {
  id?: string;
  name: string;
  title: string;
  isRequired?: boolean;
  placeholder?: string;
  className?: string;
  error: any;
}

const Input:React.FC<InputProps> = ({
  id, name, title, isRequired = false, placeholder, className, error, onChange, ...rest
}) => {
  return (
    <div id={id} className={cx("flex flex-col text-left w-full my-2 justify-start", className)} {...rest}>
      <label className="flex items-center mr-4">
        {title}
        {isRequired && <span className="text-red-600 ml-1">*</span>}
      </label>
      <input type="text" name={name} className="form-input-style" placeholder={placeholder} onBlur={onChange}/>
      {Object.keys(error).findIndex(i => i === name) > -1 && <ErrorMessage name={name} error={error} />}
    </div>
  );
};

export default React.memo(Input);