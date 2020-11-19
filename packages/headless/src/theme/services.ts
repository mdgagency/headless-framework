import moize from "moize";
import fetch from "isomorphic-fetch";
import { PageInfo } from "../types";

export const getPageInfo = moize(
  async function getPageInfo(link: string) {
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
