import React, { useRef, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import PureImage from '../PureImage/PureImage';
import Image from 'next/image';
import homeBannerFist from '@/assets/jpg/home-banner-1.jpg';

const rootStyle = css`
  .is-image-loaded {
    opacity: 1;
  }
  .context-one {
    width: 400px;
    height: 225px;
    img {
      opacity: 0;
      transition: opacity .5s;
      transform: translateX(-20px);
      &.is-image-loaded {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }
`;

const Main:React.FC = () => {
  // image ref
  const homeBannerFirstRef = useRef(null);

  return (
    <div className={cx('font-bold flex flex-col justify-center items-center h-full pt-16 md:pt-20 xl:pt-24 text-center', rootStyle)}>
      <h1 className="mb-2 md:mb-4 xl:mb-6">Civil & Structural Tools</h1>
      <h2>土木結構計算工具</h2>
      <div className="flex space-x-4 my-4 md:my-8 xl:my-12">
        {/* <PureImage
          src="/assets/jpg/home-banner-1.jpg"
        /> */}
        {/* <img src="/assets/jpg/home-banner-1.jpg" /> */}
        <div className="context-one relative" ref={homeBannerFirstRef}>
          <Image
            layout="fill"
            src={homeBannerFist}
            alt="home-banner"
            onLoad={(e) => {
              // @ts-ignore
              e.target.src.indexOf('data:image/gif;base64') < 0 && e.target.classList.add('is-image-loaded');
            }}
          />
        </div>

        <p className="flex flex-col my-4 md:my-8 xl:my-12 text-left">
          <span>在做結構設計上常有不知道的計算方式？</span>
          <span>常常怕自己使用到不熟悉的計算表格？</span>
          <span>規範好多沒辦法記得所有的公式？</span>
          <span className="my-3 md:my-6 xl:my-9">這邊收藏了許多設計上常用的小工具，能解決你做結構設計的痛苦</span>
        </p>
      </div>

    </div>
  );
};

export default React.memo(Main);
