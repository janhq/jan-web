import { TitleBlankState } from "../TitleBlankState";
import { CardBlankState } from "../CardBlankState";
import { ImageBlankState } from "../ImageBlankState";
import { Product } from "@/models/Product";

type Props = {
  products: Product[];
};

export const ChatBlankState: React.FC<Props> = ({ products }) => {
  const llmProducts = products
    .filter((product) => product.decoration.tags.indexOf("Chatbot") > -1)
    .slice(0, 2);

  const imageGeneratorProducts = products
    .filter((product) => product.decoration.tags.indexOf("Awesome Art") > -1)
    .slice(0, 2);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#D9D9D9]">
      <div className="flex flex-col gap-6 w-[400px]">
        <div className="flex gap-2 flex-col">
          <TitleBlankState title="Get instant answers, find creative inspiration, and learn something new" />
          <div className="gap-[2px] flex flex-col">
            {llmProducts.map((item, index) => (
              <CardBlankState key={index} product={item} />
            ))}
          </div>
        </div>
        <div className="flex gap-2 flex-col">
          <TitleBlankState title="Generate artworks" />
          <div className="flex gap-2">
            {imageGeneratorProducts.map((item, index) => (
              <ImageBlankState key={index} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
