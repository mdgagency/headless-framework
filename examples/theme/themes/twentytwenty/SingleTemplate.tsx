import { EntryHeader } from './components/EntryHeader';
import { Content, usePost } from '@wpengine/headless';
import { DefaultLayout } from './layouts/DefaultLayout';

export const SingleTemplate = () => {
  const post = usePost();

  return (
    <DefaultLayout>
      <main id="site-content" role="main">
        {post && (
          <article key={post.id} id={`post-${post.id}`}>
            <div className="post-inner">
              <EntryHeader title={post.title} single={true} />
              <Content className="entry-content" html={post.content} />
            </div>
          </article>
        )}
      </main>
    </DefaultLayout>
  );
};
