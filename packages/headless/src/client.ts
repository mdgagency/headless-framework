import { useEffect, useState, useRef } from "react";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  NormalizedCacheObject,
} from "@apollo/client";
import fetch from "isomorphic-fetch";
import {
  base64Encode,
  base64Decode,
  getQueryParam,
  isServerSide,
  normalizeConfig,
} from "./utils";
import { ApiConfig } from "./types";

async function authorizeClient(
  config: ApiConfig,
  client: ApolloClient<NormalizedCacheObject>
) {
  const {
    location: { search, href },
    location,
    localStorage,
  } = window;
  const isPreview = getQueryParam(search, "preview") === "true";

  if (!isPreview) {
    return;
  }

  const code = getQueryParam(search, "code");
  const storageKey = base64Encode(`${config.authorizeEndpoint}-wpat`);
  let at = localStorage.getItem(storageKey);

  if (code) {
    try {
      const response = await fetch(config.authorizeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
        }),
      });

      const result = (await response.json()) as { access_token?: string };

      if (!result || !result.access_token) {
        console.log("Something went wrong");
        console.log(result);
        return;
      }

      at = result.access_token;

      if (at) {
        at = base64Encode(at);
        localStorage.setItem(storageKey, at);
      }

      location.replace(href.replace(/[&?]code=[^&]*/g, ""));
    } catch (e) {
      console.log("Something went wrong");
      console.log(e);
      return;
    }
  }

  if (!at || at.length === 0) {
    location.replace(
      `${config.baseUrl}/generate?redirect_uri=${encodeURIComponent(href)}`
    );

    return;
  }

  client.setLink(
    new HttpLink({
      uri: `${config.baseUrl}/graphql`,
      headers: {
        Authorization: `Bearer ${base64Decode(at)}`,
      },
    })
  );
}

export function useClient(config: ApiConfig) {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();
  const isMounted = useRef(true);

  useEffect(() => {
    if (!config) {
      throw new Error(
        "You must configure the API with the baseUrl of your Wordpress site and your API secret if this is server-side."
      );
    }

    const cfg = normalizeConfig(config);

    const apolloClient = new ApolloClient({
      link: new HttpLink({
        uri: `${cfg.baseUrl}/graphql`,
      }),
      cache: new InMemoryCache(),
      ssrMode: true,
    });

    if (isServerSide()) {
      if (isMounted.current) {
        setClient(apolloClient);
      }
    } else {
      void (async () => {
        if (!isMounted.current) {
          return;
        }

        // Do this asynchronously so we don't interrupt flow
        await authorizeClient(cfg, apolloClient);

        if (isMounted.current) {
          setClient(apolloClient);
        }
      })();
    }

    return () => {
      isMounted.current = false;
    };
  }, [config, isMounted, client]);

  return client;
}
