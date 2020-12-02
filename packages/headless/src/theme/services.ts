import { gql, ApolloClient, NormalizedCacheObject } from '@apollo/client';
import moize from 'moize';
import { getUrlPath } from '../utils';
import { UriInfo } from '../types';

export const getUriInfo = moize(
  async function getPageInfo(
    client: ApolloClient<NormalizedCacheObject>,
    uri: string,
  ): Promise<UriInfo> {
    const uriPath = getUrlPath(uri);
    const isPreview = /preview=true/.test(uriPath);
    const response = await client.query<{ nodeByUri?: UriInfo }>({
      query: gql`
        query {
          nodeByUri(uri: "${uriPath}") {
            id
            ... on ContentType {
              isFrontPage
              isPostsPage
            }
          }
        }
      `,
    });
    const result = response?.data?.nodeByUri;

    if (!result) {
      return {
        is404: true,
        uriPath,
      };
    }

    const { isPostsPage, isFrontPage, id } = result;

    return {
      isPostsPage,
      isFrontPage,
      id,
      isPreview,
      uriPath,
    };
  },
  {
    isDeepEqual: false,
    isPromise: true,
    isSerialized: true,
    maxAge: 1000,
  },
);
