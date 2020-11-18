/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { AppContext, AppInitialProps } from 'next/app';
import { ApiProvider } from '@wpengine/headless';

import '../styles/global.scss';

export default function App({
  Component,
  pageProps,
}: AppContext & AppInitialProps) {
  return (
    <ApiProvider
      config={{
        baseUrl: process.env.NEXT_PUBLIC_WP_URL as string,
        authorizeEndpoint: process.env.NEXT_PUBLIC_AUTH_ENDPOINT as string,
      }}>
      <Component {...pageProps} />
    </ApiProvider>
  );
}
