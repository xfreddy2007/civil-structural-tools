import React from 'react';
import Head from 'next/head';
import ShearRCBeam from '@/components/ShearRCBeam';

const ShearRCBeamPage:React.FC = () => {
  return (
    <>
      <Head>
        <title key="title">梁剪力檢核/設計</title>
        <link rel="canonical" href="https://civil-structural-tools.herokuapp.com/shear-rc-beam"/>
        <meta property="og:title" content="梁剪力檢核/設計" />
        <meta property="og:url" content="https://civil-structural-tools.herokuapp.com/shear-rc-beam" />
        <meta property="og:image" content="/assets/png/homepage-smo.png" />
        <meta name="description" content="Shear check and design tools for RC beam." />
      </Head>
      <ShearRCBeam />
    </>
  );
};

export default React.memo(ShearRCBeamPage);
