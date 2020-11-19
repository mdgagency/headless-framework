import React, { useContext } from "react";
import { HeadlessTheme } from "../types";
import { usePageInfo } from "../theme";
import { Context } from "../context";

export interface ThemeProviderProps {
  wpUrl: string;
  theme: HeadlessTheme;
}

export function ThemeProvider({
  wpUrl,
  theme: { DefaultTemplate, SingleTemplate, ListTemplate, NotFoundTemplate },
}: ThemeProviderProps) {
  const pageInfo = usePageInfo(wpUrl);
  const ctx = useContext(Context);

  if (!pageInfo) {
    return <></>;
  }

  ctx.pageInfo = pageInfo;

  if (pageInfo.is_404) {
    if (NotFoundTemplate) {
      return <NotFoundTemplate pageInfo={pageInfo} />;
    }
  }

  if (pageInfo.is_home) {
    return <DefaultTemplate pageInfo={pageInfo} />;
  }

  if (pageInfo.is_single) {
    if (SingleTemplate) {
      return <SingleTemplate pageInfo={pageInfo} />;
    }
  } else if (ListTemplate) {
    return <ListTemplate pageInfo={pageInfo} />;
  }

  return <DefaultTemplate pageInfo={pageInfo} />;
}
