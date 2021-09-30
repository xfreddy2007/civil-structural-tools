import Head from 'next/head';
import Main from '@/components/Home/Main';
import Author from '@/components/Home/Author';

import { findRebarProperty } from '@/libs/utils/rebar';
import { getMinimumBeamWidth } from '@/libs/utils/concrete';

export default function Home() {
  return (
    <div className="flex-1">
      <Head>
        <title key="title">Civil Structural Calculation Tools</title>
        <link rel="canonical" href="https://civil-structural-tools.herokuapp.com/"/>
        <meta property="og:title" content="Civil Structural Calculation Tools" />
        <meta property="og:url" content="https://civil-structural-tools.herokuapp.com/" />
        <meta property="og:image" content="/assets/png/homepage-smo.png" />
        <meta name="description" content="Tools for Civil Engineers who need calculation for designs" />
      </Head>
      <Main />
      <Author />
    </div>
  )
}
