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
      let { page } = router.query;

      if (!page) {
        page = "";
      }

      if (Array.isArray(page)) {
        page = page.join(",");
      }

      if (page[0] !== "/") {
        page = `/${page}`;
      }

      const path = page.replace(/,/g, "/");

      const wpUrl = utils.trimTrailingSlash(baseUrl);

      void (async () => {
        const info = await getPageInfo(`${wpUrl}${path}`);

        if (!subscribed) {
          return;
        }

        setPageInfo(info);
      })();
    }

    return () => {
      subscribed = false;
    };
  }, [baseUrl, router, pageInfo]);

  return pageInfo;
}
