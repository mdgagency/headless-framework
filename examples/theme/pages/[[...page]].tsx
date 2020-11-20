/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { HeadlessProvider } from '@wpengine/headless';
import * as theme from '../themes/bootstrap';

export default function Page() {
  return (
    <HeadlessProvider
      api={{
        baseUrl: process.env.NEXT_PUBLIC_WP_URL as string,
        authorizeEndpoint: process.env.NEXT_PUBLIC_AUTH_ENDPOINT as string,
      }}
      theme={theme}
    />
  );
}
