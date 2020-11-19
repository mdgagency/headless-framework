import { EntryHeader } from './components/EntryHeader';
import { usePosts } from '@wpengine/headless';

export const DefaultTemplate = () => {
  const posts = usePosts();
  console.log(posts);

  return (
    <>
      <main id="site-content" role="main">
        {posts &&
          posts.map((post) => (
            <article key={post.id} id={`post-${post.id}`}>
              <div className="post-inner">
                <EntryHeader title={post.title} single={false} />
                <div
                  className="entry-content"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />
              </div>
            </article>
          ))}
      </main>
    </>
  );
};
