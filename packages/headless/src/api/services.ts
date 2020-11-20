import { gql, ApolloClient, NormalizedCacheObject } from "@apollo/client";
import moize from "moize";
import { GeneralSettings, PostIdType, Post } from "../types";
import * as utils from "../utils";

export const posts = moize(
  async function posts(client: ApolloClient<NormalizedCacheObject>) {
    const result = await client.query<{ posts: { nodes: Post[] } }>({
      query: gql`
        query {
          posts {
            nodes {
              id
              title
              slug
              status
              content
              excerpt
              link
            }
          }
        }
      `,
    });

    const thePosts = result?.data?.posts?.nodes;

    if (!thePosts) {
      return thePosts;
    }

    return thePosts.map((thePost) => {
      const { id, title, slug, status, content, excerpt } = thePost;

      return {
        id,
        title,
        slug,
        status,
        content,
        excerpt,
        link: utils.getUrlPath(thePost.link),
      };
    });
  },
  {
    isDeepEqual: false,
    isPromise: true,
    isSerialized: true,
    maxAge: 1000,
  }
);

export const post = moize(
  async function post(
    client: ApolloClient<NormalizedCacheObject>,
    postId: string,
    idType = PostIdType.SLUG,
    asPreview = false
  ): Promise<Post | void> {
    if (!postId) {
      return Promise.resolve();
    }

    const result = await client.query<{ post: Post }>({
      query: gql`
            query {
                post(idType: ${idType}, id: "${postId}", asPreview: ${asPreview}) {
                    id
                    title
                    slug
                    status
                    content
                    excerpt
                    isPreview
                    link
                }
            }
        `,
    });

    const thePost = result?.data?.post;

    if (!thePost) {
      return thePost;
    }

    const { id, title, slug, status, content, excerpt, isPreview } = thePost;

    return {
      id,
      title,
      slug,
      status,
      content,
      excerpt,
      link: utils.getUrlPath(thePost.link),
      isPreview,
    };
  },
  {
    isDeepEqual: false,
    isPromise: true,
    isSerialized: true,
    maxAge: 1000,
  }
);

export const revision = moize(
  async function revision(
    client: ApolloClient<NormalizedCacheObject>,
    id: string
  ): Promise<Post | void> {
    if (!id) {
      return Promise.resolve();
    }

    const result = await client.query<{ revisions: { nodes: Post[] } }>({
      query: gql`
            query {
                revisions(where: {id: ${id}}) {
                    nodes {
                    ... on Post {
                        id
                        title
                        slug
                        status
                        content
                        excerpt
                    }
                    }
                }
            }
        `,
    });

    return result?.data?.revisions.nodes[0];
  },
  {
    isDeepEqual: false,
    isPromise: true,
    isSerialized: true,
    maxAge: 1000,
  }
);

export const generalSettings = moize(async function generalSettings(
  client: ApolloClient<NormalizedCacheObject>
): Promise<GeneralSettings> {
  const result = await client.query<{ generalSettings: GeneralSettings }>({
    query: gql`
      query {
        generalSettings {
          title
          description
        }
      }
    `,
  });

  return result?.data?.generalSettings;
});
