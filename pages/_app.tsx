import React from 'react';
import { AppProps } from 'next/app';
import '@/stylues/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
