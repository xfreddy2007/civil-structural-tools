import React from 'react';
import Head from 'next/head';
import StealBeam from '@/components/StealBeam';


const StealBeamPage:React.FC = () => {
  return (
    <>
      <Head>
        <title key="title">小梁檢核/設計</title>
        <link rel="canonical" href="https://civil-structural-tools.herokuapp.com/steal-beam"/>
        <meta property="og:title" content="小梁檢核/設計" />
        <meta property="og:url" content="https://civil-structural-tools.herokuapp.com/steal-beam" />
        <meta property="og:image" content="/assets/png/homepage-smo.png" />
        <meta name="description" content="Steal beam check and design tools." />
      </Head>
      <StealBeam />
    </>
  );
};

export default React.memo(StealBeamPage);
