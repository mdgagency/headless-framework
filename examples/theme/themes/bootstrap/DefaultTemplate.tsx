import React from 'react';
import { Content, usePosts } from '@wpengine/headless';
import { EntryHeader } from './components/EntryHeader';
import { DefaultLayout } from './layouts/DefaultLayout';

export function DefaultTemplate() {
  const posts = usePosts();

  return (
    <DefaultLayout>
      <div className="row py-4">
        {posts &&
          posts.map((post) => (
            <div
              className="card mr-3 mb-3"
              key={post.id}
              id={`post-${post.id}`}
              style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title">
                  <EntryHeader
                    title={post.title}
                    single={false}
                    uri={post.uri}
                  />
                </h5>
                <Content
                  element="p"
                  className="card-text"
                  html={post.excerpt}
                />
              </div>
            </div>
          ))}
      </div>
    </DefaultLayout>
  );
}
