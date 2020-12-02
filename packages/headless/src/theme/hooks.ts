import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { UriInfo } from '../types';
import { getUriInfo } from './services';

export function useUriInfo() {
  const [pageInfo, setPageInfo] = useState<UriInfo>();
  const router = useRouter();
  const client = useApolloClient();

  useEffect(() => {
    let subscribed = true;

    if (router) {
      const page = router.asPath;

      if (page.indexOf('[[') === -1) {
        void (async () => {
          const info = await getUriInfo(
            client as ApolloClient<NormalizedCacheObject>,
            page,
          );

          if (!subscribed) {
            return;
          }

          setPageInfo(info);
        })();
      }
    }

    return () => {
      subscribed = false;
    };
  }, [router, client]);

  return pageInfo;
}
