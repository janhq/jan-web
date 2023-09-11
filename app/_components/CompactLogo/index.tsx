import React from "react";
import JanImage from "../JanImage";
import { activeConversationIdAtom } from "@/_helpers/JotaiWrapper";
import { useSetAtom } from "jotai";

const CompactLogo: React.FC = () => {
  const setActiveConversationIdAtom = useSetAtom(activeConversationIdAtom);

  return (
    <button onClick={() => setActiveConversationIdAtom(undefined)}>
      <JanImage imageUrl="/icons/app_icon.svg" width={28} height={28} />
    </button>
  );
};

export default React.memo(CompactLogo);
