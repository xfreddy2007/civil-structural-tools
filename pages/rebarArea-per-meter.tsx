import React from 'react';
import Head from 'next/head';
import RebarAreaPerMeter from '@/components/RebarAreaPerMeter';


const RebarAreaPerMeterPage:React.FC = () => {
  return (
    <>
      <Head>
        <title key="title">單位長度配筋面積列表</title>
        <link rel="canonical" href="https://civil-structural-tools.herokuapp.com/rebarArea-per-meter"/>
        <meta property="og:title" content="單位長度配筋面積列表" />
        <meta property="og:url" content="https://civil-structural-tools.herokuapp.com/rebarArea-per-meter" />
        <meta property="og:image" content="/assets/png/homepage-smo.png" />
        <meta name="description" content="Rebar area per meter length table." />
      </Head>
      <RebarAreaPerMeter />
    </>
  );
};

export default React.memo(RebarAreaPerMeterPage);
