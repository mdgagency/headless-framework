import React from 'react';
import { Content, usePost } from '@wpengine/headless';
import { EntryHeader } from './components/EntryHeader';
import { DefaultLayout } from './layouts/DefaultLayout';

export function SingleTemplate() {
  const post = usePost();

  return (
    <DefaultLayout>
      {post && (
        <article key={post.id} id={`post-${post.id}`}>
          <div className="py-4">
            <EntryHeader title={post.title} single uri={post.uri} />
            <Content className="entry-content" html={post.content} />
          </div>
        </article>
      )}
    </DefaultLayout>
  );
}
