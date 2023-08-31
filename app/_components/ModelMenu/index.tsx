import Image from "next/image";
import { useStore } from "@/_models/RootStore";
import { useCallback } from "react";
import { observer } from "mobx-react-lite";

type Props = {
  onDeleteClick: () => void;
  onCreateConvClick: () => void;
};

const ModelMenu: React.FC<Props> = observer(
  ({ onDeleteClick, onCreateConvClick }) => {
    const { historyStore } = useStore();

    const onModelInfoClick = useCallback(() => {
      historyStore.toggleModelDetail();
    }, []);

    return (
      <div className="flex items-center gap-3">
        <button onClick={onCreateConvClick}>
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/icons/unicorn_plus.svg`}
            width={24}
            height={24}
            alt=""
          />
        </button>
        <button onClick={onDeleteClick}>
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/icons/unicorn_trash.svg`}
            width={24}
            height={24}
            alt=""
          />
        </button>
        <button onClick={onModelInfoClick}>
          <Image
            src={
              historyStore.showModelDetail
                ? `${process.env.NEXT_PUBLIC_BASE_PATH}/icons/ic_sidebar_fill.svg`
                : `${process.env.NEXT_PUBLIC_BASE_PATH}/icons/ic_sidebar.svg`
            }
            width={24}
            height={24}
            alt=""
          />
        </button>
      </div>
    );
  }
);

export default ModelMenu;
