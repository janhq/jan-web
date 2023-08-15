import React from "react";
import useCreateConversation from "@/_hooks/useCreateConversation";
import { ProductV2 } from "@/_models/ProductV2";

type Props = {
  product: ProductV2;
};

const ShortcutItem: React.FC<Props> = ({ product }) => {
  const { requestCreateConvo } = useCreateConversation();

  const onClickHandler = () => {
    requestCreateConvo(product);
  };

  return (
    <button className="flex items-center gap-2" onClick={onClickHandler}>
      <img src={product.image_url} className="w-9 aspect-square rounded-full" alt="" />
      <div className="flex flex-col text-sm leading-[20px]">
        <span className="text-[#111928] dark:text-white">
          {product.name}
        </span>
      </div>
    </button>
  );
};

export default React.memo(ShortcutItem);
