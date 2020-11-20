import { EntryHeader } from './components/EntryHeader';
import { Content, usePost } from '@wpengine/headless';
import { DefaultLayout } from './layouts/DefaultLayout';

export const SingleTemplate = () => {
  const post = usePost();

  return (
    <DefaultLayout>
      {post && (
        <article key={post.id} id={`post-${post.id}`}>
          <div className="py-4">
            <EntryHeader title={post.title} single={true} link={post.link} />
            <Content className="entry-content" html={post.content} />
          </div>
        </article>
      )}
    </DefaultLayout>
  );
};
