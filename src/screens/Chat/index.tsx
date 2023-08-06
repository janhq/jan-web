"use client";
import { Header } from "@/components";
import { AdvancedPrompt } from "@/components/AdvancedPrompt";
import ChatContainer from "@/components/ChatContainer";
import { CompactSideBar } from "@/components/CompactSideBar";
import { SidebarLeft } from "@/components/SidebarLeft";
import { AuthProvider } from "@/contexts/authContext";
import { withAnalytics } from "@/helpers/withAnalytics";
import { Provider, RootInstance, initializeStore } from "@/models/RootStore";
import { ProductsProps } from "@/services/products";
import { useRef } from "react";

const ChatPage: React.FC<ProductsProps> = (props) => {
  const store = useRef<RootInstance>(initializeStore());

  return (
    <AuthProvider>
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
    </AuthProvider>
  );
};
export default withAnalytics<ProductsProps>(ChatPage);
