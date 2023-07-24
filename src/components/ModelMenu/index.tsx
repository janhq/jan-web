import { useStore } from "@/models/RootStore";
import Image from "next/image";

type Props = {
  showModelDetail: boolean;
  onModelInfoClick: () => void;
};

const ModelMenu: React.FC<Props> = ({ showModelDetail, onModelInfoClick }) => {
  const { historyStore } = useStore();

  const onDeleteConversationClick = () => {
    historyStore.deleteActiveConversation();
  };

  return (
    <div className="flex items-center gap-3">
      <button onClick={onModelInfoClick}>
        <Image
          src={
            showModelDetail
              ? "/icons/unicorn_info-circle-fill.svg"
              : "/icons/unicorn_info-circle.svg"
          }
          width={24}
          height={24}
          alt=""
        />
      </button>
      <button>
        <Image src="/icons/unicorn_plus.svg" width={24} height={24} alt="" />
      </button>
      <button onClick={onDeleteConversationClick}>
        <Image src="/icons/unicorn_trash.svg" width={24} height={24} alt="" />
      </button>
    </div>
  );
};

export default ModelMenu;
