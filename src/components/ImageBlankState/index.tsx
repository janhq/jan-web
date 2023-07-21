import Image from "next/image";

type Props = {
  title: string;
  image: string;
};

export const ImageBlankState: React.FC<Props> = ({ image, title }) => {
  return (
    <div className="flex flex-col gap-2 p-2 rounded-[8px] bg-white">
      <Image src={image} width={140} height={140} alt="" />
      <h2 className="font-bold text-[14px] leading-[20px]">{title}</h2>
    </div>
  );
};
