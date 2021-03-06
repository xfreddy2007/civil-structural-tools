import React from 'react';
import { css, cx } from '@emotion/css';
import { md, lg, xl } from '@/libs/utils/break-points';
import Image from 'next/image';
import homeBannerFirst from '@/assets/jpg/home-banner-1.jpg';
import homeBannerSecond from '@/assets/jpg/home-banner-2.jpg';

const rootStyle = css`
  .home-banner-one {
    background-color: #064E38;
    clip-path: polygon(0% 0%, 95% 0%, 100% 50%, 95% 100%, 0% 100%);
    &__context {
      width: 205px;
      height: 115px;
      img {
        opacity: 0;
        transition: opacity .5s;
        &.is-image-loaded {
          opacity: 1;
        }
      }
    }
  }
  .home-banner-two {
    &__context {
      width: 205px;
      height: 136.54px;
      img {
        opacity: 0;
        transition: opacity .5s;
        &.is-image-loaded {
          opacity: 1;
        }
      }
    }
  }
  ${md} {
    .home-banner-one {
      clip-path: polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%);
      &__context {
        width: 256px;
        height: 144px;
      }
      &__content {
        max-width: 380px;
      }
    }
    .home-banner-two {
      &__context {
        width: 256px;
        height: 170.67px;
      }
      &__content {
        max-width: 380px;
      }
    }
  }
  ${lg} {
    .home-banner-one {
      &__context {
        width: 320px;
        height: 180px;
      }
      &__content {
        max-width: 480px;
      }
    }
    .home-banner-two {
      &__context {
        width: 320px;
        height: 213.34px;
      }
      &__content {
        max-width: 480px;
      }
    }
  }
  ${xl} {
    .home-banner-one {
      &__context {
        width: 400px;
        height: 225px;
      }
      &__content {
        max-width: unset;
      }
    }
    .home-banner-two {
      &__context {
        width: 400px;
        height: 266.67px;
      }
      &__content {
        max-width: unset;
      }
    }
  }
`;

const Main:React.FC = () => {
  return (
    <div className={cx('font-bold flex flex-col justify-center items-center h-full pt-16 md:pt-20 xl:pt-24 text-center', rootStyle)}>
      <h1 className="mb-2 md:mb-4 xl:mb-6 font-robot">Civil & Structural Tools</h1>
      <h2>????????????????????????</h2>
      <div className="home-banner-one flex space-x-4 w-full py-4 md:py-8 xl:py-12 pl-4 md:pl-8 lg:pl-16 xl:pl-48 mt-4 md:mt-8 xl:mt-12 text-white items-center">
        <div className="home-banner-one__context relative">
          <Image
            layout="fill"
            src={homeBannerFirst}
            alt="home-banner"
            onLoad={(e) => {
              // @ts-ignore
              if (e.target.srcset) {
                // @ts-ignore
                e.target.classList.add('is-image-loaded');
              }
            }}
          />
        </div>
        <p className="home-banner-one__content flex flex-col my-4 md:my-8 xl:my-12 text-left">
          <span>??????????????????????????????????????????????????????</span>
          <span>???????????????????????????????????????????????????</span>
          <span>?????????????????????????????????????????????</span>
          <span className="mt-3 md:mt-6 xl:mt-9">???????????????????????????????????????????????????????????????????????????????????????</span>
        </p>
      </div>
      <div className="home-banner-two flex space-x-4 w-full py-4 md:py-8 xl:py-12 my-4 md:my-8 xl:my-12 pr-4 md:pr-8 lg:pr-16 xl:pr-48 justify-end items-center">
        <p className="home-banner-two__content flex flex-col my-4 md:my-8 xl:my-12 text-left ml-4 md:ml-0">
          <span>?????????????????????????????????</span>
          <span>??????????????????????????????????????????</span>
          <span>?????????????????????Front-End, Back-End????????????????????????????????????</span>
        </p>
        <div className="home-banner-two__context relative">
          <Image
            layout="fill"
            src={homeBannerSecond}
            alt="home-banner"
            onLoad={(e) => {
              // @ts-ignore
              if (e.target.srcset) {
                // @ts-ignore
                e.target.classList.add('is-image-loaded');
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Main);
