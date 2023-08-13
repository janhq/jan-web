import { Product } from "@/_models/Product";
import React from "react";
import useCreateConversation from "@/_hooks/useCreateConversation";

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
    <button className="flex items-center gap-2" onClick={onClickHandler}>
      <img src={avatarUrl} className="w-9 aspect-square rounded-full" alt="" />
      <div className="flex flex-col text-sm leading-[20px]">
        <span className="text-[#111928] dark:text-white">
          {decoration.title}
        </span>
      </div>
    </button>
  );
};

export default React.memo(ShortcutItem);
