import Image from "next/image";
import { observer } from "mobx-react-lite";
import { useStore } from "@/models/RootStore";

export const UserToolbar: React.FC = observer(() => {
  const { historyStore } = useStore();
  const conversation = historyStore.getActiveConversation();

  const avatarUrl = conversation?.aiModel.avatarUrl ?? "";
  const title = conversation?.aiModel.title ?? "";

  return (
    <div className="flex items-center gap-3 p-1">
      <img
        className="rounded-full"
        src={avatarUrl}
        width={36}
        height={36}
        alt=""
      />
      <span className="flex gap-[2px] leading-[24px] text-[16px] font-semibold">
        {title}
      </span>
      {/* <Image
        src="/icons/unicorn_angle-down.svg"
        width={24}
        height={24}
        alt=""
      /> */}
    </div>
  );
});
