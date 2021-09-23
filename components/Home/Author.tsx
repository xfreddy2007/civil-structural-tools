import React from 'react';
import { css, cx } from '@emotion/css';
import { md, lg, xl } from '@/libs/utils/break-points';
import Image from 'next/image';
import profilePic from '@/assets/jpg/profile-pic.jpg';

const rootStyle = css`
  background-color: #059669;
  .profile-pic {
    width: 307.2px;
    height: 204.8px;
    img {
      opacity: 0;
      transition: opacity .5s;
      transform: translateX(-40px);
      &.is-image-loaded {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }
  ${md} {
    .profile-pic {
      width: 384px;
      height: 256px;
    }
  }
  ${lg} {
    .profile-pic {
      width: 480px;
      height: 320px;
    }
  }
  ${xl} {
    .profile-pic {
      width: 600px;
      height: 400px;
    }
  }
`;

const Author:React.FC = () => {
  return (
    <div className={cx('w-full text-white p-8 md:p-16 lg:p-24 xl:p-32 flex flex-col md:flex-row', rootStyle)}>
      <div className="flex flex-col w-full md:w-1/2 mb-4 md:mb-0">
        <h2 className="font-bold mb-4 md:mb-8 xl:mb-12">Author</h2>
        <h4 className="font-bold mb-1 md:mb-2 xl:mb-4">Freddy Liu</h4>
        <p className="my-4">現職 Positive Grid 前端工程師</p>
        <p className="flex flex-col space-y-2 xl:space-y-4">
          <span>土木工程 x 前端工程 x 資料科學</span>
          <span>一個愛玩且享受生活的男子</span>
        </p>
      </div>
      <div className="profile-pic relative">
        <Image
            layout="fill"
            src={profilePic}
            alt="profile-picture"
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
  );
};

export default React.memo(Author);
