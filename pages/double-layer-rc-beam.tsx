import React from 'react';
import Head from 'next/head';
import DoubleLayerRCBeam from '@/components/DoubleLayerRCBeam';

const DoubleLayerRCBeamPage:React.FC = () => {
  return (
    <>
      <Head>
        <title key="title">雙筋梁檢核/設計</title>
        <link rel="canonical" href="https://civil-structural-tools.herokuapp.com/double-layer-rc-beam"/>
        <meta property="og:title" content="雙筋梁檢核/設計" />
        <meta property="og:url" content="https://civil-structural-tools.herokuapp.com/double-layer-rc-beam" />
        <meta property="og:image" content="/assets/png/homepage-smo.png" />
        <meta name="description" content="Double layer RC beam check and design tools." />
      </Head>
      <DoubleLayerRCBeam />
    </>
  );
};

export default React.memo(DoubleLayerRCBeamPage);
