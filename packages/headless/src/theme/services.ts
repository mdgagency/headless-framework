import moize from "moize";
import fetch from "isomorphic-fetch";
import { PageInfo } from "../types";
import { getQueryParam } from "../utils";

export const getPageInfo = moize(
  async function getPageInfo(link: string): Promise<PageInfo> {
    if (/preview=true/.test(link)) {
      const search: string = link.split("?")[1];
      let id = getQueryParam(search, "p");
      let isRevision = false;

      if (!id) {
        id = getQueryParam(search, "preview_id");
        isRevision = true;
      }

      return {
        have_posts: false,
        post_id: Number(id),
        post_type: "post",
        is_404: false,
        is_archive: false,
        is_single: true,
        is_page: false,
        is_home: false,
        is_category: false,
        is_author: false,
        is_search: false,
        is_tag: false,
        is_preview: true,
        is_revision: isRevision,
      };
    }

    const response = await fetch(link);
    const result: PageInfo = await response.json();

    return result;
  },
  {
    isDeepEqual: false,
    isPromise: true,
    isSerialized: true,
    maxAge: 1000,
  }
);
