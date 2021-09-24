import React from 'react';
import Head from 'next/head';
import RebarSpec from '@/components/RebarSpec';


const RebarSpecPage:React.FC = () => {
  return (
    <>
      <Head>
        <title key="title">鋼筋規格列表</title>
        <link rel="canonical" href="https://civil-structural-tools.herokuapp.com/rebar-spec"/>
        <meta property="og:title" content="鋼筋規格列表" />
        <meta property="og:url" content="https://civil-structural-tools.herokuapp.com/rebar-spec" />
        <meta property="og:image" content="/assets/png/homepage-smo.png" />
        <meta name="description" content="Rebar specification table." />
      </Head>
      <RebarSpec />
    </>
  );
};

export default React.memo(RebarSpecPage);
