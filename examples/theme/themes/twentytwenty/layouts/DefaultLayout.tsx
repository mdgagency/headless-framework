import React from 'react';
import { Header } from '../components/Header';

export function DefaultLayout({ children }: React.PropsWithChildren<unknown>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
