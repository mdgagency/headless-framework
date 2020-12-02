import React from 'react';
import Link from 'next/link';

interface EntryHeaderProps {
  title: string;
  single?: boolean;
  uri: string;
}
export function EntryHeader({ single, title, uri }: EntryHeaderProps) {
  return (
    <header className="entry-header has-text-align-center">
      <div className="entry-header-inner section-inner medium">
        {single ? (
          <h1 className="">{title}</h1>
        ) : (
          <h2 className="">
            <Link href={uri}>
              <a href={uri}>{title}</a>
            </Link>
          </h2>
        )}
      </div>
    </header>
  );
}
