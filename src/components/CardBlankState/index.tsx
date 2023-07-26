import { Product } from "@/models/Product";
import { useStore } from "@/models/RootStore";
import { useAuth } from "../../contexts/auth_context";
import { DefaultUser } from "../../models/User";

type Props = {
  product: Product;
};

export const CardBlankState: React.FC<Props> = ({ product }) => {
  const { historyStore } = useStore();
  const { currentUser } = useAuth();

  const onClick = () => {
    historyStore.createConversationWithModel(
      product,
      currentUser?.uid ?? DefaultUser.id,
      currentUser?.displayName ?? DefaultUser.displayName
    );
  };

  const description =
    product.action.params.models.length > 0
      ? product.action.params.models[0].description
      : "";

  return (
    <button
      className="flex gap-3 p-3 bg-white odd:rounded-t-[8px] even:rounded-b-[8px]"
      onClick={onClick}
    >
      <div className="gap-6 flex items-center">
        <div className="w-[40px] h-[40px]">
          <img
            className="max-w-none rounded-3xl"
            src={product.decoration.images[0]}
            width={40}
            height={40}
            alt=""
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-[14px] leading-[20px] font-bold text-[#111928] text-left">
            {product.decoration.title}
          </h2>
          <span className="text-[12px] leading-[18px] text-[#9CA3AF] break-all text-left">
            {description}
          </span>
        </div>
      </div>
    </button>
  );
};
