import Link from "next/link";

type Props = {
  title: string;
  image: string;
  description: string;
  name: string;
};

const ConversationalCard: React.FC<Props> = ({
  image,
  description,
  title,
  name,
}) => {
  return (
    <Link href={`/ai/${name}`}>
      <div className="bg-gray-100 dark:bg-gray-700 gap-3 p-4 w-[218px] rounded-lg active:opacity-50 hover:opacity-20 flex flex-col h-full">
        <img src={image} className="w-8 h-8 rounded-full" alt="" />
        <h2 className="text-[#1B1B1B] font-bold dark:text-white">{title}</h2>
        <span className="text-gray-500 flex-1">{description}</span>
        <div></div>
      </div>
    </Link>
  );
};

export default ConversationalCard;
