import React from 'react';
import { HeadlessTheme } from '../types';
import { ApiProvider } from './ApiProvider';
import { ApiConfig } from '../client';
import { ThemeProvider } from './ThemeProvider';

export interface HeadlessProviderProps {
  api: ApiConfig;
  theme: HeadlessTheme;
}

export function HeadlessProvider({ api, theme }: HeadlessProviderProps) {
  return <ApiProvider config={ api }>
    <ThemeProvider wpUrl={api.baseUrl} theme={ theme } />
  </ApiProvider>;
}
