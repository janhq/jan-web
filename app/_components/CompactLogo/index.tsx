import React from "react";
import JanImage from "../JanImage";

type Props = {
  onClick: () => void;
};

const CompactLogo: React.FC<Props> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <JanImage
        imageUrl={`${process.env.NEXT_PUBLIC_BASE_PATH}/icons/app_icon.svg`}
        width={28}
        height={28}
      />
    </button>
  );
};

export default React.memo(CompactLogo);
