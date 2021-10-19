import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head'
import '@/stylues/globals.scss';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0" />
        <meta name="keywords" content="civil structural geoengineering" />
      </Head>
      <main className="min-h-screen relative flex flex-col">
        <NavigationBar />
        <Component {...pageProps} />
        <Footer />
      </main>
    </>
  );
}

export default MyApp
