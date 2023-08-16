import useCreateConversation from "@/_hooks/useCreateConversation";
import { ProductV2 } from "@/_models/ProductV2";

type Props = {
  product: ProductV2;
};

const ConversationalCard: React.FC<Props> = ({ product }) => {
  const { requestCreateConvo } = useCreateConversation();
  const { name, image_url, description } = product;

  const onClick = () => {
    requestCreateConvo(product);
  };

  return (
    <button onClick={onClick}>
      <div className="bg-gray-100 dark:bg-gray-700 gap-3 p-4 w-[218px] rounded-lg active:opacity-50 hover:opacity-20 flex flex-col h-full">
        <img src={image_url} className="w-8 h-8 rounded-full" alt="" />
        <h2 className="text-[#1B1B1B] font-bold dark:text-white text-left">{name}</h2>
        <span className="text-gray-500 flex-1 text-left">{description}</span>
        <div></div>
      </div>
    </button>
  );
};

export default ConversationalCard;
