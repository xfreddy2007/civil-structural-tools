import React from 'react';
import Head from 'next/head';
import SeismicForce from '@/components/SeismicForce';


const SeismicForcePage:React.FC = () => {
  return (
    <>
      <Head>
        <title key="title">地震力計算</title>
        <link rel="canonical" href="https://civil-structural-tools.herokuapp.com/steal-column"/>
        <meta property="og:title" content="地震力計算" />
        <meta property="og:url" content="https://civil-structural-tools.herokuapp.com/steal-column" />
        <meta property="og:image" content="/assets/png/homepage-smo.png" />
        <meta name="description" content="Seismic force calculation tools." />
      </Head>
      <SeismicForce />
    </>
  );
};

export default React.memo(SeismicForcePage);
