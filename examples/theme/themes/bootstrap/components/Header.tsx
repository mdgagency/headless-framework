import React from 'react';
import { useGeneralSettings } from '@wpengine/headless';
import Link from 'next/link';

export function Header() {
  const siteInfo = useGeneralSettings();

  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container">
        <Link href="/">
          <a className="navbar-brand" href="/">
            {siteInfo?.title}
          </a>
        </Link>
        <div className="text-white mr-auto">{siteInfo?.description}</div>
      </div>
    </nav>
  );
}
