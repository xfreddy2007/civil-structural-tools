import React from 'react';
import { cx } from '@emotion/css';

type SelectProps = React.HTMLAttributes<HTMLDivElement> & {
  id: string;
  name: string;
  options: string[];
  title: string;
  isRequired?: boolean,
  className?: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const Select:React.FC<SelectProps> = ({
  id,
  name,
  options,
  title,
  isRequired = false,
  className,
  onChange,
  ...rest
}) => {
  return (
    <div id={id} className={cx("flex flex-col text-left w-full my-2 justify-start", className)} {...rest}>
      <label className="flex items-center mr-4">
        {title}
        {isRequired && <span className="text-red-600 ml-1">*</span>}
      </label>
      <select className="form-select-style mb-2" onChange={onChange}>
        {options.map((opt) => {
          return <option key={opt} value={opt}>{opt}</option>
        })}
      </select>
    </div>
  );
};

export default React.memo(Select);
