import React from 'react';
import { HeadlessTheme } from '../types';
import { usePageInfo } from '../theme';

export interface ThemeProviderProps {
    wpUrl: string;
    theme: HeadlessTheme;
}

export function ThemeProvider({ wpUrl, theme: { DefaultTemplate, SingleTemplate, ListTemplate } }: ThemeProviderProps) {
    const pageInfo = usePageInfo(wpUrl);

    if (!pageInfo) {
        return <></>;
    }

    if (pageInfo.is_home) {
        return <DefaultTemplate pageInfo={ pageInfo } />;
    }

    if (pageInfo.is_single) {
        if (!!SingleTemplate) {
            return <SingleTemplate pageInfo={ pageInfo } />;
        }
    } else if (!!ListTemplate) {
        return <ListTemplate pageInfo={ pageInfo } />;
    }

    return <DefaultTemplate pageInfo={ pageInfo } />;
}
