import React from 'react';
import { AppProps } from 'next/app';
import '@/stylues/globals.scss';

import NavigationBar from '@/components/NavigationBar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavigationBar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
