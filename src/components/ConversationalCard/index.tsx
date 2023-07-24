import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  children: string;
  description: string;
};

const ConversationalCard: React.FC<Props> = ({
  children,
  description,
  title,
}) => {
  return (
    <Link href={`/ai/${title}`}>
      <div className="bg-gray-100 gap-4 p-4 w-[200px] rounded-md active:opacity-50 hover:opacity-20">
        <Image
          src={children}
          width={32}
          height={32}
          className="rounded-full"
          alt=""
        />
        <h2 className="text-[#1B1B1B] font-bold">{title}</h2>
        <span className="text-gray-500">{description}</span>
      </div>
    </Link>
  );
};

export default ConversationalCard;
