import { Product } from "@/models/Product";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  productId: string;
  modelTitle: string;
};

export const ModelDetailHeader: React.FC<Props> = ({ productId, modelTitle }) => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <div className="flex items-center justify-between mt-[60px]">
      <div className="flex flex-col">
        <span className="relative text-[#9CA3AF] text-base font-bold leading-[19.36px]">
          AIs
          <button
            onClick={handleClick}
            className="absolute top-[-6px] left-[-25px] p-2"
          >
            <Image
              src={"/icons/ic_arrowback.svg"}
              width={14}
              height={14}
              alt=""
            />
          </button>
        </span>
        <h2 className="font-bold text-[32px] leading-[52px] text-black">
          {modelTitle}
        </h2>
      </div>
      <Link
        href={{
          pathname: `/chat`,
          query: { productId },
        }}
        className="bg-[#1A56DB] py-[10px] px-5 gap-2 rounded-[8px] text-[14px] leading-[21px] font-medium text-white"
      >
        Use
      </Link>
    </div>
  );
};
