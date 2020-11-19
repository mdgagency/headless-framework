import React from "react";
import { ApolloProvider } from "@apollo/client";
import { useClient } from "../client";
import { ApiConfig } from "../types";

export interface ApiProviderProps {
  config: ApiConfig;
}

export function ApiProvider({
  children,
  config,
}: React.PropsWithChildren<ApiProviderProps>) {
  const client = useClient(config);

  if (!client) {
    return <></>;
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
