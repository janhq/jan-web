import { Product } from "@/models/Product";
import useCreateConversation from "../../hooks/useCreateConversation";

type Props = {
  product: Product;
};

export const ImageBlankState: React.FC<Props> = ({ product }) => {
  const { requestCreateConvo } = useCreateConversation();

  const onClick = () => {
    requestCreateConvo(product);
  };

  const imageUrl =
    product.decoration.images.length > 0 ? product.decoration.images[0] : "";

  return (
    <button
      className="flex flex-col gap-2 p-2 rounded-[8px] bg-white overflow-hidden"
      onClick={onClick}
    >
      <img
        className="w-[140px] h-[140px] object-cover"
        src={imageUrl}
        width={140}
        height={140}
        alt=""
      />

      <h2 className="font-bold text-sm leading-[20px]">
        {product.decoration.title}
      </h2>
    </button>
  );
};
