import { useState, useEffect } from 'React';
import { PageInfo } from '../types';
import { getPageInfo } from './services';
import { useRouter } from 'next/router';

export function usePageInfo(baseUrl: string) {
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const router = useRouter();
  let subscribed = true;

  useEffect(() => {
    if (!(subscribed && router)) {
      return;
    }

    const route = router.asPath;

    console.log(`${baseUrl}${route}`);

    void (async () => {
      const info = await getPageInfo(`${baseUrl}${route}`);

      if (!subscribed) {
        return;
      }

      setPageInfo(info);
    })();

    return () => {
      subscribed = false;
    };
  }, [baseUrl, router, subscribed]);

  return pageInfo;
}
