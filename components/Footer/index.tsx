import React from 'react';
import { css, cx } from '@emotion/css';
import { md, xl } from '@/libs/utils/break-points';
import FooterList from './FooterList';
import { ReactComponent as FBIcon } from '@/assets/svg/facebook-icon.svg';
import { ReactComponent as IGIcon } from '@/assets/svg/instagram-icon.svg';
import { ReactComponent as GithubIcon } from '@/assets/svg/github-icon.svg';
import { ReactComponent as LinkedInIcon } from '@/assets/svg/linkedin-icon.svg';
import { ReactComponent as MailIcon } from '@/assets/svg/mail-icon.svg';

const rootStyle = css`
  .icon {
    width: 30px;
    height: 30px;
  }
  .icon svg {
    width: 100%;
    height: 100%;
  }
  .contact-info {
    width: 300px;
  }
`;

const Footer:React.FC = () => {
  return (
    <footer className={cx('bg-green-900 text-white text-base w-full flex items-center flex-col md:flex-row', rootStyle)}>
      <FooterList />
      <div className="contact-info md:mr-8">
        <div className="flex justify-center space-x-4 py-8">
          <a href="https://www.facebook.com/xfreddy2007"><div className="icon"><FBIcon /></div></a>
          <a href="https://www.instagram.com/xfreddy2007"><div className="icon"><IGIcon /></div></a>
          <a href="https://github.com/xfreddy2007"><div className="icon"><GithubIcon /></div></a>
          <a href="https://www.linkedin.com/in/hsuan-fu-liu-515525156/"><div className="icon"><LinkedInIcon /></div></a>
          <a href="mailto:xfreddy2007@gmail.com"><div className="icon"><MailIcon /></div></a>
        </div>
        <p className="flex flex-col justify-center pb-4">
          <span className="text-center">© 2021 - Developed by Freddy Liu.</span>
          <span className="text-center">All Rights Reserved.</span>
        </p>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
