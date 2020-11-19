import React from 'react';
import { AppContext, AppInitialProps } from 'next/app';
import '../themes/twentytwenty/styles.css';

export default function App({
    Component,
    pageProps,
}: AppContext & AppInitialProps) {
    return <Component { ...pageProps } />;
}
