import React from 'react';
import { ApiConfig, HeadlessTheme } from '../types';
import { ApiProvider } from './ApiProvider';
import { ThemeProvider } from './ThemeProvider';

export interface HeadlessProviderProps {
  api: ApiConfig;
  theme: HeadlessTheme;
}

export function HeadlessProvider({ api, theme }: HeadlessProviderProps) {
  return (
    <ApiProvider config={api}>
      <ThemeProvider theme={theme} />
    </ApiProvider>
  );
}
