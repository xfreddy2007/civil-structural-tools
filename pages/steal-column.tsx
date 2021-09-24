import React from 'react';
import Head from 'next/head';
import StealColumn from '@/components/StealColumn';


const StealColumnPage:React.FC = () => {
  return (
    <>
      <Head>
        <title key="title">鋼柱檢核/設計</title>
        <link rel="canonical" href="https://civil-structural-tools.herokuapp.com/steal-column"/>
        <meta property="og:title" content="鋼柱檢核/設計" />
        <meta property="og:url" content="https://civil-structural-tools.herokuapp.com/steal-column" />
        <meta property="og:image" content="/assets/png/homepage-smo.png" />
        <meta name="description" content="Steal beam check and design tools." />
      </Head>
      <StealColumn />
    </>
  );
};

export default React.memo(StealColumnPage);
