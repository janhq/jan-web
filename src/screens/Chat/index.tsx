"use client";
import ChatContainer from "@/components/ChatContainer";
import { withAnalytics } from "@/helpers/withAnalytics";
import { Provider, RootInstance, initializeStore } from "@/models/RootStore";
import { ProductsProps } from "@/services/products";
import { useRef } from "react";

const ChatPage: React.FC<ProductsProps> = (props) => {
  const store = useRef<RootInstance>(initializeStore());  

  return (
    <>
      {store && (
        <Provider value={store.current}>
          <ChatContainer {...props} />
        </Provider>
      )}
    </>
  );
};
export default withAnalytics<ProductsProps>(ChatPage);
