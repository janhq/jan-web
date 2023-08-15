import useCreateConversation from "@/_hooks/useCreateConversation";
import { ProductV2 } from "@/_models/ProductV2";
import { useCallback } from "react";

type Props = {
  product: ProductV2;
};

export const ImageBlankState: React.FC<Props> = ({ product }) => {
  const { requestCreateConvo } = useCreateConversation();

  const onClick = useCallback(() => {
    requestCreateConvo(product);
  }, []);

  return (
    <button
      className="flex flex-col gap-2 p-2 rounded-[8px] bg-gray-100 overflow-hidden items-center"
      onClick={onClick}
    >
      <img
        className="w-[140px] h-[140px] object-cover rounded-md"
        src={product.image_url}
        width={140}
        height={140}
        alt=""
      />

      <h2 className="font-bold text-sm leading-[20px] text-center">
        {product.name}
      </h2>
    </button>
  );
};
