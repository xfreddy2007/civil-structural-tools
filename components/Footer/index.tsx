import React, { useState, useEffect ,useRef } from 'react';
import { css, cx } from '@emotion/css';
import { md, xl } from '@/libs/utils/break-points';
import { ReactComponent as FBIcon } from '@/assets/svg/facebook-icon.svg';

const Footer:React.FC = () => {
  return (
    <footer className="bg-green-900">
      Footer
      <div>
        <FBIcon />
      </div>
      
    </footer>
  );
};

export default React.memo(Footer);
