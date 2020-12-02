import React, { useContext } from 'react';
import { HeadlessTheme } from '../types';
import { useUriInfo } from '../theme';
import { Context } from '../context';

export interface ThemeProviderProps {
  theme: HeadlessTheme;
}

export function ThemeProvider({
  theme: { DefaultTemplate, SingleTemplate, ListTemplate, NotFoundTemplate },
}: ThemeProviderProps) {
  const pageInfo = useUriInfo();
  const ctx = useContext(Context);

  if (!pageInfo) {
    return <></>;
  }

  ctx.pageInfo = pageInfo;

  if (pageInfo.is404 && !!NotFoundTemplate) {
    return <NotFoundTemplate pageInfo={pageInfo} />;
  }

  if (pageInfo.isPostsPage && !!ListTemplate) {
    return <ListTemplate pageInfo={pageInfo} />;
  }

  if (pageInfo.isFrontPage) {
    return <DefaultTemplate pageInfo={pageInfo} />;
  }

  if (SingleTemplate) {
    return <SingleTemplate pageInfo={pageInfo} />;
  }

  return <DefaultTemplate pageInfo={pageInfo} />;
}
