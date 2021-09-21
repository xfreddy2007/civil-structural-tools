import React from 'react';
import { AppProps } from 'next/app';
import '@/stylues/globals.scss';

import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavigationBar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp
