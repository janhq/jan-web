import Image from "next/image";
import { useStore } from "../../models/RootStore";
import { useCallback } from "react";
import { observer } from "mobx-react-lite";

type Props = {
  onDeleteClick: () => void;
};

const ModelMenu: React.FC<Props> = observer(({ onDeleteClick }) => {
  const { historyStore } = useStore();

  const onModelInfoClick = useCallback(() => {
    historyStore.toggleModelDetail();
  }, []);

  return (
    <div className="flex items-center gap-3">
      <button onClick={onModelInfoClick}>
        <Image
          src={
            historyStore.showModelDetail
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
      <button onClick={onDeleteClick}>
        <Image src="/icons/unicorn_trash.svg" width={24} height={24} alt="" />
      </button>
    </div>
  );
});

export default ModelMenu;
