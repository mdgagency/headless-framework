import React from 'react';
import { Content, usePost } from '@wpengine/headless';
import { EntryHeader } from './components/EntryHeader';
import { DefaultLayout } from './layouts/DefaultLayout';

export function SingleTemplate() {
  const post = usePost();

  return (
    <DefaultLayout>
      <main id="site-content" role="main">
        {post && (
          <article key={post.id} id={`post-${post.id}`}>
            <div className="post-inner">
              <EntryHeader title={post.title} single uri={post.uri} />
              <Content className="entry-content" html={post.content} />
            </div>
          </article>
        )}
      </main>
    </DefaultLayout>
  );
}
