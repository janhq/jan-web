import Image from "next/image";
import GenerateImageCard from "../GenerateImageCard";
import { ProductV2 } from "@/_models/ProductV2";

type Props = {
  products: ProductV2[];
}

const GenerateImageList: React.FC<Props> = ({ products }) => (
  <div className="pb-4">
    <div className="flex mt-4 justify-between">
      <div className="gap-4 flex items-center">
        <Image src={"icons/ic_image.svg"} width={20} height={20} alt="" />
        <h2 className="text-gray-900 font-bold dark:text-white">
          Generate Images
        </h2>
      </div>
    </div>
    <div className="mt-2 grid grid-cols-2 gap-4 sm:gap-x-6 md:grid-cols-4 md:gap-8">
      {products.map((item) => (
        <GenerateImageCard
          key={item.ID}
          name={item.name}
          img={item.image_url}
          title={item.name}
        />
      ))}
    </div>
  </div>
);

export default GenerateImageList;
