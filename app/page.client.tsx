"use client";
import Header from "@/_components/Header";
import { AdvancedPrompt } from "@/_components/AdvancedPrompt";
import ChatContainer from "@/_components/ChatContainer";
import { CompactSideBar } from "@/_components/CompactSideBar";
import { SidebarLeft } from "@/_components/SidebarLeft";
import { withAnalytics } from "@/_helpers/withAnalytics";
import { Provider, RootInstance, initializeStore } from "@/_models/RootStore";
import { useRef } from "react";
import { ThemeProvider } from "next-themes";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  concat,
  split,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { setContext } from "@apollo/client/link/context";
import { createClient } from "graphql-ws";
import { getAccessToken } from "./_utils/tokenAccessor";
import { getMainDefinition } from "@apollo/client/utilities";

const authMiddleware = setContext(async (_, { headers }) => {
  const token = await getAccessToken();
  return {
    headers: {
      ...headers,
      ...(token && { authorization: token ? `Bearer ${token}` : "" }),
    },
  };
});

const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: `ws://${process.env.NEXT_PUBLIC_GRAPHQL_ENGINE_URL}/v1/graphql`,
          connectionParams: async () => {
            const token = await getAccessToken();
            return {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
          },
        })
      )
    : null;
const httpLink = new HttpLink({
  uri: `http://${process.env.NEXT_PUBLIC_GRAPHQL_ENGINE_URL}/v1/graphql`,
});

const link =
  typeof window !== "undefined" && wsLink != null
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

const PageClient: React.FC = () => {
  const store = useRef<RootInstance>(initializeStore());

  const client = new ApolloClient({
    link: concat(authMiddleware, link),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <ThemeProvider enableSystem={true} attribute="class">
        {store && (
          <Provider value={store.current}>
            <div className="flex w-full h-screen">
              <div className="flex h-screen z-100">
                <SidebarLeft />
                <CompactSideBar />
                <AdvancedPrompt />
              </div>
              <div className="w-full max-h-screen flex-1 flex flex-col">
                <div className="flex-shrink-0 flex-0">
                  <Header />
                </div>
                <ChatContainer />
              </div>
            </div>
          </Provider>
        )}
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default withAnalytics(PageClient);
