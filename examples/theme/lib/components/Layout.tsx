import React from 'react';
import Head from 'next/head';
import clsx from 'clsx';
import { Nav } from './Nav';

export function Layout({
  children,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>) {
  // TODO: Check localstorage for theme
  // eslint-disable-next-line no-param-reassign,react/destructuring-assignment
  props.className = clsx('root light', ...(props.className || '').split(/\s/g));

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <main {...props}>
      <Head>
        <title>WP Engine Developers</title>
      </Head>
      <Nav />
      <div className="container">{children}</div>
    </main>
  );
}
