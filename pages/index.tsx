import Head from 'next/head'
import Image from 'next/image'
import { css, cx } from '@emotion/css';
import { findRebarProperty, getRebarAreaPerMeter } from '@/libs/utils/rebar';

const rootStyle = css`
  font-size: 48px;
`;

export default function Home() {
  // console.log(findRebarProperty('#50'));
  // console.log(getRebarAreaPerMeter('#8', '15'));

  return (
    <div className="flex-1">
      <Head>
        <title>Civil Structural Calculation Tools</title>
        <meta name="description" content="Tools for Civil Engineers who need calculation for designs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={cx('font-bold flex flex-col justify-center items-center h-full pt-32 text-center', rootStyle)}>
        <h1>civil structural tools</h1>
        <h2>土木結構計算工具</h2>
      </div>
    </div>
  )
}
