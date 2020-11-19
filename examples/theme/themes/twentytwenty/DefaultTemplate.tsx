import { EntryHeader } from './components/EntryHeader';
import { Content, usePosts } from '@wpengine/headless';

export const DefaultTemplate = () => {
  const posts = usePosts();

  return (
    <>
      <main id="site-content" role="main">
        {posts &&
          posts.map((post) => (
            <article key={post.id} id={`post-${post.id}`}>
              <div className="post-inner">
                <EntryHeader title={post.title} single={false} />
                <Content className="entry-content" html={post.excerpt} />
              </div>
            </article>
          ))}
      </main>
    </>
  );
};
