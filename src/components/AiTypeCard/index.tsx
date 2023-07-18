import { ReactNode } from "react";

type Props = {
  name: string;
  children: ReactNode;
}

const AiTypeCard: React.FC<Props> = ({ children, name }) => {
  return (
    <div className="bg-[#F3F4F6] flex items-center gap-[10px] py-[13px] rounded-[8px] px-4 justify-around">
      <div className="">{children}</div>
      <span className="font-bold">{name}</span>
    </div>
  );
};

export default AiTypeCard;
