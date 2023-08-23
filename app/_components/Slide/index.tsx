import useCreateConversation from "@/_hooks/useCreateConversation";
import { ProductDetailFragment } from "@/graphql";
import Image from "next/image";

type Props = {
  product: ProductDetailFragment;
};

const Slide: React.FC<Props> = ({ product }) => {
  const { name, image_url, description } = product;
  const { requestCreateConvo } = useCreateConversation();

  const onClick = () => {
    requestCreateConvo(product);
  };

  return (
    <div className="w-full embla__slide h-[435px] relative">
      <Image
        className="object-cover w-full h-full embla__slide__img"
        src={image_url || ""}
        layout="fill"
        alt=""
      />
      <div className="absolute bg-[rgba(0,0,0,0.7)] w-full text-white bottom-0 right-0">
        <div className="flex justify-between p-4">
          <div className="flex flex-col gap-[2px]">
            <h2 className="font-semibold text-xl leading-[25px] tracking-[-0.5px]">
              {name}
            </h2>
            <span className="text-gray-300 text-xs leading-[18px]">
              {description}
            </span>
          </div>
          <button
            onClick={onClick}
            className="flex-none flex w-30 h-12 items-center text-sm justify-center gap-2 px-5 py-[10px] rounded-md bg-white leading-[21px] text-gray-800"
          >
            Try now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slide;
