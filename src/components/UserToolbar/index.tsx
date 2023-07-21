import Image from "next/image";
import angelDown from "../../../../public/icons/unicorn_angle-down.svg";

interface Props {
  avatar: string;
  name: string;
}

export const UserToolbar: React.FC<Props> = ({ avatar, name }) => {
  return (
    <div className="flex items-center gap-3 p-1">
      <Image src={avatar} width={36} height={36} alt="" />
      <span className="flex gap-[2px] leading-[24px] text-[16px] font-semibold">
        {name}
      </span>
      <Image
        src="/icons/unicorn_angle-down.svg"
        width={24}
        height={24}
        alt=""
      />
    </div>
  );
};
