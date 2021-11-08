import React, { useState, useCallback, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import validate from 'validate.js';
import { momentConstraints } from './constraint';
import Input from '../Input';
import Select from '../Select';

const rootStyle = css``;

type SteelBeamFormDataProps = {
  '總長度'?: number,
  '最大未側撐長度'?: number,
  '設計彎矩'?: number,
};

const ASDDesign:React.FC = () => {
  const [steelBeamFormData, setSteelBeamFormData] = useState<SteelBeamFormDataProps>({});
  const [error, setError] = useState({});
  // const [result, setResult] = useState<null|shearResultProps>(null);

  const inputErrorObserver = useCallback((e: any) => {
    const error = validate({[e.target.name]: e.target.value}, momentConstraints) || {};
    setError(error[e.target.name]? {[e.target.name]: error[e.target.name]} : {});
  }, []);

  const handleSubmitform = useCallback((e: any) => {
    e.preventDefault();
    const data = {
      '總長度': +e.target['總長度'].value,
      '最大未側撐長度': +e.target['最大未側撐長度'].value,
      '設計彎矩': +e.target['設計彎矩'].value,
    };
    const errors = validate(data, momentConstraints);
    setError(errors || {});
    if (!errors) {
      setSteelBeamFormData(data);
    } else {
      setSteelBeamFormData({});
    }
  }, []);

  useEffect(() => console.log(steelBeamFormData), [steelBeamFormData]);
  return (
    <div className={cx('w-full block', rootStyle)}>
      <form className="flex flex-col space-y-4 w-full px-4 md:px-0 md:justify-center items-center mb-12" onSubmit={handleSubmitform}>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 w-full md:justify-center">
          <div className="w-full md:w-80 md:px-6">
            <h4 className="text-left">梁尺寸</h4>
            <Input
              id="總長度"
              name="總長度"
              title="梁總長度"
              isRequired
              placeholder="ex: 2 m"
              onChange={inputErrorObserver}
              error={error}
            />
            <Input
              id="最大未側撐長度"
              name="最大未側撐長度"
              title="最大未側撐長度 Lb"
              isRequired
              placeholder="ex: 50 cm"
              onChange={inputErrorObserver}
              error={error}
            />
          </div>
          <div className="w-full md:w-80 md:px-6">
            <h4 className="text-left">梁設計參數</h4>
            <Input
              id="設計彎矩"
              name="設計彎矩"
              title="設計彎矩"
              isRequired
              placeholder="ex: 20 tf-m"
              onChange={inputErrorObserver}
              error={error}
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <button type="submit" className="px-10 py-2 bg-green-900 text-white rounded-md hover:bg-green-700 cursor-pointer font-bold">設計</button>
          <input type="reset" className="px-10 py-2 bg-green-900 text-white rounded-md hover:bg-green-700 cursor-pointer font-bold" value="重設參數" onClick={() => setSteelBeamFormData({})} />
        </div>
      </form>
    </div>
  );
};

export default ASDDesign;
