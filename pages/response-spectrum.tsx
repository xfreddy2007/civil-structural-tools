import React from 'react';
import Head from 'next/head';
import ResponseSpectrum from '@/components/ResponseSpectrum';


const ResponseSpectrumPage:React.FC = () => {
  return (
    <>
      <Head>
        <title key="title">反應譜生成</title>
        <link rel="canonical" href="https://civil-structural-tools.herokuapp.com/response-spectrum"/>
        <meta property="og:title" content="反應譜生成" />
        <meta property="og:url" content="https://civil-structural-tools.herokuapp.com/response-spectrum" />
        <meta property="og:image" content="/assets/png/homepage-smo.png" />
        <meta name="description" content="Generates Response Spectrum tools." />
      </Head>
      <ResponseSpectrum />
    </>
  );
};

export default React.memo(ResponseSpectrumPage);
