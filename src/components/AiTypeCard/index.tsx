import Image from "next/image";
import Link from "next/link";

type Props = {
  name: string;
  imageUrl: string;
};

const AiTypeCard: React.FC<Props> = ({ imageUrl, name }) => {
  return (
    <Link href={`/ai/${name}`}>
      <div className="bg-[#F3F4F6] flex items-center gap-[10px] py-[13px] rounded-[8px] px-4 justify-around active:opacity-50 hover:opacity-20">
        <Image src={imageUrl} width={82} height={82} alt="" />
        <span className="font-bold">{name}</span>
      </div>
    </Link>
  );
};

export default AiTypeCard;
