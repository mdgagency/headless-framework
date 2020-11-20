import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { PageInfo } from "../types";
import { getPageInfo } from "./services";
import * as utils from "../utils";

export function usePageInfo(baseUrl: string) {
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const router = useRouter();

  useEffect(() => {
    let subscribed = true;

    if (router) {
      const page = router.asPath;

      if (page.indexOf("[[") === -1) {
        const wpUrl = utils.trimTrailingSlash(baseUrl);

        void (async () => {
          const info = await getPageInfo(`${wpUrl}${page}`);

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
  }, [baseUrl, router, pageInfo]);

  return pageInfo;
}
