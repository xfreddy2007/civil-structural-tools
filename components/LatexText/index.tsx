import React from 'react';
import { cx } from '@emotion/css';
import { MathJax } from "better-react-mathjax";

type LatexTextProps = {
  textType: 'text' | 'formula';
  className?: string;
  children: string;
}

const LatexText:React.FC<LatexTextProps> = ({ textType, className, children }) => {
  let content;
  if (textType === 'text') {
    content = children;
  } else {
    content = <MathJax>\({children}\)</MathJax>;
  }
  return (
    <span className={cx('h-6 md:h-7 xl:h-8' , textType === 'text' ? 'latex-text' : 'latex-formula', className)}>
      {content}
    </span>
  );
};

export default React.memo(LatexText);
