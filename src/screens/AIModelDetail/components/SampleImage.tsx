import Image from "next/image";

interface ISampleImageProps {
  image?: string;
}
export const SampleImage: React.FC<ISampleImageProps> = (props) => {
  return (
    <div className="flex gap-[18px] w-[633px] h-[520px]">
      <div className="w-[53px] h-full bg-[#D9D9D9] opacity-50"></div>
      <div className="flex items-start justify-start">
        <img
          src={props.image}
          alt=""
          className="w-[77px] aspect-square"
        />
      </div>
      <div className="w-[53px]  h-full bg-[#D9D9D9] opacity-50"></div>
    </div>
  );
};
