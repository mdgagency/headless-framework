import { ApolloClient } from '@apollo/client';
import { useMemo } from 'react';
import { getApolloClient, PersistentContext } from '@wpengine/headless-core';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

/**
 * Merges the Apollo state with the page props passed through the various Next.js Data Fetching
 * functions such as getStaticProps, getServerSideProps, etc.
 *
 * @example
 * ```ts
 * export async function getStaticProps({preview = false}) {
 *     const apolloClient = getApolloClient()
 *
 *     await apolloClient.query({query: YOUR_QUERY})
 *
 *     return addApolloState(apolloClient, {
 *         props: {preview},
 *         revalidate: 1
 *     })
 * }
 * ```
 */
export function addApolloState(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client: ApolloClient<any>,
  pageProps: Record<string, unknown> & { props: Record<string, unknown> },
): Record<string, unknown> & {
  props: Record<string, unknown>;
} {
  if (pageProps.props) {
    // eslint-disable-next-line no-param-reassign
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

/**
 * React Hook to use the Apollo client. This is used by <WPGraphQLProvider>
 *
 * @see WPGraphQLProvider
 */
export function useApollo(
  pageProps?: Record<string, unknown>,
  context?: PersistentContext,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): ApolloClient<any> {
  const state = pageProps?.[APOLLO_STATE_PROP_NAME];

  return useMemo(() => getApolloClient(context, state), [context, state]);
}
