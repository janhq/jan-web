/* eslint-disable @next/next/no-img-element */
import React from "react";

type Props = {
  id: string;
  avatar: string;
  title: string;
  onClick: (id: string) => void;
};

const ShortcutItem: React.FC<Props> = ({ id, avatar, title, onClick }) => {
  const onClickHandler = React.useCallback(() => {
    onClick(id);
  }, [id]);

  return (
    <button className="flex items-center gap-2 w-full" onClick={onClickHandler}>
      <img src={avatar} className="w-9 aspect-square rounded-full" alt="" />
      <div className="flex flex-col text-[14px] leading-[20px]">
        <span className="text-[#111928]">{title}</span>
      </div>
    </button>
  );
};

export default React.memo(ShortcutItem);
