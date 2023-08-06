import React from "react";
import JanImage from "../JanImage";

const CompactLogo: React.FC = () => {
  return <JanImage imageUrl="/icons/app_icon.svg" width={28} height={28} />;
};

export default React.memo(CompactLogo);
