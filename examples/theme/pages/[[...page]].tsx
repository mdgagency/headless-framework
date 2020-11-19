/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { AppContext, AppInitialProps } from 'next/app';
import { HeadlessProvider } from '@wpengine/headless';
import * as theme from '../themes/twentytwenty';

export default function Page({
  pageProps,
}: AppInitialProps) {
  return (
    <HeadlessProvider api={{
        baseUrl: process.env.NEXT_PUBLIC_WP_URL as string,
        authorizeEndpoint: process.env.NEXT_PUBLIC_AUTH_ENDPOINT as string,
      }} theme={theme} />
  );
}
