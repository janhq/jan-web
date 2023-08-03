import { Product } from "@/models/Product";
import React from "react";
import useCreateConversation from "../../hooks/useCreateConversation";

type Props = {
  product: Product;
};

const ShortcutItem: React.FC<Props> = ({ product }) => {
  const { requestCreateConvo } = useCreateConversation();
  const { decoration } = product;
  const avatarUrl = decoration.images.length > 0 ? decoration.images[0] : "";

  const onClickHandler = () => {
    requestCreateConvo(product);
  };

  return (
    <button className="flex items-center gap-2 w-full px-3" onClick={onClickHandler}>
      <img src={avatarUrl} className="w-9 aspect-square rounded-full" alt="" />
      <div className="flex flex-col text-[14px] leading-[20px]">
        <span className="text-[#111928]">{decoration.title}</span>
      </div>
    </button>
  );
};

export default React.memo(ShortcutItem);
