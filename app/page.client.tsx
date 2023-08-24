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
  ApolloLink,
  from,
  HttpLink,
} from "@apollo/client";
import { getAccessToken } from "./_utils/tokenAccessor";

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(async ({ headers = {} }) => {
    const token = await getAccessToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
  return forward(operation);
});
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENGINE_URL,
});

const PageClient: React.FC = () => {
  const store = useRef<RootInstance>(initializeStore());

  const client = new ApolloClient({
    link: from([authMiddleware, httpLink]),
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
