import { Product } from "@/models/Product";
import { useStore } from "@/models/RootStore";
import Image from "next/image";

type Props = {
  product: Product;
};

export const ImageBlankState: React.FC<Props> = ({ product }) => {
  const { historyStore } = useStore();
  const onClick = () => {
    historyStore.createConversationWithModel(product);
  };

  const imageUrl =
    product.decoration.images.length > 0 ? product.decoration.images[0] : "";

  return (
    <button
      className="flex flex-col gap-2 p-2 rounded-[8px] bg-white overflow-hidden"
      onClick={onClick}
    >
      <Image
        className="w-[140px] h-[140px] object-cover"
        src={imageUrl}
        width={140}
        height={140}
        alt=""
      />

      <h2 className="font-bold text-[14px] leading-[20px]">
        {product.decoration.title}
      </h2>
    </button>
  );
};
