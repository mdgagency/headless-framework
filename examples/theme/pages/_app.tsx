import React from 'react';
import { AppContext, AppInitialProps } from 'next/app';
import '../themes/bootstrap/styles.css';

export default function App({
  Component,
  pageProps,
}: AppContext & AppInitialProps) {
  return <Component {...pageProps} />;
}
