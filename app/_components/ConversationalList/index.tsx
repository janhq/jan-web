import ConversationalCard from "../ConversationalCard";
import Image from "next/image";
import { ProductV2 } from "@/_models/ProductV2";

type Props = {
  products: ProductV2[];
};

const ConversationalList: React.FC<Props> = ({ products }) => (
  <div className="grid">
    <div className="flex items-center gap-3 mt-4 mb-2">
      <Image src={"/icons/messicon.svg"} width={24} height={24} alt="" />
      <span className="font-bold text-gray-900 dark:text-white">
        Conversational
      </span>
    </div>
    <div className="mt-4 flex w-full overflow-y-hidden gap-2">
      {products.map((item) => (
        <ConversationalCard
          key={item.ID}
          name={item.name}
          image={item.image_url}
          title={item.name}
          description={item.description}
        />
      ))}
    </div>
  </div>
);

export default ConversationalList;
