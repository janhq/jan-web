import { Product } from "@/models/Product";
import { useStore } from "@/models/RootStore";
import React from "react";
import { useAuth } from "../../contexts/auth_context";
import { DefaultUser } from "../../models/User";

type Props = {
  product: Product;
};

const ShortcutItem: React.FC<Props> = ({ product }) => {
  const { historyStore } = useStore();
  const { currentUser } = useAuth();
  const { decoration } = product;
  const avatarUrl = decoration.images.length > 0 ? decoration.images[0] : "";

  const onClickHandler = () => {
    historyStore.createConversationWithModel(
      product,
      currentUser?.uid ?? DefaultUser.id,
      currentUser?.displayName ?? DefaultUser.displayName
    );
  };

  return (
    <button className="flex items-center gap-2 w-full" onClick={onClickHandler}>
      <img src={avatarUrl} className="w-9 aspect-square rounded-full" alt="" />
      <div className="flex flex-col text-[14px] leading-[20px]">
        <span className="text-[#111928]">{decoration.title}</span>
      </div>
    </button>
  );
};

export default React.memo(ShortcutItem);
