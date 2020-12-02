import React from 'react';
import { Header } from '../components/Header';

export function DefaultLayout({ children }: React.PropsWithChildren<unknown>) {
  return (
    <>
      <Header />
      <main className="container" role="main">
        {children}
      </main>
    </>
  );
}
