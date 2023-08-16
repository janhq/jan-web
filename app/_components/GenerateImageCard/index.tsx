import useCreateConversation from "@/_hooks/useCreateConversation";
import { ProductV2 } from "@/_models/ProductV2";

type Props = {
  product: ProductV2;
};

const GenerateImageCard: React.FC<Props> = ({ product }) => {
  const { name, image_url } = product;
  const { requestCreateConvo } = useCreateConversation();

  const onClick = () => {
    requestCreateConvo(product);
  };

  return (
    <button onClick={onClick}>
      <div className="group relative active:opacity-50">
        <div className="h-56 w-full overflow-hidden rounded-[8px] bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
          <img
            src={image_url}
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="absolute bottom-0 rounded-br-[8px] rounded-bl-[8px] bg-[rgba(0,0,0,0.7)] w-full gap-2 p-5">
          <span className="text-white">{name}</span>
        </div>
      </div>
    </button>
  );
};

export default GenerateImageCard;
