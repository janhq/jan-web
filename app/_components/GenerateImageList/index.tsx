import Image from "next/image";
import GenerateImageCard from "../GenerateImageCard";
import { Product } from "@/_models/Product";

interface IGenerateImage {
  products: Product[];
}

const GenerateImageList: React.FC<IGenerateImage> = ({ products }) => (
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
      {products.map((item, index) => (
        <GenerateImageCard
          key={index}
          name={item.name}
          img={item.decoration.images[0]}
          title={item.decoration.title}
        />
      ))}
    </div>
  </div>
);

export default GenerateImageList;
