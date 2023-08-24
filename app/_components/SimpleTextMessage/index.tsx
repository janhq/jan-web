import React from "react";
import { displayDate } from "@/_utils/datetime";
import { TextCode } from "../TextCode";
import { getMessageCode } from "@/_utils/message";
import { useSubscription } from "@apollo/client";
import {
  SubscribeMessageDocument,
  SubscribeMessageSubscription,
} from "@/graphql";

type Props = {
  uuid?: string;
  avatarUrl?: string;
  senderName: string;
  createdAt: number;
  text?: string;
};

const SimpleTextMessage: React.FC<Props> = ({
  uuid,
  senderName,
  createdAt,
  avatarUrl = "",
  text = "",
}) => {
  // Becareful with subscription
  // Should not subscribe for every single message
  // TODO:
  // Move this to child component. i.e. <CachedMessage> vs <StreamingMessage> (subscriptino right here)
  // And update stored messaged here
  const { data } = useSubscription<SubscribeMessageSubscription>(
    SubscribeMessageDocument,
    {
      variables: {
        id: uuid,
      },
    }
  );

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
          <div className="text-[#1B1B1B] text-[13px] font-extrabold leading-[15.2px] dark:text-[#d1d5db]">
            {senderName}
          </div>
          <div className="text-[11px] leading-[13.2px] font-medium text-gray-400">
            {displayDate(createdAt)}
          </div>
        </div>
        {(data?.messages_by_pk?.content || text).includes("```") ? (
          getMessageCode(text).map((item, i) => (
            <div className="flex gap-1 flex-col" key={i}>
              <p className="leading-[20px] whitespace-break-spaces text-[14px] font-normal dark:text-[#d1d5db]">
                {data?.messages_by_pk?.content || item.text}
              </p>
              {item.code.trim().length > 0 && <TextCode text={item.code} />}
            </div>
          ))
        ) : (
          <p className="leading-[20px] whitespace-break-spaces text-[14px] font-normal dark:text-[#d1d5db]">
            {data?.messages_by_pk?.content || text}
          </p>
        )}
      </div>
    </div>
  );
};

export default React.memo(SimpleTextMessage);
