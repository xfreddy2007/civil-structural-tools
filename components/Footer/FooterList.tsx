import React from 'react';
import { css, cx } from '@emotion/css';
import footerList, { pageProps } from '@/libs/utils/footer-list';

const rootStyle = css``;

type listProps = {
  title: string,
  tabs: pageProps[],
}

const List:React.FC<listProps> = ({
  title,
  tabs,
}) => {
  return (
    <div className="footer-list py-4 px-4 md:px-8">
      <p className="font-bold block py-4">{title}</p>
      <div className="flex flex-col text-base">
        {tabs.map((tab) => {
          return (
            <a
              key={tab.page}
              href={tab.url}
              target={tab.url.includes('http') ? '_blank' : '_self'}
              rel="noreferrer"
              className="py-1"
            >
              {tab.page}
            </a>
          );
        })}
      </div>
    </div>
  );
};

const FooterList:React.FC = () => {
  return (
    <div className={cx('flex flex-1 px-2 md:px-4 xl:px-8', rootStyle)}>
      {footerList.map((list) => {
        return <List key={list.title} {...list}/>
      })}
    </div>
  );
}

export default React.memo(FooterList);
