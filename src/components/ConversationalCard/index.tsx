import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  image: string;
  description: string;
  name: string;
};

const ConversationalCard: React.FC<Props> = ({ image, description, title, name }) => {
  return (
    <Link href={`/ai/${name}`}>
      <div className="bg-gray-100 gap-4 p-4 w-[200px] rounded-md active:opacity-50 hover:opacity-20 flex flex-col h-full">
        <Image
          src={image}
          width={32}
          height={32}
          className="rounded-full"
          alt=""
        />
        <h2 className="text-[#1B1B1B] font-bold">{title}</h2>
        <span className="text-gray-500 flex-1">{description}</span>
        <div></div>
      </div>
    </Link>
  );
};

export default ConversationalCard;
