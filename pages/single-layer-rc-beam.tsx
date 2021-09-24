import React from 'react';
import Head from 'next/head';
import SingleLayerRCBeam from '@/components/SingleLayerRCBeam';

const SingleLayerRCBeamPage:React.FC = () => {
  return (
    <>
      <Head>
        <title key="title">單筋梁檢核/設計</title>
        <link rel="canonical" href="https://civil-structural-tools.herokuapp.com/single-layer-rc-beam"/>
        <meta property="og:title" content="單筋梁檢核/設計" />
        <meta property="og:url" content="https://civil-structural-tools.herokuapp.com/single-layer-rc-beam" />
        <meta property="og:image" content="/assets/png/homepage-smo.png" />
        <meta name="description" content="Single layer RC beam check and design tools." />
      </Head>
      <SingleLayerRCBeam />
    </>
  );
};

export default React.memo(SingleLayerRCBeamPage);
