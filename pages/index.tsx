import Head from 'next/head'
import Image from 'next/image'
import { css, cx } from '@emotion/css';
import Main from '@/components/Home/Main';

const rootStyle = css`
  font-size: 48px;
`;

export default function Home() {

  return (
    <div className="flex-1">
      <Head>
        <title>Civil Structural Calculation Tools</title>
        <meta name="description" content="Tools for Civil Engineers who need calculation for designs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main />
    </div>
  )
}
