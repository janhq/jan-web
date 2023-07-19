import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  description: string;
};

const ConversationalCard: React.FC<Props> = ({
  children,
  description,
  title,
}) => {
  return (
    <div className="bg-gray-100 gap-4 p-4 w-[200px] rounded-md">
      <div className="mb-2">{children}</div>
      <h2 className="text-[#1B1B1B] font-bold">{title}</h2>
      <span className="text-gray-500">{description}</span>
    </div>
  );
};

export default ConversationalCard;
