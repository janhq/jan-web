import { Product } from "@/_models/Product";
import ConversationalCard from "../ConversationalCard";
import Image from "next/image";

interface IConversational {
  products: Product[];
}

const ConversationalList: React.FC<IConversational> = (props) => {
  return (
    <div>
      <div className="flex items-center gap-3 mt-4 mb-2">
        <Image src={"/icons/messicon.svg"} width={24} height={24} alt="" />
        <span className="font-bold text-gray-900">Conversational</span>
      </div>
      <div className="flex gap-2 items-stretch mt-4 flex-wrap">
        {props.products.map((item, index) => (
          <ConversationalCard
            key={index}
            name={item.name}
            image={item.decoration.images[0]}
            title={item.decoration?.title}
            description={
              item.decoration.subTitle || item.decoration.description
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ConversationalList;
