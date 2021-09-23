import React from "react";

const lazyloadCallback= (ref:React.MutableRefObject<any>):void => {
  ref.current.classList.add('is-image-loaded')
};

export default lazyloadCallback;