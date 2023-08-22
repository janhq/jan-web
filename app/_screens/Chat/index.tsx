"use client";
import Header from "../../_components/Header";
import { AdvancedPrompt } from "../../_components/AdvancedPrompt";
import ChatContainer from "../../_components/ChatContainer";
import { CompactSideBar } from "../../_components/CompactSideBar";
import { SidebarLeft } from "../../_components/SidebarLeft";
import { withAnalytics } from "@/_helpers/withAnalytics";
import { Provider, RootInstance, initializeStore } from "@/_models/RootStore";
import { ProductsProps } from "@/_services/products";
import { useRef } from "react";
import { ThemeProvider } from "next-themes";

const ChatPage: React.FC<ProductsProps> = (props) => {
  const store = useRef<RootInstance>(initializeStore());

  return (
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
              <ChatContainer {...props} />
            </div>
          </div>
        </Provider>
      )}
    </ThemeProvider>
  );
};
export default withAnalytics<ProductsProps>(ChatPage);
