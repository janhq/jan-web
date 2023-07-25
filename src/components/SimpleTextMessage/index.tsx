type Props = {
  avatarUrl?: string;
  senderName: string;
  createdAt: number;
  text?: string;
};

export const SimpleTextMessage: React.FC<Props> = ({
  senderName,
  avatarUrl = "",
  createdAt,
  text = "",
}) => {
  const displayDate = new Date(createdAt).toLocaleString();

  return (
    <div className="flex items-start gap-2">
      <img
        className="rounded-full"
        src={avatarUrl}
        width={32}
        height={32}
        alt=""
      />
      <div className="flex flex-col gap-1 w-full">
        <div className="flex gap-1 justify-start items-baseline">
          <div className="text-[#1B1B1B] text-[13px] font-extrabold leading-[15.2px]">
            {senderName}
          </div>
          <div className="text-[11px] leading-[13.2px] font-medium">
            {displayDate}
          </div>
        </div>
        <pre className="leading-[20px] text-[14px] whitespace-break-spaces">
          {text}
        </pre>
      </div>
    </div>
  );
};
